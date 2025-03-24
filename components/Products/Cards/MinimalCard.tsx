"use client";
import React, { useState } from "react";
import {
  ShoppingCart,
  Heart,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
} from "lucide-react";

interface ProductImage {
  id: string;
  imageUrl: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: ProductImage[];
  colors?: string[];
  sizes?: string[];
  isOnSale?: boolean;
  originalPrice?: number;
  imageUrl?: string;
}

interface MinimalProductCardProps {
  product: Product;
  layout?: "grid" | "list";
}

const MinimalProductCard: React.FC<MinimalProductCardProps> = ({
  product,
  layout = "grid",
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showDetails, setShowDetails] = useState(false);

  // Sample color and size options if not provided
  const colors = product.colors || ["Black", "White", "Gray"];
  const sizes = product.sizes || ["S", "M", "L"];

  // Use the first image if available; fallback to a placeholder
  const imageUrl = product.images?.[0]?.imageUrl || "/api/placeholder/600/600";

  // Calculate discount if on sale
  const discount =
    product.isOnSale && product.originalPrice
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100
        )
      : 0;

  // Handlers
  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const toggleLike = () => setIsLiked(!isLiked);
  const toggleDetails = () => setShowDetails(!showDetails);

  return (
    <div
      className={`font-mono ${
        layout === "grid" ? "max-w-sm" : "max-w-4xl"
      } mx-auto`}
    >
      <div className="bg-black border border-gray-800 hover:border-gray-600 transition-all duration-300">
        <div
          className={`${
            layout === "list" ? "flex flex-col md:flex-row" : "flex flex-col"
          }`}
        >
          {/* Product Image */}
          <div
            className={`relative ${
              layout === "list" ? "md:w-1/2" : "w-full"
            } overflow-hidden`}
          >
            {product.isOnSale && (
              <div className="absolute top-2 left-2 bg-white text-black px-3 py-1 text-xs z-10">
                SALE
              </div>
            )}
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full h-64 object-contain p-4 transition-transform duration-500 hover:scale-105"
            />
            <button
              onClick={toggleLike}
              className="absolute top-2 right-2 p-2 bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-colors"
              aria-label={
                isLiked ? "Remove from favorites" : "Add to favorites"
              }
            >
              <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
            </button>
          </div>

          {/* Product Details */}
          <div
            className={`p-4 ${
              layout === "list" ? "md:w-1/2" : "w-full"
            } flex flex-col text-white`}
          >
            <div>
              <span className="text-xs uppercase tracking-widest mb-1 block text-gray-400">
                {product.category}
              </span>
              <h3 className="text-lg font-medium text-white mb-2">
                {product.name}
              </h3>

              {/* Price */}
              <div className="mb-4">
                <div className="flex items-center">
                  <span className="text-lg font-medium text-white">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.isOnSale && product.originalPrice && (
                    <>
                      <span className="text-sm text-gray-400 line-through ml-2">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                      <span className="ml-2 text-sm font-medium text-white">
                        {discount}% off
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Colors */}
              <div className="mb-4">
                <span className="text-xs uppercase tracking-widest mb-2 block text-gray-400">
                  Color: {colors[selectedColor]}
                </span>
                <div className="flex space-x-2">
                  {colors.map((color, index) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(index)}
                      className={`w-6 h-6 ${
                        color.toLowerCase() === "black"
                          ? "bg-black"
                          : color.toLowerCase() === "white"
                          ? "bg-white"
                          : color.toLowerCase() === "gray"
                          ? "bg-gray-400"
                          : "bg-gray-800"
                      } ${
                        selectedColor === index
                          ? "border-2 border-white"
                          : "border border-transparent"
                      }`}
                      aria-label={`Select ${color} color`}
                    ></button>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="mb-4">
                <span className="text-xs uppercase tracking-widest mb-2 block text-gray-400">
                  Size: {sizes[selectedSize]}
                </span>
                <div className="flex space-x-2">
                  {sizes.map((size, index) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(index)}
                      className={`w-8 h-8 flex items-center justify-center ${
                        selectedSize === index
                          ? "bg-white text-black"
                          : "border border-gray-600 text-white"
                      }`}
                      aria-label={`Select size ${size}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-4">
                <span className="text-xs uppercase tracking-widest mb-2 block text-gray-400">
                  Quantity
                </span>
                <div className="flex items-center border border-gray-700 w-min">
                  <button
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className="px-2 py-1 text-gray-400 hover:text-white disabled:opacity-50"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="px-4 py-1 min-w-8 text-center text-sm">
                    {quantity}
                  </span>
                  <button
                    onClick={incrementQuantity}
                    className="px-2 py-1 text-gray-400 hover:text-white"
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Product Details Toggle */}
              <div className="mb-4">
                <button
                  onClick={toggleDetails}
                  className="flex items-center justify-between w-full py-2 border-t border-b border-gray-800 text-sm text-white"
                >
                  <span>Product Details</span>
                  {showDetails ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>
                {showDetails && (
                  <div className="py-2 text-sm text-gray-400">
                    <p>{product.description}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Add to Cart / Buy Now */}
            <div className="flex space-x-2 mt-auto">
              <button className="flex-1 bg-white text-black py-2 font-medium hover:bg-gray-200 transition-colors flex items-center justify-center">
                <ShoppingCart size={16} className="mr-2" />
                Add
              </button>
              <button className="flex-1 border border-white text-white py-2 font-medium hover:bg-white hover:text-black transition-colors">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinimalProductCard;
