import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./colors.css";
import "./index.css";
import "./utils.css";

if (process.env.NODE_ENV === "development") {
    const { worker } = await import("./mocks/browser");
    worker.start();
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
