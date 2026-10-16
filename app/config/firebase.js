import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAYpHevTrk_HHVtPEfDH9-SX7J162mOgbc",
  authDomain: "quizapp-nextjs-51ab3.firebaseapp.com",
  projectId: "quizapp-nextjs-51ab3",
  storageBucket: "quizapp-nextjs-51ab3.firebasestorage.app",
  messagingSenderId: "773007222534",
  appId: "1:773007222534:web:91dc8a2d7bf645ceea6087",
  measurementId: "G-9CHNERPWY1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const googleprovider=new GoogleAuthProvider()
export const db=getFirestore(app)