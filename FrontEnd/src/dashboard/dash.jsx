import React from "react";
import "./dash.css";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Navbar from "./global/Navbar";
import Sidebar from "./global/Sidebar";
import Dboard from "./comps/Dboard";
import { Route, Outlet, Routes } from "react-router-dom";
import Contracts from "./comps/Contracts";
import { tokens } from "./theme";

const Dash = () => {
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className='the-main'>
          <div>
            <Sidebar />
          </div>
          <main style={{ width: "100%", backgroundColor: colors.primary[300] }}>
            <Navbar />
            <Outlet />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Dash;
