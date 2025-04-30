const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const authRouter = require("./routes/auth");
const eventRouter = require("./routes/event");
const cookieParser = require("cookie-parser");
const path = require("path");
const PORT = 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch(() => {
    console.log("Check Your MDB Connection String");
  });

app.use("/api/auth", authRouter);
app.use("/api/events", eventRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
