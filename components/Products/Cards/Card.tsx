"use client";
import React, { useState } from "react";
import {
  ShoppingCart,
  Heart,
  Star,
  ChevronDown,
  Plus,
  Minus,
  Loader2,
} from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { addToCart } from "@/app/actions/cart"; // Import the server action
import { motion, AnimatePresence } from "framer-motion";
interface ProductCardProps {
  product: Product;
}

export interface Product {
  collection?: string;
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  rating?: number;
  reviewsCount?: number;
  isOnSale?: boolean;
  originalPrice?: number;
  images: { id: string; imageUrl: string }[];
  details?: string[]; // Array of product detail bullet points
}

interface ProductCardProps {
  product: Product;
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedColor, setSelectedColor] = useState("black");
  const [selectedSize, setSelectedSize] = useState("standard");
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [addToCartError, setAddToCartError] = useState<string | null>(null);

  // Retrieve the product image from the imageUrl field stored by UploadThing.
  const imageUrl = product.imageUrl || "/api/placeholder/600/600";
  const rating = product.rating ?? 4.2;
  const reviewsCount = product.reviewsCount ?? 128;

  // Calculate discount if on sale and originalPrice is provided.
  const discount =
    product.isOnSale && product.originalPrice
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100,
        )
      : 0;

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    e.currentTarget.src = "/api/placeholder/600/600";
  };

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    setAddToCartError(null);

    try {
      // Call the server action to add the item to cart
      const result = await addToCart(
        product.id,
        1, // Default quantity
        selectedColor,
        selectedSize,
      );

      if (result.success) {
        // Show success feedback (optional)
        // You could add a toast notification here
      } else {
        setAddToCartError("Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      setAddToCartError(
        error instanceof Error ? error.message : "Failed to add item to cart",
      );
    } finally {
      setIsAddingToCart(false);
    }
  };

  // Handle color selection
  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  const handleBuyNow = async () => {
    const stripe = await stripePromise;
    if (!stripe) {
      console.error("Stripe failed to initialize.");
      return;
    }

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
        }),
      });

      if (!response.ok) {
        console.error("Error creating checkout session:", response.statusText);
        const errorText = await response.text();
        console.error("Response body:", errorText);
        return;
      }

      const session = await response.json();
      await stripe.redirectToCheckout({ sessionId: session.id });
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  return (
    <div className="mx-auto max-w-4xl font-mono">
      <div className="overflow-hidden rounded-none border border-gray-800 bg-black transition-all duration-300 hover:border-gray-600">
        <div className="flex flex-col md:flex-row">
          {/* Left side - Product Image */}
          <div className="relative flex items-center justify-center overflow-hidden bg-black md:w-1/2">
            {product.isOnSale && (
              <div className="absolute left-2 top-2 z-10 bg-white px-3 py-1 text-xs font-bold text-black">
                SALE
              </div>
            )}
            <img
              src={imageUrl}
              alt={product.name}
              className="h-64 w-full object-contain p-4 transition-transform duration-500 hover:scale-105 md:h-full"
              onError={handleImageError}
            />
          </div>

          {/* Right side - Product Details */}
          <div className="flex flex-col justify-between p-6 text-white md:w-1/2">
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <span className="mb-1 block text-xs uppercase tracking-widest text-gray-400">
                    {product.collection || "Collection"}
                  </span>
                  <h3 className="mb-2 text-xl font-medium text-white">
                    {product.name}
                  </h3>
                </div>
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-2 ${
                    isLiked ? "text-white" : "text-gray-400"
                  } transition-colors hover:text-white`}
                >
                  <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
                </button>
              </div>

              {/* Rating */}
              <div className="mb-4 flex items-center">
                <div className="flex text-white">
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                </div>
                <span className="ml-2 text-sm text-gray-400">
                  {rating} ({reviewsCount})
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-center">
                  <span className="text-2xl font-medium text-white">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.isOnSale && product.originalPrice && (
                    <>
                      <span className="ml-2 text-sm text-gray-400 line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                      <span className="ml-2 text-sm font-medium text-white">
                        {discount}% off
                      </span>
                    </>
                  )}
                </div>
                <span className="mt-1 block text-sm text-gray-400">
                  In stock - Free shipping
                </span>
              </div>

              {/* Colors */}
              <div className="mb-6">
                <span className="mb-2 block text-xs uppercase tracking-widest text-gray-400">
                  Colors
                </span>
                <div className="flex space-x-3">
                  <button
                    className={`h-6 w-6 rounded-none bg-black ${
                      selectedColor === "black" ? "border-2" : "border"
                    } border-white`}
                    onClick={() => handleColorSelect("black")}
                    aria-label="Select black color"
                  ></button>
                  <button
                    className={`h-6 w-6 rounded-none bg-gray-400 ${
                      selectedColor === "gray"
                        ? "border-2 border-white"
                        : "border border-transparent"
                    }`}
                    onClick={() => handleColorSelect("gray")}
                    aria-label="Select gray color"
                  ></button>
                  <button
                    className={`h-6 w-6 rounded-none bg-white ${
                      selectedColor === "white"
                        ? "border-2 border-white"
                        : "border border-transparent"
                    }`}
                    onClick={() => handleColorSelect("white")}
                    aria-label="Select white color"
                  ></button>
                </div>
              </div>

              {/* Product Details with Framer Motion */}
              <div className="mb-6">
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="flex items-center text-sm text-white hover:underline"
                >
                  Product details
                  <ChevronDown
                    size={16}
                    className={`ml-1 transition-transform duration-300 ${
                      showDetails ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {showDetails && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-2 text-gray-400">
                        {product.description.split(" ").slice(0, 10).join(" ")}
                        {product.description.split(" ").length > 10
                          ? "..."
                          : ""}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Display error message if present */}
              {addToCartError && (
                <div className="mb-4 text-sm text-red-400">
                  {addToCartError}
                </div>
              )}
            </div>

            {/* Add to Cart / Buy Now */}
            <div className="flex flex-col space-y-2">
              <button
                className="flex w-full items-center justify-center bg-white py-3 font-medium text-black transition-colors hover:bg-gray-200 disabled:opacity-70"
                onClick={handleAddToCart}
                disabled={isAddingToCart}
              >
                {isAddingToCart ? (
                  <Loader2 size={16} className="mr-2 animate-spin" />
                ) : (
                  <ShoppingCart size={16} className="mr-2" />
                )}
                {isAddingToCart ? "Adding..." : "Add to Cart"}
              </button>
              <button
                className="w-full border border-white py-3 font-medium text-white transition-colors hover:bg-white hover:text-black"
                onClick={handleBuyNow}
                disabled={isAddingToCart}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
