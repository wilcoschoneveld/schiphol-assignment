import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./colors.css";
import "./index.css";
import "./utils.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
