import { useState } from "react";
import "./App.css";
import FlightSearch from "./components/FlightSearch";

function App() {
  const [searchValue, setSearchValue] = useState<string>();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setSearchValue((event.target as HTMLInputElement).value);
    }
  };

  return (
    <div>
      <input type="search" onKeyDown={handleKeyDown}></input>
      <FlightSearch airport={searchValue}></FlightSearch>
    </div>
  );
}

export default App;
