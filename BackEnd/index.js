const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var dotenv = require("dotenv");
const cors = require("cors");
const argon2 = require("argon2");
const app = express();
var User = require("./models/user");
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(()=>{
  console.log("MongoDB Connected Successfully");
}).catch(()=>{
  console.log("Check Your MDB Connection String");
})

app.post("/register", async (req, res) => {
  const { name, email, password, mobile } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }
    const hashedPassword = await argon2.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      mobile,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const isMatch = await argon2.verify(user.password, password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    res.status(200).json({ success: true, message: "Login successful" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
