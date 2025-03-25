"use client";
import { useEffect } from "react";
import { motion, useAnimation, useScroll, useTransform } from "framer-motion";
import { ScreenFitText } from "@/components/Text/Fit";

export default function Page() {
  const controls = useAnimation();
  const { scrollY } = useScroll();

  // Create scroll-based transformations
  const yRange = useTransform(scrollY, [0, 300], [0, -100]);
  const opacityRange = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    // Trigger the animation sequence on mount
    const animateSequence = async () => {
      await controls.start("visible");
    };

    animateSequence();
  }, [controls]);

  // Variants for the main container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  // Variants for the 404 number
  const numberVariants = {
    hidden: {
      y: -100,
      opacity: 0,
      rotateX: 90,
    },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  // Variants for the message text
  const messageVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5,
        duration: 0.8,
      },
    },
  };

  // Variants for floating particles
  interface ParticleTransition {
    delay: number;
    duration: number;
    repeat: number;
    repeatType: "reverse";
    repeatDelay: number;
  }

  interface ParticleVisible {
    opacity: number;
    scale: number;
    transition: ParticleTransition;
  }

  interface ParticleVariants {
    hidden: { opacity: number; scale: number };
    visible: (i: number) => ParticleVisible;
    [key: string]: any;
  }

  const particleVariants: ParticleVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i: number) => ({
      opacity: 0.7,
      scale: 1,
      transition: {
        delay: 1 + i * 0.1,
        duration: 0.5,
        repeat: Infinity,
        repeatType: "reverse",
        repeatDelay: Math.random() * 2,
      },
    }),
  };

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
          className="absolute rounded-full bg-white opacity-20"
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

        {/* Return home button with hover animation */}
        <motion.button
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
