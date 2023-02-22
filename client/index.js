import React from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import "./index.css";

const domeNode = document.getElementById("root");
const root = createRoot(domeNode);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
