// src/contexts/ProfileContext.tsx
import { createContext } from "react";

// Define types for the context
interface ProfileContextType {
  // Add the profile state here
  myProfile: {
    gender: string; // Gender can be "male", "female", or "other"
    height: string; // Height of the user (e.g., in cm)
    weight: string; // Weight of the user (e.g., in kg)
    goalHeight: string,
    goalWeight: string,
    goalBody: string,
  };
  // Add the updateProfile function here
  updateProfile: (
    userId: string,
    updatedProfile: {
      gender: string;
      height: string;
      weight: string;
      goalHeight: string,
      goalWeight: string,
      goalBody: string,
    }
  ) =>
    | Promise<{ message: string; status: number }>
    | Promise<{ error: Error; status: number }>;
}

export const ProfileContext = createContext<ProfileContextType | undefined>(
  undefined
);
