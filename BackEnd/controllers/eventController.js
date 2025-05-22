const Event = require("../models/event");

const getEvents = async (req, res) => {
  try {
    const events = await Event.find({ userId: req.user.id });
    const today = new Date().toISOString().split("T")[0];
    const updatedEvents = events.map((event) => {
      const eventDate = new Date(event.date).toISOString().split("T")[0];
      if (eventDate === today) {
        event.status = "Ongoing";
      } else if (eventDate > today) {
        event.status = "Pending";
      } else {
        event.status = "Completed";
      }
      return event;
    });

    await Promise.all(
      updatedEvents.map((event) => {
        Event.findByIdAndUpdate(event._id, { status: event.status });
      })
    );

    //Sorting Logic
    const sorted = updatedEvents.sort((a, b) => {
      if (a.status === "Ongoing" && b.status !== "Ongoing") return -1;
      if (a.status !== "Ongoing" && b.status === "Ongoing") return 1;

      if (a.status === "Pending" && b.status === "Pending") {
        return new Date(a.date) - new Date(b.date); // ascending
      }

      if (a.status === "Completed" && b.status === "Completed") {
        return new Date(b.date) - new Date(a.date); // descending
      }

      // Priority: Ongoing > Pending > Completed
      const priority = { Ongoing: 1, Pending: 2, Completed: 3 };
      return priority[a.status] - priority[b.status];
    });

    res.status(200).send(sorted);
  } catch (err) {
    res.status(400).send(err.message);
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

const updateEvents = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found." });
    }
    res.status(200).json(updatedEvent);
  } catch (err) {
    console.error("Error updating event: ", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

const deleteEvents = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found." });
    }
    res.status(200).json({ message: "Event deletion Successful" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

const getStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const now = new Date();
    const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    const events = await Event.find({ userId });

    const currentMonthEvents = events.filter(
      (e) => e.date >= startOfCurrentMonth && e.date <= now
    );
    const lastMonthEvents = events.filter(
      (e) => e.date >= startOfLastMonth && e.date <= endOfLastMonth
    );

    const currentMonthContracts = currentMonthEvents.length;
    const lastMonthContracts = lastMonthEvents.length;

    const currentMonthEarnings = currentMonthEvents.reduce(
      (sum, e) => sum + (e.amountEarned || 0),
      0
    );
    const lastMonthEarnings = lastMonthEvents.reduce(
      (sum, e) => sum + (e.amountEarned || 0),
      0
    );

    const upcomingEvents = events.filter((e) => new Date(e.date) > now).length;

    const pendingPayments = events.filter(
      (e) => e.status.toLowerCase() === "pending"
    ).length;

    const venueCount = {};
    events.forEach((e) => {
      const key = e.hallName;
      venueCount[key] = (venueCount[key] || 0) + 1;
    });

    const topVenue = Object.entries(venueCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "";

    res.status(200).json({
      currentMonthContracts,
      lastMonthContracts,
      currentMonthEarnings,
      lastMonthEarnings,
      upcomingEvents,
      pendingPayments,
      topVenue,
      feedbackSummary: "Coming soon...",
    });
  } catch (err) {
    console.error("Failed to get dashboard stats:", err);
    res.status(500).json({ message: "Failed to fetch dashboard stats" });
  }
};

module.exports = { getEvents, putEvents, updateEvents, deleteEvents, getStats };
