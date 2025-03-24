"use client";
import React, { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createProduct } from "@/app/actions/createProduct";
import FormNavigation from "./FormNavigation";
import BasicInfoSection from "./BasicInfoSection";
import DetailsSection from "./DetailsSection";
import PricingSection from "./PricingSection";
import ImagesSection from "./ImagesSection";

interface ProductFormProps {
  onProductCreated: (product: any) => void;
}

export default function ProductForm({ onProductCreated }: ProductFormProps) {
  const [isPending, startTransition] = useTransition();

  // Form state fields for product
  const [collection, setCollection] = useState("");
  const [productName, setProductName] = useState("");
  const [showReviews, setShowReviews] = useState(true);
  const [price, setPrice] = useState("");
  const [inStock, setInStock] = useState(true);
  const [shippingPrice, setShippingPrice] = useState("");
  const [coloursInput, setColoursInput] = useState(""); // comma-separated colours
  const [description, setDescription] = useState(""); // production description
  const [productDetails, setProductDetails] = useState("");
  const [isOnSale, setIsOnSale] = useState(false);
  const [originalPrice, setOriginalPrice] = useState("");
  const [uploadUrl, setUploadUrl] = useState<string | null>(null);

  // Navigation
  const [activeSection, setActiveSection] = useState("basic");
  const [direction, setDirection] = useState(0); // -1 for backward, 1 for forward

  // Calculate completion percentage
  const formCompletionPercentage =
    [
      collection,
      productName,
      price,
      shippingPrice,
      description,
      uploadUrl,
    ].filter(Boolean).length * 16;

  // Form variants
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
      },
    },
    exit: { opacity: 0, y: -20 },
  };

  // Button animation variants
  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.03,
      transition: { type: "spring", stiffness: 400 },
    },
    tap: { scale: 0.97 },
    disabled: {
      opacity: 0.5,
      scale: 1,
    },
  };

  // Section transition variants
  const sectionVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  // Progress bar animation
  const progressVariants = {
    initial: { width: 0 },
    animate: (percent: number) => ({
      width: `${percent}%`,
      transition: { duration: 0.8, ease: "easeOut" },
    }),
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!uploadUrl) {
      alert("Please upload an image first.");
      return;
    }

    // Convert the colours input into an array (splitting by comma)
    const coloursArray = coloursInput
      .split(",")
      .map((color) => color.trim())
      .filter(Boolean);

    startTransition(() => {
      createProduct({
        collection,
        name: productName,
        showReviews,
        price: parseFloat(price),
        inStock,
        shippingPrice: parseFloat(shippingPrice),
        colours: coloursArray,
        description,
        productDetails,
        imageUrl: uploadUrl,
        isOnSale,
        originalPrice: isOnSale ? parseFloat(originalPrice) : null,
      }).then((res) => {
        console.log("Product created", res);
        onProductCreated(res);
      });
    });
  }

  const handleSectionChange = (newSection: string) => {
    const sections = ["basic", "details", "pricing", "images"];
    const currentIndex = sections.indexOf(activeSection);
    const newIndex = sections.indexOf(newSection);

    // Set direction for animation
    setDirection(newIndex > currentIndex ? 1 : -1);
    setActiveSection(newSection);
  };

  const handleNextSection = () => {
    const sections = ["basic", "details", "pricing", "images"];
    const currentIndex = sections.indexOf(activeSection);
    const nextIndex = (currentIndex + 1) % sections.length;

    setDirection(1);
    setActiveSection(sections[nextIndex]);
  };

  const renderFormSection = () => {
    switch (activeSection) {
      case "basic":
        return (
          <BasicInfoSection
            collection={collection}
            setCollection={setCollection}
            productName={productName}
            setProductName={setProductName}
            showReviews={showReviews}
            setShowReviews={setShowReviews}
            inStock={inStock}
            setInStock={setInStock}
          />
        );
      case "details":
        return (
          <DetailsSection
            coloursInput={coloursInput}
            setColoursInput={setColoursInput}
            description={description}
            setDescription={setDescription}
            productDetails={productDetails}
            setProductDetails={setProductDetails}
          />
        );
      case "pricing":
        return (
          <PricingSection
            price={price}
            setPrice={setPrice}
            shippingPrice={shippingPrice}
            setShippingPrice={setShippingPrice}
            isOnSale={isOnSale}
            setIsOnSale={setIsOnSale}
            originalPrice={originalPrice}
            setOriginalPrice={setOriginalPrice}
          />
        );
      case "images":
        return (
          <ImagesSection uploadUrl={uploadUrl} setUploadUrl={setUploadUrl} />
        );
      default:
        return null;
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="border border-gray-800 relative overflow-hidden"
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Progress bar */}
      <motion.div
        className="absolute top-0 left-0 h-1 bg-white"
        variants={progressVariants}
        initial="initial"
        animate="animate"
        custom={formCompletionPercentage}
      />

      {/* Form Navigation */}
      <FormNavigation
        activeSection={activeSection}
        setActiveSection={handleSectionChange}
      />

      {/* Form Content */}
      <div className="px-5 overflow-hidden min-h-[380px]">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={activeSection}
            custom={direction}
            variants={sectionVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="py-4"
          >
            {renderFormSection()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Form Actions */}
      <motion.div className="border-t border-gray-800 p-5 flex flex-col sm:flex-row justify-end">
        <motion.button
          type="button"
          className="w-full mb-3 sm:mb-0 sm:w-auto sm:mr-3 border border-white py-2 px-6 font-medium hover:bg-white hover:text-black transition-colors text-sm"
          onClick={handleNextSection}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          Next Section
        </motion.button>

        <motion.button
          type="submit"
          className="w-full sm:w-auto bg-white text-black py-2 px-8 font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:hover:bg-white text-sm"
          disabled={isPending || !uploadUrl}
          variants={buttonVariants}
          whileHover={!isPending && uploadUrl ? "hover" : "disabled"}
          whileTap={!isPending && uploadUrl ? "tap" : "disabled"}
          animate={isPending || !uploadUrl ? "disabled" : "initial"}
        >
          {isPending ? "Creating..." : "Create Product"}
        </motion.button>
      </motion.div>
    </motion.form>
  );
}
