
"use client"

import Image from "next/image"
import Link from "next/link"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from '../../config/firebase.js';
import { googleprovider } from '../../config/firebase.js';
import { db } from '../../config/firebase.js';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';

import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from 'firebase/firestore';

import { useEffect, useRef, useState } from "react";

import LoadingLoader from "../../components/LoadingLoader.jsx"
import { notFound, useRouter } from "next/navigation.js";


const Login = () => {

  const emailRef = useRef();
  const passwordRef = useRef();

  const [user, setcurrentUser] = useState();
  const [userData, setUserData] = useState();
  const [showLoader, setShowLoader] = useState(false)
  const usersCollectionRef = collection(db, 'QuizAppUsers');

  const router = useRouter();

  const getUserByUserId = async (userId) => {
    try {
      const q = query(
        collection(db, "QuizAppUsers"),
        where("userId", "==", userId)
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("No user found");
        return null;
      }

      // Assuming userId is unique, return the first document
      const doc = querySnapshot.docs[0];

      return {
        id: doc.id,
        ...doc.data(),
      };
    } catch (error) {
   toast.error("Error fetching user:", error);
      return null;
    }
  };


  async function LoginUserWithEmail() {
    setShowLoader(true)

    try {
      let email = emailRef.current.value;
      let password = passwordRef.current.value;

      const user = await signInWithEmailAndPassword(auth, email, password);

      //console.log(user);
      setcurrentUser(user);

      const userData = await getUserByUserId(user.user.uid);
      setUserData(userData)

      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          userId: userData.userId,
          name: userData.name,
          role: userData.role
        })
      )

      setTimeout(() => {
        emailRef.current.value = '';
        passwordRef.current.value = '';

        if (userData.role === "Admin") {
          router.push(`/admin?id=${userData.userId}&name=${userData.name}`)
        }
        else if (userData.role === "User") {
          router.push(`/user?id=${userData.userId}&name=${userData.name}`)
        }
        else {
          notFound()
        }
      }, 3000)

    }
    catch (error) {
      setShowLoader(false)
      toast.error(error.message);
      
    }
  }


  return (

    <div className="flex min-h-screen w-full items-center justify-center bg-slate-100 px-3 py-6 sm:px-6 lg:px-8">

      <ToastContainer />

      <div className="flex w-full max-w-md flex-col gap-4 rounded-xl bg-white p-4 text-black shadow-lg sm:p-6 md:max-w-lg">

        <div className="flex items-center justify-center rounded-2xl bg-slate-600 p-4 shadow-sm sm:p-5">
          <h1 className=" font-mono text-sm font-extrabold text-white sm:text-xl md:text-2xl">
            QUIZ APP-SIGN IN
          </h1>
          
        </div>

        {showLoader ? <LoadingLoader title="Signing In" /> : null}

        <input
          ref={emailRef}
          type="email"
          placeholder="Enter Email"
          className="w-full min-w-0 rounded-lg border-2 border-orange-700 p-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200 sm:text-base"
        />

        <input
          ref={passwordRef}
          type="password"
          placeholder="Enter Password"
          className="w-full min-w-0 rounded-lg border-2 border-orange-700 p-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200 sm:text-base"
        />

        <div className="flex w-full items-center justify-center">
          <button
            className="w-full rounded-lg bg-orange-500 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 sm:w-auto sm:min-w-36 sm:text-base"
            onClick={LoginUserWithEmail}
          >
            Login
          </button>
        </div>

        <div className="flex flex-col items-center justify-center gap-2 border-t border-gray-200 pt-4 text-center text-sm sm:flex-row sm:gap-2 sm:text-base">
          <p>Don't have an account?</p>

          <Link
            className="font-semibold text-blue-900 hover:text-blue-700 hover:underline"
            href="/register"
          >
            Create Account
          </Link>
        </div>

      </div>
    </div>

  )
}

export default Login

