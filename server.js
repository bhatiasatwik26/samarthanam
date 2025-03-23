// server.js

import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import connectDB from './config/db.config.js';
import socketConfig from './config/socket.config.js';// Import socket configuration
import userRoutes from "./routes/user.route.js";
import eventRoutes from "./routes/event.route.js";
import emailRoutes from "./routes/email.routes.js";

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Initialize Express app
const app = express();

// Create HTTP server
const server = http.createServer(app);  // here i wraps express server inside http

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Initialize WebSocket
socketConfig(server);

// Routes 

app.use("/api/user", userRoutes); // user routes
app.use("/api/event", eventRoutes);    // event route
app.use("/api/email", emailRoutes); // email route

app.get('/', (req, res) => {
    res.send('API is running...');
});


// Set up the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {         // using server.listen instead of app.listen to support socket.io
    console.log(`Server running on port ${PORT}`);
});