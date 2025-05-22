const express = require("express");
const { getEvents, putEvents, updateEvents, deleteEvents, getStats } = require("../controllers/eventController");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

router.use(verifyToken);

router.post("/event", putEvents);
router.get("/event", getEvents);
router.put("/event/:id", updateEvents);
router.delete("/event/:id", deleteEvents);
router.get("/event/stats", getStats);

module.exports = router;
