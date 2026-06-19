import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";

// PWA service worker — production only, never in Lovable preview
const host = window.location.hostname;
const inPreview =
  host.startsWith("id-preview--") ||
  host.startsWith("preview--") ||
  host.endsWith(".lovableproject.com") ||
  host.endsWith(".lovableproject-dev.com") ||
  host.endsWith(".beta.lovable.dev");

if ("serviceWorker" in navigator && import.meta.env.PROD && !inPreview && window.self === window.top) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  });
} else if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations?.().then((rs) => rs.forEach((r) => {
    if (r.active?.scriptURL.endsWith("/sw.js")) r.unregister();
  }));
}

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
