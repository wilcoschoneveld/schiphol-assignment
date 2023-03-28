import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import FlightCard from "./FlightCard";

test("should render flight information", () => {
    const flight = {
        flightIdentifier: "D20190401UA969",
        flightNumber: "UA 969",
        airport: "San Francisco",
        date: "2022-02-23",
        expectedTime: "14:50",
        originalTime: "14:50",
        url: "/en/departures/flight/D20190401UA969/",
        score: "70.55272",
    };

    render(<FlightCard flight={flight}></FlightCard>);

    expect(screen.getByText("San Francisco")).toBeTruthy();
    expect(screen.getByText("2022-02-23")).toBeTruthy();
    expect(screen.getByText("14:50")).toBeTruthy();
    expect(screen.getByText("UA 969")).toBeTruthy();
});
