import React from "react";
import { UploadButton } from "@/utils/uploadthing";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Check, Image as ImageIcon } from "lucide-react";

interface ImagesSectionProps {
  uploadUrl: string | null;
  setUploadUrl: (url: string | null) => void;
}

export default function ImagesSection({
  uploadUrl,
  setUploadUrl,
}: ImagesSectionProps) {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
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
      transition: { type: "spring", stiffness: 200, damping: 20 },
    },
    exit: { y: -20, opacity: 0 },
  };

  const imageContainerVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: 0.2,
      },
    },
    exit: {
      scale: 0.8,
      opacity: 0,
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
        className="mb-6 text-xs uppercase tracking-widest text-gray-400"
        variants={itemVariants}
      >
        Product Images
      </motion.h3>

      <div className="space-y-5">
        <motion.div
          className="relative overflow-hidden border border-dashed border-gray-700 p-8 text-center"
          variants={itemVariants}
          whileHover={{
            borderColor: "rgb(156, 163, 175)",
            boxShadow: "0 0 15px rgba(255, 255, 255, 0.1)",
            transition: { duration: 0.3 },
          }}
        >
          {!uploadUrl && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <motion.div
                className="mb-4 flex justify-center"
                animate={{ y: [0, -5, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  repeatType: "reverse",
                }}
              >
                <Upload size={40} className="text-gray-500" />
              </motion.div>
            </motion.div>
          )}

          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              if (res && res.length > 0) {
                setUploadUrl(res[0].ufsUrl);
              }
            }}
            onUploadError={(error: Error) => {
              alert(`Upload failed: ${error.message}`);
            }}
          />

          <motion.p
            className="mt-4 text-sm text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {!uploadUrl && "Upload a high-quality product image"}
          </motion.p>
        </motion.div>

        <AnimatePresence>
          {uploadUrl && (
            <motion.div
              className="mt-4"
              variants={imageContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
            >
              <motion.div
                className="mb-2 flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Check size={16} className="mr-2 text-green-400" />
                <p className="text-sm text-gray-300">
                  Image uploaded successfully!
                </p>
              </motion.div>

              <motion.p
                className="mb-2 text-sm text-gray-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Preview:
              </motion.p>

              <motion.div
                className="group relative border border-gray-800 p-1"
                whileHover={{
                  boxShadow: "0 0 20px rgba(255, 255, 255, 0.15)",
                  borderColor: "rgb(156, 163, 175)",
                }}
              >
                <motion.img
                  src={uploadUrl}
                  alt="Uploaded product"
                  className="h-auto max-h-64 w-full bg-gray-900 object-contain"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    delay: 0.4,
                  }}
                />

                {/* Overlay and edit button */}
                <motion.div
                  className="pointer-events-none absolute inset-0 bg-black"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.5 }}
                  transition={{ duration: 0.2 }}
                />

                <motion.button
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform border border-white px-3 py-1 text-sm text-white opacity-0 transition-opacity group-hover:opacity-100"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setUploadUrl(null)}
                >
                  Replace
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
