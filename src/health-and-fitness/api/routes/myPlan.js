import myPlanController from "../controllers/myPlanController.js";

export default async function handler(req, res) {
    if (req.originalUrl.startsWith("/api/myPlan")) {
        switch (req.method) {
            case 'GET':
                return myPlanController.getMyPlan(req, res);
            case 'POST':
                return myPlanController.createMyPlan(req, res);
            case 'PUT':
                return myPlanController.updateMyPlan(req, res);
            case 'DELETE':
                return myPlanController.deleteMyPlan(req, res);
            default:
                res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
                return res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    }
}