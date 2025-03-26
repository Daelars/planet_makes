// Components/Cart/Cart.tsx
"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { X, Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { getCartItems } from "@/app/actions/cart"; // Import the server action
import { Product, CartItem } from "@/types/global.types";

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
        method: "PATCH", // Change this from "POST" to "PATCH"
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId: id, quantity: newQuantity }),
      });

      if (response.ok) {
        router.refresh(); // Refresh the cart after update
      }
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };

  const removeItem = async (id: string) => {
    try {
      const response = await fetch("/api/cart/remove", {
        method: "DELETE", // Use DELETE method as expected by the server
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItemId: id }), // Send the correct parameter name
      });

      if (response.ok) {
        router.refresh(); // Refresh the cart on removal
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
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Calculate total
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  // Function to fetch cart items
  const fetchCartItems = useCallback(async () => {
    setIsLoading(true);
    try {
      const items = await getCartItems();
      setCartItems(
        items.map((item) => ({
          ...item,
          product: { ...item.product, image: item.product.imageUrl },
        }))
      );
    } catch (error) {
      console.error("Error fetching cart items:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load cart items when the component mounts
  useEffect(() => {
    if (isOpen) {
      fetchCartItems();
    }
  }, [isOpen, fetchCartItems]);

  // Handle outside click to close the cart
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Handle escape key to close the cart
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen]);

  // Update quantity function
  const updateQuantity = async (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    try {
      const response = await fetch("/api/cart/update", {
        method: "PATCH", // Using PATCH as updated before
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItemId: id, quantity: newQuantity }),
      });

      if (response.ok) {
        // Update local state so the UI reflects the new quantity immediately
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.id === id ? { ...item, quantity: newQuantity } : item
          )
        );
        // Optionally, update other UI elements that depend on the cart state (like totals)
      }
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };

  // Remove item function
  const removeItem = async (id: string) => {
    try {
      const response = await fetch("/api/cart/remove", {
        method: "DELETE", // Use DELETE as defined in your API
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItemId: id }), // Send the correct parameter name
      });

      if (response.ok) {
        // Update local state
        setCartItems((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error("Error removing cart item:", error);
    }
  };

  // Function to checkout
  const handleCheckout = () => {
    setIsOpen(false);
    router.push("/checkout");
  };

  // Toggle cart open/closed
  const toggleCart = () => {
    setIsOpen((prev) => !prev);
  };

  if (!isOpen) {
    // Return a cart button only when cart is closed
    return (
      <button
        onClick={toggleCart}
        className="relative p-2 text-white hover:text-gray-300"
        aria-label="Open cart"
      >
        <ShoppingCart size={24} />
        {cartItems.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-white text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {cartItems.length}
          </span>
        )}
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div
        ref={cartRef}
        className="w-full max-w-md bg-black text-white h-full overflow-auto flex flex-col"
      >
        <div className="p-4 border-b border-gray-800 flex justify-between items-center">
          <h2 className="text-xl font-medium">Your Cart</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 text-gray-400 hover:text-white"
            aria-label="Close cart"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-grow overflow-auto p-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <p>Loading cart...</p>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48">
              <p className="text-gray-400 mb-4">Your cart is empty</p>
              <button
                onClick={() => {
                  setIsOpen(false);
                  router.push("/products");
                }}
                className="px-4 py-2 bg-white text-black font-medium hover:bg-gray-200 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {cartItems.map((item) => (
                <CartItemComponent
                  key={item.id}
                  item={item}
                  updateQuantity={updateQuantity}
                  removeItem={removeItem}
                />
              ))}
            </>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-4 border-t border-gray-800">
            <div className="flex justify-between mb-4">
              <span className="font-medium">Subtotal</span>
              <span className="font-medium">${cartTotal.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-white text-black py-3 font-medium hover:bg-gray-200 transition-colors"
            >
              Checkout
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                router.push("/cart");
              }}
              className="w-full border border-white text-white py-3 mt-2 font-medium hover:bg-white hover:text-black transition-colors"
            >
              View Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
