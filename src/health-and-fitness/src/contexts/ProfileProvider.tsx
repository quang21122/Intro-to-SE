import React, { useState, useEffect, ReactNode } from "react";
import { collection, doc, getDoc } from 'firebase/firestore';
import { firestore } from "../firebaseApp.ts";
import { ProfileContext } from "../contexts/ProfileContext";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";

// ProfileProvider component
interface ProfileProviderProps {
  children: ReactNode;
}

export const ProfileProvider: React.FC<ProfileProviderProps> = ({ children }) => {
  const { user } = useAuth();
  
  // Set up profile state and loading state
  const [myProfile, setMyProfile] = useState({
    gender: "",
    height: "",
    weight: "",
    goalHeight: "",
    goalWeight: "",
    goalBody: "",
  });

  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    if (!user) {
      setIsLoading(false); // No user, stop loading
      return;
    }

    // Fetch profile data from Firestore if user is logged in
    const fetchProfile = async () => {
      try {
        const docRef = doc(collection(firestore, "users"), user.uid);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setMyProfile({
            gender: data.gender,
            height: data.height,
            weight: data.weight,
            goalHeight: data.goalHeight,
            goalWeight: data.goalWeight,
            goalBody: data.goalBody,
          });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setIsLoading(false); // Stop loading after the fetch
      }
    };

    fetchProfile();
  }, [user]); // Only run when `user` changes

  // Show loading message until profile data is ready
  if (isLoading) {
    return <div>Loading...</div>; // You can customize this loading state
  }

  const updateProfile = async (
    userId: string,
    updatedProfile: {
      gender: string;
      height: string;
      weight: string;
      goalHeight: string;
      goalWeight: string;
      goalBody: string;
    }
  ) => {
    try {
      const url = 'intro-to-se-server.vercel.app/api/user';
      const response = await axios.put(
        `${url}?userId=${userId}`,
        updatedProfile
      );
      setMyProfile(updatedProfile);
      return {
        message: "Profile updated successfully",
        status: response.status,
      };
    } catch (error) {
      return { message: (error as Error).message, status: 500 };
    }
  };

  return (
    <ProfileContext.Provider value={{ myProfile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};