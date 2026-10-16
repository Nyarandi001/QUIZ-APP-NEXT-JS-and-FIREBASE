
"use client"

import Link from "next/link"
import { useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from "../../config/firebase.js"
import { googleprovider } from "../../config/firebase.js"
import { db } from "../../config/firebase.js"
import LoadingLoader from "../../components/LoadingLoader.jsx"
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
import { useRouter } from "next/navigation.js";


const Register = () => {

  const nameRef = useRef()
  const roleRef = useRef(null)
  const emailRef2 = useRef();
  const passwordRef2 = useRef();
  const passwordRef2b = useRef();
  const [user, setcurrentUser] = useState();
  const [showLoader, setShowLoader] = useState(false)
  const usersCollectionRef = collection(db, 'QuizAppUsers');
  const quizRecordsCollectionRef = collection(db, "QuizAppQuizRecords");
  const quizesCollectionRef = collection(db, "QuizAppQuizes");
  const router = useRouter();

  async function signUpWithEmail() {

    let name = nameRef.current.value;
    let email = emailRef2.current.value;
    let role = roleRef.current.value;
    let password = passwordRef2.current.value;
    let password2 = passwordRef2b.current.value;

    if (name === '' || email === '' || password === '' || password2 === '') {
      toast.error('Enter all the fields');
      console.log("Error enter all fields")
      return;
    }

    if (password !== password2) {
      toast.error("Password don't match");
      return;
    }

    try {
      setShowLoader(true)
      const user = await createUserWithEmailAndPassword(auth, email, password);
      const now = new Date();

      const dateTimeString = new Intl.DateTimeFormat("en-KE", {
        timeZone: "Africa/Nairobi",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(now);

      await addDoc(usersCollectionRef, {
        name: name,
        email: email,
        userId: user.user.uid,
        password: password,
        joinedDate: dateTimeString,
        role: role,
      });
  
      setShowLoader(false)
      toast.success('Registration successful,Login');

      setTimeout(() => {
        nameRef.current.value = '';
        emailRef2.current.value = '';
        roleRef.current.value = "";
        passwordRef2.current.value = '';
        passwordRef2b.current.value = '';
        router.push("/login")
      }, 3000)

    } catch (error) {
      setShowLoader(false)
      toast.error(error.message);
    }
  }

  function signUpWithGoogle() {
    try {
      signInWithPopup(auth, googleprovider).then((result) => {
        const name = result.user.displayName;
        const email = result.user.email;
        const profilePic = result.user.photoURL;
        console.log(`NAME:${name} EMAIL:${email}`);
      });
    } catch (error) {
      console.log(`ERROR:${error}`);
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-100 px-3 py-6 sm:px-6 lg:px-8">

      <ToastContainer />

      <div className="flex w-full max-w-md flex-col gap-4 rounded-xl bg-white p-4 text-black shadow-lg sm:p-6 md:max-w-lg lg:max-w-xl">

        <div className="flex items-center justify-center rounded-2xl bg-slate-600 p-4 shadow-sm sm:p-5">
          <h1 className="text-center font-mono text-sm font-extrabold text-white sm:text-xl md:text-2xl">
            QUIZ APP-REGISTER
          </h1>
        </div>

        {showLoader ? <LoadingLoader title="Signing Up" /> : null}

        <input
          ref={nameRef}
          type="text"
          placeholder="Enter your name"
          className="w-full min-w-0 rounded-lg border-2 border-orange-700 p-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 sm:text-base"
        />

        <div className="flex w-full min-w-0 flex-col gap-2 rounded-lg border-2 border-orange-700 p-3 sm:flex-row sm:items-center sm:justify-between">
          <label className="text-sm text-gray-500 sm:text-base">
            Select Role
          </label>

          <select
            ref={roleRef}
            name="role"
            className="w-full min-w-0 rounded-md border border-gray-300 bg-white p-2 text-sm sm:w-auto sm:min-w-32 sm:text-base"
          >
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
        </div>

        <input
          ref={emailRef2}
          type="email"
          placeholder="Enter Email"
          className="w-full min-w-0 rounded-lg border-2 border-orange-700 p-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 sm:text-base"
        />

        <input
          ref={passwordRef2}
          type="password"
          placeholder="Enter Password"
          className="w-full min-w-0 rounded-lg border-2 border-orange-700 p-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 sm:text-base"
        />

        <input
          ref={passwordRef2b}
          type="password"
          placeholder="Confirm password"
          className="w-full min-w-0 rounded-lg border-2 border-orange-700 p-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 sm:text-base"
        />

        <div className="flex w-full items-center justify-center">
          <button
            className="w-full rounded-lg bg-orange-700 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-orange-800 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 sm:w-auto sm:min-w-40 sm:text-base"
            onClick={() => signUpWithEmail()}
          >
            Sign Up
          </button>
        </div>

        <div className="flex flex-col items-center justify-center gap-2 border-t border-gray-200 pt-4 text-center text-sm sm:flex-row sm:gap-2 sm:text-base">
          <p>Already have an account?</p>
          <Link
            href="/login"
            className="font-semibold text-orange-700 hover:text-orange-900 hover:underline"
          >
            Login
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Register

