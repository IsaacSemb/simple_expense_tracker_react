import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App_Expense_Tracker from "./expense-tracker/App_Expense_Tracker.tsx";
// import App from './App.tsx'

// bootstrap
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <App /> */}
    <App_Expense_Tracker />
  </StrictMode>
);
