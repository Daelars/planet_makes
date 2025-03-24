import React from "react";
import { motion } from "framer-motion";

interface BasicInfoSectionProps {
  collection: string;
  setCollection: (value: string) => void;
  productName: string;
  setProductName: (value: string) => void;
  showReviews: boolean;
  setShowReviews: (value: boolean) => void;
  inStock: boolean;
  setInStock: (value: boolean) => void;
}

export default function BasicInfoSection({
  collection,
  setCollection,
  productName,
  setProductName,
  showReviews,
  setShowReviews,
  inStock,
  setInStock,
}: BasicInfoSectionProps) {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.6,
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    exit: { y: -20, opacity: 0 },
  };

  const titleVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    exit: { x: -20, opacity: 0 },
  };

  // Hover animations for inputs
  const inputHoverVariants = {
    idle: { scaleX: 1 },
    hover: { scaleX: 1.02, transition: { duration: 0.3 } },
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
        Basic Information
      </motion.h3>

      <div className="space-y-5">
        <motion.label className="block" variants={itemVariants}>
          <motion.span
            className="text-gray-300 text-sm mb-1 block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Collection
          </motion.span>
          <motion.div
            className="relative"
            initial="idle"
            whileHover="hover"
            whileTap="hover"
          >
            <motion.input
              type="text"
              className="w-full bg-transparent border-b border-gray-800 py-2 px-0 focus:outline-none focus:border-white transition-colors text-white"
              value={collection}
              onChange={(e) => setCollection(e.target.value)}
              required
            />
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-px bg-white origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: collection ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </motion.label>

        <motion.label className="block" variants={itemVariants}>
          <motion.span
            className="text-gray-300 text-sm mb-1 block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Product Name
          </motion.span>
          <motion.div
            className="relative"
            initial="idle"
            whileHover="hover"
            whileTap="hover"
          >
            <motion.input
              type="text"
              className="w-full bg-transparent border-b border-gray-800 py-2 px-0 focus:outline-none focus:border-white transition-colors text-white"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-px bg-white origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: productName ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </motion.label>

        <motion.label
          className="flex items-center space-x-2 cursor-pointer group"
          variants={itemVariants}
        >
          <motion.div
            className={`w-5 h-5 border ${
              showReviews ? "bg-white border-white" : "border-gray-600"
            } flex items-center justify-center`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {showReviews && (
              <motion.span
                className="text-black text-xs"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                ✓
              </motion.span>
            )}
          </motion.div>
          <span className="text-gray-300 text-sm group-hover:text-white transition-colors">
            Show Reviews
          </span>
          <input
            type="checkbox"
            className="hidden"
            checked={showReviews}
            onChange={(e) => setShowReviews(e.target.checked)}
          />
        </motion.label>

        <motion.label
          className="flex items-center space-x-2 cursor-pointer group"
          variants={itemVariants}
        >
          <motion.div
            className={`w-5 h-5 border ${
              inStock ? "bg-white border-white" : "border-gray-600"
            } flex items-center justify-center`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {inStock && (
              <motion.span
                className="text-black text-xs"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                ✓
              </motion.span>
            )}
          </motion.div>
          <span className="text-gray-300 text-sm group-hover:text-white transition-colors">
            In Stock
          </span>
          <input
            type="checkbox"
            className="hidden"
            checked={inStock}
            onChange={(e) => setInStock(e.target.checked)}
          />
        </motion.label>
      </div>
    </motion.div>
  );
}
