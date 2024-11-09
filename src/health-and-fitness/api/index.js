import userRoutes from "./routes/user.js";
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config({ path: '../../.env.local' });

// Create cors middleware with specific options
const corsOptions = {
  origin: 'http://localhost:9000', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Enable credentials (cookies, authorization headers, etc)
  optionsSuccessStatus: 200
};

export default async function handler(req, res) {
    try {
        // Enable CORS with options
        if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
            const corsMiddleware = cors(corsOptions);
            await new Promise((resolve, reject) => {
            corsMiddleware(req, res, (err) => {
                if (err) {
                reject(err);
                } else {
                resolve();
                }
            });
            });
        }

        // Handle OPTIONS request for CORS preflight
        if (req.method === 'OPTIONS') {
            return res.status(200).end();
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