import userController from "../controllers/userController";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return userController.getUser(req, res);
    case "POST":
      return userController.createUser(req, res);
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
