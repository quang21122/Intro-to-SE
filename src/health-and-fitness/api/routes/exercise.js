import exerciseController from "../controllers/exerciseController.js";

export default async function handler(req, res) {
  if (req.originalUrl.startsWith("/api/exercise")) {
    if (req.method === "GET") {
      return exerciseController.getFilteredExercisesHandler(req, res);
    }

    switch (req.method) {
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
