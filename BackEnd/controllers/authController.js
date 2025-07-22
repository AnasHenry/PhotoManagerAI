const jwt = require("jsonwebtoken");
const pool = require("../db");
const argon2 = require("argon2");

const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "10m" });
};

const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT id, fname, email, password FROM users WHERE email = $1",
      [email]
    );
    // console.log(result);
    const user = result.rows[0];
    // console.log(user);
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

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,
      refreshToken,
      user: { id: user.id, fname: user.fname, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const refreshToken = async (req, res) => {
  const token = req.body.token;
  // console.log(token);
  if (!token) {
    return res.status(401).json({ message: "No refresh token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const accessToken = generateAccessToken(decoded.id);
    res.json({ accessToken });
  } catch (error) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }
};

const register = async (req, res) => {
  const { fname, lname, email, password, mobile, companyname } = req.body;
  try {
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }
    const hashedPassword = await argon2.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO users (fname, lname, email, password, mobile, companyname)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, fname, companyname`,
      [fname, lname, email, hashedPassword, mobile, companyname]
    );
    const user = result.rows[0];
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      accessToken,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const logout = (req, res) => {
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out" });
};

const getProfile = async (req, res) => {
  const result = await pool.query(
    "SELECT id, fname, lname, email, mobile, companyname, profilepic, mimetype FROM users WHERE id = $1",
    [req.user.id]
  );
  const user = result.rows[0];
  if (!user) return res.status(404).json({ message: "User not found" });

  const hasProfilepic = !!user.profilepic;
  res.json({
    ...user,
    profilepic: null,
    hasProfilepic,
  });
};

const updateProfile = async (req, res) => {
  const { fname, lname, email, mobile, companyname} = req.body;
  const profilepic = req.file?.buffer || null; // image as buffer
  const mimetype = req.file?.mimetype || null;
  try {
    const result = await pool.query(
      `UPDATE users SET fname=$1, lname=$2, email=$3, mobile=$4,
       companyname=$5, profilepic=$6, mimetype=$7 WHERE id=$8 RETURNING id, fname, lname, email, mobile, companyname`,
      [
        fname,
        lname,
        email,
        mobile,
        companyname,
        profilepic,
        mimetype,
        req.user.id, // assuming you have user info in token
      ]
    );
    updatedUser = result.rows[0];
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const getProfilePic = async (req, res) => {
  try {
    console.log(req.params);
    const result = await pool.query(
      "SELECT profilepic, mimetype FROM users WHERE id = $1",
      [req.params.id]
    );
    const user = result.rows[0];
    if (!user || !user.profilepic) return res.sendStatus(404);

    res.setHeader("Content-Type", user.mimetype);
    res.send(user.profilepic);
  } catch (err) {
    console.error("Error fetching profile pic:", err);
    res.status(500).send("Error fetching image");
  }
};


module.exports = {
  login,
  getProfile,
  register,
  refreshToken,
  logout,
  updateProfile,
  getProfilePic,
};
