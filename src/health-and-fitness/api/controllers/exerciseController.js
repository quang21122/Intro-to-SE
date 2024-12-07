import exerciseService from "../services/exerciseService.js";

const getExercise = async (req, res) => {
  const { name, page } = req.query;

  if (!name && !page) {
    return res
      .status(400)
      .json({ error: "Either 'name' or 'page' query parameter is required" });
  }

  try {
    if (name) {
      // Handle query by name
      const exercise = await exerciseService.getExercise(name);

      if (!exercise) {
        return res.status(404).json({ error: "Exercise not found" });
      }

      return res.status(200).json({ data: exercise });
    }

    if (page) {
      // Validate page number
      const pageNum = parseInt(page, 10);
      if (isNaN(pageNum) || pageNum < 1) {
        return res.status(400).json({ error: "Invalid page number" });
      }

      // Handle pagination
      const exercises = await exerciseService.getExercisesByPage(pageNum);

      if (!exercises || exercises.length === 0) {
        return res
          .status(404)
          .json({ error: "No exercises found for the specified page" });
      }

      return res.status(200).json({
        data: exercises,
        page: pageNum,
      });
    }
  } catch (error) {
    console.error("Error in getExercise:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const createExercise = async (req, res) => {
  console.log(req.body);
  const newExercise = await exerciseService.createExercise(req.body);

  if (newExercise.error) {
    return res.status(newExercise.status).json({ error: newExercise.error });
  }

  res.status(201).json(newExercise);
};

const updateExercise = async (req, res) => {
  const { name } = req.query;
  const { body } = req;

  if (!name) {
    return res.status(400).json({ error: "name is required" });
  }

  const updatedExercise = await exerciseService.updateExercise(name, body);

  if (updatedExercise.error) {
    return res
      .status(updatedExercise.status)
      .json({ error: updatedExercise.error });
  }

  res.status(200).json(updatedExercise);
};

const deleteExercise = async (req, res) => {
  const { name } = req.query;
  const deletedExercise = await exerciseService.deleteExercise(name);

  if (deletedExercise.error) {
    return res
      .status(deletedExercise.status)
      .json({ error: deletedExercise.error });
  }

  res.status(200).json(deletedExercise);
};

const getExercisesByMuscle = async (req, res) => {
  const { muscle } = req.query;

  if (!muscle) {
    return res
      .status(400)
      .json({ error: "Muscle query parameter is required" });
  }

  try {
    const exercises = await exerciseService.getExercisesByMuscle(muscle);

    if (!exercises || exercises.length === 0) {
      return res
        .status(404)
        .json({ error: "No exercises found for the specified muscle" });
    }

    return res.status(200).json({ data: exercises });
  } catch (error) {
    console.error("Error in getExercisesByMuscle:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getExercisesByMuscles = async (req, res) => {
  const { muscles } = req.query;

  if (!muscles) {
    return res
      .status(400)
      .json({ error: "Muscles query parameter is required" });
  }

  try {
    // Convert muscles string (comma-separated) into an array of muscle IDs
    const muscleIds = muscles.split(",");

    // Call the service to get exercises by multiple muscles
    const exercises = await exerciseService.getExercisesByMuscles(muscleIds);

    if (!exercises || exercises.length === 0) {
      return res
        .status(404)
        .json({ error: "No exercises found for the specified muscles" });
    }

    return res.status(200).json({ data: exercises });
  } catch (error) {
    console.error("Error in getExercisesByMuscles:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getExercisesByEquipments = async (req, res) => {
  const { equipments } = req.query;

  if (!equipments) {
    return res
      .status(400)
      .json({ error: "Equipments query parameter is required" });
  }

  try {
    // Convert equipments string (comma-separated) into an array of equipment IDs
    const equipmentIds = equipments.split(",");

    // Call the service to get exercises by multiple equipments
    const exercises = await exerciseService.getExercisesByEquipments(
      equipmentIds
    );

    if (!exercises || exercises.length === 0) {
      return res
        .status(404)
        .json({ error: "No exercises found for the specified equipments" });
    }

    return res.status(200).json({ data: exercises });
  } catch (error) {
    console.error("Error in getExercisesByEquipments:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getFilteredExercisesHandler = async (req, res) => {
  const { muscles, equipments, page, name } = req.query;

  if (!muscles && !equipments && !page && !name) {
    return res.status(400).json({
      error:
        "At least one query parameter (muscles, equipments, page, or name) is required",
    });
  }

  try {
    const muscleIds = muscles ? muscles.split(",") : [];
    const equipmentIds = equipments ? equipments.split(",") : [];
    const pageNum = page ? parseInt(page, 10) : null;

    // Validate page number if provided
    if (page && (isNaN(pageNum) || pageNum < 1)) {
      return res.status(400).json({ error: "Invalid page number" });
    }

    const filters = {
      muscles: muscleIds,
      equipments: equipmentIds,
      page: pageNum,
      name,
    };

    const exercises = await exerciseService.getFilteredExercises(filters);

    if (!exercises || exercises.length === 0) {
      return res
        .status(404)
        .json({ error: "No exercises found for the specified filters" });
    }

    return res.status(200).json({
      data: exercises,
      ...(pageNum && { page: pageNum }), // Include page if pagination is used
    });
  } catch (error) {
    console.error("Error in getFilteredExercisesHandler:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default {
  getExercise,
  createExercise,
  updateExercise,
  deleteExercise,
  getExercisesByMuscle,
  getExercisesByMuscles,
  getExercisesByEquipments,
  getFilteredExercisesHandler,
};
