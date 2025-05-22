import React, { useEffect } from "react";
import { useState } from "react";
import { Menu, MenuItem } from "react-pro-sidebar";
import { ProSidebar } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, Typography, useTheme, Avatar } from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { tokens } from "../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import DataUsageOutlinedIcon from "@mui/icons-material/DataUsageOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import RadarOutlinedIcon from '@mui/icons-material/RadarOutlined';
import AreaChartOutlinedIcon from '@mui/icons-material/AreaChartOutlined';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import axios from "../../axiosInstance";
import { useProfile } from "../../context/ProfileContext";
import { useSidebar } from "../../context/SideBarContext";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.whiteAccent[400] }}
      onClick={() => {
        setSelected(title);
      }}
      icon={icon}>
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  // const [isCollapsed, setIsCollapsed] = useState(false);
  const {isCollapsed, toggleCollapse } = useSidebar();
  const [selected, setSelected] = useState("Dash");

  const { profile, setProfile } = useProfile();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!localStorage.getItem("accessToken")) {
          window.location.href = "/login"; // Redirect to login page if no token
          return;
        }

        const response = await axios.get("/auth/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          withCredentials: true,
        });
        // console.log(response.data);
        setProfile({
          fname: response.data.fname,
          lname: response.data.lname,
          companyname: response.data.companyname,
          profilepic: "http://localhost:5000" + response.data.profilepic,
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
    
  }, []);

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "&. pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "&. pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "&. pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}>
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape='square'>
          <MenuItem
            onClick={() => {
              toggleCollapse();
              localStorage.setItem("sidebarCollapsed", !isCollapsed);
            }}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{ margin: "10px 0 20px 0", color: colors.redAccent[600] }}>
            {!isCollapsed && (
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                ml={"15px"}>
                <Typography variant='h5' color={colors.redAccent[400]}>
                  PHOTO MANA AI
                </Typography>
                <IconButton
                  onClick={() => {
                    setIsCollapsed(!isCollapsed);
                    
                  }}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {/* User */}
          {!isCollapsed && (
            <Box mb='25px'>
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}>
                <Avatar
                  src={profile.profilepic}
                  onClick={() => navigate("./profile")}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                  sx={{ width: 100, height: 100 }}
                />
              </Box>
              <Box textAlign={"center"}>
                <Typography
                  variant='h2'
                  color={colors.whiteAccent[200]}
                  fontWeight={"bold"}
                  sx={{ m: "10px 0 0 0 " }}>
                  {profile.fname} {profile.lname}
                </Typography>
                <Typography variant='h5' color={colors.redAccent[500]}>
                  {profile.companyname}
                </Typography>
              </Box>
            </Box>
          )}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title='Dashboard'
              to='/dashboard'
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant='h6'
              color={colors.whiteAccent[300]}
              sx={{ m: "15px 0 5px 20px" }}>
              Data
            </Typography>
            <Item
              title='My Contracts'
              to='./contracts'
              icon={<AssignmentOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='My Stats'
              to='./stats'
              icon={<DataUsageOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant='h6'
              color={colors.whiteAccent[300]}
              sx={{ m: "15px 0 5px 20px" }}>
              Pages
            </Typography>
            <Item
              title='Profile'
              to='./profile'
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Calendar'
              to='./calendar'
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='FAQ'
              to='./faq'
              icon={<HelpOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant='h6'
              color={colors.whiteAccent[300]}
              sx={{ m: "15px 0 5px 20px" }}>
              Charts
            </Typography>
            <Item
              title='Area Chart'
              to='./area'
              icon={<AreaChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Radar Chart'
              to='./radar'
              icon={<RadarOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
