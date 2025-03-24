import User from "../model/User.model.js"; // Adjust path if needed
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

// get users details by id
export const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const user = await User.findById(id).select("-password"); // Exclude password field
    console.log(user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
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

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getLeaderboard = async (req, res) => {
  try {
    const topUsers = await User.find()
      .sort({ currPoints: -1 })
      .limit(10)
      .select("name currPoints rank")
      .lean();

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

    res.status(200).json(
      topUsers.map((user, index) => ({
        position: index + 1,
        name: user.name,
        score: user.currPoints,
        rank: user.rank,
      }))
    );
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
