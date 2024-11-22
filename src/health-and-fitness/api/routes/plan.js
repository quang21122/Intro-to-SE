import planController from "../controllers/planController.js";

export default async function handler(req, res) {
    if (true) {
        switch (req.method) {
        case 'POST':
            return planController.createPlan(req, res);
        case 'DELETE':
            return planController.deletePlan(req, res);
        default:
            res.setHeader('Allow', ['POST', 'DELETE']);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    }
}