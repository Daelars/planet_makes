import React from "react";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/Products/Cards/Card";
import Navbar from "@/components/Navigation/Main/Navigation";
import { checkRole } from "@/utils/roles";

export default async function ProductsPage() {
  const isAdmin = await checkRole("admin");
  const products = await prisma.product.findMany();

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8">
        <h1 className="mb-8 text-3xl font-bold">Products</h1>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
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
                imageUrl: product.imageUrl || "/api/placeholder/600/600",
                images: product.imageUrl
                  ? [{ id: product.id, imageUrl: product.imageUrl }]
                  : [],
              }}
              isAdmin={isAdmin}
            />
          ))}
        </div>
      </div>
    </>
  );
}
