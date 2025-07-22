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
import { Box, useTheme } from "@mui/material";
import Header from "../comps/Header";

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
          earningsMap[key] += Number(event.amount_earned);
        }
      });

      const ChartData = Object.entries(earningsMap)
        .map(([month, total]) => ({
          month: parseISO(month + "-01"),
          earnings: total,
        }))
        .sort((a, b) => new Date(a.month) - new Date(b.month));
      setMonthlyEarnings(ChartData);
      // console.log(ChartData);
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
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700&display=swap');`}
      </style>
      <Box sx={{margin: 5, height: '100px'}}>
        <Header title='My Earnings' subtitle='My earnings this year' />
      </Box>

      <AreaChart
        data={monthlyEarnings}
        margin={{right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id='colorEarn' x1='0' y1='0' x2='0' y2='1'>
            <stop
              offset={"5%"}
              stopColor={colors.redAccent[400]}
              stopOpacity={0.5}
            />
            <stop
              offset={"95%"}
              stopColor={colors.whiteAccent[400]}
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <XAxis
          dataKey={"month"}
          tickFormatter={(date) => format(date, "MMM")}
          interval={0}
          angle={-45}
          textAnchor='end'
          tick={{
            fill: colors.whiteAccent[400],
            fontSize: 12,
            fontFamily: "'Source Sans Pro', sans-serif",
          }}
        />
        <YAxis
          domain={["auto", "auto"]}
          tick={{
            fill: colors.whiteAccent[400],
            fontSize: 12,
            fontFamily: "'Source Sans Pro', sans-serif",
          }}
        />
        <CartesianGrid strokeDasharray='3 3' />
        <Tooltip
          content={({ payload }) => {
            if (payload && payload.length) {
              return (
                <div
                  style={{
                    backgroundColor: "#fff",
                    color: "#000",
                    padding: "8px 12px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    fontFamily: "'Source Sans Pro', sans-serif",
                    fontSize: "14px",
                  }}>
                  <strong>Earnings: </strong> ₹{payload[0].value}
                </div>
              );
            }
            return null;
          }}
        />
        <Area
          type='monotone'
          dataKey='earnings'
          stroke={colors.redAccent[100]}
          fillOpacity={1}
          fill='url(#colorEarn)'
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Areachart;
