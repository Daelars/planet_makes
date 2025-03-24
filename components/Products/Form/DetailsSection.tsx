import React from "react";
import { motion } from "framer-motion";

interface DetailsSectionProps {
  coloursInput: string;
  setColoursInput: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  productDetails: string;
  setProductDetails: (value: string) => void;
}

export default function DetailsSection({
  coloursInput,
  setColoursInput,
  description,
  setDescription,
  productDetails,
  setProductDetails,
}: DetailsSectionProps) {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.15,
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
    exit: {
      y: -20,
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  const titleVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
        delay: 0.1,
      },
    },
    exit: { y: -10, opacity: 0 },
  };

  // Text area animation for focus
  const textAreaVariants = {
    rest: { borderColor: "rgb(31, 41, 55)" },
    focus: {
      borderColor: "rgb(255, 255, 255)",
      boxShadow: "0 0 10px rgba(255, 255, 255, 0.1)",
      transition: { duration: 0.3 },
    },
    hover: {
      borderColor: "rgb(107, 114, 128)",
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div
      className="space-y-5 py-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.h3
        className="text-xs uppercase tracking-widest text-gray-400 mb-6"
        variants={titleVariants}
      >
        Product Details
      </motion.h3>

      <div className="space-y-5">
        <motion.label className="block" variants={itemVariants}>
          <motion.span
            className="text-gray-300 text-sm mb-1 block"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            Colours (comma separated)
          </motion.span>
          <motion.div
            className="relative overflow-hidden"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            transition={{ duration: 0.2 }}
          >
            <motion.input
              type="text"
              className="w-full bg-transparent border-b border-gray-800 py-2 px-0 focus:outline-none focus:border-white transition-colors text-white"
              value={coloursInput}
              onChange={(e) => setColoursInput(e.target.value)}
              placeholder="Black, White, Gray"
            />
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-px bg-white origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: coloursInput ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </motion.label>

        <motion.label className="block" variants={itemVariants}>
          <motion.span
            className="text-gray-300 text-sm mb-1 block"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            Product Description
          </motion.span>
          <motion.div
            initial="rest"
            whileHover="hover"
            whileFocus="focus"
            whileTap="focus"
          >
            <motion.textarea
              className="w-full bg-transparent border border-gray-800 py-2 px-3 focus:outline-none focus:border-white transition-colors text-white min-h-32 resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              variants={textAreaVariants}
            />
          </motion.div>
        </motion.label>

        <motion.label className="block" variants={itemVariants}>
          <motion.span
            className="text-gray-300 text-sm mb-1 block"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            Additional Details
          </motion.span>
          <motion.div
            initial="rest"
            whileHover="hover"
            whileFocus="focus"
            whileTap="focus"
          >
            <motion.textarea
              className="w-full bg-transparent border border-gray-800 py-2 px-3 focus:outline-none focus:border-white transition-colors text-white min-h-32 resize-none"
              value={productDetails}
              onChange={(e) => setProductDetails(e.target.value)}
              placeholder="Material, care instructions, etc."
              variants={textAreaVariants}
            />
          </motion.div>
        </motion.label>
      </div>
    </motion.div>
  );
}
