// NewArrivalsPage.tsx (Server Component)
import { PrismaClient } from "@prisma/client";
import Navbar from "@/components/Navigation/Main/Navigation";
import AwwwardsInspiredLayout from "./AwwwardsInspiredLayout";
import { Product } from "@/types/product";

const prisma = new PrismaClient();

export default async function NewArrivalsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    take: 12,
    include: { ProductImage: true },
  });

  const mappedProducts: Product[] = products.map((prod) => ({
    id: prod.id,
    name: prod.name,
    description: prod.description,
    price: prod.price,
    imageUrl: prod.imageUrl,
    collection: prod.collection,
    isOnSale: prod.isOnSale,
    originalPrice: prod.originalPrice === null ? undefined : prod.originalPrice,
    images: prod.ProductImage.map((img) => ({
      id: img.id,
      imageUrl: img.imageUrl,
    })),
    details: prod.productDetails.split("\n"),
  }));

  return <AwwwardsInspiredLayout products={mappedProducts} />;
}
