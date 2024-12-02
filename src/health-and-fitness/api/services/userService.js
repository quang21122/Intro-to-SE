import { firestoreDb } from '../firebase.js';
import { doc, setDoc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updatePassword, deleteUser as firebaseDeleteUser } from 'firebase/auth';

const signInService = async (email, password) => {
  const auth = getAuth();

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Optionally, you can return the user's Firebase ID token if you're using tokens
    const token = await user.getIdToken();

    return {
      userId: user.uid, // The unique user ID from Firebase
      token: token, // The Firebase ID token
    };
  } catch (error) {
    console.error("Firebase sign-in error:", error);
    return { error: error.message }; // Return error message if sign-in fails
  }
};

const signUpService = async (email, password, username) => {
  return createUser({ email, password, username });
};

// Create a new user with Firebase Auth and store additional data in Firestore
const createUser = async (data) => {
  const auth = getAuth();

  const { email, password, username } = data;

  try {
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const userId = userCredential.user.uid;

    // Store additional user data in Firestore
    await setDoc(doc(firestoreDb, 'users', userId), {
      username,
      createdAt: new Date(),
    });

    return { id: userId, email, username };
  } catch (error) {
    console.error("Error creating user:", error);
    return { error: error.message, status: 500 };
  }
};

// Get user data from Firebase Auth and Firestore
const getUser = async (userId) => {
  const auth = getAuth();

  try {
    // Get additional data from Firestore
    const userDoc = await getDoc(doc(firestoreDb, 'users', userId));
    if (!userDoc.exists()) {
      return { error: "User not found", status: 404 };
    }

    return { user: userDoc.data(), status: 200 };
  } catch (error) {
    console.error("Error getting user:", error);
    return { error: error.message, status: 500 };
  }
};

// Update user's password or Firestore data
const updateUser = async (userId, oldPassword, newPassword) => {
  const auth = getAuth();

  try {
    const user = auth.currentUser;

    // Verify old password by re-authenticating
    await signInWithEmailAndPassword(auth, user.email, oldPassword);

    // Update password
    if (newPassword) {
      await updatePassword(user, newPassword);
    }

    // Update Firestore data if needed
    // await updateDoc(doc(firestoreDb, 'users', userId), { additionalData: value });

    return { message: "User updated successfully", status: 200 };
  } catch (error) {
    console.error("Error updating user:", error);
    return { error: error.message, status: 500 };
  }
};

// Delete user from Firebase Auth and Firestore, for now it is self deletion, real admin deletion need Admin SDK
const deleteUser = async (userId) => {
  const auth = getAuth();

  try {
    // Get user document from Firestore
    const userDoc = await getDoc(doc(firestoreDb, 'users', userId));
    if (!userDoc.exists()) {
      return { error: "User not found", status: 404 };
    }

    // Delete user document in Firestore
    await deleteDoc(doc(firestoreDb, 'users', userId));

    // Delete user in Firebase Auth
    const user = auth.currentUser;
    if (user && user.uid === userId) {
      await firebaseDeleteUser(user);
    }

    return { message: "User deleted successfully", status: 200 };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { error: error.message, status: 500 };
  }
};

export default { signInService, signUpService, createUser, getUser, updateUser, deleteUser };
