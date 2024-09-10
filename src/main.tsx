import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import "./index.css";
import { RootStoreContextProvider } from "./store/RootStore.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RootStoreContextProvider>
      <App />
    </RootStoreContextProvider>
  </React.StrictMode>
);
