// models/Event.js
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String },
  photos: { type: [String], default: [] },
  geographicalLocation: {
    type: { type: String, default: "Point" },
    coordinates: { type: [Number], required: true },
  },
  reviews: [{ type: String }],
  volunteersAssigned: [
    {
      volunteerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      taskName: { type: String, required: true },
      status: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending",
      },
    },
  ],
});

const Event = mongoose.model("Event", eventSchema);
export default Event;
