import { firestoreDb } from '../firebase.js';
import { doc, setDoc, getDoc, updateDoc, deleteDoc, getDocs, collection, query, where } from 'firebase/firestore';

const createExercise = async (data) => {
    const {difficulty, instruction, equipment, image, muscle, name, type, video } = data;
    
    try {
        const query = await getExercise(name);
        if (!query.error) {
            return { error: "Exercise already exists", status: 409 };
        }
        // Get length of exercises collection
        const exercisesCollection = await getDocs(collection(firestoreDb, 'exercises'));
        console.log(exercisesCollection.size);
        // Create a new user ID
        const exerciseId = exercisesCollection.size + 1;
        // Store additional user data in Firestore
        await setDoc(doc(firestoreDb, 'exercises', exerciseId.toString()), {
        difficulty, 
        instruction, 
        equipment, 
        image, 
        muscle, 
        name, 
        type, 
        video,
        createdAt: new Date(),
        });
    
        return { difficulty, instruction, equipment, image, muscle, name, type, video  };
    } catch (error) {
        console.error("Error creating exercise:", error);
        return { error: error.message, status: 500 };
    }
}

const getExercise = async (name) => {
    try {
        // Query Firestore to find the document by name
        const exercisesCollection = collection(firestoreDb, 'exercises');
        const querySnapshot = await getDocs(query(exercisesCollection, where("name", "==", name)));

        if (querySnapshot.empty) {
            return { error: "Exercise not found", status: 404 };
        }

        // Extract the first matching document
        const exerciseDoc = querySnapshot.docs[0];
        return { id: exerciseDoc.id, ...exerciseDoc.data() };
    } catch (error) {
        console.error("Error getting exercise by name:", error);
        return { error: error.message, status: 500 };
    }
}

const updateExercise = async (name, data) => {
    try {
        // Query Firestore to find the document by name
        console.log(name);
        const exercisesCollection = collection(firestoreDb, 'exercises');
        const querySnapshot = await getDocs(query(exercisesCollection, where("name", "==", name)));

        if (querySnapshot.empty) {
            return { error: "Exercise not found", status: 404 };
        }

        // Assuming `name` is unique, update the first matching document
        const exerciseDoc = querySnapshot.docs[0];
        const exerciseId = exerciseDoc.id;
        const newName = data.name;
        // Check if the new name is already taken
        const existingExercise = await getExercise(newName);
        if (existingExercise.error) {
            return { error: existingExercise.error, status: existingExercise.status };
        }
        // Update the document
        await updateDoc(doc(firestoreDb, 'exercises', exerciseId), data);

        return { message: "Exercise updated successfully" };
    } catch (error) {
        console.error("Error updating exercise by name:", error);
        return { error: error.message, status: 500 };
    }
}

const deleteExercise = async (exerciseName) => {
    try {
        // Find id of the exercise to delete
        const exercise = await getExercise(exerciseName);
        if (exercise.error) {
            return { error: exercise.error, status: exercise.status };
        }
        // Delete the exercise document by id
        await deleteDoc(doc(firestoreDb, 'exercises', exercise.id));
        return { message: "Exercise deleted" };
    } catch (error) {
        console.error("Error deleting exercise:", error);
        return { error: error.message, status: 500 };
    }
}

export default{createExercise, getExercise, updateExercise, deleteExercise };