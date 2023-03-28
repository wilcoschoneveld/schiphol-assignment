import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get("/flights", async (req, res) => {
  const { airport, limit, order_by } = req.query;

  await new Promise((resolve) => setTimeout(resolve, 2000 + 500 * Math.random()));
  const rawData = fs.readFileSync("server/flights.json");

  let flights = JSON.parse(rawData)["flights"];

  if (airport) {
    flights = flights.filter((flight) =>
      flight.airport.toLowerCase().includes(airport.toLowerCase())
    );
  }

  if (order_by) {
    const [order_term, dir] = order_by.split(":");

    if (order_term === "date") {
      flights.sort((a, b) => {
        const dateA = new Date(a.date + "T" + a.expectedTime);
        const dateB = new Date(b.date + "T" + b.expectedTime);
        return (dateA - dateB) * (dir === "desc" ? -1 : 1);
      });
    }
  }

  if (limit) {
    flights = flights.slice(0, Number(limit));
  }

  res.json({ flights: flights });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
