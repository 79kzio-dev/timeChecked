import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";

import "./index.css";
import App from "./App.tsx";

// Service Worker 등록
registerSW({
  onNeedRefresh() {
    localStorage.setItem("updatePending", "true");
  },

  onOfflineReady() {
    console.log("TimeChecked is ready for offline use.");
  }
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
