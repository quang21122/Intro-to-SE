import exerciseController from "../controllers/exerciseController.js";

export default async function handler(req, res) {
  if (req.originalUrl.startsWith("/api/exercise")) {
    const { muscle } = req.query;
    if (req.method === "GET" && muscle) {
      return exerciseController.getExercisesByMuscle(req, res);
    }

    switch (req.method) {
      case "GET":
        return exerciseController.getExercise(req, res);
      case "POST":
        return exerciseController.createExercise(req, res);
      case "PUT":
        return exerciseController.updateExercise(req, res);
      case "DELETE":
        return exerciseController.deleteExercise(req, res);
      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
}
