import React from "react";
import "./dash.css";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Navbar from "./global/Navbar";
import Sidebar from "./global/Sidebar";
import { useSidebar } from "../context/SideBarContext";
import Dboard from "./comps/Dboard";
import { Route, Outlet, Routes } from "react-router-dom";
import Contracts from "./comps/Contracts";
import { tokens } from "./theme";

const Dash = () => {
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);
  const { isCollapsed } = useSidebar();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className='the-main'>
          <div>
            <Sidebar />
          </div>
          <main className="main-content"
            style={{
              // width: isCollapsed ? "1200px" : "1000px",
              width: "100%",
              backgroundColor: colors.primary[300],
            }}>
            <Navbar />
            <Outlet />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Dash;
