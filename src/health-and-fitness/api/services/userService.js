import { firestoreDb } from '../firebase.js';
import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import bcrypt from 'bcrypt';


const usersCollection = collection(firestoreDb, 'users');

const createUser = async (data) => {
    const { username, password } = data;

    try {
      // Check if the username already exists in the database
      const usernameQuery = query(usersCollection, where("username", "==", username));
      const querySnapshot = await getDocs(usernameQuery);
      
      if (!querySnapshot.empty) {
        console.error("Username already exists. Please choose a different one.");
        return { error: "Username already exists. Please choose a different one.", status: 409 };
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
      console.error("Error creating user: ", error);
      return { error: "Error creating user", status: 500 };
    }
};

const getUser = async (username) => {
    try {
      // Get user by username
      const usernameQuery = query(usersCollection, where("username", "==", username));
      const querySnapshot = await getDocs(usernameQuery);

      if (querySnapshot.empty) {
        console.error("User not found");
        return { error: "User not found", status: 404 };
      }

      let user = {};
      querySnapshot.forEach((doc) => {
        user = doc.data();
      });

      return user;
    } catch (error) {
      console.error("Error getting user: ", error);
      return { error: "Error getting user", status: 500 };
    }
}

const updateUser = async (username, oldPassword, newPassword) => {
    try {
      // Check if the user document exists
      const usernameQuery = query(usersCollection, where("username", "==", username));
      const querySnapshot = await getDocs(usernameQuery);
      if (querySnapshot.empty) {
        console.error("User not found");
        return { error: "User not found", status: 404 };
      }

      // Hash the new password
      const hashedOldPassword = await bcrypt.hash(oldPassword, 10);
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);

      // Check if the old password matches the stored password
      if (hashedOldPassword !== querySnapshot.docs[0].data().password) {
        console.error("Old password does not match");
        return { error: "Old password does not match", status: 401 };
      }
      
      // Update the user password by username
      querySnapshot.forEach(async (doc) => {
        await updateDoc(doc.ref, { password: hashedNewPassword });
      });
      
    } catch (error) {
      console.error("Error updating user: ", error);
      return { error: "Error updating user", status: 500 };
    }
}

const deleteUser = async (username) => {
    try {
      // Check if the user document exists
      const usernameQuery = query(usersCollection, where("username", "==", username));
      const querySnapshot = await getDocs(usernameQuery);
      if (querySnapshot.empty) {
        console.error("User not found");
        return { error: "User not found", status: 404 };
      }
      
      // Delete the user document by username
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
    } catch (error) {
      console.error("Error deleting user: ", error);
      return { error: "Error deleting user", status: 500 };
    }
}

export default { createUser,getUser,updateUser,deleteUser };
