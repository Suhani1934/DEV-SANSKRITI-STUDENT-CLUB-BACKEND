const Event = require("../models/Event");

// Create new event
exports.createEvent = async (req, res) => {
  try {
    const { name, date } = req.body;
    const event = new Event({ name, date });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    console.error("[CREATE EVENT ERROR]", err);
    res.status(500).json({ error: "Failed to create event" });
  }
};

// Update event
exports.updateEvent = async (req, res) => {
  const { id } = req.params;
  const { name, date } = req.body;

  try {
    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ error: "Event not found" });

    event.name = name || event.name;
    event.date = date || event.date;
    await event.save();

    res.json(event);
  } catch (err) {
    console.error("[UPDATE EVENT ERROR]", err);
    res.status(500).json({ error: "Failed to update event" });
  }
};

// Get all upcoming events
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.status(200).json(events);
  } catch (err) {
    console.error("[GET EVENTS ERROR]", err);
    res.status(500).json({ error: "Failed to fetch events" });
  }
};

// Delete event
exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    await Event.findByIdAndDelete(id);
    res.json({ message: "Event deleted" });
  } catch (err) {
    console.error("[DELETE EVENT ERROR]", err);
    res.status(500).json({ error: "Failed to delete event" });
  }
};
