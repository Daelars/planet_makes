"use client";
import React, { useState, useEffect } from "react";

export interface Product {
  collection?: string;
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string; // This field stores the URL from UploadThing
  rating?: number;
  reviewsCount?: number;
  isOnSale?: boolean;
  originalPrice?: number;
  images: { id: string; imageUrl: string }[];
}

const ProjectTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("/api/products"); // API returning products from Prisma
      const data = await res.json();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-white p-8 font-sans text-sm text-black">
      <table className="w-full table-auto border-t border-black">
        <tbody>
          {products.length > 0 ? (
            products.map((product, index) => (
              <tr key={index} className="border-b border-black">
                <td className="py-4">{product.name}</td>
                <td className="py-4">{product.collection}</td>
                <td className="py-4">{product.price}</td>
                <td className="py-4">{product.id}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="py-4 text-center">
                Loading...
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <footer className="mt-6 text-right text-xs text-gray-600">
        © Haus Otto 2025
      </footer>
    </div>
  );
};

export default ProjectTable;
