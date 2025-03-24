import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { nanoid } from "nanoid";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const primaryEmail = user.emailAddresses.find(
      (email) => email.id === user.primaryEmailAddressId
    )?.emailAddress;

    if (!primaryEmail) {
      return NextResponse.json(
        { error: "User does not have a primary email address" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { clerkId: user.id },
      include: { Cart: true },
    });

    if (existingUser) {
      // User already exists, update their information
      const updatedUser = await prisma.user.update({
        where: { id: existingUser.id },
        data: {
          email: primaryEmail,
          name: `${user.firstName || ""} ${user.lastName || ""}`.trim() || null,
          updatedAt: new Date(),
        },
        include: { Cart: true },
      });

      return NextResponse.json({ user: updatedUser }, { status: 200 });
    }

    // Create new user and cart in a transaction
    const userId = nanoid();
    const cartId = nanoid();

    const newUser = await prisma.$transaction(async (tx) => {
      // Create user
      const createdUser = await tx.user.create({
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

      return createdUser;
    });

    return NextResponse.json({ user: newUser }, { status: 201 });
  } catch (error) {
    console.error("Error in sign-up route:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
