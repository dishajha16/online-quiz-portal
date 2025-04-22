import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

//ReactDOM.render(<App />, document.getElementById("root"));

//const root = ReactDOM.createRoot(document.getElementById("root"));

import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("root")); // ✅ FIXED

root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);
