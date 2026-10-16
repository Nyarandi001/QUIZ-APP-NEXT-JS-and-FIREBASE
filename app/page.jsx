
//make following next js component responsive in all screens i.e phones,laptops,desktops ;;

"use client";

import Link from "next/link";
import { motion } from "motion/react";

export default function SplashScreen() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-slate-950 px-4 py-8 text-center text-white sm:px-6 md:px-8">
      <motion.div
        animate={{ scale: [0.3,0.5,0.95, 1, 1.03, 1, 0.95,0.5,0.3] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="flex w-full max-w-xs flex-col items-center gap-3 rounded-xl bg-white p-5 font-serif font-bold text-black shadow-2xl sm:max-w-md sm:gap-4 sm:p-8 md:max-w-lg md:p-10"
      >
        <h1 className="break-words text-2xl font-extrabold sm:text-3xl md:text-4xl">
          QUIZ APP
        </h1>

        <h2 className="text-center text-base leading-relaxed sm:text-lg md:text-xl">
          Designed and Developed by
        </h2>

        <h1 className="break-words text-xl font-extrabold sm:text-2xl md:text-3xl">
          Japheth Nyarandi
        </h1>

        <Link
          href="/login"
          className="mt-2 inline-flex min-h-11 w-full max-w-xs items-center justify-center rounded-lg bg-blue-700 px-6 py-3 text-base font-extrabold text-white transition duration-300 hover:scale-105 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:text-lg"
        >
          Proceed
        </Link>
      </motion.div>
    </main>
  );
}

