import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import axios from "../../axiosInstance";
import { useState, useEffect } from "react";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import { Box } from "@mui/material";
import Header from "../comps/Header";

const Rad = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [eventCount, setEventCount] = useState([]);

  const fetchEvents = async () => {
    try {
      const res = await axios.get("/events/event", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        withCredentials: true,
      });
      const events = res.data;
      const eventsTrig = {};

      events.forEach((event) => {
        const key = event.event_type;
        if (!eventsTrig[key]) {
          eventsTrig[key] = 0;
        }
        eventsTrig[key] += 1;
      });

      const ChartData = Object.entries(eventsTrig).map(
        ([event_type, count]) => ({
          event_type,
          count,
        })
      );
      setEventCount(ChartData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <ResponsiveContainer width='100%' height={500}>
      <Box sx={{ margin: 5, height: "100px" }}>
        <Header title='My Events' subtitle='My most attended events this year' />
      </Box>
      <RadarChart cx='50%' cy='50%' outerRadius='80%' data={eventCount}>
        <PolarGrid />
        <style>
          {`@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700&display=swap');`}
        </style>

        <PolarAngleAxis
          dataKey='event_type'
          tick={{
            fill: colors.whiteAccent[400],
            fontFamily: "'Source Sans Pro', sans-serif",
            fontSize: 12,
            opacity: 0.8,
            fontWeight: "bold",
          }}
        />

        <Radar
          name='Event Types'
          dataKey='count'
          stroke={colors.redAccent[100]}
          fill={colors.whiteAccent[400]}
          fillOpacity={0.7}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default Rad;
