"use client";

import { motion } from "framer-motion";

// 1. Define staggered animation variants for the container
const containerVariants = {
  initial: {
    transition: {
      staggerChildren: 0.2, // Delays each child circle by 0.2s
    },
  },
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// 2. Define the bouncing effect for each circle
const circleVariants = {
  initial: {
    y: "0%",
  },
  animate: {
    y: "100%",
    transition: {
      duration: 0.5,
      repeat: Infinity,
      repeatType: "reverse" , // Makes it bounce up and down smoothly
      ease: "easeInOut",
    },
  },
};

export default function Loading() {
  return (
    <div className="flex  w-full items-center justify-center p-2 bg-slate-900 rounded-2xl">
      {/* Container holding the circles */}
      <motion.div
        className="flex h-10 w-24 items-center justify-around"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {/* Individual Circles styled with Tailwind */}
        <motion.span
          className="block h-4 w-4 rounded-full bg-green-500"
          variants={circleVariants}
        />
        <motion.span
          className="block h-4 w-4 rounded-full bg-green-500"
          variants={circleVariants}
        />
        <motion.span
          className="block h-4 w-4 rounded-full bg-green-500"
          variants={circleVariants}
        />
      </motion.div>
      <div>
        <h1 className="text-yellow-500 font-xl font-extrabold">{`Fetching Data Please Wait ......`}</h1>
        
        </div>
      
    </div>
  );
}
