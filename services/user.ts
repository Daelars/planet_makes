// services/user.ts
import { PrismaClient } from "@prisma/client";
import { User } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function createOrUpdateUser(clerkUser: User) {
  console.debug("createOrUpdateUser called", clerkUser);
  try {
    // Check if user already exists in your database
    const existingUser = await prisma.user.findUnique({
      where: {
        clerkId: clerkUser.id,
      },
    });

    if (existingUser) {
      const updated = await prisma.user.update({
        where: {
          clerkId: clerkUser.id,
        },
        data: {
          email: clerkUser.emailAddresses[0]?.emailAddress || "",
          updatedAt: new Date(),
        },
      });
      console.debug("User updated", updated);
      return updated;
    } else {
      const created = await prisma.user.create({
        data: {
          id: crypto.randomUUID(), // Generate a unique ID for the user
          clerkId: clerkUser.id,
          email: clerkUser.emailAddresses[0]?.emailAddress || "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
      console.debug("User created", created);
      return created;
    }
  } catch (error) {
    console.error("Error syncing user with database:", error);
    throw error;
  }
}

export async function getUserByClerkId(clerkId: string) {
  console.debug("getUserByClerkId called with:", clerkId);
  return await prisma.user.findUnique({
    where: {
      clerkId,
    },
  });
}
