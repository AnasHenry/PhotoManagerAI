const pool = require("../db");

const getEvents = async (req, res) => {
  try {
    const { rows: events } = await pool.query(
      "SELECT * FROM events WHERE user_id = $1",
      [req.user.id]
    );

    const today = new Date().toISOString().split("T")[0];

    const updatedEvents = await Promise.all(
      events.map(async (event) => {
        const eventDate = new Date(event.date).toISOString().split("T")[0];

        let status;
        if (eventDate === today) status = "Ongoing";
        else if (eventDate > today) status = "Pending";
        else status = "Completed";

        if (status !== event.status) {
          await pool.query("UPDATE events SET status = $1 WHERE id = $2", [
            status,
            event.id,
          ]);
          event.status = status;
        }

        return event;
      })
    );

    // Sorting
    const sorted = updatedEvents.sort((a, b) => {
      const priority = { Ongoing: 1, Pending: 2, Completed: 3 };
      if (a.status !== b.status) return priority[a.status] - priority[b.status];

      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (a.status === "Pending") return dateA - dateB;
      if (a.status === "Completed") return dateB - dateA;

      return 0;
    });

    res.status(200).json(sorted);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const putEvents = async (req, res) => {
  const {
    contract_id,
    client_name,
    hall_name,
    hall_location,
    event_type,
    date,
    amount_earned,
  } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO events 
    (user_id, contract_id, client_name, hall_name, hall_location, event_type, date, amount_earned)
   VALUES 
    ($1, $2, $3, $4, $5, $6, $7, $8)
   RETURNING *`,
      [
        req.user.id,
        contract_id,
        client_name,
        hall_name,
        hall_location,
        event_type,
        date,
        amount_earned,
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const updateEvents = async (req, res) => {
  const id = req.params.id;
  const { date } = req.body;
  console.log(req.params);

  try {
    const result = await pool.query(
      `UPDATE events SET date = $1
       WHERE id = $2 RETURNING *`,
      [date, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Event not found." });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

const deleteEvents = async (req, res) => {
  try {
    console.log(req.params.id);
    const result = await pool.query(
      "DELETE FROM events WHERE id = $1 RETURNING *",
      [req.params.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Event not found." });
    }

    res.status(200).json({ message: "Event deletion successful" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

const getStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const now = new Date();
    const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfCurrentMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0
    );
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    const { rows: events } = await pool.query(
      "SELECT * FROM events WHERE user_id = $1",
      [userId]
    );

    const currentMonthEvents = events.filter(
      (e) =>
        new Date(e.date) >= startOfCurrentMonth &&
        new Date(e.date) <= endOfCurrentMonth
    );
    const lastMonthEvents = events.filter(
      (e) =>
        new Date(e.date) >= startOfLastMonth &&
        new Date(e.date) <= endOfLastMonth
    );

    const currentMonthContracts = currentMonthEvents.length;
    const lastMonthContracts = lastMonthEvents.length;

    const currentMonthEarnings = currentMonthEvents.reduce(
      (sum, e) => sum + (Number(e.amount_earned) || 0),
      0
    );
    const lastMonthEarnings = lastMonthEvents.reduce(
      (sum, e) => sum + (Number(e.amount_earned) || 0),
      0
    );

    const upcomingEvents = events.filter((e) => new Date(e.date) > now).length;

    const pendingPayments = events.filter(
      (e) => (e.status || "").toLowerCase() === "pending"
    ).length;

    const venueCount = {};
    events.forEach((e) => {
      const key = e.hall_name || "Unknown";
      venueCount[key] = (venueCount[key] || 0) + 1;
    });

    const topVenue =
      Object.entries(venueCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "";

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
