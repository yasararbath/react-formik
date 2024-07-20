import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

// Set the base URL for Axios requests
axios.defaults.baseURL = "http://localhost:8000/api";

// Set the base config for Axios requests
axios.defaults.withCredentials = true;

// Create a root for rendering the app
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// Render the app inside a BrowserRouter for routing
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
