import { useState } from "react";
import "./App.css";
import FlightSearch from "./components/FlightSearch";

function App() {
    const [searchValue, setSearchValue] = useState<string>();
    const [dateAscending, setDateAscending] = useState(true);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            setSearchValue((event.target as HTMLInputElement).value);
        }
    };

    return (
        <div>
            <input type="search" onKeyDown={handleKeyDown}></input>
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
