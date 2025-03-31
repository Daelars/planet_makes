import { NextRequest, NextResponse } from "next/server";
import { api } from "@/lib/polar";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (body.items) {
      // Handle cart-based checkout
      const { items } = body;

      if (!Array.isArray(items) || items.length === 0) {
        return NextResponse.json(
          { error: "Items are required" },
          { status: 400 },
        );
      }

      // Create a subscription or one-time payment with Polar
      const checkout = await api.checkouts.create({
        products: items.map((item: any) => item.id), // Use product IDs instead of object properties
        successUrl: `${req.headers.get("origin")}/success`,
      });

      return NextResponse.json({ checkoutUrl: checkout.url });
    } else {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 },
      );
    }
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
