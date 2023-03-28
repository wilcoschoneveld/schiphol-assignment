import { useRef, useState } from "react";
import "./App.css";
import FlightSearch from "./components/FlightSearch";

function App() {
    const [searchValue, setSearchValue] = useState<string>();
    const [dateAscending, setDateAscending] = useState(true);
    const debounceTimer = useRef<number>();

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        clearTimeout(debounceTimer.current);
        debounceTimer.current = setTimeout(
            () => setSearchValue(event.target.value),
            1000
        );
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            clearTimeout(debounceTimer.current);
            setSearchValue((event.target as HTMLInputElement).value);
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
            <FlightSearch
                airport={searchValue}
                dateAscending={dateAscending}
            ></FlightSearch>
        </div>
    );
}

export default App;
