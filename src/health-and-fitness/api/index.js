import userRoutes from "./routes/user.js";
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config({ path: '../../.env.local' }); // Adjust the path if needed

// Define CORS options
const corsOptions = {
  origin: 'http://localhost:9000', // Update to match your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware to apply CORS with options
const corsMiddleware = cors(corsOptions);

export default async function handler(req, res) {
    try {
        // Always apply CORS for OPTIONS requests (preflight)
        if (req.method === 'OPTIONS') {
            return res.status(200).end();
        }

        // Apply CORS only in development for non-OPTIONS requests
        if (process.env.NODE_ENV === 'development') {
            await new Promise((resolve, reject) => {
                corsMiddleware(req, res, (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });
        }

        // Route handling for /api/user
        if (req.url.startsWith('/api/user')) {
            return userRoutes(req, res);
        }

        // Handle unsupported methods
        if (!['GET', 'POST', 'PUT', 'DELETE'].includes(req.method)) {
            return res.status(405).json({ message: 'Method not allowed' });
        }

        // 404 for unmatched routes
        return res.status(404).json({ message: 'Not found' });
    } catch (error) {
        console.error('API error:', error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
}
