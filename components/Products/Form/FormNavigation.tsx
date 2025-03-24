import React from "react";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface FormNavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function FormNavigation({
  activeSection,
  setActiveSection,
}: FormNavigationProps) {
  // Animation for the active indicator line
  const navContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const navItemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  const FormSection = ({
    title,
    sectionId,
    index,
  }: {
    title: string;
    sectionId: string;
    index: number;
  }) => {
    const isActive = activeSection === sectionId;

    return (
      <motion.button
        onClick={() => setActiveSection(sectionId)}
        className={`text-left text-sm sm:text-base flex items-center group transition-colors py-3 px-4 border-b relative ${
          isActive
            ? "border-white text-white"
            : "border-gray-800 text-gray-400 hover:text-white"
        }`}
        variants={navItemVariants}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.span
          className="font-mono relative z-10"
          initial={false}
          animate={isActive ? { scale: 1.05 } : { scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          {title}
        </motion.span>

        <motion.div
          className={`absolute bottom-0 left-0 w-full h-px bg-white`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isActive ? 1 : 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          style={{ originX: 0 }}
        />

        <motion.div
          className="ml-2 flex items-center"
          initial={false}
          animate={isActive ? { x: 5, opacity: 1 } : { x: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronRight size={16} />
        </motion.div>

        {isActive && (
          <motion.div
            className="absolute inset-0 bg-gray-800 rounded"
            layoutId="activeNavBackground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            style={{ zIndex: 0 }}
          />
        )}
      </motion.button>
    );
  };

  return (
    <motion.div
      className="grid grid-cols-2 sm:grid-cols-4 relative"
      variants={navContainerVariants}
      initial="hidden"
      animate="visible"
    >
      <FormSection title="Basic" sectionId="basic" index={0} />
      <FormSection title="Details" sectionId="details" index={1} />
      <FormSection title="Pricing" sectionId="pricing" index={2} />
      <FormSection title="Images" sectionId="images" index={3} />
    </motion.div>
  );
}
