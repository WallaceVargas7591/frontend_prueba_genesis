import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "swiper/swiper-bundle.css";
import "flatpickr/dist/flatpickr.css";
import App from "./App.tsx";
import { AppWrapper } from "./components/common/PageMeta.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";

if (import.meta.env.DEV) {
  import("react-scan").then((mod) => {
    console.log("✅ react-scan cargado");
    const { inject } = mod.default || mod; // soporta ambas formas de export
    inject({
      include: [/.*/],
      log: true,
      trackUpdates: true
    });
  }).catch(err => console.error("Error cargando react-scan:", err));
} else {
  console.log("Error")
}


createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
      <AppWrapper>
        <App />
      </AppWrapper>
    </ThemeProvider>
);
