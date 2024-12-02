import planService from "../services/planService.js";

const createPlan = async (req, res) => {
  const newPlan = await planService.createPlan(req.body);

  if (newPlan.error) {
    return res.status(newPlan.status).json({ error: newPlan.error });
  }

  res.status(201).json(newPlan);
};

const deletePlan = async (req, res) => {
  const { id } = req.query;
  const deletedPlan = await planService.deletePlan(id);

  if (deletedPlan.error) {
    return res.status(deletedPlan.status).json({ error: deletedPlan.error });
  }

  res.status(200).json(deletedPlan);
};

const getPlan = async (req, res) => {
  const { id } = req.query;
  const plan = await planService.getPlan(id);

  if (plan.error) {
    return res.status(plan.status).json({ error: plan.error });
  }

  res.status(200).json(plan);
}

const updatePlan = async (req, res) => {
  const { id } = req.query;
  const updatedPlan = await planService.updatePlan(id, req.body);

  if (updatedPlan.error) {
    return res.status(updatedPlan.status).json({ error: updatedPlan.error });
  }

  res.status(200).json(updatedPlan);
}

export default { createPlan, deletePlan, getPlan, updatePlan };