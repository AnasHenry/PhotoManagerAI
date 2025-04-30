import React from "react";
import Header from "./Header";
import { Box } from "@mui/material";
const Dboard = () => {
  return (
    <Box m='20px'>
      <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
        <Header title='DASHBOARD' subtitle='Welcome to the DashBoard' />
      </Box>
    </Box>
  );
};

export default Dboard;
