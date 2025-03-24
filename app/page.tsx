import React from "react";
import { prisma } from "@/lib/prisma";
import ProductGrid from "@/components/Products/ProductGrid"; // Import the new component
import Navbar from "@/components/Navigation/Main/Navigation";
// import Navbar from "@/components/layout/Navbar/index";
import Cart from "@/components/Cart/Cart";
import Hero from "@/components/Sections/Hero";
export default async function Home() {
  // // Fetch products from your database
  // const products = (await prisma.product.findMany()).map((product) => ({
  //   ...product,
  //   originalPrice: product.originalPrice ?? undefined,
  // }));

  return (
    <>
      <Navbar />
      {/* <div className="mx-auto py-8 bg-black h-screen">
        <ProductGrid
          products={products}
          title="Featured Products"
          animationStyle="stagger" // Choose your animation style
          columns={10} // Customize grid layout
          className="" // Add custom classes
        />
      </div> */}

      <Hero />

      {/* <Cart /> */}
    </>
  );
}
