import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import axios from "../../axiosInstance";
import Header from "./Header";
import { motion } from "framer-motion";
import { useSidebar } from "../../context/SideBarContext";

const Stats = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const MotionBox = motion(Box);

  const { isCollapsed } = useSidebar();

  const [stats, setStats] = useState({
    currentMonthContracts: 0,
    lastMonthContracts: 0,
    currentMonthEarnings: 0,
    lastMonthEarnings: 0,
    upcomingEvents: 0,
    pendingPayments: 0,
    topVenue: "",
    feedbackSummary: "Coming soon...",
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get("events/event/stats", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          withCredentials: true,
        });
        setStats(data);
        console.log(data);
      } catch (err) {
        console.error("Failed to fetch dashboard stats:", err);
      }
    };
    const collapsed = localStorage.getItem("isCollapsed") === "true";
    // setCollapsed(collapsed);
    fetchStats();
    console.log(isCollapsed);
  }, []);

  const percentageChange = (current, previous) => {
    if (previous === 0) return null;
    const diff = current - previous;
    const percent = ((diff / previous) * 100).toFixed(1);
    return { diff, percent, isIncrease: diff > 0 };
  };

  const contractChange = percentageChange(
    stats.currentMonthContracts,
    stats.lastMonthContracts
  );

  const earningsChange = percentageChange(
    stats.currentMonthEarnings,
    stats.lastMonthEarnings
  );

  const StatCard = ({ title, value, change }) => (
    <Box
      p={3}
      borderRadius='16px'
      backgroundColor={colors.primary[400]}
      display='flex'
      flexDirection='column'
      textAlign='center'
      alignItems='center'
      width='100%'
      height='100%'
      minHeight='200px'
      sx={{
        transition: "all 0.3s ease",
        border: "2px solid transparent",
        "&:hover": {
          borderColor: colors.whiteAccent[500],
        },
      }}>
      <Typography variant='h4' color={colors.redAccent[100]}>
        {title}
      </Typography>
      <Typography
        variant='h4'
        fontWeight='bold'
        color={colors.whiteAccent[300]}
        mt={2}>
        {value}
      </Typography>
      {change && (
        <Box display='flex' alignItems='center' gap={1} mt={2}>
          {change.isIncrease ? (
            <TrendingUpIcon sx={{ color: "green" }} />
          ) : (
            <TrendingDownIcon sx={{ color: "red" }} />
          )}
          <Typography color={change.isIncrease ? "green" : "red"}>
            {change.percent}%
          </Typography>
        </Box>
      )}
    </Box>
  );

  return (
    <Box m='20px'>
      <Header title='Statistics' subtitle='Your overall statistics' />
      <Grid container spacing={3}>
        {[
          {
            title: "Contracts This Month",
            value: stats.currentMonthContracts,
            change: contractChange,
          },
          {
            title: "Earnings This Month",
            value: `₹${stats.currentMonthEarnings}`,
            change: earningsChange,
          },
          {
            title: "Upcoming Events",
            value: stats.upcomingEvents,
          },
          {
            title: "Pending Payments",
            value: stats.pendingPayments,
          },
          {
            title: "Top Booked Venue",
            value: stats.topVenue || "N/A",
          },
          {
            title: "Client Feedback",
            value: stats.feedbackSummary,
          },
        ].map((item, idx) => (
          <MotionBox
            animate={{ width: isCollapsed ? "350px" : "300px" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            minWidth='300px'>
            <Box width='100%' minWidth='300px'>
              <StatCard {...item} />
            </Box>
          </MotionBox>
        ))}
      </Grid>
    </Box>
  );
};

export default Stats;
