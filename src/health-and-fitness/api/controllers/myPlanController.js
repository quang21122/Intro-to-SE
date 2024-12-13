import myPlanService from "../services/myPlanService.js";

const createMyPlan = async (req, res) => {
  const newMyPlan = await myPlanService.createMyPlan(req.body);
  if (newMyPlan.error) {
    return res.status(newMyPlan.status).json({ error: newMyPlan.error });
  }
  res.status(201).json(newMyPlan);
};

const deleteMyPlan = async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: "id is required" });
  }
  const deletedMyPlan = await myPlanService.deleteMyPlan(id);

  if (deletedMyPlan.error) {
    return res.status(deletedMyPlan.status).json({ error: deletedMyPlan.error });
  }

  res.status(200).json(deletedMyPlan);
};

const updateMyPlan = async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: "id is required" });
  }
  const updatedMyPlan = await myPlanService.updateMyPlan(id, req.body);

  if (updatedMyPlan.error) {
    return res.status(updatedMyPlan.status).json({ error: updatedMyPlan.error });
  }

  res.status(200).json(updatedMyPlan);
}

const getMyPlan = async (req, res) => {
    const { id } = req.query;
    if (!id ) {
      return res.status(400).json({ error: "id is required" });
    }
    try {
      if (id) {
        // Handle query by id
        const myPlan = await myPlanService.getPlan(id);
        if (!myPlan) {
          return res.status(404).json({ error: "My plan not found" });
        }
        return res.status(200).json({ data: myPlan });
      }
    }
     catch (error) {
      console.log("Error in getPlan:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

export default { createMyPlan, deleteMyPlan, getMyPlan, updateMyPlan };