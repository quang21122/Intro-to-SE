import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import pkg from 'firebase-admin';
const { credential } = pkg;

// Import the service account key
import fs from 'fs';
const serviceAccount = JSON.parse(fs.readFileSync("./api/intro2se-383d8-firebase-adminsdk-5j1hl-122947a7ea.json", 'utf8'));

// Initialize the Firebase Admin SDK
const adminApp = initializeApp({
  credential: credential.cert(serviceAccount),
});

// Get a Firestore instance
const firestoreDb = getFirestore(adminApp);

const auth = getAuth(adminApp);

export { adminApp, firestoreDb, auth };


