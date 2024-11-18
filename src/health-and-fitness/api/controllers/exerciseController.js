import exerciseService from '../services/exerciseService.js';

const getExercise = async (req, res) => {
    const { exerciseId } = req.query;
    const exercise = await exerciseService.getExercise(exerciseId);
    
    if (exercise.error) {
        return res.status(exercise.status).json({ error: exercise.error });
    }
    
    res.status(200).json(exercise);
    };

const createExercise = async (req, res) => {
    const newExercise = await exerciseService.createExercise(req.body);
    
    if (newExercise.error) {
        return res.status(newExercise.status).json({ error: newExercise.error });
    }
    
    res.status(201).json(newExercise);
    };

const updateExercise = async (req, res) => {
    const { exerciseId } = req.query;
    const updatedExercise = await exerciseService.updateExercise(exerciseId, req.body);
    
    if (updatedExercise.error) {
        return res.status(updatedExercise.status).json({ error: updatedExercise.error });
    }
    
    res.status(200).json(updatedExercise);
    };

const deleteExercise = async (req, res) => {
    const { exerciseId } = req.query;
    const deletedExercise = await exerciseService.deleteExercise(exerciseId);
    
    if (deletedExercise.error) {
        return res.status(deletedExercise.status).json({ error: deletedExercise.error });
    }
    
    res.status(200).json(deletedExercise);
    };

export default { getExercise, createExercise, updateExercise, deleteExercise };