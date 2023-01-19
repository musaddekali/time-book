import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCorZHH_uGHG8lkj1VVSQPDwkUDj_kHK6k",
  authDomain: "time-book-7184b.firebaseapp.com",
  projectId: "time-book-7184b",
  storageBucket: "time-book-7184b.appspot.com",
  messagingSenderId: "530207239352",
  appId: "1:530207239352:web:57ab3d27b741a2ae2ad84d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const auth = getAuth();
export const db = getFirestore(app);
