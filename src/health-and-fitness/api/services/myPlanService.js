import { firestoreDb } from '../firebase.js';
import { doc, setDoc, getDoc, updateDoc, deleteDoc, getDocs, collection, query, where, startAfter, orderBy, limit } from 'firebase/firestore';
import exerciseService from './exerciseService.js';
import { useAuth } from "../../src/hooks/useAuth.ts";
import userService from './userService.js';
const { getExercise } = exerciseService;
const { user } = useAuth();
const { getUser } = userService;

const createMyPlan = async (data) => {
    try {
        // Validate the main plan data
        const { name, image, description, days, goal, muscle, equipment, level, planDetails } = data;

        if (!name || !description || !days || !equipment || !muscle || !image || !goal || !level || !Array.isArray(planDetails)) {
            throw new Error("Invalid plan data. Ensure all required fields are provided.");
        }

        // Create the main plan document
        const planRef = doc(collection(firestoreDb, `users/2UgtzYLA7wQjEFaB7szjqAkPG3n2/myPlans`));
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
            const { name, day, exercises, startTime } = detail;

            if (!day || !Array.isArray(exercises)) {
                throw new Error(`Invalid detail for day ${day}`);
            }

            //find exercise id
            const exercisesWithIds = await Promise.all(
                exercises.map(async (exercise) => {
                    const exerciseData = await getExercise(exercise.name);
                    if (exerciseData.error) {
                        throw new Error(exerciseData.error);
                    }
                    exercise.id = exerciseData.id; // Assign ID, use 'default id - Barbell Stiff-Leg Deadlift' if not found
                    return exercise;
                })
            );

            // Remove name from the exercise objects
            const exercisesWithoutName = exercisesWithIds.map(({ name, ...rest }) => rest);

            // Create a document in the "planDetails" subcollection
            const detailRef = doc(collection(firestoreDb, `users/2UgtzYLA7wQjEFaB7szjqAkPG3n2/myPlans/${planId}/myPlanDetails`));

            return setDoc(detailRef, {
                name: name || "",
                day,
                exercises: exercisesWithoutName,
                startTime: startTime || ""
            });
        });

        await Promise.all(planDetailsPromises);

        console.log("My plan and my plan details created successfully.");
        return { success: true, planId };
    } catch (error) {
        console.error("Error creating my plan:", error.message);
        return { success: false, message: error.message };
    }
};

const updateMyPlan = async (id, data) => {
    try {
        const planDoc = await getDoc(doc(firestoreDb, `users/2UgtzYLA7wQjEFaB7szjqAkPG3n2/myPlans`, id));
        if (!planDoc.exists()) {
            return { error: "My plan not found", status: 404 };
        }

        const { name, image, description, days, goal, muscle, equipment, level, planDetails } = data;
        const plan = { name, description, equipment, goal, image, level, muscle, days };

        // Cập nhật tài liệu chính
        await updateDoc(doc(firestoreDb, `users/2UgtzYLA7wQjEFaB7szjqAkPG3n2/myPlans`, planDoc.id), plan);

        // Cập nhật từng chi tiết của kế hoạch
        const planDetailsPromises = planDetails.map(async (detail) => {
            const { name, day, exercises, startTime } = detail;

            const exercisesWithIds = await Promise.all(
                exercises.map(async (exercise) => {
                    const exerciseData = await getExercise(exercise.name);
                    if (exerciseData.error) {
                        throw new Error(exerciseData.error);
                    }
                    exercise.id = exerciseData.id
                    return exercise;
                })
            );

            const exercisesWithoutName = exercisesWithIds.map(({ name, ...rest }) => rest);

            const planDetailsCollection = collection(firestoreDb, `users/2UgtzYLA7wQjEFaB7szjqAkPG3n2/myPlans/${planDoc.id}/myPlanDetails`);
            const querySnapshot = await getDocs(query(planDetailsCollection, where("day", "==", day)));

            if (querySnapshot.empty) {
                console.warn(`Plan detail for day ${day} not found. Skipping update.`);
                return;
            }

            const detailDoc = querySnapshot.docs[0];
            return updateDoc(doc(firestoreDb, `users/2UgtzYLA7wQjEFaB7szjqAkPG3n2/myPlans/${planDoc.id}/myPlanDetails`, detailDoc.id), {
                name: name || "",
                day,
                exercises: exercisesWithoutName,
                startTime: startTime || ""
            });
        });

        await Promise.all(planDetailsPromises);

        return { message: "My plan updated successfully", id: planDoc.id };
    } catch (error) {
        console.error("Error updating plan by id:", error);
        return { error: error.message, status: 500 };
    }
}

const deleteMyPlan = async (id) => {
    try {
        const planRef = doc(firestoreDb, `users/2UgtzYLA7wQjEFaB7szjqAkPG3n2/myPlans`, id);
        const planDoc = await getDoc(planRef);
        if (!planDoc.exists()) {
            return { error: "My plan not found", status: 404 };
        }

        //clear appliedPlanID if similar
        // userData=getUser(user.uid);
        // if (userData.appliedPlan == id){
        //     await updateDoc(doc(firestoreDb, 'users', user.uid), {
        //         appliedPlan: ''
        //     });
        // }
        const planDetailsCollection = collection(planRef, "myPlanDetails");
        const planDetailsSnapshot = await getDocs(planDetailsCollection);

        // Xóa từng document trong "planDetails"
        const deleteDetailsPromises = planDetailsSnapshot.docs.map((detailDoc) =>
            deleteDoc(detailDoc.ref)
        );

        await Promise.all(deleteDetailsPromises);

        // Sau khi xóa xong subcollection, xóa document chính
        await deleteDoc(planRef);

        console.log(`My plan with ID ${id} and all its details deleted successfully.`);
        return { success: true, message: `My plan with ID ${id} deleted successfully.` };
    } catch (error) {
        console.error("Error deleting plan:", error.message);
        return { success: false, message: error.message };
    }
};

const getMyPlan = async (id) => {
    try {
        // Get main plan document
        const planDoc = await getDoc(doc(firestoreDb, `users/2UgtzYLA7wQjEFaB7szjqAkPG3n2/myPlans`, id));
        if (!planDoc.exists()) {
            return { error: "Plan not found", status: 404 };
        }

        // Get planDetails subcollection
        const planDetailsRef = collection(
            doc(firestoreDb, `users/2UgtzYLA7wQjEFaB7szjqAkPG3n2/myPlans`, id),
            "myPlanDetails"
        );
        const planDetailsSnapshot = await getDocs(planDetailsRef);

        // Convert planDetails documents to array
        const myPlanDetails = planDetailsSnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));

        // Combine plan data with planDetails
        const myPlan = {
            id: planDoc.id,
            ...planDoc.data(),
            myPlanDetails: myPlanDetails,
        };

        return { myPlan, status: 200 };
    } catch (error) {
        console.error("Error getting plan by id:", error);
        return { error: error.message, status: 500 };
    }
}

export default { createMyPlan, deleteMyPlan, getMyPlan, updateMyPlan };