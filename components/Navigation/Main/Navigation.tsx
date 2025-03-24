//Components/Main/Navigation.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  ShoppingCart,
  Menu,
  X,
  ChevronRight,
  Plus,
  Minus,
  Trash2,
} from "lucide-react";
// NEW: Import Clerk components
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";
import { loadStripe } from "@stripe/stripe-js";

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const MenuLink = ({
  label,
  delay = 0,
  isOpen,
}: {
  label: string;
  delay?: number;
  isOpen: boolean;
}) => {
  return (
    <div
      className={`overflow-hidden transition-transform duration-700 ${
        isOpen ? "translate-y-0" : "-translate-y-full"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <a
        href="#"
        className="group block items-center py-2 text-xl font-bold sm:py-3 sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl"
      >
        <span className="relative inline-block">
          <span className="touch-device:active:translate-x-2 block transition-transform duration-300 group-hover:translate-x-2">
            {label}
          </span>
          <span className="touch-device:active:w-full absolute bottom-0 left-0 h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
        </span>
        <ChevronRight
          className="touch-device:active:opacity-100 touch-device:active:translate-x-1 ml-2 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
          size={16}
        />
      </a>
    </div>
  );
};

const CartItem = ({
  item,
  updateQuantity,
  removeItem,
}: {
  item: {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    color: string;
    size: string;
  };
  updateQuantity: (id: number, newQuantity: number) => void;
  removeItem: (id: number) => void;
}) => {
  return (
    <div className="flex border-b border-gray-800 py-4">
      <div className="h-30 mr-4 w-24 bg-gray-900">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex-grow">
        <div className="flex items-start justify-between">
          <h3 className="text-sm font-medium sm:text-base">{item.name}</h3>
          <button
            onClick={() => removeItem(item.id)}
            className="p-1 text-gray-400 hover:text-white"
            aria-label="Remove item"
          >
            <Trash2 size={16} />
          </button>
        </div>

        <div className="mt-1 text-sm text-gray-400">
          <p>
            {item.color} / {item.size}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center border border-gray-700">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="px-2 py-1 text-gray-400 hover:text-white disabled:opacity-50"
              aria-label="Decrease quantity"
            >
              <Minus size={14} />
            </button>
            <span className="min-w-8 px-2 py-1 text-center text-sm">
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
            ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]); // Start with an empty cart
  const menuRef = useRef<HTMLDivElement | null>(null);
  const cartRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => {
    if (isCartOpen) setIsCartOpen(false);
    setIsMenuOpen(!isMenuOpen);
    // Prevent scrolling when menu is open
    if (!isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  const toggleCart = () => {
    if (isMenuOpen) setIsMenuOpen(false);
    setIsCartOpen(!isCartOpen);
    if (!isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  // Close menu/cart if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (target) {
        if (menuRef.current && !menuRef.current.contains(target)) {
          if (isMenuOpen) {
            setIsMenuOpen(false);
            document.body.style.overflow = "auto";
          }
        }
        if (cartRef.current && !cartRef.current.contains(target)) {
          if (isCartOpen) {
            setIsCartOpen(false);
            document.body.style.overflow = "auto";
          }
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen, isCartOpen]);

  const menuItems = [
    "Collections",
    "New Arrivals",
    "Products",
    "Accessories",
    "About Us",
    "Contact",
  ];

  interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    color: string;
    size: string;
  }

  const updateQuantity = (id: number, newQuantity: number): void => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map((item: CartItem) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  interface RemoveItem {
    (id: number): void;
  }

  const removeItem: RemoveItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Calculate total
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = 4.99;
  const total = subtotal + shipping;

  const cartItemCount = cartItems.reduce(
    (count, item) => count + item.quantity,
    0,
  );

  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error("Stripe initialization failed");

      // Fetch the checkout session from the server
      const response = await fetch("/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const { sessionId } = await response.json();

      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({ sessionId });
      if (result.error) {
        console.error("Stripe Checkout error:", result.error.message);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("An error occurred during checkout. Please try again.");
    }
  };

  // NEW: Fetch cart items from our API on component mount
  useEffect(() => {
    async function loadCart() {
      try {
        const res = await fetch("/api/cart");
        if (res.ok) {
          const data = await res.json();
          // Ensure data is an array; if not, default to an empty array.
          setCartItems(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Error loading cart:", error);
      }
    }
    loadCart();
  }, []);

  return (
    <>
      <nav className="left-0 top-0 z-50 flex w-full items-center justify-between bg-black p-3 font-mono text-white sm:p-4">
        <div className="flex items-center">
          <button
            className="relative z-50 flex items-center text-base font-medium hover:cursor-pointer sm:text-lg"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <>
                <span className="sr-only sm:not-sr-only">Close</span>{" "}
                <X className="ml-0 sm:ml-2" size={16} />
              </>
            ) : (
              <>
                <span className="sr-only sm:not-sr-only">Menu</span>{" "}
                <Menu className="ml-0 sm:ml-2" size={16} />
              </>
            )}
          </button>
        </div>
        <div className="text-base font-medium sm:text-lg">009</div>
        <div className="flex items-center space-x-4">
          <button
            className="relative z-50 flex items-center text-base font-medium hover:cursor-pointer sm:text-lg"
            onClick={toggleCart}
            aria-expanded={isCartOpen}
            aria-label="Shopping cart"
          >
            <span className="sr-only sm:not-sr-only">Cart</span>
            <ShoppingCart className="ml-0 sm:hidden" size={16} />
            <sup className="ml-1">{cartItemCount}</sup>
          </button>
          {/* NEW: Clerk authentication UI */}
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <div className="flex space-x-2">
              <SignInButton>
                <button className="border border-white px-2 py-1 transition-colors hover:bg-white hover:text-black">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="border border-white px-2 py-1 transition-colors hover:bg-white hover:text-black">
                  Sign Up
                </button>
              </SignUpButton>
            </div>
          </SignedOut>
        </div>
      </nav>

      {/* Fullscreen Menu */}
      <div
        className={`fixed inset-0 z-40 overflow-y-auto bg-black font-mono text-white transition-transform duration-500 ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
        ref={menuRef}
      >
        <div className="container mx-auto flex h-full flex-col justify-between px-4 pb-6 pt-20 sm:px-6 sm:py-24 md:px-12 md:py-32">
          <div className="space-y-1 sm:space-y-2">
            {menuItems.map((item, index) => (
              <MenuLink
                key={item}
                label={item}
                delay={index * 100}
                isOpen={isMenuOpen}
              />
            ))}
          </div>

          <div
            className={`mt-6 transition-all delay-500 duration-700 sm:mt-8 ${
              isMenuOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
              <div>
                <h3 className="mb-3 text-xs uppercase tracking-widest text-gray-400 sm:mb-4 sm:text-sm">
                  Follow Us
                </h3>
                <div className="flex flex-row space-x-4 sm:flex-col sm:space-x-0 sm:space-y-2">
                  <a href="#" className="text-xs hover:underline sm:text-sm">
                    Instagram
                  </a>
                  <a href="#" className="text-xs hover:underline sm:text-sm">
                    TikTok
                  </a>
                  <a href="#" className="text-xs hover:underline sm:text-sm">
                    Facebook
                  </a>
                </div>
              </div>
              <div className="mt-6 sm:mt-0">
                <h3 className="mb-3 text-xs uppercase tracking-widest text-gray-400 sm:mb-4 sm:text-sm">
                  Newsletter
                </h3>
                <div className="flex border-b border-white">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full flex-grow bg-transparent py-1 text-xs focus:outline-none sm:py-2 sm:text-sm"
                  />
                  <button className="whitespace-nowrap px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Slide-in Panel */}
      <div
        className={`fixed inset-y-0 right-0 z-40 w-full transform bg-black font-mono text-white transition-transform duration-500 ease-in-out sm:w-96 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
        ref={cartRef}
      >
        <div className="flex h-full flex-col">
          {/* Cart Header */}
          <div className="mt-14 flex items-center justify-between border-b border-gray-800 p-4 sm:mt-16">
            <h2 className="text-lg font-medium">
              Shopping Cart ({cartItemCount})
            </h2>
            <button
              onClick={toggleCart}
              className="p-1 transition-colors hover:text-gray-400"
              aria-label="Close cart"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Body */}
          <div className="flex-grow overflow-y-auto p-4">
            {cartItems.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <p className="mb-4 text-gray-400">Your cart is empty</p>
                <button
                  onClick={toggleCart}
                  className="border border-white px-4 py-2 transition-colors hover:bg-white hover:text-black"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    updateQuantity={updateQuantity}
                    removeItem={removeItem}
                  />
                ))}
              </>
            )}
          </div>

          {/* Cart Footer */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-800 p-4">
              <div className="mb-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-gray-800 pt-2 font-medium">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-white py-3 font-medium text-black transition-colors hover:bg-gray-200"
              >
                Checkout
              </button>

              <button
                onClick={toggleCart}
                className="mt-2 w-full border border-white py-3 font-medium transition-colors hover:bg-white hover:text-black"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Overlay for Cart */}
      {isCartOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50"
          onClick={toggleCart}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Navbar;
