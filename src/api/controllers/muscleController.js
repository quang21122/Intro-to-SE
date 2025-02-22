import muscleService from "../services/muscleService.js";

const getAllMuscles = async (req, res) => {
  const muscles = await muscleService.getAllMuscles();

  if (muscles.error) {
    return res.status(muscles.status).json({ error: muscles.error });
  }

  res.status(200).json(muscles);
};

const getMuscle = async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Muscle id is required" });
  }

  const muscle = await muscleService.getMuscle(id);

  if (muscle.error) {
    return res.status(muscle.status).json({ error: muscle.error });
  }

  res.status(200).json(muscle);
};

const createMuscle = async (req, res) => {
  const newMuscle = await muscleService.createMuscle(req.body);

  if (newMuscle.error) {
    return res.status(newMuscle.status).json({ error: newMuscle.error });
  }

  res.status(201).json(newMuscle);
};

const updateMuscle = async (req, res) => {
  const { id } = req.query;
  const { body } = req;

  if (!id) {
    return res.status(400).json({ error: "id is required" });
  }

  const updatedMuscle = await muscleService.updateMuscle(id, body);

  if (updatedMuscle.error) {
    return res
      .status(updatedMuscle.status)
      .json({ error: updatedMuscle.error });
  }

  res.status(200).json(updatedMuscle);
};

const deleteMuscle = async (req, res) => {
  const { id } = req.query;
  const deletedMuscle = await muscleService.deleteMuscle(id);

  if (deletedMuscle.error) {
    return res
      .status(deletedMuscle.status)
      .json({ error: deletedMuscle.error });
  }

  res.status(200).json(deletedMuscle);
};

export default {
  getAllMuscles,
  getMuscle,
  createMuscle,
  updateMuscle,
  deleteMuscle,
};
