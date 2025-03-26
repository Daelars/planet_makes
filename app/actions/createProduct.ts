// /app/actions/createProduct.ts
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Product } from "@/types/global.types";

interface CreateProductInput extends Partial<Product> {
  collection: string;
  name: string;
  showReviews: boolean;
  price: number;
  shippingPrice: number;
}

export async function createProduct(input: CreateProductInput) {
  try {
    // Generate a safe ID from the name (slug format)
    const safeId =
      input.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") +
      "-" +
      Math.floor(Math.random() * 10000);

    const product = await prisma.product.create({
      data: {
        collection: input.collection,
        name: input.name,
        price: input.price,
        shippingPrice: input.shippingPrice || 0,
        colours: input.colours,
        description: input.description || "",
        productDetails: input.productDetails || "",
        imageUrl: input.imageUrl,
        isOnSale: input.isOnSale,
        originalPrice: input.originalPrice,
        id: safeId, // Use a properly formatted ID
        updatedAt: new Date(),
      },
    });

    // Revalidate products page to reflect changes
    revalidatePath("/products");

    return product;
  } catch (error) {
    console.error("Product creation error:", error);
    throw error; // Re-throw to handle in the client
  }
}
