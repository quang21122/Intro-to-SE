// src/health-and-fitness/local/index.js

import express from 'express';
import cors from 'cors';
import userRoutes from '../api/routes/user.js'; // Adjust path if needed
import exerciseRoutes from '../api/routes/exercise.js'; // Adjust path if needed
import planRoutes from '../api/routes/plan.js'; // Adjust path if needed
import equipmentRoutes from '../api/routes/equipment.js'; // Adjust path if needed
import muscleRoutes from '../api/routes/muscle.js'; // Adjust path if needed
import myPlanRoutes from '../api/routes/myPlan.js'; // Adjust path if needed

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
app.use('/api/exercise', exerciseRoutes); 
app.use('/api/plan', planRoutes);
app.use('/api/equipment', equipmentRoutes);
app.use('/api/muscle', muscleRoutes);
app.use('/api/myPlan', myPlanRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Local server running at http://localhost:${PORT}`);
});
