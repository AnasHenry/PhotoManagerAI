const Event = require("../models/event");

const getEvents = async (req, res) => {
  try {
    const events = await Event.find({ userId: req.user.id });
    res.status(200).send(events);
  } catch (err) {
    res.status(400).send(err);
  }
};

const putEvents = async (req, res) => {
  try {
    const event = new Event({
      ...req.body,
      userId: req.user.id,
    });
    await event.save();
    res.status(201).send(event);
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = { getEvents, putEvents };
