import { useEffect, useState } from "react";
import { fetchData, Flight } from "../api";
import FlightCard from "./FlightCard";
import Loader from "./Loader";

interface Props {
    airport?: string;
    dateAscending: boolean;
}

type State = "init" | "loading" | "success" | "error";

export default function FlightSearch({ airport, dateAscending }: Props) {
    const [state, setState] = useState<State>("init");
    const [flights, setFlights] = useState<Flight[]>([]);

    useEffect(() => {
        if (airport) {
            setState("loading");
            fetchData(airport, dateAscending).then((response) => {
                setFlights(response.flights);
                setState("success");
            });
        }
    }, [airport, dateAscending]);

    return (
        <div>
            {state === "loading" && <Loader />}
            {state === "success" &&
                flights.map((flight) => (
                    <FlightCard key={flight.flightIdentifier} flight={flight} />
                ))}
        </div>
    );
}
