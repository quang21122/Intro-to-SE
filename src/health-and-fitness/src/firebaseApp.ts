// src/firebaseApp.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // For authentication
import { getFirestore } from "firebase/firestore"; // For Firestore

// Your Firebase config (replace with your Firebase project's details)
export const firebaseConfig = {
  apiKey: "AIzaSyAb1UQHP1CVRlbbHi8I2CbE7uaYgKGlOVo",
  authDomain: "intro2se-383d8.firebaseapp.com",
  projectId: "intro2se-383d8",
  storageBucket: "intro2se-383d8.appspot.com",
  messagingSenderId: "463617557207",
  appId: "1:463617557207:web:ed6f7cc01bd6c9a5456692"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
