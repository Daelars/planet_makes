import { nanoid } from "nanoid";
import { prisma } from "./prisma";
import { getUserCart } from "./user-utils";

// Removed cart utility functions

export async function addToCart(productId: string, quantity: number) {
  // Cart functionality removed
}

export async function updateCartItem(cartItemId: string, quantity: number) {
  // Cart functionality removed
}

export async function removeCartItem(cartItemId: string) {
  // Cart functionality removed
}

export async function clearCart() {
  // Cart functionality removed
}
