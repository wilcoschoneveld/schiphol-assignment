import { useEffect, useRef, useState } from "react";
import { fetchData, Flight } from "./api";
import FlightCard from "./components/FlightCard";
import Header from "./components/Header";
import Loader from "./components/Loader";
import Message from "./components/Message";

type State = "init" | "loading" | "success" | "error";

function App() {
    const [state, setState] = useState<State>("init");
    const [searchValue, setSearchValue] = useState<string>();
    const [dateAscending, setDateAscending] = useState(true);
    const [enterKeyPressCount, setEnterKeyPressCount] = useState(0);
    const [flights, setFlights] = useState<Flight[]>([]);
    const debounceTimer = useRef<number>();

    useEffect(() => {
        const controller = new AbortController();

        if (searchValue && searchValue.length >= 3) {
            setState("loading");
            fetchData(searchValue, dateAscending, controller.signal)
                .then((response) => {
                    setFlights(response.flights);
                    setState("success");
                })
                .catch(() => {
                    if (!controller.signal.aborted) {
                        setState("error");
                    }
                });
        } else {
            setState("init");
        }

        return () => controller.abort();
    }, [searchValue, dateAscending, enterKeyPressCount]);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        clearTimeout(debounceTimer.current);
        debounceTimer.current = window.setTimeout(
            () => setSearchValue(event.target.value),
            1000
        );
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            clearTimeout(debounceTimer.current);
            setSearchValue((event.target as HTMLInputElement).value);
            setEnterKeyPressCount((count) => count + 1); // to allow force re-fetch with same search value
        }
    }

    return (
        <div>
            <div className="bg-white flex column align-center mb-2">
                <Header />
                <div className="flex mb-2 align-center">
                    <input
                        type="search"
                        className="p-05 font-medium"
                        placeholder="Destination airport"
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    ></input>
                    <div
                        className="flex ml-1 pointer user-select-none"
                        onClick={() => setDateAscending(!dateAscending)}
                    >
                        Order by date
                        <span className="material-icons dusk-green">
                            {dateAscending ? "south" : "north"}
                        </span>
                    </div>
                </div>
            </div>
            {state === "init" && (
                <Message>
                    Search for a destination airport to find flights
                </Message>
            )}
            {state === "loading" && <Loader />}
            {state === "success" &&
                (flights.length === 0 ? (
                    <Message>
                        No flights found to airport matching "{searchValue}"
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

export default App;
