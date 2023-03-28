import { useRef, useState } from "react";
import { fetchData, Flight } from "./api";
import "./App.css";
import FlightCard from "./components/FlightCard";
import Loader from "./components/Loader";
import Message from "./components/Message";

type State = "init" | "loading" | "success" | "error";

function App() {
    const [state, setState] = useState<State>("init");
    const [searchedValue, setSearchedValue] = useState<string>();
    const [dateAscending, setDateAscending] = useState(true);
    const [flights, setFlights] = useState<Flight[]>([]);
    const debounceTimer = useRef<number>();

    function searchFlights(searchValue: string) {
        if (searchValue && searchValue.length >= 3) {
            setSearchedValue(searchValue);
            setState("loading");
            fetchData(searchValue, dateAscending)
                .then((response) => {
                    setFlights(response.flights);
                    setState("success");
                })
                .catch(() => {
                    setState("error");
                });
        }
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        clearTimeout(debounceTimer.current);
        debounceTimer.current = setTimeout(
            () => searchFlights(event.target.value),
            1000
        );
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            clearTimeout(debounceTimer.current);
            searchFlights((event.target as HTMLInputElement).value);
        }
    }

    return (
        <div>
            <input
                type="search"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            ></input>
            <div onClick={() => setDateAscending(!dateAscending)}>
                Order by date {dateAscending ? "ascending" : "descending"}
            </div>
            {state === "init" && (
                <Message>Use the search field to find flights</Message>
            )}
            {state === "loading" && <Loader />}
            {state === "success" &&
                (flights.length === 0 ? (
                    <Message>
                        No flights found to airport matching "{searchedValue}"
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
