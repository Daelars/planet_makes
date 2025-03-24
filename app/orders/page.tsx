// /app/orders/createOrderForm.tsx
"use client";

import { useTransition } from "react";
import { createOrder } from "../actions/createOrder";

export default function CreateOrderForm() {
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const userId = formData.get("userId") as string;
    // For demo purposes, assume items is a JSON string.
    const items = JSON.parse(formData.get("items") as string);

    startTransition(() => {
      createOrder(userId, items).then((order) => {
        console.log("Order created:", order);
        // You can redirect or update UI accordingly.
      });
    });
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Create New Order
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* In a real app, derive this from your Clerk session */}
        <input type="hidden" name="userId" value="currentUserId" />

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Order Items (JSON):
            <textarea
              name="items"
              defaultValue='[{"productId": "prod_123", "quantity": 1, "price": 29.99}]'
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              rows={4}
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            isPending
              ? "bg-indigo-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          }`}
        >
          {isPending ? "Placing order..." : "Place Order"}
        </button>
      </form>
    </div>
  );
}
