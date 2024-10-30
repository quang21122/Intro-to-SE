import { firestoreDb } from '../firebase.js';
import { collection, doc, getDoc, addDoc } from 'firebase/firestore';
import bcrypt from 'bcrypt';

const usersCollection = collection(firestoreDb, 'users');

const createUser = async (data) => {
    const { username, password } = data;

    try {
      // Check if the username already exists in the database
      const usernameQuery = query(usersCollection, where("username", "==", username));
      const querySnapshot = await getDocs(usernameQuery);
      
      if (!querySnapshot.empty) {
        throw new Error("Username already exists. Please choose a different one.");
      }
      
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user document with a unique Firestore ID
      const newUser = await addDoc(usersCollection, {
        username,
        password: hashedPassword, // Store the hashed password
        createdAt: new Date(), // Optionally store the creation date
      });

      // Return the new user's document ID if needed
      return { id: newUser.id, username }; // You can choose to return the auto-generated ID or not
    } catch (error) {
      throw new Error(error.message);
    }
};

const getUser = async (username) => {
    try {
      // Get user by username
      const usernameQuery = query(usersCollection, where("username", "==", username));
      const querySnapshot = await getDocs(usernameQuery);

      if (querySnapshot.empty) {
        throw new Error("User not found");
      }

      let user = {};
      querySnapshot.forEach((doc) => {
        user = doc.data();
      });

      return user;
    } catch (error) {
      throw new Error(error.message);
    }
}

const updateUser = async (username, data) => {
    try {
      // Check if the user document exists
      const usernameQuery = query(usersCollection, where("username", "==", username));
      const querySnapshot = await getDocs(usernameQuery);
      if (querySnapshot.empty) {
        throw new Error("User not found");
      }
      
      // Update the user document by username
      querySnapshot.forEach(async (doc) => {
        await updateDoc(doc.ref, data);
      });
    } catch (error) {
      throw new Error(error.message);
    }
}

const deleteUser = async (username) => {
    try {
      // Check if the user document exists
      const usernameQuery = query(usersCollection, where("username", "==", username));
      const querySnapshot = await getDocs(usernameQuery);
      if (querySnapshot.empty) {
        throw new Error("User not found");
      }
      
      // Delete the user document by username
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
    } catch (error) {
      throw new Error(error.message);
    }
}
export default { createUser,getUser,updateUser,deleteUser };
