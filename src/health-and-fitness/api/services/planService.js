import { firestoreDb } from "../firebase.js";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  collection,
  query,
  where,
  startAfter,
  orderBy,
  limit,
} from "firebase/firestore";
import exerciseService from "./exerciseService.js";
const { getExercise } = exerciseService;

const getPlan = async (id) => {
  try {
    // Get main plan document
    const planDoc = await getDoc(doc(firestoreDb, "plans", id));
    if (!planDoc.exists()) {
      return { error: "Plan not found", status: 404 };
    }

    // Get planDetails subcollection
    const planDetailsRef = collection(
      doc(firestoreDb, "plans", id),
      "planDetails"
    );
    const planDetailsSnapshot = await getDocs(planDetailsRef);

    // Convert planDetails documents to array
    const planDetails = planDetailsSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    // Combine plan data with planDetails
    const plan = {
      id: planDoc.id,
      ...planDoc.data(),
      planDetails: planDetails,
    };

    return { plan, status: 200 };
  } catch (error) {
    console.error("Error getting plan by id:", error);
    return { error: error.message, status: 500 };
  }
};

const getPlansByPage = async (page, pageSize = 6) => {
  try {
    const plansCollection = collection(firestoreDb, "plans");

    // Build initial query with ordering and limit
    let plansQuery = query(plansCollection, orderBy("name"), limit(pageSize));

    // If not first page, get the starting point
    if (page > 1) {
      // Get the last document from the previous page
      const lastVisibleDoc = await getDocs(
        query(plansCollection, orderBy("name"), limit((page - 1) * pageSize))
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

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching plans by page:", error);
    return [];
  }
};
const createPlan = async (data) => {
  try {
    // Validate the main plan data
    const {
      name,
      image,
      description,
      days,
      goal,
      muscle,
      level,
      planDetails,
    } = data;

    if (
      !name ||
      !description ||
      !days ||
      !muscle ||
      !image ||
      !goal ||
      !level ||
      !Array.isArray(planDetails)
    ) {
      throw new Error(
        "Invalid plan data. Ensure all required fields are provided."
      );
    }

    // Create the main plan document
    const planRef = doc(collection(firestoreDb, "plans"));
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

    await setDoc(planRef, plan);

    // Add plan details
    const planDetailsPromises = planDetails.map(async (detail) => {
      const { name, day, exercises } = detail;

      if (!name || !day || !Array.isArray(exercises)) {
        throw new Error(`Invalid detail for day ${day}`);
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
      const detailRef = doc(
        collection(firestoreDb, `plans/${planId}/planDetails`)
      );

      return setDoc(detailRef, {
        name,
        day,
        exercises: validExercises,
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
    return {
      success: true,
      message: `Plan with ID ${id} deleted successfully.`,
    };
  } catch (error) {
    console.error("Error deleting plan:", error.message);
    return { success: false, message: error.message };
  }
};

const updatePlan = async (id, data) => {
  try {
    const planDoc = await getDoc(doc(firestoreDb, "plans", id));
    if (!planDoc.exists()) {
      return { error: "Plan not found", status: 404 };
    }

    const {
      name,
      image,
      description,
      days,
      goal,
      muscle,
      level,
      planDetails,
    } = data;
    const plan = {
      name,
      description,
      goal,
      image,
      level,
      muscle,
      days,
    };

    // Cập nhật tài liệu chính
    await updateDoc(doc(firestoreDb, "plans", planDoc.id), plan);

    // Cập nhật từng chi tiết của kế hoạch
    const planDetailsPromises = planDetails.map(async (detail) => {
      const { name, day, exercises } = detail;

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

      const planDetailsCollection = collection(
        firestoreDb,
        `plans/${planDoc.id}/planDetails`
      );
      const querySnapshot = await getDocs(
        query(planDetailsCollection, where("day", "==", day))
      );

      if (querySnapshot.empty) {
        console.warn(`Plan detail for day ${day} not found. Skipping update.`);
        return;
      }

      const detailDoc = querySnapshot.docs[0];
      return updateDoc(
        doc(firestoreDb, `plans/${planDoc.id}/planDetails`, detailDoc.id),
        {
          name,
          day,
          exercises: exercisesWithoutName,
        }
      );
    });

    await Promise.all(planDetailsPromises);

    return { message: "Exercise updated successfully", id: planDoc.id };
  } catch (error) {
    console.error("Error updating plan by id:", error);
    return { error: error.message, status: 500 };
  }
};

const getFilteredPlans = async ({
  page,
  muscles,
  daysList,
  levels,
  name,
  goals
}) => {
  try {
    const plansCollection = collection(firestoreDb, "plans");

    const conditions = [];

    if (muscles.length > 0) {
      conditions.push(where("muscle", "in", muscles));
    }

    if (daysList.length > 0) {
      conditions.push(where("days", "in", daysList));
    }

    if (levels.length > 0) {
      conditions.push(where("level", "in", levels));
    }

    if (name) {
      conditions.push(where("name", "==", name));
    }

    if (goals.length > 0) {
      conditions.push(where("goal", "in", goals));
    }

    let queryRef = query(plansCollection, ...conditions);

    // Apply pagination if page is specified
    const pageSize = 12; // Define the page size
    if (page) {
      const pageNum = parseInt(page, 10);
      if (pageNum < 1) {
        throw new Error("Invalid page number");
      }

      // For cursor-based pagination, you would typically store the last document from the previous page.
      // As an example, we'll order by a field like `name`:
      queryRef = query(queryRef, limit(pageSize));

      // In a real-world scenario, you'd use a startAfter cursor based on the last document of the previous page.
      // e.g., queryRef = query(queryRef, startAfter(lastDocument), limit(pageSize));
    }

    const querySnapshot = await getDocs(queryRef);

    if (querySnapshot.empty) {
      return [];
    }

    // Map the documents to a response array
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error in getFilteredPlans:", error);
    throw new Error(error.message);
  }
};

const searchPlans = async (searchTerm) => {
  try {
    const formattedTerm = searchTerm.toLowerCase().trim();
    console.log("Formatted Search Term:", formattedTerm);

    const plansCollection = collection(firestoreDb, "plans");
    const querySnapshot = await getDocs(plansCollection);

    if (querySnapshot.empty) {
      return { error: "No plans found", status: 404 };
    }

    // Filter documents client-side to allow partial matches
    const plans = querySnapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .filter((plans) => plans.name.toLowerCase().includes(formattedTerm));

    if (plans.length === 0) {
      return { error: "No plans found", status: 404 };
    }

    return { plans: plans, status: 200 };
  } catch (error) {
    console.error("Error in searchPlans:", error);
    throw new Error(error.message);
  }
};

export default {
  createPlan,
  deletePlan,
  getPlan,
  updatePlan,
  getPlansByPage,
  getFilteredPlans,
  searchPlans,
};
