import Event from "../model/Event.model.js";

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8081");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8081");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
