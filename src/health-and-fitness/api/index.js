import userRoutes from "./routes/user.js";
import cors from "cors";

// Middleware to enable CORS
export const corsMiddleware = cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
});

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

    // Enable CORS for other requests
    corsMiddleware(req, res, () => {
        // Handle routes
        if (req.url.startsWith("/api/user")) {
            return userRoutes(req, res);
        }

        // Handle unsupported methods
        if (!["GET", "POST", "PUT", "DELETE"].includes(req.method)) {
            return res.status(405).end();
        }

        // If no matching route is found, return a 404
        res.status(404).end();
    });
}
