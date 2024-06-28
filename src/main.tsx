import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartProvider.tsx";
import { LoadingProvider } from "./context/LoadingProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <LoadingProvider>
          <App />
        </LoadingProvider>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
