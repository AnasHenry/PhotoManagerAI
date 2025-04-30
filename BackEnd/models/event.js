const mongoose = require("mongoose");
const { events } = require("./user");

const eventSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  contractId: { type: String, required: true },
  clientName: { type: String, required: true },
  hallName: { type: String, required: true },
  hallLocation: { type: String, required: true },
  eventType: { type: String, required: true },
  date: { type: Date, required: true },
  amountEarned: { type: Number, required: true },
  status: { type: String, default: "Pending" },
});

module.exports = mongoose.model("Event", eventSchema);
