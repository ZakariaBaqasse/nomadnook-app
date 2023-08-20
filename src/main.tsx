import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { NhostClient, NhostProvider } from "@nhost/react";

const nhost = new NhostClient({
  subdomain: import.meta.env.VITE_APP_NHOST_SUBDOMAIN,
  region: import.meta.env.VITE_APP_NHOST_REGION,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <NhostProvider nhost={nhost}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </NhostProvider>
);
