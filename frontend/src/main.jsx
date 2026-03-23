import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./index.css";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <App />
        <Toaster position="top-right" />
    </DndProvider>
  </React.StrictMode>
);