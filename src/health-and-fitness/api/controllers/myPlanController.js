import e from "express";
import myPlanService from "../services/myPlanService.js";

const createMyPlan = async (req, res) => {
  const { uid, originalPlanId } = req.query;
  if (!uid) {
    return res.status(400).json({ error: "uid is required" });
  }
  try {
    if (originalPlanId) {
      // Handle create my plan through add plan
      const newMyPlan = await myPlanService.createMyPlanThroughAddPlan(uid, originalPlanId);

      if (newMyPlan.error) {
        return res.status(newMyPlan.status).json({ error: newMyPlan.error });
      }
      return res.status(201).json(newMyPlan);
    }
    else {
      // Handle create my plan through button create my plan
      const newMyPlan = await myPlanService.createMyPlan(uid, req.body);

      if (newMyPlan.error) {
        return res.status(newMyPlan.status).json({ error: newMyPlan.error });
      }
      return res.status(201).json(newMyPlan);
    }
  }
  catch (error) {
    console.log("Error in create my plan:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const deleteMyPlan = async (req, res) => {
  const { uid, id } = req.query;
  if (!uid) {
    return res.status(400).json({ error: "uid is required" });
  }
  if (!id) {
    return res.status(400).json({ error: "id is required" });
  }

  const deletedMyPlan = await myPlanService.deleteMyPlan(uid, id);

  if (deletedMyPlan.error) {
    return res.status(deletedMyPlan.status).json({ error: deletedMyPlan.error });
  }

  res.status(200).json(deletedMyPlan);
};

const updateMyPlan = async (req, res) => {
  const { uid, id } = req.query;
  if (!uid) {
    return res.status(400).json({ error: "uid is required" });
  }
  if (!id) {
    return res.status(400).json({ error: "id is required" });
  }

  const updatedMyPlan = await myPlanService.updateMyPlan(uid, id, req.body);

  if (updatedMyPlan.error) {
    return res.status(updatedMyPlan.status).json({ error: updatedMyPlan.error });
  }

  res.status(200).json(updatedMyPlan);
}

const getMyPlan = async (req, res) => {
  const { uid, id } = req.query;
  if (!uid) {
    return res.status(400).json({ error: "uid is required" });
  }

  try {
    if (id) {
      // Handle query by id
      console.log(id);
      const myPlan = await myPlanService.getMyPlan(uid, id);
      if (!myPlan) {
        return res.status(404).json({ error: "My plan not found" });
      }
      return res.status(200).json({ data: myPlan });
    }
    else {
      // Handle query all
      const myPlans = await myPlanService.getAllMyPlans(uid);
      if (!myPlans) {
        return res.status(404).json({ error: "My plans not found" });
      }
      return res.status(200).json({ data: myPlans });
    }
  }
  catch (error) {
    console.log("Error in getPlan:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export default { createMyPlan, deleteMyPlan, getMyPlan, updateMyPlan };