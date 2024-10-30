import userRoutes from "./routes/user.js";

// Main entry function
export default function handler(req, res) {
    // Check the URL path and route accordingly
    if (req.url.startsWith("/api/user")) {
        return userRoutes(req, res);
    }

    // 404 for any other routes not defined
    res.status(404).json({ error: "Route not found" });
}
