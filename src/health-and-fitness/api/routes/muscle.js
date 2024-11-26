import muscleController from "../controllers/muscleController.js";

export default async function handler(req, res) {
    if (true) {
        switch (req.method) {
        case "GET":
            return muscleController.getMuscle(req, res);
        case "POST":
            return muscleController.createMuscle(req, res);
        case "PUT":
            return muscleController.updateMuscle(req, res);
        case "DELETE":
            return muscleController.deleteMuscle(req, res);
        default:
            res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    }
}