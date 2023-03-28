import { useEffect, useState } from "react";
import { fetchData, Flight } from "../api";

interface Props {
    airport?: string;
}

type State = "init" | "loading" | "success" | "error";

export default function FlightSearch({ airport }: Props) {
    const [state, setState] = useState<State>("init");
    const [flights, setFlights] = useState<Flight[]>([]);

    useEffect(() => {
        if (airport) {
            setState("loading");
            fetchData(airport).then((response) => {
                setFlights(response.flights);
                setState("success");
            });
        }
    }, [airport]);

    return (
        <div>
            Test
            {flights.map((flight) => (
                <div>Flight: {flight.flightIdentifier}</div>
            ))}
        </div>
    );
}
