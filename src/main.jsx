import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./sass/style.scss";
import { AlertTost } from "./components/alerts.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <AlertTost />
    <App />
  </>
);
