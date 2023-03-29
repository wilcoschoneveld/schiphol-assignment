import { test, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { server } from "./mocks/server";
import { rest } from "msw";

afterEach(() => {
    cleanup();
});

test("should render init state", () => {
    render(<App />);

    expect(
        screen.getByText("Search for a destination airport to find flights")
    ).toBeTruthy();
});

test("should fetch from the correct api url", async () => {
    render(<App />);

    const user = userEvent.setup();
    const input = screen.getByPlaceholderText("Destination airport");

    await user.type(input, "lon{Enter}");

    expect(screen.getByTestId("loader")).toBeDefined();
});

test("should display error when fetch returns 0 flights", async () => {
    render(<App />);

    const user = userEvent.setup();
    const input = screen.getByPlaceholderText("Destination airport");

    server.use(
        rest.get("http://localhost:3000/flights", async (req, res, ctx) => {
            return res(ctx.status(200), ctx.json({ flights: [] }));
        })
    );

    await user.type(input, "ams{Enter}");

    expect(
        screen.getByText('No flights found to airport matching "ams"')
    ).toBeTruthy();
});

test("should display error when fetch fails", async () => {
    render(<App />);

    const user = userEvent.setup();
    const input = screen.getByPlaceholderText("Destination airport");

    server.use(
        rest.get("http://localhost:3000/flights", async (req, res, ctx) => {
            return res.networkError("Failed to connect");
        })
    );

    await user.type(input, "test{Enter}");

    expect(
        screen.getByText("Something went wrong while searching flights")
    ).toBeTruthy();
});
