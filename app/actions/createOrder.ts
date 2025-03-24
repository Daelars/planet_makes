/**
 * @file createOrder.ts
 * @description Server action for creating a new order in the database
 */

"use server";

import { prisma } from "@/lib/prisma";

/**
 * Interface for order item data
 */
interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

/**
 * Creates a new order in the database
 *
 * @param userId - The ID of the user placing the order
 * @param items - Array of order items with product details
 * @returns The created order object
 */
export async function createOrder(
  userId: string,
  items: OrderItem[]
): Promise<any> {
  // Calculate the total price of all items in the order
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  try {
    // Create the order and associated order items in a single transaction
    const order = await prisma.order.create({
      data: {
        id: crypto.randomUUID(),
        updatedAt: new Date(),
        userId,
        status: "PENDING",
        total,
        OrderItem: {
          create: items.map((item) => ({
            id: crypto.randomUUID(),
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            updatedAt: new Date(),
            Product: {
              connect: { id: item.productId },
            },
          })),
        },
      },
      // Include order items in the returned data
      include: {
        OrderItem: true,
      },
    });

    return order;
  } catch (error) {
    console.error("Failed to create order:", error);
    throw new Error("Failed to create order");
  }
}
