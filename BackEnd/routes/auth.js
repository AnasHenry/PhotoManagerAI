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
} = require("../controllers/authController");
const verifyToken = require("../middleware/authMiddleware");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.post("/login", login);
router.get("/profile", verifyToken, getProfile);
router.post("/register", register);
router.post("/updateProfile", upload.single("profilepic"), updateProfile);
router.post("/refresh", refreshToken);
router.post("/logout", logout);

module.exports = router;
