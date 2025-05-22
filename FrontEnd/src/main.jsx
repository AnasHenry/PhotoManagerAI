import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ProfileProvider } from "./context/ProfileContext";
import { SidebarProvider } from "./context/SideBarContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProfileProvider>
      <SidebarProvider>
        <App />
      </SidebarProvider>
    </ProfileProvider>
  </StrictMode>
);
