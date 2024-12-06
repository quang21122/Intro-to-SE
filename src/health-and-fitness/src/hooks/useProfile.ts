// src/hooks/useProfile.ts

import { useContext } from "react";
import { ProfileContext } from "../contexts/ProfileContext"; // import the context

// Custom hook to access AuthContext
export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useContext must be used within an ContextProvider");
  }
  return context;
};
