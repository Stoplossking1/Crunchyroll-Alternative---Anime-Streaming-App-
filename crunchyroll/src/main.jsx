import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import "bulma/css/bulma.min.css";
import "font-awesome/css/font-awesome.min.css"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
