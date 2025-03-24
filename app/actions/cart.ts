// app/actions/cart.ts
"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Get user's cart with items
export async function getCart() {
  const { userId } = await auth();
  if (!userId) return null;

  try {
    return await prisma.cart.findFirst({
      where: { user: { clerkId: userId } },
      include: {
        cartItems: {
          include: {
            product: true,
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw new Error("Failed to retrieve cart");
  }
}

// Add item to cart with color/size options
export async function addToCart(
  productId: string,
  quantity: number = 1,
  color: string = "default",
  size: string = "standard"
) {
  const { userId } = await auth();
  if (!userId) throw new Error("Authentication required");

  try {
    // Get user with cart
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: { cart: true },
    });

    if (!user) throw new Error("User not found");

    // Create cart if it doesn't exist
    let cart = user.cart;
    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          id: crypto.randomUUID(),
          userId: user.id,
          updatedAt: new Date(),
        },
      });
    }

    // Check for existing item with same configuration
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId,
      },
    });

    if (existingItem) {
      // Update existing item quantity
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
    } else {
      // Create new cart item
      await prisma.cartItem.create({
        data: {
          id: crypto.randomUUID(),
          cartId: cart.id,
          productId,
          quantity,
          updatedAt: new Date(),
        },
      });
    }

    revalidatePath("/cart");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw new Error("Failed to add item to cart");
  }
}

// Remove item from cart
export async function removeFromCart(cartItemId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Authentication required");

  try {
    // Verify user owns the cart item
    const cart = await prisma.cart.findFirst({
      where: { user: { clerkId: userId } },
      include: { cartItems: true },
    });

    if (!cart) throw new Error("Cart not found");

    const itemExists = cart.cartItems.some((item) => item.id === cartItemId);
    if (!itemExists) throw new Error("Item not found in cart");

    await prisma.cartItem.delete({
      where: { id: cartItemId },
    });

    revalidatePath("/cart");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error removing item:", error);
    throw new Error("Failed to remove item from cart");
  }
}

// Update item quantity
export async function updateCartItemQuantity(
  cartItemId: string,
  quantity: number
) {
  const { userId } = await auth();
  if (!userId) throw new Error("Authentication required");

  try {
    // Verify user owns the cart item
    const cart = await prisma.cart.findFirst({
      where: { user: { clerkId: userId } },
      include: { cartItems: true },
    });

    if (!cart) throw new Error("Cart not found");

    const itemExists = cart.cartItems.some((item) => item.id === cartItemId);
    if (!itemExists) throw new Error("Item not found in cart");

    await prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity },
    });

    revalidatePath("/cart");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error updating quantity:", error);
    throw new Error("Failed to update item quantity");
  }
}

// Get cart items for display
export async function getCartItems() {
  const { userId } = await auth();
  if (!userId) return [];

  try {
    const cart = await prisma.cart.findFirst({
      where: { user: { clerkId: userId } },
      include: {
        cartItems: {
          include: {
            product: true,
          },
        },
      },
    });

    return cart?.cartItems || [];
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return [];
  }
}

// Clear entire cart
export async function clearCart() {
  const { userId } = await auth();
  if (!userId) throw new Error("Authentication required");

  try {
    const cart = await prisma.cart.findFirst({
      where: { user: { clerkId: userId } },
    });

    if (!cart) return { success: true };

    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    revalidatePath("/cart");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error clearing cart:", error);
    throw new Error("Failed to clear cart");
  }
}
