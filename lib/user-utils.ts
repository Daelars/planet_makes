import { auth, currentUser } from "@clerk/nextjs/server";
import { nanoid } from "nanoid";
import { prisma } from "./prisma";

export async function getOrCreateUser() {
  // Get the current user from Clerk
  const user = await currentUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  // Check if user exists in your database
  let dbUser = await prisma.user.findUnique({
    where: { clerkId: user.id },
    include: {
      Cart: true,
    },
  });

  // If user doesn't exist, create a new one with cart
  if (!dbUser) {
    const primaryEmail = user.emailAddresses.find(
      (email) => email.id === user.primaryEmailAddressId
    )?.emailAddress;

    if (!primaryEmail) {
      throw new Error("User does not have a primary email address");
    }

    // Use a transaction to create both user and cart
    dbUser = await prisma.$transaction(async (tx) => {
      const userId = nanoid();
      const cartId = nanoid();

      const newUser = await tx.user.create({
        data: {
          id: userId,
          clerkId: user.id,
          email: primaryEmail,
          name: `${user.firstName || ""} ${user.lastName || ""}`.trim() || null,
          updatedAt: new Date(),
          Cart: {
            create: {
              id: cartId,
              updatedAt: new Date(),
            },
          },
        },
        include: {
          Cart: true,
        },
      });

      return newUser;
    });
  }

  return dbUser;
}

export async function getUserId() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const dbUser = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!dbUser) {
    throw new Error("User not found in database");
  }

  return dbUser.id;
}

export async function getUserCart() {
  const user = await getOrCreateUser();

  if (!user.Cart) {
    // This shouldn't happen with proper user creation, but just in case
    const cartId = nanoid();
    const cart = await prisma.cart.create({
      data: {
        id: cartId,
        userId: user.id,
        updatedAt: new Date(),
      },
      include: {
        CartItem: {
          include: {
            Product: true,
          },
        },
      },
    });

    return cart;
  }

  // Return cart with items and product details
  return await prisma.cart.findUnique({
    where: { id: user.Cart.id },
    include: {
      CartItem: {
        include: {
          Product: true,
        },
      },
    },
  });
}
