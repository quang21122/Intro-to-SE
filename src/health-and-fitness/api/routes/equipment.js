import equipmentController from "../controllers/equipmentController.js";

export default async function handler(req, res) {
    if (req.originalUrl.startsWith("/api/equipment")) {
        switch (req.method) {
        case "GET":
            return equipmentController.getEquipment(req, res);
        case "POST":
            return equipmentController.createEquipment(req, res);
        case "PUT":
            return equipmentController.updateEquipment(req, res);
        case "DELETE":
            return equipmentController.deleteEquipment(req, res);
        default:
            res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    }
}