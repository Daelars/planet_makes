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
    <div className="mx-auto w-full max-w-md rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">
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
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              rows={4}
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className={`flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm ${
            isPending
              ? "cursor-not-allowed bg-indigo-400"
              : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          }`}
        >
          {isPending ? "Placing order..." : "Place Order"}
        </button>
      </form>
    </div>
  );
}
