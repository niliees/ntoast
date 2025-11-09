// Firebase client initialization
// This module is imported by client components only.

import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCs0xM154UTEUxhOCv-FqqL1i6zHlZHfug",
  authDomain: "nsce-fr1.firebaseapp.com",
  databaseURL: "https://nsce-fr1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "nsce-fr1",
  storageBucket: "nsce-fr1.firebasestorage.app",
  messagingSenderId: "344286384535",
  appId: "1:344286384535:web:2340d545eda9bc21f474d2",
  measurementId: "G-H7CH1CVCE4"
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

export default app;

