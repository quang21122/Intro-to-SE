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
    // Enable CORS
    corsMiddleware(req, res, () => {
        // Handle routes
        if (req.url.startsWith("/api/user")) {
            userRoutes(req, res);
        }
    });

    // Handle OPTIONS requests
    if (req.method === "OPTIONS") {
        res.status(200).end();
    }

    // Handle unsupported methods
    if (req.method !== "GET" && req.method !== "POST" && req.method !== "PUT" && req.method !== "DELETE") {
        res.status(405).end();
    }
    
    res.status(500).end();
}
