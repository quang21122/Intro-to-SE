import { firestoreDb } from '../firebase.js';
import { doc, setDoc, getDoc, updateDoc, deleteDoc, getDocs, collection, query, where } from 'firebase/firestore';

const createMuscle = async (data) => {
    const { image, name } = data;
    console.log(data);

    // Helper function to generate a random alphanumeric string
    const generateId = (length) => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    };

    try {
        const query = await getDoc(doc(firestoreDb, 'muscles', name));
        if (query.exists()) {
            return { error: "Muscles already exists", status: 400 };
        }

        // Get length of Muscles collection
        const MusclesCollection = await getDocs(collection(firestoreDb, 'muscles'));
        console.log(MusclesCollection.size);

        // Create a new Muscles ID like this Mh5XnJePUHF4EV8S9o1F
        const MusclesId = generateId(20);
        console.log("muscle id: ", MusclesId);

        // Prepare the Muscles data
        const MusclesData = {
            name,
            createdAt: new Date(),
        };

        if (image) {
            MusclesData.image = image;
        }

        // Store additional Muscles data in Firestore
        await setDoc(doc(firestoreDb, 'muscles', MusclesId), MusclesData);

        return { description: "Muscles created successfully", image, name };
    } catch (error) {
        console.error("Error creating Muscles:", error);
        return { error: error.message, status: 500 };
    }
};

const getMuscle = async (id) => {
    try {
        // Query Firestore to find the document by name
        const MusclesDoc = await getDoc(doc(firestoreDb, 'muscles', id));
        if (!MusclesDoc.exists()) {
            return { error: "Muscles not found", status: 404 };
        }
        return { user: MusclesDoc.data(), status: 200 };

    } catch (error) {
        console.error("Error getting Muscles by id:", error);
        return { error: error.message, status: 500 };
    }
}

const updateMuscle = async (id, data) => {
    try {
        // Query Firestore to find the document by name
        const muscleDoc = await getDoc(doc(firestoreDb, 'muscles', id));
        if (!muscleDoc.exists()) {
            return { error: "Muscles not found", status: 404 };
        }
        await updateDoc(doc(firestoreDb, 'muscles', muscleDoc.id), data);
        return { id: muscleDoc.id, ...data };
    } catch (error) {
        console.error("Error updating Muscles by id:", error);
        return { error: error.message, status: 500 };
    }
};

const deleteMuscle = async (id) => {
    try {
        // Query Firestore to find the document by name
        const muscleDoc = await getDoc(doc(firestoreDb, 'muscles', id));
        if (!muscleDoc.exists()) {
            return { error: "Muscles not found", status: 404 };
        }
        await deleteDoc(doc(firestoreDb, 'muscles', muscleDoc.id));
        return { id: muscleDoc.id, ...muscleDoc.data() };
    } catch (error) {
        console.error("Error deleting Muscles by id:", error);
        return { error: error.message, status: 500 };
    }
};
export default { createMuscle, getMuscle, updateMuscle, deleteMuscle };