import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import "./index.css";
import { CartProvider } from "./context/CartContext";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Failed to find root element");
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  </React.StrictMode>
);
