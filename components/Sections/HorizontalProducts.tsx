"use client";

import React, { useState } from "react";
import ProductCard from "@/components/Products/Cards/Card";

/**
 * Simple ProductGrid component without animations
 *
 * @param {Object} props
 * @param {Array} props.products - Array of product objects to display
 * @param {string} props.title - Optional title for the product grid section
 * @param {string} props.className - Optional additional CSS classes for the grid container
 * @param {number} props.columns - Optional number of columns on large screens (default: 3)
 */
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  collection?: string;
  isOnSale?: boolean;
  originalPrice?: number;
  imageUrl?: string;
}

interface ProductGridProps {
  products: Product[];
  title?: string;
  className?: string;
  columns?: number;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  title = "Products",
  className = "",
  columns = 3,
}) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Determine grid columns class based on the columns prop
  const getGridColsClass = () => {
    switch (columns) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-1 md:grid-cols-2";
      case 4:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
      case 5:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5";
      case 6:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6";
      case 3:
      default:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {title && (
        <div className="py-4">
          <h2 className="text-3xl font-bold mb-8">{title}</h2>
        </div>
      )}

      {products && products.length > 0 ? (
        <div className={`grid ${getGridColsClass()} gap-8 relative`}>
          {products.map((product) => (
            <div
              key={product.id}
              onMouseEnter={() => setHoveredItem(product.id)}
              onMouseLeave={() => setHoveredItem(null)}
              className="relative"
              style={{
                transition: "all 0.3s ease",
                filter:
                  hoveredItem && hoveredItem !== product.id
                    ? "grayscale(0.4) brightness(0.8)"
                    : "none",
                transform: `scale(${hoveredItem === product.id ? 1.02 : 1})`,
                zIndex: hoveredItem === product.id ? 2 : 1,
              }}
            >
              <div className="overflow-hidden">
                <ProductCard
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
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          No products available
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
