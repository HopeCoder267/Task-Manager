// Import the functions for SDKs  needed
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDjyHpg6LRWZKzMGSNUy9xmcD7XlukF8Vo",
    authDomain: "fitnessgoaltracker-4452e.firebaseapp.com",
    databaseURL: "https://fitnessgoaltracker-4452e-default-rtdb.firebaseio.com",
    projectId: "fitnessgoaltracker-4452e",
    storageBucket: "fitnessgoaltracker-4452e.firebasestorage.app",
    messagingSenderId: "56173494540",
    appId: "1:56173494540:web:c68e6e131855cf8890c929",
    measurementId: "G-TF5WXZE98Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export { app };