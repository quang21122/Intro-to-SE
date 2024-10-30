import { db } from '../firebase.js';
import { collection, doc, getDoc, addDoc } from 'firebase/firestore';
import bcrypt from 'bcrypt';

const usersCollection = collection(db, 'users');

const createUser = async (data) => {
    const { username, password } = data;

    try {
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

export default { createUser };
