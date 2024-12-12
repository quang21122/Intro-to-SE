import React, { useEffect, useState, ReactNode } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { auth } from "../firebaseApp";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
  updateEmail
} from "firebase/auth";
import axios from "axios";

// AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const authInstance = auth

  useEffect(() => {
    // Subscribe to authentication state changes
    const unsubscribe = onAuthStateChanged(authInstance, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [authInstance]);

  const login = async (email: string, password: string) => {
    try {
      // Step 1: Sign the user in using Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(
        authInstance,
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

  const logout = async () => {
    // Step 2: Sign the user out
    auth.signOut();
    localStorage.removeItem("firebaseToken");
  };

  const signup = async (email: string, password: string, username: string) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/user",
        {
            email: email,
            password: password,
            username: username,
        },
        {
            validateStatus: () => true, // Treat all HTTP status codes as successful
        }
    );

    if (res.status !== 201) {
      return { error: typeof res.data === "string" ? res.data : { message: res.data.error || "Unknown error" } };
    }

      return res.data;
    } catch (error) {
      console.error("Signup failed", error);
      return { error };
    }
  };

  const changePassword = async (oldPassword: string, newPassword: string) => {
    try {
      const user = authInstance.currentUser;
      if (user && user.email) {
        // Re-authenticate the user
        const credential = EmailAuthProvider.credential(user.email, oldPassword);
        await reauthenticateWithCredential(user, credential);
  
        // Update the password
        await updatePassword(user, newPassword);
  
        // Optionally, refresh the ID token
        await user.getIdToken(true); // Passing 'true' forces a token refresh
  
        // Optionally, update the stored token
        const token = await user.getIdToken();
        // Decide where and how to store the token securely
        // localStorage.setItem("firebaseToken", token);
  
        return {
          userId: user.uid,
          token: token,
          message: "Password updated successfully",
        };
      } else {
        throw new Error("User is not authenticated");
      }
    } catch (error) {
      console.error("Change password failed", error);
    
      let errorMessage = "An unknown error occurred";
    
      if (error instanceof Error) {
        errorMessage = error.message;
      }
    
      return { userId: "", token: "", error: errorMessage };
    }
  };

  const changeEmail = async (newEmail: string) => {
    try {
      const user = authInstance.currentUser;
      if (user) {
        // Update the email
        await updateEmail(user, newEmail);
  
        // Optionally, refresh the ID token
        await user.getIdToken(true); // Passing 'true' forces a token refresh
  
        // Optionally, update the stored token
        const token = await user.getIdToken();
        // Decide where and how to store the token securely
        // localStorage.setItem("firebaseToken", token);
  
        return {
          userId: user.uid,
          token: token,
          message: "Email updated successfully",
        };
      } else {
        throw new Error("User is not authenticated");
      }
    } catch (error) {
      console.error("Change email failed", error);
    
      let errorMessage = "An unknown error occurred";
    
      if (error instanceof Error) {
        errorMessage = error.message;
      }
    
      return { userId: "", token: "", error: errorMessage };
    }
  }

  const value = { user, loading, login, logout, signup, changePassword, changeEmail }; // Providing the login function through context
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
