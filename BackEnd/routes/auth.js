const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  login,
  getProfile,
  register,
  refreshToken,
  logout,
  updateProfile,
  getProfilePic
} = require("../controllers/authController");
const verifyToken = require("../middleware/authMiddleware");

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

const router = express.Router();

router.post("/login", login);
router.get("/profile", verifyToken, getProfile);
router.post("/register", register);
router.post("/updateProfile", verifyToken, upload.single("profilepic"), updateProfile);
router.get("/profilepic/:id", getProfilePic);
router.post("/refresh", refreshToken);
router.post("/logout", logout);

module.exports = router;
