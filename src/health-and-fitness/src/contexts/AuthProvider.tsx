import React, { useEffect, useState, ReactNode } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { auth } from "../firebaseApp"; // Import auth from the Firebase configuration
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import axios from "axios";

// AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Subscribe to authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Step 1: Sign the user in using Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // Optionally, you can save the token in localStorage or any global state if needed
      const token = await user.getIdToken();
      localStorage.setItem("firebaseToken", token);

      return {
        userId: user.uid, // The unique user ID from Firebase
        token: token, // The Firebase ID token
      };
    } catch (error) {
      console.error("Login failed", error);
      return { userId: "", token: "", error };
    }
  };

  const logout = () => {
    // Step 2: Sign the user out
    auth.signOut();
    localStorage.removeItem("firebaseToken");
  };

  const signup = async (email: string, password: string, username: string) => {
    try {
      const res = await axios.post("http://localhost:3000/api/user", {
        email: email,
        password: password,
        username: username,
      });

      return res.data;
    } catch (error) {
      console.error("Signup failed", error);
    }
  };

  const value = { user, loading, login, logout, signup }; // Providing the login function through context
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
