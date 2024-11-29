import planController from "../controllers/planController.js";

export default async function handler(req, res) {
    if (req.originalUrl.startsWith("/api/plan")) {
        switch (req.method) {
            case 'GET':
                return planController.getPlan(req, res);
            case 'POST':
                return planController.createPlan(req, res);
            case 'PUT':
                return planController.updatePlan(req, res);
            case 'DELETE':
                return planController.deletePlan(req, res);
            default:
                res.setHeader('Allow', ['POST', 'DELETE']);
                return res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    }
}