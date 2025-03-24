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

    const userId = nanoid();
    const cartId = nanoid();
    const fullName =
      `${user.firstName || ""} ${user.lastName || ""}`.trim() || null;

    // Use upsert to update existing user or create new user and cart
    const upsertedUser = await prisma.user.upsert({
      where: { clerkId: user.id },
      update: {
        email: primaryEmail,
        name: fullName,
        updatedAt: new Date(),
      },
      create: {
        id: userId,
        clerkId: user.id,
        email: primaryEmail,
        name: fullName,
        updatedAt: new Date(),
        Cart: {
          create: {
            id: cartId,
            updatedAt: new Date(),
          },
        },
      },
      include: { Cart: true },
    });

    const status = upsertedUser.createdAt ? 201 : 200; // if created new, status 201; else 200
    return NextResponse.json({ user: upsertedUser }, { status });
  } catch (error) {
    console.error("Error in sign-in route:", error);
    return NextResponse.json(
      { error: "Failed to process sign-in" },
      { status: 500 }
    );
  }
}
