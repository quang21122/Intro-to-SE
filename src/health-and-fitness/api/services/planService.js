import { firestoreDb } from '../firebase.js';
import { doc, setDoc, getDoc, updateDoc, deleteDoc, getDocs, collection, query, where, startAfter, orderBy, limit } from 'firebase/firestore';
import exerciseService from './exerciseService.js';
const { getExercise } = exerciseService;
const getPlan = async (id) => {
    try {
        // Query Firestore to find the document by name
        const planDoc = await getDoc(doc(firestoreDb, 'plans', id));
        if (!planDoc.exists()) {
            return { error: "Plan not found", status: 404 };
        }

        return { plan: planDoc.data(), status: 200 };

    } catch (error) {
        console.error("Error getting plan by id:", error);
        return { error: error.message, status: 500 };
    }
}

const getPlansByPage = async (page, pageSize = 6) => {
    try {
        const plansCollection = collection(firestoreDb, 'plans');
        
        // Build initial query with ordering and limit
        let plansQuery = query(
            plansCollection,
            orderBy("name"),
            limit(pageSize)
        );

        // If not first page, get the starting point
        if (page > 1) {
            // Get the last document from the previous page
            const lastVisibleDoc = await getDocs(
                query(
                    plansCollection,
                    orderBy("name"),
                    limit((page - 1) * pageSize)
                )
            );
            
            if (!lastVisibleDoc.empty) {
                const lastDoc = lastVisibleDoc.docs[lastVisibleDoc.docs.length - 1];
                plansQuery = query(
                    plansCollection,
                    orderBy("name"),
                    startAfter(lastDoc),
                    limit(pageSize)
                );
            }
        }

        const querySnapshot = await getDocs(plansQuery);
        
        if (querySnapshot.empty) {
            return [];
        }

        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

    } catch (error) {
        console.error("Error fetching plans by page:", error);
        return [];
    }
}
const createPlan = async (data) => {
    try {
        // Validate the main plan data
        const { name, image, description, days, goal, muscle, equipment,level, planDetails } = data;

        if (!name || !description || !days || !equipment || !muscle || !image || !goal || !level || !Array.isArray(planDetails)) {
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
            const { name, day, exercises } = detail;

            if (!name || !day ||!Array.isArray(exercises)) {
                throw new Error(`Invalid detail for day ${day}`);
            }

            //find exercise id
            const exercisesWithIds = await Promise.all(
                exercises.map(async (exercise) => {
                    const exerciseData = await getExercise(exercise.name); 
                    exercise.id = exerciseData.id || '100'; // Assign ID, use 'default id - 100' if not found
                    return exercise;
                })
            );

            // Remove name from the exercise objects
            const exercisesWithoutName = exercisesWithIds.map(({ name, ...rest }) => rest);

            // Create a document in the "planDetails" subcollection
            const detailRef = doc(collection(firestoreDb, `plans/${planId}/planDetails`));

            return setDoc(detailRef, {
                name,
                day,
                exercises: exercisesWithoutName,
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

const deletePlan = async (id) => {
    try {
        const planRef = doc(firestoreDb, "plans", id);
        const planDoc = await getDoc(planRef);
        if (!planDoc.exists()) {
            return { error: "Plan not found", status: 404 };
        }
        const planDetailsCollection = collection(planRef, "planDetails");
        const planDetailsSnapshot = await getDocs(planDetailsCollection);

        // Xóa từng document trong "planDetails"
        const deleteDetailsPromises = planDetailsSnapshot.docs.map((detailDoc) =>
            deleteDoc(detailDoc.ref)
        );

        await Promise.all(deleteDetailsPromises);

        // Sau khi xóa xong subcollection, xóa document chính
        await deleteDoc(planRef);

        console.log(`Plan with ID ${id} and all its details deleted successfully.`);
        return { success: true, message: `Plan with ID ${id} deleted successfully.` };
    } catch (error) {
        console.error("Error deleting plan:", error.message);
        return { success: false, message: error.message };
    }
};

const updatePlan = async (id, data) => {
    try {
        const planDoc = await getDoc(doc(firestoreDb, 'plans', id));
        if (!planDoc.exists()) {
            return { error: "Plan not found", status: 404 };
        }

        const { name, image, description, days, goal, muscle, equipment, level, planDetails } = data;
        const plan = { name, description, equipment, goal, image, level, muscle, days };

        // Cập nhật tài liệu chính
        await updateDoc(doc(firestoreDb, 'plans', planDoc.id), plan);

        // Cập nhật từng chi tiết của kế hoạch
        const planDetailsPromises = planDetails.map(async (detail) => {
            const { name, day, exercises } = detail;

            const exercisesWithIds = await Promise.all(
                exercises.map(async (exercise) => {
                    const exerciseData = await getExercise(exercise.name); 
                    exercise.id = exerciseData.id || '100'; // Assign ID, use 'default id - 100' if not found
                    return exercise;
                })
            );

            const exercisesWithoutName = exercisesWithIds.map(({ name, ...rest }) => rest);

            const planDetailsCollection = collection(firestoreDb, `plans/${planDoc.id}/planDetails`);
            const querySnapshot = await getDocs(query(planDetailsCollection, where("day", "==", day)));

            if (querySnapshot.empty) {
                console.warn(`Plan detail for day ${day} not found. Skipping update.`);
                return;
            }

            const detailDoc = querySnapshot.docs[0];
            return updateDoc(doc(firestoreDb, `plans/${planDoc.id}/planDetails`, detailDoc.id), {
                name,
                day,
                exercises: exercisesWithoutName,
            });
        });

        await Promise.all(planDetailsPromises);

        return { message: "Exercise updated successfully", id: planDoc.id };
    } catch (error) {
        console.error("Error updating plan by id:", error);
        return { error: error.message, status: 500 };
    }
}

export default { createPlan, deletePlan, getPlan, updatePlan, getPlansByPage };