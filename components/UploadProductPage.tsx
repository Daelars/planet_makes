"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductForm from "../components/Products/Form/ProductForm";
import ProductPreview from "../components/Products/Preview/ProductPreview";
import SuccessMessage from "../components/successMessage";

export default function UploadProductPage() {
  const [createdProduct, setCreatedProduct] = useState<any>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const pageVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  const childVariants = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
  };

  const handleProductCreated = (product: any) => {
    setCreatedProduct(product);
    setFormSubmitted(true);
  };

  const handleCreateAnother = () => {
    setCreatedProduct(null);
    setFormSubmitted(false);
  };

  return (
    <motion.div
      className="min-h-screen font-mono text-white"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      {/* Spacer for fixed navbar */}
      <div className="h-14 sm:h-16"></div>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <motion.h1
          className="mb-8 text-center text-xl font-medium sm:mb-12 sm:text-2xl"
          variants={childVariants}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={formSubmitted ? "submitted" : "initial"}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              {formSubmitted
                ? "Product Created Successfully"
                : "Create New Product"}
            </motion.span>
          </AnimatePresence>
        </motion.h1>

        <motion.div className="flex flex-col gap-8" variants={childVariants}>
          {/* Form Area */}
          <AnimatePresence mode="wait">
            {!formSubmitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 12,
                }}
              >
                <ProductForm onProductCreated={handleProductCreated} />
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 12,
                }}
              >
                <SuccessMessage onCreateAnother={handleCreateAnother} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Preview Area */}
          <motion.div
            variants={childVariants}
            className="mx-auto w-full max-w-lg"
          >
            <ProductPreview
              createdProduct={createdProduct}
              formCompletionPercentage={
                formSubmitted ? 100 : createdProduct ? 100 : 0
              }
              formSubmitted={formSubmitted}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Background animated gradient */}
      <motion.div
        className="pointer-events-none fixed inset-0 -z-10 opacity-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 2 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20" />

        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-blue-600/20"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </motion.div>
    </motion.div>
  );
}
