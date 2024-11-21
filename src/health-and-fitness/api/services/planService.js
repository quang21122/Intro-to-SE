import { firestoreDb } from '../firebase.js';
import { doc, setDoc, getDoc, updateDoc, deleteDoc, getDocs, collection, query, where } from 'firebase/firestore';


const createPlan = async (data) => {
    try {
        // Validate the main plan data
        const { name, description, equipment, goal, image, level, muscle, days, planDetails } = data;

        if (!name || !description || !goal || !level || !muscle || !Array.isArray(planDetails)) {
            throw new Error("Invalid plan data. Ensure all required fields are provided.");
        }

        // Create the main plan document
        const planRef = doc(collection(firestoreDb, "plans"));
        const planId = planRef.id;

        const plan = {
            name,
            description,
            equipment,
            goal,
            image,
            level,
            muscle,
            days,
            createdAt: new Date().toISOString(),
        };

        await setDoc(planRef, plan);

        // Add plan details
        const planDetailsPromises = planDetails.map(async (detail) => {
            const { day, exercises } = detail;

            if (!day || !Array.isArray(exercises)) {
                throw new Error(`Invalid detail for day ${day}`);
            }

            // Create a document in the "planDetails" subcollection
            const detailRef = doc(collection(firestoreDb, `plans/${planId}/planDetails`));

            return setDoc(detailRef, {
                day,
                exercises,
            });
        });

        await Promise.all(planDetailsPromises);

        console.log("Plan and plan details created successfully.");
        return { success: true, planId };
    } catch (error) {
        console.error("Error creating plan:", error.message);
        return { success: false, message: error.message };
    }
};

const deletePlan = async (name) => {
    try {
        // Query Firestore to find the document by name
        const plansCollection = collection(firestoreDb, 'plans');
        const querySnapshot = await getDocs(query(plansCollection, where("name", "==", name)));

        if (querySnapshot.empty) {
            return { error: "Plan not found", status: 404 };
        }

        // Extract the first matching document
        const planDoc = querySnapshot.docs[0];
        await deleteDoc(doc(firestoreDb, 'plans', planDoc.id));
        return { id: planDoc.id, ...planDoc.data() };
    } catch (error) {
        console.error("Error deleting plan by name:", error);
        return { error: error.message, status: 500 };
    }
}

export default { createPlan, deletePlan };