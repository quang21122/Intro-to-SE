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
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";

const createExercise = async (data) => {
  const {
    difficulty,
    instruction,
    equipment,
    image,
    muscle,
    name,
    type,
    video,
  } = data;

  try {
    const query = await getExercise(name);
    if (!query.error) {
      return { error: "Exercise already exists", status: 409 };
    }
    const generateId = (length) => {
      const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let result = "";
      for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    };

    const exerciseId = generateId(20);
    // Store additional user data in Firestore
    await setDoc(doc(firestoreDb, "exercises", exerciseId.toString()), {
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

    return {
      difficulty,
      instruction,
      equipment,
      image,
      muscle,
      name,
      type,
      video,
    };
  } catch (error) {
    console.error("Error creating exercise:", error);
    return { error: error.message, status: 500 };
  }
};

const getExercise = async (name) => {
  try {
    // Convert hyphenated name back to original format
    const formattedName = name.replace(/-/g, " ");
    console.log("Formatted Name:", formattedName);

    // Query Firestore to find the document by name
    const exercisesCollection = collection(firestoreDb, "exercises");
    const querySnapshot = await getDocs(
      query(exercisesCollection, where("name", "==", formattedName))
    );
    console.log("Query Snapshot Docs:", querySnapshot.docs);

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
};

const getExercisesByPage = async (page, pageSize = 10) => {
  try {
    const exercisesCollection = collection(firestoreDb, "exercises");

    // Build initial query with ordering and limit
    let exercisesQuery = query(
      exercisesCollection,
      orderBy("name"),
      limit(pageSize)
    );

    // If not first page, get the starting point
    if (page > 1) {
      // Get the last document from the previous page
      const lastVisibleDoc = await getDocs(
        query(
          exercisesCollection,
          orderBy("name"),
          limit((page - 1) * pageSize)
        )
      );

      if (!lastVisibleDoc.empty) {
        const lastDoc = lastVisibleDoc.docs[lastVisibleDoc.docs.length - 1];
        exercisesQuery = query(
          exercisesCollection,
          orderBy("name"),
          startAfter(lastDoc),
          limit(pageSize)
        );
      }
    }

    const querySnapshot = await getDocs(exercisesQuery);

    if (querySnapshot.empty) {
      return [];
    }

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching exercises by page:", error);
    return [];
  }
};

const updateExercise = async (name, data) => {
  try {
    // Query Firestore to find the document by name
    console.log(name);
    const exercisesCollection = collection(firestoreDb, "exercises");
    const querySnapshot = await getDocs(
      query(exercisesCollection, where("name", "==", name))
    );

    if (querySnapshot.empty) {
      return { error: "Exercise not found", status: 404 };
    }

    // Assuming `name` is unique, update the first matching document
    const exerciseDoc = querySnapshot.docs[0];
    const exerciseId = exerciseDoc.id;
    const newName = data.name;
    // Check if the new name is already taken
    const existingExercise = await getExercise(newName);
    if (!existingExercise.error) {
      return { error: "Exercise new name already exists", status: 409 };
    }
    // Update the document
    await updateDoc(doc(firestoreDb, "exercises", exerciseId), data);

    return { message: "Exercise updated successfully" };
  } catch (error) {
    console.error("Error updating exercise by name:", error);
    return { error: error.message, status: 500 };
  }
};

const deleteExercise = async (exerciseName) => {
  try {
    // Find id of the exercise to delete
    const exercise = await getExercise(exerciseName);
    if (exercise.error) {
      return { error: exercise.error, status: exercise.status };
    }
    // Delete the exercise document by id
    await deleteDoc(doc(firestoreDb, "exercises", exercise.id));
    return { message: "Exercise deleted" };
  } catch (error) {
    console.error("Error deleting exercise:", error);
    return { error: error.message, status: 500 };
  }
};

const getExercisesByMuscle = async (muscle) => {
  try {
    const exercisesCollection = collection(firestoreDb, "exercises");
    const querySnapshot = await getDocs(
      query(exercisesCollection, where("muscle", "==", muscle))
    );

    if (querySnapshot.empty) {
      return { error: "No exercises found for muscle", status: 404 };
    }

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error getting exercises by muscle:", error);
    return { error: error.message, status: 500 };
  }
};

const getExercisesByMuscles = async (muscles) => {
  try {
    const exercisesCollection = collection(firestoreDb, "exercises");

    // Query Firestore to find exercises that match any of the given muscle ids
    const querySnapshot = await getDocs(
      query(exercisesCollection, where("muscle", "in", muscles))
    );

    if (querySnapshot.empty) {
      return {
        error: "No exercises found for the specified muscles",
        status: 404,
      };
    }

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error getting exercises by muscles:", error);
    return { error: error.message, status: 500 };
  }
};

const getExercisesByEquipments = async (equipments) => {
  try {
    const exercisesCollection = collection(firestoreDb, "exercises");

    // Query Firestore to find exercises that match any of the given equipment ids
    const querySnapshot = await getDocs(
      query(exercisesCollection, where("equipment", "in", equipments))
    );

    if (querySnapshot.empty) {
      return {
        error: "No exercises found for the specified equipment",
        status: 404,
      };
    }

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error getting exercises by equipment:", error);
    return { error: error.message, status: 500 };
  }
};

const getFilteredExercises = async ({ muscles, equipments, page, name }) => {
  try {
    const exercisesCollection = collection(firestoreDb, "exercises");

    const conditions = [];

    if (muscles.length > 0) {
      conditions.push(where("muscle", "in", muscles));
    }

    if (equipments.length > 0) {
      conditions.push(where("equipment", "in", equipments));
    }

    if (name) {
      conditions.push(where("name", "==", name));
    }

    let queryRef = query(exercisesCollection, ...conditions);

    // Apply pagination if page is specified
    const pageSize = 10; // Define the page size
    if (page) {
      const pageNum = parseInt(page, 10);
      if (pageNum < 1) {
        throw new Error("Invalid page number");
      }

      // For cursor-based pagination, you would typically store the last document from the previous page.
      // As an example, we'll order by a field like `name`:
      queryRef = query(queryRef, orderBy("name"), limit(pageSize));

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
    console.error("Error in getFilteredExercises:", error);
    throw new Error(error.message);
  }
};

export default {
  createExercise,
  getExercise,
  updateExercise,
  deleteExercise,
  getExercisesByPage,
  getExercisesByMuscle,
  getExercisesByMuscles,
  getExercisesByEquipments,
  getFilteredExercises,
};
