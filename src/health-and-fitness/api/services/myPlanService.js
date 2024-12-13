import { firestoreDb } from '../firebase.js';
import { doc, setDoc, getDoc, updateDoc, deleteDoc, getDocs, collection, query, where, startAfter, orderBy, limit, writeBatch } from 'firebase/firestore';
import exerciseService from './exerciseService.js';
import userService from './userService.js';
import planService from './planService.js';

const { getExerciseById } = exerciseService;
const { getUser } = userService;
const { getPlan } = planService;

const createMyPlan = async (uid, data) => {
    const batch = writeBatch(firestoreDb);  // Sử dụng batch để xử lý tất cả các ghi dữ liệu đồng thời

    try {
        // Kiểm tra số lượng kế hoạch hiện tại của người dùng
        const plansQuery = query(collection(firestoreDb, `users/${uid}/myPlans`));
        const plansSnapshot = await getDocs(plansQuery);

        // Kiểm tra nếu người dùng đã có hơn 4 kế hoạch
        if (plansSnapshot.size >= 4) {
            throw new Error("You cannot create more than 4 plans.");
        }

        // Validate the main plan data
        const { name, image, description, days, goal, muscle, level, myPlanDetails } = data;

        if (!name || !description || !days || !muscle || !image || !goal || !level || !Array.isArray(myPlanDetails)) {
            throw new Error("Invalid plan data. Ensure all required fields are provided.");
        }

        // Ensure myPlanDetails has exactly 7 days
        if (myPlanDetails.length !== 7) {
            throw new Error("myPlanDetails must contain exactly 7 days.");
        }

        // Create the main plan document
        const planRef = doc(collection(firestoreDb, `users/${uid}/myPlans`));
        const planId = planRef.id;

        const plan = {
            name,
            description,
            goal,
            image,
            level,
            muscle,
            days,
            createdAt: new Date().toISOString(),
        };

        batch.set(planRef, plan);  // Thêm ghi của plan vào batch

        // Add plan details
        for (let index = 0; index < myPlanDetails.length; index++) {
            const detail = myPlanDetails[index];
            const { name, day, exercises, startTime } = detail;

            if (!day || !Array.isArray(exercises)) {
                throw new Error(`Invalid detail for day ${day || index + 1}`);
            }

            // check exercises in library
            const existedExercises = await Promise.all(
                exercises.map(async (exercise) => {
                    const exerciseData = await getExerciseById(exercise.id);
                    if (exerciseData.error) {
                        throw new Error(exerciseData.error);
                    }
                    return exercise;
                })
            );

            // take out id, interval, sets, reps, restTime
            const validExercises = existedExercises.map(({ id, interval, sets, reps, restTime }) => ({
                id,
                interval,
                sets,
                reps,
                restTime
            }));

            // Create a document in the "planDetails" subcollection
            const detailRef = doc(collection(firestoreDb, `users/${uid}/myPlans/${planId}/myPlanDetails`));

            // Thêm ghi của từng ngày vào batch
            batch.set(detailRef, {
                name: name || "",
                day: day,
                exercises: validExercises,
                startTime: startTime || 
                                        {
                                            hour: 0,
                                            minute: 0,
                                            flag: false
                                        }
            });
        }

        // Commit the transaction (tất cả các thay đổi sẽ được lưu)
        await batch.commit();

        console.log("My plan and my plan details created successfully.");
        return { success: true, planId };
    } catch (error) {
        console.error("Error creating my plan:", error.message);
        return { success: false, message: error.message };
    }
};

const createMyPlanThroughAddPlan = async (uid, originalPlanId) => {
    const batch = writeBatch(firestoreDb);  // Sử dụng batch để xử lý tất cả các ghi dữ liệu đồng thời
    try {
        // Validate the main plan data
        // Kiểm tra số lượng kế hoạch hiện tại của người dùng
        const plansQuery = query(collection(firestoreDb, `users/${uid}/myPlans`));
        const plansSnapshot = await getDocs(plansQuery);

        // Kiểm tra nếu người dùng đã có hơn 4 kế hoạch
        if (plansSnapshot.size >= 4) {
            throw new Error("You cannot create more than 4 plans.");
        }

        const originalPlan = await getPlan(originalPlanId);
        if (originalPlan.error) {
            throw new Error("Can not get orignal plan");
        }
  
        const { name, image, description, days, goal, muscle, level, planDetails: myPlanDetails } = originalPlan.plan;
        console.log(originalPlan);
       
        console.log(myPlanDetails);

        if (!name || !description || !days || !muscle || !image || !goal || !level || !Array.isArray(myPlanDetails)) {
            throw new Error("Invalid plan data. Ensure all required fields are provided.");
        }


        // Create the main plan document
        const planRef = doc(collection(firestoreDb, `users/${uid}/myPlans`));
        const planId = planRef.id;

        const plan = {
            name,
            description,
            goal,
            image,
            level,
            muscle,
            days,
            createdAt: new Date().toISOString(),
        };

        batch.set(planRef, plan);  // Thêm ghi của plan vào batch

        // Add plan details
        for (let index = 0; index < myPlanDetails.length; index++) {
            const detail = myPlanDetails[index];
            const { name, day, exercises, startTime } = detail;

            if (!day || !Array.isArray(exercises)) {
                throw new Error(`Invalid detail for day ${day || index + 1}`);
            }

            // check exercises in library
            const existedExercises = await Promise.all(
                exercises.map(async (exercise) => {
                    const exerciseData = await getExerciseById(exercise.id);
                    if (exerciseData.error) {
                        throw new Error(exerciseData.error);
                    }
                    return exercise;
                })
            );

            // take out id, interval, sets, reps, restTime
            const validExercises = existedExercises.map(({ id, interval, sets, reps, restTime }) => ({
                id,
                interval,
                sets,
                reps,
                restTime
            }));

            // Create a document in the "planDetails" subcollection
            const detailRef = doc(collection(firestoreDb, `users/${uid}/myPlans/${planId}/myPlanDetails`));

            // Thêm ghi của từng ngày vào batch
            batch.set(detailRef, {
                name: name || "",
                day: day,
                exercises: validExercises,
                startTime: startTime || 
                                        {
                                            hour: 0,
                                            minute: 0,
                                            flag: false
                                        }
            });
        }

        // Commit the transaction (tất cả các thay đổi sẽ được lưu)
        await batch.commit();

        console.log("My plan and my plan details created through add plan successfully.");
        return { success: true, planId };
    } catch (error) {
        console.error("Error creating my plan through add plan:", error.message);
        return { success: false, message: error.message };
    }
}

