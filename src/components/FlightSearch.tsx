import { useEffect, useState } from "react";
import { fetchData, Flight } from "../api";
import FlightCard from "./FlightCard";
import Loader from "./Loader";
import Message from "./Message";

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
            fetchData(airport, dateAscending)
                .then((response) => {
                    setFlights(response.flights);
                    setState("success");
                })
                .catch(() => {
                    setState("error");
                });
        }
    }, [airport, dateAscending]);

    return (
        <div>
            {state === "init" && (
                <Message>Use the search field to find flights</Message>
            )}
            {state === "loading" && <Loader />}
            {state === "success" &&
                (flights.length === 0 ? (
                    <Message>
                        No flights found to airport matching "{airport}"
                    </Message>
                ) : (
                    flights.map((flight) => (
                        <FlightCard
                            key={flight.flightIdentifier}
                            flight={flight}
                        />
                    ))
                ))}
            {state === "error" && (
                <Message>Something went wrong while searching flights</Message>
            )}
        </div>
    );
}
