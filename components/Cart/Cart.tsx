// Components/Cart/Cart.tsx
"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { X, Trash2, Plus, Minus } from "lucide-react";
import { useRouter } from "next/navigation";

// Define the types based on your data model
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  color?: string;
  size?: string;
}

export interface CartItem {
  id: string;
  quantity: number;
  product: Product;
  color?: string;
  size?: string;
}

interface CartData {
  id: string;
  cartItems: CartItem[];
}

// Component for individual cart items (used in the slide‑in cart)
interface CartItemComponentProps {
  item: CartItem;
  updateQuantity: (id: string, newQuantity: number) => void;
  removeItem: (id: string) => void;
}

export const CartItemComponent: React.FC<CartItemComponentProps> = ({
  item,
  updateQuantity,
  removeItem,
}) => {
  return (
    <div className="flex border-b border-gray-800 py-4">
      <div className="w-24 h-30 bg-gray-900 mr-4">
        <img
          src={item.product.image || "/api/placeholder/120/150"}
          alt={item.product.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-grow">
        <div className="flex justify-between items-start">
          <h3 className="text-sm sm:text-base font-medium">
            {item.product.name}
          </h3>
          <button
            onClick={() => removeItem(item.id)}
            className="text-gray-400 hover:text-white p-1"
            aria-label="Remove item"
          >
            <Trash2 size={16} />
          </button>
        </div>

        <div className="text-sm text-gray-400 mt-1">
          <p>
            {item.color || item.product.color || "Default"} /{" "}
            {item.size || item.product.size || "Standard"}
          </p>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center border border-gray-700">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="px-2 py-1 text-gray-400 hover:text-white disabled:opacity-50"
              aria-label="Decrease quantity"
            >
              <Minus size={14} />
            </button>
            <span className="px-2 py-1 min-w-8 text-center text-sm">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="px-2 py-1 text-gray-400 hover:text-white"
              aria-label="Increase quantity"
            >
              <Plus size={14} />
            </button>
          </div>

          <p className="font-medium">
            ${(item.product.price * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

// Component for displaying a single cart item on the cart page (server‐page style)
interface CartPageItemProps {
  item: CartItem;
}

export const CartPageItem: React.FC<CartPageItemProps> = ({ item }) => {
  const router = useRouter();

  const updateQuantity = async (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    try {
      const response = await fetch("/api/cart/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId: id, quantity: newQuantity }),
      });

      if (response.ok) {
        router.refresh(); // Use the same refresh logic as in the server cart page
      }
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };

  const removeItem = async (id: string) => {
    try {
      const response = await fetch("/api/cart/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId: id }),
      });

      if (response.ok) {
        router.refresh(); // Refresh the whole route on removal
      }
    } catch (error) {
      console.error("Error removing cart item:", error);
    }
  };

  return (
    <div className="flex border border-gray-200 rounded-md p-4 bg-white shadow-sm">
      <div className="w-24 h-24 bg-gray-100 mr-4">
        <img
          src={item.product.image || "/api/placeholder/120/150"}
          alt={item.product.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-grow">
        <div className="flex justify-between items-start">
          <h3 className="font-medium">{item.product.name}</h3>
          <button
            onClick={() => removeItem(item.id)}
            className="text-gray-500 hover:text-red-500 p-1"
            aria-label="Remove item"
          >
            <Trash2 size={16} />
          </button>
        </div>

        {(item.color ||
          item.product.color ||
          item.size ||
          item.product.size) && (
          <div className="text-sm text-gray-500 mt-1">
            <p>
              {item.color || item.product.color || ""}
              {(item.color || item.product.color) &&
              (item.size || item.product.size)
                ? " / "
                : ""}
              {item.size || item.product.size || ""}
            </p>
          </div>
        )}

        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center border border-gray-300 rounded">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="px-2 py-1 text-gray-500 hover:text-black disabled:opacity-50"
              aria-label="Decrease quantity"
            >
              <Minus size={14} />
            </button>
            <span className="px-2 py-1 min-w-8 text-center text-sm">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="px-2 py-1 text-gray-500 hover:text-black"
              aria-label="Increase quantity"
            >
              <Plus size={14} />
            </button>
          </div>

          <p className="font-medium">
            ${(item.product.price * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

// Main Cart component (the slide‑in cart for the navbar)
export default function Cart() {
  // Removed cart functionality
  return null;
}
