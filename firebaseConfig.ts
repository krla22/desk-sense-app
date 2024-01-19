// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCE4FOe4MdtybgBFrHOebxvPqiDDuoUAWQ",
  authDomain: "desksense-auth.firebaseapp.com",
  projectId: "desksense-auth",
  storageBucket: "desksense-auth.appspot.com",
  messagingSenderId: "680159537306",
  appId: "1:680159537306:web:ae934d49e12682e73e5723",
  measurementId: "G-55W578R3MR"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);