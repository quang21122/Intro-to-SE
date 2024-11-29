import exerciseService from '../services/exerciseService.js';

const getExercise = async (req, res) => {
    const { name } = req.query;

    if (!name) {
        return res.status(400).json({ error: "Exercise name is required" });
    }

    const exercise = await exerciseService.getExercise(name);

    if (exercise.error) {
        return res.status(exercise.status).json({ error: exercise.error });
    }

    res.status(200).json(exercise);
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
        return res.status(updatedExercise.status).json({ error: updatedExercise.error });
    }

    res.status(200).json(updatedExercise);
};

const deleteExercise = async (req, res) => {
    const { name } = req.query;
    const deletedExercise = await exerciseService.deleteExercise(name);
    
    if (deletedExercise.error) {
        return res.status(deletedExercise.status).json({ error: deletedExercise.error });
    }
    
    res.status(200).json(deletedExercise);
    };

export default { getExercise, createExercise, updateExercise, deleteExercise };