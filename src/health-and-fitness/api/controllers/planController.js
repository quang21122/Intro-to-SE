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
  if (!id){
    return res.status(400).json({ error: "id is required" });
  }
  const deletedPlan = await planService.deletePlan(id);

  if (deletedPlan.error) {
    return res.status(deletedPlan.status).json({ error: deletedPlan.error });
  }

  res.status(200).json(deletedPlan);
};

const getPlan = async (req, res) => {
  const { id, page, search, muscles, equipments, daysList, levels, name } = req.query;
  if (!id && !page && !search && !muscles && !equipments && !daysList && !levels && !name) {
    return res.status(400).json({ error: "Either 'id', 'page', 'search' or filter elements query parameter is required" });
  }
  try {
    if (search) {
      // Handle query by search
      const plans = await planService.searchPlans(search);
      if (!plans || plans.length === 0) {
        return res.status(404).json({ error: "No plans found from search" });
      }
      return res.status(200).json({ data: plans });
    }

    if (id) {
      // Handle query by id
      const plan = await planService.getPlan(id);
      if (!plan) {
        return res.status(404).json({ error: "Plan not found" });
      }
      return res.status(200).json({ data: plan });
    }

    if (muscles || equipments || daysList || levels || name) {
      //Handle filter
      if (!muscles && !equipments && !page && !name && !daysList && !levels) {
        return res.status(400).json({
          error:
            "At least one query parameter (muscles, equipments, page, name, daysList, levels) is required",
        });
      }
    
        const muscleNames = muscles ? muscles.split(",") : [];
        const equipmentNames = equipments ? equipments.split(",") : [];
        const days = daysList ? daysList.split(",") : [];
        const multipleLevels = levels ? levels.split(",") : [];
        const pageNum = page ? parseInt(page, 10) : null;

        // Validate page number if provided
        if (page && (isNaN(pageNum) || pageNum < 1)) {
          return res.status(400).json({ error: "Invalid page number" });
        }

        const filters = {
          muscles: muscleNames,
          equipments: equipmentNames,
          daysList: days,
          levels: multipleLevels,
          page: pageNum,
          name,
        };

        const plans = await planService.getFilteredPlans(filters);

        if (!plans || plans.length === 0) {
          return res
            .status(404)
            .json({ error: "No plans found for the specified filters" });
        }

        return res.status(200).json({
          data: plans,
          ...(pageNum && { page: pageNum }), // Include page if pagination is used
        });
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
  if (!id){
    return res.status(400).json({ error: "id is required" });
  }
  const updatedPlan = await planService.updatePlan(id, req.body);

  if (updatedPlan.error) {
    return res.status(updatedPlan.status).json({ error: updatedPlan.error });
  }

  res.status(200).json(updatedPlan);
}

export default { createPlan, deletePlan, getPlan, updatePlan };