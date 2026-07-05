// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAqSRuZxa5wwwaSWLh8SDCXRroyDMNbINo",
  authDomain: "upranko-32b97.firebaseapp.com",
  projectId: "upranko-32b97",
  storageBucket: "upranko-32b97.firebasestorage.app",
  messagingSenderId: "712557296336",
  appId: "1:712557296336:web:08686330d55dfeb890fcd5",
  measurementId: "G-79C8KZQ5XX"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();


























