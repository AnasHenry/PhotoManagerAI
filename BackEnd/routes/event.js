const express = require("express");
const { getEvents, putEvents } = require("../controllers/eventController");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

router.use(verifyToken);

router.post("/event", putEvents);
router.get("/event", getEvents);

module.exports = router;
