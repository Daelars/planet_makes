"use client";

import React, { useState, useEffect, useRef } from "react";
import ProductCard from "@/components/Products/Cards/Card";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";

/**
 * Premium ProductGrid component with award-winning style animations
 * Inspired by Awwwards-featured websites with sophisticated animations
 *
 * @param {Object} props
 * @param {Array} props.products - Array of product objects to display
 * @param {string} props.title - Optional title for the product grid section
 * @param {string} props.className - Optional additional CSS classes for the grid container
 * @param {number} props.columns - Optional number of columns on large screens (default: 3)
 * @param {string} props.animationStyle - Animation style: "fade" | "slide" | "perspective" | "stagger" (default: "stagger")
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
  animationStyle?: "fade" | "slide" | "perspective" | "stagger";
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  title = "Products",
  className = "",
  columns = 3,
  animationStyle = "stagger",
}) => {
  const gridRef = useRef(null);
  const headingRef = useRef(null);
  const isInView = useInView(gridRef, { once: false, amount: 0.1 });
  const headingInView = useInView(headingRef, { once: false, amount: 0.5 });
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Scroll-triggered animations
  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.95, 1, 1, 0.95]
  );

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

  // Animation variants based on selected style
  const getContainerVariants = () => {
    switch (animationStyle) {
      case "fade":
        return {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08, delayChildren: 0.2 },
          },
        };
      case "slide":
        return {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08, delayChildren: 0.1 },
          },
        };
      case "perspective":
        return {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: 0.1 },
          },
        };
      case "stagger":
      default:
        return {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.12,
              delayChildren: 0.3,
            },
          },
        };
    }
  };

  const getItemVariants = () => {
    switch (animationStyle) {
      case "fade":
        return {
          hidden: { opacity: 0, scale: 0.9 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: {
              type: "spring",
              stiffness: 50,
              damping: 20,
              duration: 0.8,
            },
          },
          hover: {
            y: -10,
            boxShadow: "0 30px 60px rgba(0,0,0,0.12)",
            transition: {
              duration: 0.5,
              ease: [0.43, 0.13, 0.23, 0.96],
            },
          },
        };
      case "slide":
        return {
          hidden: { opacity: 0, x: -50 },
          visible: {
            opacity: 1,
            x: 0,
            transition: {
              type: "spring",
              stiffness: 100,
              damping: 15,
            },
          },
          hover: {
            scale: 1.04,
            rotate: -1,
            transition: {
              duration: 0.4,
              ease: [0.25, 0.1, 0.25, 1.0],
            },
          },
        };
      case "perspective":
        return {
          hidden: {
            opacity: 0,
            rotateX: 40,
            y: 100,
            z: -100,
          },
          visible: {
            opacity: 1,
            rotateX: 0,
            y: 0,
            z: 0,
            transition: {
              type: "spring",
              stiffness: 80,
              damping: 20,
            },
          },
          hover: {
            z: 50,
            rotateY: -5,
            boxShadow: "0 25px 50px rgba(0,0,0,0.2)",
            transition: {
              duration: 0.6,
              ease: [0.43, 0.13, 0.23, 0.96],
            },
          },
        };
      case "stagger":
      default:
        return {
          hidden: {
            opacity: 0,
            y: 50,
          },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              type: "spring",
              stiffness: 100,
              damping: 12,
            },
          },
          hover: {
            y: -12,
            scale: 1.03,
            transition: {
              type: "spring",
              stiffness: 400,
              damping: 10,
            },
          },
        };
    }
  };

  // Heading text animation
  const letterContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 10,
      },
    },
  };

  // Split title into letters for animation
  const titleLetters = title.split("");

  return (
    <motion.div
      className={`w-full overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      ref={gridRef}
      style={{ opacity, scale }}
    >
      {title && (
        <motion.div
          ref={headingRef}
          className="overflow-hidden py-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="text-3xl font-bold mb-8 flex"
            variants={letterContainerVariants}
            initial="hidden"
            animate={headingInView ? "visible" : "hidden"}
          >
            {titleLetters.map((letter, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                className={letter === " " ? "mr-2" : ""}
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      )}

      {products && products.length > 0 ? (
        <motion.div
          className={`grid ${getGridColsClass()} gap-8 relative`}
          variants={getContainerVariants()}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              variants={getItemVariants()}
              whileHover="hover"
              custom={index}
              onMouseEnter={() => setHoveredItem(product.id)}
              onMouseLeave={() => setHoveredItem(null)}
              className="relative"
              style={{
                transition: "all 0.5s cubic-bezier(0.43, 0.13, 0.23, 0.96)",
                filter:
                  hoveredItem && hoveredItem !== product.id
                    ? "grayscale(0.4) blur(1px) brightness(0.8)"
                    : "none",
                transform: `scale(${hoveredItem === product.id ? 1.03 : 1})`,
                zIndex: hoveredItem === product.id ? 2 : 1,
              }}
            >
              <div className="transition-all duration-500 ease-out overflow-hidden">
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
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          className="text-center py-12 text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          No products available
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProductGrid;
