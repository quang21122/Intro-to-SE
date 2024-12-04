// Firestore User Schema
export const User = {
    role: "user", // Default role is "user", can be "admin" or "moderator"
    ban: false, // Whether the user is banned
    myPlans: [], // Array of Firestore document references as strings
    gender: null, // Gender can be "male", "female", or "other"
    height: null, // Height of the user (e.g., in cm)
    weight: null, // Weight of the user (e.g., in kg)
    mealPerDay: null, // Number of meals per day
    allergy: null, // Allergy information
    goalStatus: null, // Reference ID for goalStatus document
    mealPlan: null, // Reference ID for mealPlans document
};
