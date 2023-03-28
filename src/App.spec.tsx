import { test, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import createFetchMock from "vitest-fetch-mock";

const fetch = createFetchMock(vi);
fetch.enableMocks();

afterEach(() => {
    cleanup();
    fetch.resetMocks();
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

    expect(fetch).toHaveBeenCalled();
    expect(fetch.mock.calls[0][0]).toBe(
        "http://localhost:3000/flights?airport=lon&limit=5&order_by=date%3Aasc"
    );
});

test("should display error when fetch returns 0 flights", async () => {
    render(<App />);

    const user = userEvent.setup();
    const input = screen.getByPlaceholderText("Destination airport");

    fetch.mockResponseOnce(JSON.stringify({ flights: [] }));
    await user.type(input, "ams{Enter}");

    expect(
        screen.getByText('No flights found to airport matching "ams"')
    ).toBeTruthy();
});

test("should display error when fetch fails", async () => {
    render(<App />);

    const user = userEvent.setup();
    const input = screen.getByPlaceholderText("Destination airport");

    fetch.mockRejectOnce();
    await user.type(input, "test{Enter}");

    expect(
        screen.getByText("Something went wrong while searching flights")
    ).toBeTruthy();
});
