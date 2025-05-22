import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { ColorModeContext, tokens } from "../theme";
import { format, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import axios from "../../axiosInstance";
import { useTheme } from "@mui/material"

const Areachart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [monthlyEarnings, setMonthlyEarnings] = useState([]);

  const fetchEvents = async (req, res) => {
    try {
      const res = await axios.get("/events/event", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        withCredentials: true,
      });
      const events = res.data;
      const earningsMap = {};

      events.forEach((event) => {
        if (event.status === "Completed") {
          const date = new Date(event.date);
          const key = format(date, "yyyy-MM");
          if (!earningsMap[key]) {
            earningsMap[key] = 0;
          }
          earningsMap[key] += event.amountEarned;
        }
      });

      const ChartData = Object.entries(earningsMap)
        .map(([month, total]) => ({
          month: parseISO(month + "-01"),
          earnings: total,
        }))
        .sort((a, b) => new Date(a.month) - new Date(b.month));
      setMonthlyEarnings(ChartData);
      // console.log(monthlyEarnings);
    } catch (err) {
      console.error("Error in fetching the contracts.: " + err);
    }
  };
  // console.log(monthlyEarnings);
  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <ResponsiveContainer width='100%' height={400}>
      <AreaChart
        data={monthlyEarnings}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id='colorEarn' x1='0' y1='0' x2='0' y2='1'>
            <stop offset={"5%"} stopColor={colors.redAccent[400]} stopOpacity={0.8} />
            <stop offset={"95%"} stopColor={colors.redAccent[400]} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey={"month"}
          tickFormatter={(date) => format(date, "MMM")}
          interval={0}
          angle={-45}
          textAnchor='end'
          tick={{ fill: "#ffffff", fontSize: 12 }}
        />
        <YAxis
          domain={["auto", "auto"]}
          tick={{ fill: "#ffffff", fontSize: 12 }}
        />
        <CartesianGrid strokeDasharray='3 3' />
        <Tooltip formatter={(value) => `₹${value}`} />
        <Area
          type='monotone'
          dataKey='earnings'
          stroke={colors.redAccent[400]}
          fillOpacity={1}
          fill='url(#colorEarn)'
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Areachart;
