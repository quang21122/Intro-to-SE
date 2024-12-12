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
  const {id, page} = req.query;
  if (!id && !page) {
    return res.status(400).json({ error: "Either 'id' or 'page' query parameter is required" });
  }
  try {
    if (id) {
      // Handle query by id
      const plan = await planService.getPlan(id);
      if (!plan) {
        return res.status(404).json({ error: "Plan not found" });
      }
      return res.status(200).json({ data: plan });
    }
    if (page) {
      // Validate page number
      const pageNum = parseInt(page, 10);
      if (isNaN(pageNum) || pageNum < 1) {
        return res.status(400).json({ error: "Invalid page number" });
      }
      // Handle pagination
      const plans = await planService.getPlansByPage(pageNum);
      if (!plans || plans.length === 0) {
        return res.status(404).json({ error: "No plans found for the specified page" });
      }
      return res.status(200).json({ data: plans, page: pageNum });
    }
  }
  catch (error) {
    console.log("Error in getPlan:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
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