import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    // Query imageUrl from products table
    const products = await prisma.product.findMany({
      select: { imageUrl: true },
    });
    // Filter out any null or undefined image URLs
    const heroImages = products
      .map((product) => product.imageUrl)
      .filter((url): url is string => !!url);

    return NextResponse.json(heroImages);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch hero images" },
      { status: 500 }
    );
  }
}
