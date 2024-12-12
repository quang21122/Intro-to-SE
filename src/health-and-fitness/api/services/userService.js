import { firestoreDb } from '../firebaseAdmin.js';
import { auth } from '../firebaseAdmin.js';
import { User } from '../models/User.js';

// Create a new user with Firebase Auth and store additional data in Firestore
const createUser = async (data) => {
  const { email, password, username } = data;

  try {
    // Create user in Firebase Auth
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: username
    });

    const userId = userRecord.uid;

    const newUser = { ...User };

    // Store additional user data in Firestore
    await firestoreDb.collection('users').doc(userId).set(newUser);

    return { id: userId, email, username, status: 201 };
  } catch (error) {
    console.error("Error creating user:", error);
    return { error: error.message, status: 500 };
  }
};

// Get user data from Firebase Auth and Firestore
const getUser = async (userId) => {
  try {
    // Get user data from Firebase Auth
    const userRecord = await auth.getUser(userId);

    // Get additional data from Firestore
    const userDoc = await firestoreDb.collection("users").doc(userId).get();
    if (!userDoc.exists) {
      return { error: "User data not found in Firestore", status: 404 };
    }

    // Get myPlans subcollection
    const myPlansRef = firestoreDb
      .collection("users")
      .doc(userId)
      .collection("myPlans");
    const myPlansSnapshot = await myPlansRef.get();

    // Convert myPlans documents to array and fetch myPlanDetails for each myPlan
    const myPlans = await Promise.all(
      myPlansSnapshot.docs.map(async (doc) => {
        const myPlanData = doc.data();
        const myPlanDetailsRef = doc.ref.collection("myPlanDetails");
        const myPlanDetailsSnapshot = await myPlanDetailsRef.get();
        const myPlanDetails = myPlanDetailsSnapshot.docs.map((detailDoc) => ({
          ...detailDoc.data(),
          id: detailDoc.id,
        }));
        return {
          ...myPlanData,
          id: doc.id,
          myPlanDetails: myPlanDetails,
        };
      })
    );

    return {
      user: {
        uid: userRecord.uid,
        email: userRecord.email,
        myPlans: myPlans,
        ...userDoc.data(),
      },
      status: 200,
    };
  } catch (error) {
    return { error: error.message, status: 500 };
  }
};

// Update user's password or Firestore data
const updateUser = async (userId, firestoreData = {}) => {
  try {
    // Update user data in Firestore
    await firestoreDb.collection('users').doc(userId).update(firestoreData);

    return { message: "User updated successfully", status: 200 };
  } catch (error) {
    return { error: error.message, status: 500 };
  }
};

// Delete user from Firebase Auth and Firestore
const deleteUser = async (userId) => {
  try {
    // Delete user document in Firestore
    await firestoreDb.collection('users').doc(userId).delete();

    // Delete user in Firebase Auth
    await auth.deleteUser(userId);

    return { message: "User deleted successfully", status: 200 };
  } catch (error) {
    return { error: error.message, status: 500 };
  }
};

// Export services
export default {
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
