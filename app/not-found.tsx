"use client";
import { useEffect } from "react";
import { motion, useAnimation, useScroll, useTransform } from "framer-motion";
import { ScreenFitText } from "@/components/Text/Fit";
import { useRouter } from "next/navigation";

// Variants for the animated elements
const particleVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: { opacity: 0.2, scale: 1 },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const numberVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0 },
};

const messageVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default function NotFoundPage() {
  const router = useRouter(); // hook for navigation
  const controls = useAnimation();
  const { scrollY } = useScroll();

  // Create dynamic transform values based on scroll position
  const yRange = useTransform(scrollY, [0, 300], [0, -50]);
  const opacityRange = useTransform(scrollY, [0, 300], [1, 0]);

  // Animate the components when the page loads
  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  return (
    <div className="relative h-screen overflow-hidden bg-black">
      {/* Background animated elements */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          custom={i}
          variants={particleVariants}
          initial="hidden"
          animate="visible"
          className="absolute rounded-full bg-white"
          style={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            width: Math.random() * 20 + 5,
            height: Math.random() * 20 + 5,
          }}
        />
      ))}

      {/* Main content */}
      <motion.div
        className="flex h-screen flex-col items-center justify-center p-6"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        style={{ y: yRange, opacity: opacityRange }}
      >
        {/* 404 Number */}
        <motion.div variants={numberVariants} className="mb-8 overflow-hidden">
          <h1 className="font-[family-name:var(--font-ultra)] text-9xl leading-none tracking-tighter text-white">
            404
          </h1>
        </motion.div>

        {/* Error message */}
        <motion.div variants={messageVariants}>
          <ScreenFitText
            text="Sorry, this page doesn't exist."
            containerClassName="flex items-center justify-center"
            textClassName="font-[family-name:var(--font-ultra)] text-5xl sm:text-3xl md:text-4xl text-white opacity-90"
          />
        </motion.div>

        {/* Return home button with redirection */}
        <motion.button
          onClick={() => router.push("/")}
          className="mt-12 rounded-full bg-white px-8 py-3 font-medium text-black"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          variants={messageVariants}
        >
          Return Home
        </motion.button>
      </motion.div>
    </div>
  );
}
