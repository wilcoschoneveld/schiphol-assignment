import { rest } from "msw";
import data from "./flights.json";

export const handlers = [
    rest.get("http://localhost:3000/flights", async (req, res, ctx) => {
        const airport = req.url.searchParams.get("airport");
        const limit = req.url.searchParams.get("limit");
        const orderBy = req.url.searchParams.get("order_by");

        await new Promise((resolve) =>
            setTimeout(resolve, 2000 + 500 * Math.random())
        );

        if (airport === "crash") {
            return res.networkError("Failed to connect");
        }

        let flights = data.flights;

        if (airport) {
            flights = flights.filter((flight) =>
                flight.airport.toLowerCase().includes(airport.toLowerCase())
            );
        }

        if (orderBy) {
            const [order_term, dir] = orderBy.split(":");

            if (order_term === "date") {
                flights.sort((a, b) => {
                    const dateA = new Date(a.date + "T" + a.expectedTime);
                    const dateB = new Date(b.date + "T" + b.expectedTime);
                    return (
                        (dateA.valueOf() - dateB.valueOf()) *
                        (dir === "desc" ? -1 : 1)
                    );
                });
            }
        }

        if (limit) {
            flights = flights.slice(0, Number(limit));
        }

        return res(ctx.status(200), ctx.json({ flights }));
    }),
];
