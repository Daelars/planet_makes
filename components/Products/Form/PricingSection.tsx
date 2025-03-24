import React from "react";
import { motion } from "framer-motion";

interface PricingSectionProps {
  price: string;
  setPrice: (value: string) => void;
  shippingPrice: string;
  setShippingPrice: (value: string) => void;
  isOnSale: boolean;
  setIsOnSale: (value: boolean) => void;
  originalPrice: string;
  setOriginalPrice: (value: string) => void;
}

export default function PricingSection({
  price,
  setPrice,
  shippingPrice,
  setShippingPrice,
  isOnSale,
  setIsOnSale,
  originalPrice,
  setOriginalPrice,
}: PricingSectionProps) {
  // Container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  // Individual item animations
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  // Checkbox animation
  const checkboxVariants = {
    unchecked: { scale: 1 },
    checked: { scale: [1, 1.2, 1], transition: { duration: 0.3 } },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
  };

  // Original price field animation
  const originalPriceVariants = {
    hidden: { height: 0, opacity: 0, y: -10 },
    visible: {
      height: "auto",
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  // Input focus animation (for the line)
  const inputLineVariants = {
    initial: { scaleX: 0, originX: 0 },
    focus: {
      scaleX: 1,
      originX: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      className="space-y-5 py-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h3
        className="text-xs uppercase tracking-widest text-gray-400 mb-6"
        variants={itemVariants}
      >
        Pricing Information
      </motion.h3>

      <div className="space-y-5">
        <motion.label className="block" variants={itemVariants}>
          <span className="text-gray-300 text-sm mb-1 block">Price ($)</span>
          <div className="relative">
            <input
              type="number"
              step="0.01"
              className="w-full bg-transparent border-b border-gray-800 py-2 px-0 focus:outline-none transition-colors text-white"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-[1px] bg-white"
              initial="initial"
              whileHover="focus"
              whileFocus="focus"
              variants={inputLineVariants}
            />
          </div>
        </motion.label>

        <motion.label className="block" variants={itemVariants}>
          <span className="text-gray-300 text-sm mb-1 block">
            Shipping Price ($)
          </span>
          <div className="relative">
            <input
              type="number"
              step="0.01"
              className="w-full bg-transparent border-b border-gray-800 py-2 px-0 focus:outline-none transition-colors text-white"
              value={shippingPrice}
              onChange={(e) => setShippingPrice(e.target.value)}
              required
            />
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-[1px] bg-white"
              initial="initial"
              whileHover="focus"
              whileFocus="focus"
              variants={inputLineVariants}
            />
          </div>
        </motion.label>

        <motion.label
          className="flex items-center space-x-2 cursor-pointer group"
          variants={itemVariants}
        >
          <motion.div
            className={`w-5 h-5 border ${
              isOnSale ? "bg-white border-white" : "border-gray-600"
            } flex items-center justify-center transition-colors`}
            variants={checkboxVariants}
            animate={isOnSale ? "checked" : "unchecked"}
            whileHover="hover"
          >
            {isOnSale && <span className="text-black text-xs">✓</span>}
          </motion.div>
          <span className="text-gray-300 text-sm group-hover:text-white transition-colors">
            On Sale
          </span>
          <input
            type="checkbox"
            className="hidden"
            checked={isOnSale}
            onChange={(e) => setIsOnSale(e.target.checked)}
          />
        </motion.label>

        <motion.div
          className="pl-7"
          initial="hidden"
          animate={isOnSale ? "visible" : "hidden"}
          variants={originalPriceVariants}
        >
          <label className="block">
            <span className="text-gray-300 text-sm mb-1 block">
              Original Price ($)
            </span>
            <div className="relative">
              <input
                type="number"
                step="0.01"
                className="w-full bg-transparent border-b border-gray-800 py-2 px-0 focus:outline-none transition-colors text-white"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                required={isOnSale}
              />
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-[1px] bg-white"
                initial="initial"
                whileHover="focus"
                whileFocus="focus"
                variants={inputLineVariants}
              />
            </div>
          </label>
        </motion.div>
      </div>
    </motion.div>
  );
}
