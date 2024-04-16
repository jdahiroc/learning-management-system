// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMbPhApQJd149b20cVAEUEA5jorrBwKWY",
  authDomain: "learning-management-syst-d83de.firebaseapp.com",
  projectId: "learning-management-syst-d83de",
  storageBucket: "learning-management-syst-d83de.appspot.com",
  messagingSenderId: "518213152639",
  appId: "1:518213152639:web:7f5585f56f25c7ff5b344a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
