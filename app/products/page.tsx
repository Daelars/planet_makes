import React from "react";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/Products/Cards/Card";
import Navbar from "@/components/Navigation/Main/Navigation";
export default async function ProductsPage() {
  // Fetch products from your database, assuming the image URL is stored in the product.imageUrl field.
  const products = await prisma.product.findMany();

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={{
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                collection: product.collection || undefined,
                isOnSale: product.isOnSale || undefined,
                originalPrice: product.originalPrice || undefined,
                // Retrieve the product image from the imageUrl field returned by UploadThing.
                imageUrl: product.imageUrl || "/api/placeholder/600/600",
                // Optionally, if you want to pass an array of images:
                images: product.imageUrl
                  ? [{ id: product.id, imageUrl: product.imageUrl }]
                  : [],
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}
