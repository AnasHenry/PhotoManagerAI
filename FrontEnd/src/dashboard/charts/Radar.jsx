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
        const key = event.eventType;
        if (!eventsTrig[key]) {
          eventsTrig[key] = 0;
        }
        eventsTrig[key] += 1;
      });

      const ChartData = Object.entries(eventsTrig).map(
        ([eventType, count]) => ({
          eventType,
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
      <RadarChart cx='50%' cy='50%' outerRadius='80%' data={eventCount}>
        <PolarGrid />
        <PolarAngleAxis
          dataKey='eventType'
          tick={{
            fill: "#fff",
            fontSize: 12,
            opacity: 0.8,
            fontWeight: "bold",
          }}
        />

        <Radar
          name='Event Types'
          dataKey='count'
          stroke={colors.redAccent[400]}
          fill={colors.redAccent[400]}
          fillOpacity={0.7}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default Rad;
