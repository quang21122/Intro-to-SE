import userRoutes from "./routes/user.js";
import cors from "cors";

// Middleware to enable CORS
export const corsMiddleware = cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
});

// Main entry function
export default function handler(req, res) {
    // Handle OPTIONS requests first
    if (req.method === "OPTIONS") {
        corsMiddleware(req, res, () => res.status(200).end());
        return;
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
