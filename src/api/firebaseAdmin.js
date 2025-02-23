import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import pkg from 'firebase-admin';
import path from 'path';
import { fileURLToPath } from 'url';
const { credential } = pkg;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const serviceAccount = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, 'intro2se-383d8-firebase-adminsdk-122947a7ea.json'),
    'utf8'
  )
);

// Initialize the Firebase Admin SDK
const adminApp = initializeApp({
  credential: credential.cert(serviceAccount),
});

// Get a Firestore instance
const firestoreDb = getFirestore(adminApp);

const auth = getAuth(adminApp);

export { adminApp, firestoreDb, auth };


