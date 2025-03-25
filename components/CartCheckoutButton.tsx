"use client";

import React from "react";
import { loadStripe } from "@stripe/stripe-js";

export default function CartCheckoutButton({
  cart,
}: {
  cart: {
    CartItem: {
      Product: { name: string; imageUrl: string; price: number };
      quantity: number;
    }[];
  };
}) {
  const handleCheckout = async () => {
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
    ).catch((error) => {
      console.error("Stripe initialization failed:", error);
      return null;
    });
    if (!stripe) {
      // Handle the error, e.g., show an error message to the user
      console.error("Stripe not initialized");
      return;
    }
    interface Product {
      name: string;
      imageUrl: string;
      price: number;
    }

    interface CartItem {
      Product: Product;
      quantity: number;
    }

    interface Cart {
      CartItem: CartItem[];
    }

    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items:
          cart?.CartItem?.map((item: CartItem) => ({
            name: item.Product.name,
            image: item.Product.imageUrl,
            price: item.Product.price,
            quantity: item.quantity,
          })) || [],
      }),
    });
    const { id } = await response.json();
    stripe?.redirectToCheckout({ sessionId: id });
  };

  return (
    <button
      className="mt-4 w-full rounded-md bg-blue-600 py-3 text-white hover:bg-blue-700"
      onClick={handleCheckout}
    >
      Proceed to Checkout
    </button>
  );
}
