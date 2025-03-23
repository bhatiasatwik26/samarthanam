import User from "../model/User.model.js"; // Adjust path if needed
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

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

        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Server error" });
    }
};


// get leaderboard
export const getLeaderboard = async (req, res) => {
    try {
      const users = await User.find()
        .sort({ pointsForNextRank: -1 }) // Sort by points in descending order
        .select("name rank pointsForNextRank photo"); // Fetch only relevant fields
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Server Error", error });
    }
  };


