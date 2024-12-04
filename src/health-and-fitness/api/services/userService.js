import { firestoreDb } from '../firebaseAdmin.js';
import { auth } from '../firebaseAdmin.js';

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

    // Store additional user data in Firestore
    await firestoreDb.collection('users').doc(userId).set({
      username,
      createdAt: new Date(),
    });

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
    const userDoc = await firestoreDb.collection('users').doc(userId).get();
    if (!userDoc.exists) {
      return { error: "User data not found in Firestore", status: 404 };
    }

    return {
      user: {
        uid: userRecord.uid,
        email: userRecord.email,
        ...userDoc.data(),
      },
      status: 200,
    };
  } catch (error) {
    console.error("Error getting user:", error);
    return { error: error.message, status: 500 };
  }
};

// Update user's password or Firestore data
const updateUser = async (userId, newPassword, firestoreData = {}) => {
  try {
    // Update password if provided
    if (newPassword) {
      await auth.updateUser(userId, { password: newPassword });
    }

    // Update Firestore data if provided
    if (Object.keys(firestoreData).length > 0) {
      await firestoreDb.collection('users').doc(userId).update(firestoreData);
    }

    return { message: "User updated successfully", status: 200 };
  } catch (error) {
    console.error("Error updating user:", error);
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
    console.error("Error deleting user:", error);
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
