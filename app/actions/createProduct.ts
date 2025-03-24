// /app/actions/createProduct.ts
"use server";

import { prisma } from "@/lib/prisma";

interface CreateProductInput {
  collection: string;
  name: string;
  showReviews: boolean;
  price: number;
  inStock: boolean;
  shippingPrice: number;
  colours: string[];
  description: string; // production description
  productDetails: string;
  imageUrl: string;
  isOnSale: boolean;
  originalPrice: number | null;
}

export async function createProduct(input: CreateProductInput) {
  const product = await prisma.product.create({
    data: {
      collection: input.collection,
      name: input.name,
      price: input.price,
      shippingPrice: input.shippingPrice,
      colours: input.colours,
      description: input.description,
      productDetails: input.productDetails,
      imageUrl: input.imageUrl,
      isOnSale: input.isOnSale,
      originalPrice: input.originalPrice,
      id: input.name,
      updatedAt: new Date(),
    },
  });

  return product;
}
