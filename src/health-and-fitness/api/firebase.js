// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAb1UQHP1CVRlbbHi8I2CbE7uaYgKGlOVo",
  authDomain: "intro2se-383d8.firebaseapp.com",
  projectId: "intro2se-383d8",
  storageBucket: "intro2se-383d8.appspot.com",
  messagingSenderId: "463617557207",
  appId: "1:463617557207:web:ed6f7cc01bd6c9a5456692"
};

let app;
let firestoreDb;

const initializeFirebaseApp = () => {
    try {
        app = initializeApp(firebaseConfig);
        firestoreDb = getFirestore(app);
        return app;
    } catch (error) {
        console.log(error);
    }
};

const getFirebaseApp = () => app;

export { initializeFirebaseApp, getFirebaseApp, firestoreDb };