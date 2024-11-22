import planService from "../services/planService.js";

const createPlan = async (req, res) => {
  const newPlan = await planService.createPlan(req.body);

  if (newPlan.error) {
    return res.status(newPlan.status).json({ error: newPlan.error });
  }

  res.status(201).json(newPlan);
};

const deletePlan = async (req, res) => {
    const { name } = req.query;
    const deletedPlan = await planService.deletePlan(name);
    
    if (deletedPlan.error) {
        return res.status(deletedPlan.status).json({ error: deletedPlan.error });
    }
    
    res.status(200).json(deletedPlan);
};

export default { createPlan, deletePlan };