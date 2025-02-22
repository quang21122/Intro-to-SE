// Firestore User Schema
export const User = {
    role: "user", // Default role is "user", can be "admin" or "moderator"
    ban: false, // Whether the user is banned
    gender: null, // Gender can be "male", "female", or "other"
    height: null, // Height of the user (e.g., in cm)
    weight: null, // Weight of the user (e.g., in kg)
    mealPerDay: null, // Number of meals per day
    allergy: null, // Allergy information
    goalHeight: null,
    goalWeight: null,
    goalBody: null,
    mealPlan: null, // Reference ID for mealPlans document
    appliedPlan: null, // Reference ID for myPlans document
};
