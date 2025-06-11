import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAXiSlolVWYPoYvUlJ0h17Asi2aFGcEas0",
  authDomain: "blog-application-889e6.firebaseapp.com",
  projectId: "blog-application-889e6",
  storageBucket: "blog-application-889e6.firebasestorage.app",
  messagingSenderId: "789437767438",
  appId: "1:789437767438:web:4edc0abd59a10285ef815f",
  measurementId: "G-FWE9SRYCYZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app)
export const auth = getAuth(app);
