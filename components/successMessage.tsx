import React from "react";
import { motion } from "framer-motion";

interface SuccessMessageProps {
  onCreateAnother: () => void;
}

export default function SuccessMessage({
  onCreateAnother,
}: SuccessMessageProps) {
  // Container animation
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 100,
        damping: 15,
        delayChildren: 0.3,
        staggerChildren: 0.15,
      },
    },
  };

  // Children animation
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  // Checkmark animation
  const checkmarkVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 200,
        damping: 10,
      },
    },
  };

  // Checkmark draw animation
  const checkPathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 0.8, ease: "easeInOut" },
        opacity: { duration: 0.3 },
      },
    },
  };

  // Button animation
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.8,
        type: "spring",
        stiffness: 100,
      },
    },
    hover: {
      scale: 1.03,
      transition: { type: "spring", stiffness: 300 },
    },
    tap: { scale: 0.97 },
  };

  return (
    <motion.div
      className="border border-gray-800 p-8 text-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="mb-6" variants={itemVariants}>
        <motion.div
          className="w-16 h-16 bg-white text-black rounded-full mx-auto flex items-center justify-center"
          variants={checkmarkVariants}
        >
          <motion.svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d="M5 13L9 17L19 7"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={checkPathVariants}
            />
          </motion.svg>
        </motion.div>
      </motion.div>

      <motion.h2 className="text-xl mb-4" variants={itemVariants}>
        Product Created Successfully
      </motion.h2>

      <motion.p className="text-gray-400 mb-6" variants={itemVariants}>
        Your product has been added to the catalog
      </motion.p>

      <motion.button
        onClick={onCreateAnother}
        className="bg-white text-black py-2 px-8 font-medium hover:bg-gray-200 transition-colors text-sm"
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
      >
        Create Another Product
      </motion.button>

      {/* Animated background sparkles */}
      <motion.div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-70"
            initial={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              scale: 0,
              opacity: 0,
            }}
            animate={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              repeatType: "loop",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