const updateMyPlan = async (uid, id, data) => {
    try {
        const planDoc = await getDoc(doc(firestoreDb, `users/${uid}/myPlans`, id));
        if (!planDoc.exists()) {
            return { error: "My plan not found", status: 404 };
        }

        const { name, image, description, days, goal, muscle, level, myPlanDetails } = data;
        const plan = { name, description, goal, image, level, muscle, days };

        // Cập nhật tài liệu chính
        await updateDoc(doc(firestoreDb, `users/${uid}/myPlans`, planDoc.id), plan);

        // Cập nhật từng chi tiết của kế hoạch
        const planDetailsPromises = myPlanDetails.map(async (detail) => {
            const { name, day, exercises, startTime } = detail;

            // check exercises in library
            const existedExercises = await Promise.all(
                exercises.map(async (exercise) => {
                    const exerciseData = await getExerciseById(exercise.id);
                    if (exerciseData.error) {
                        throw new Error(exerciseData.error);
                    }
                    return exercise;
                })
            );

            // take out id, interval, sets, reps, restTime
            const validExercises = existedExercises.map(({ id, interval, sets, reps, restTime }) => ({
                id,
                interval,
                sets,
                reps,
                restTime
            }));

            const planDetailsCollection = collection(firestoreDb, `users/${uid}/myPlans/${planDoc.id}/myPlanDetails`);
            const querySnapshot = await getDocs(query(planDetailsCollection, where("day", "==", day)));

            if (querySnapshot.empty) {
                console.warn(`Plan detail for day ${day} not found. Skipping update.`);
                return;
            }

            const detailDoc = querySnapshot.docs[0];
            return updateDoc(doc(firestoreDb, `users/${uid}/myPlans/${planDoc.id}/myPlanDetails`, detailDoc.id), {
                name: name || "",
                day,
                exercises: validExercises,
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

const deleteMyPlan = async (uid, id) => {
    try {
        const planRef = doc(firestoreDb, `users/${uid}/myPlans`, id);
        const planDoc = await getDoc(planRef);
        if (!planDoc.exists()) {
            return { error: "My plan not found", status: 404 };
        }

        //clear appliedPlanID if similar
        const userData = getUser(uid);
        if (userData.appliedPlan == id) {
            await updateDoc(doc(firestoreDb, 'users', user.uid), {
                appliedPlan: ''
            });
        }
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

const getMyPlan = async (uid, id) => {
    try {
        // Get main plan document
        const planDoc = await getDoc(doc(firestoreDb, `users/${uid}/myPlans`, id));
        if (!planDoc.exists()) {
            return { error: "Plan not found", status: 404 };
        }
        // Get planDetails subcollection
        const planDetailsRef = collection(
            doc(firestoreDb, `users/${uid}/myPlans`, id),
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

const getAllMyPlans = async (uid) => {
    try {
        const plansRef = collection(firestoreDb, `users/${uid}/myPlans`);
        const plansSnapshot = await getDocs(plansRef);
        const plans = plansSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return { plans, status: 200 };
    } catch (error) {
        console.error("Error getting all my plans:", error);
        return { error: error.message, status: 500 };
    }
}

const appliedPlan = async (uid, appliedID) => {
    try {
        //check id exists
        const planDoc = await getDoc(doc(firestoreDb, `users/${uid}/myPlans`, appliedID));
        if (!planDoc.exists()) {
            return { error: "Plan not found", status: 404 };
        }

        //update
        await updateDoc(doc(firestoreDb, 'users', uid), {
            appliedPlan: appliedID
        });
        return { success: true, message: `Applied plan with ID ${appliedID} successfully.` };
    } catch (error) {
        console.error("Error applying plan:", error.message);
        return { success: false, message: error.message };
    }
}

export default { createMyPlan, deleteMyPlan, getMyPlan, updateMyPlan, createMyPlanThroughAddPlan, getAllMyPlans, appliedPlan };