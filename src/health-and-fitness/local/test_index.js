// src/health-and-fitness/local/index.js

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from '../api/routes/user.js'; // Adjust path if needed

dotenv.config(); // Load environment variables from .env file

// Initialize Express app
const app = express();

// Define CORS options
const corsOptions = {
  origin: 'http://localhost:9000', // Change to your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200,
};

// Use CORS and JSON parsing middleware
app.use(cors(corsOptions)); // Apply CORS middleware
app.use(express.json()); // Parse incoming JSON data

// Route for handling user API requests
app.use('/api/user', userRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Local server running at http://localhost:${PORT}`);
});
