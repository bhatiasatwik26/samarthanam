import express from "express";
import { getUserById, sendMail, getLeaderboard } from "../controllers/user.controller.js"; // Import controller

const router = express.Router();

// send mail
router.get("/sendMail", sendMail);

// get leaderboard
router.get("/leaderboard", getLeaderboard);

// Route to get user by ID
router.get("/:id", getUserById);


export default router;
