import React from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../theme";
import { InputBase } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import axios from "../../axiosInstance";
import { Navigate, useNavigate } from "react-router-dom";

const Navbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  //   console.log(colors);
  //   console.log(colorMode);
  //   console.log(theme.palette.mode)
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "/auth/logout",
        {},
        { withCredentials: true }
      );
      localStorage.removeItem("accessToken");
      // console.log(response.data);
      // Handle successful logout (e.g., redirect to login page)
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      p={2}
      sx={{borderBottom: "1px solid #333333"}}
      width={"100%"}
      backgroundColor={colors.primary[400]}>
      <Box
        display={"flex"}
        backgroundColor={colors.redAccent[400]}
        borderRadius={"3px"}>
          {/* Insert Logo here */}
      </Box>
      <Box display={"flex"}>
        <IconButton type='button' onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton onClick={() => navigate("./profile")}>
          <PersonOutlinedIcon />
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton onClick={handleLogout}>
          <LogoutOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Navbar;
