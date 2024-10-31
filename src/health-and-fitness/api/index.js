import userRoutes from "./routes/user.js";

// Main entry function
export default function handler(req, res) {
    // Handle user routes
    if (req.url.startsWith("/user")) {
        return userRoutes(req, res);
    }

    // Handle OPTIONS requests
    if (req.method === "OPTIONS") {
        res.status(200).end();
    }

    // Handle unsupported methods
    if (req.method !== "GET" && req.method !== "POST" && req.method !== "PUT" && req.method !== "DELETE") {
        res.status(405).end();
    }
}
