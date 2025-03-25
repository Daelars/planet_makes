// AwwwardsInspiredLayout.tsx (Client Component)
"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import Card from "@/components/Products/Cards/Card";
import Navbar from "@/components/Navigation/Main/Navigation";
import { Product } from "@/types/product";

// Custom cursor component
const CustomCursor = ({
  mouseX,
  mouseY,
}: {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}) => {
  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-50 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white mix-blend-difference"
      style={{
        x: mouseX,
        y: mouseY,
      }}
    />
  );
};

interface AwwwardsInspiredLayoutProps {
  products: Product[];
}

export default function AwwwardsInspiredLayout({
  products,
}: AwwwardsInspiredLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const mouseX = useSpring(0, { stiffness: 500, damping: 50 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Split products
  const featuredProduct = products[0];
  const horizontalProducts = products.slice(1, 5);
  const gridProducts = products.slice(5);

  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  const { scrollYProgress: horizontalScrollProgress } = useScroll({
    target: horizontalRef,
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  const horizontalTranslate = useTransform(
    horizontalScrollProgress,
    [0, 1],
    ["0%", "-80%"],
  );

  // Text reveal animation variants
  const revealVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.1 * i,
        duration: 0.8,
        ease: [0.17, 0.55, 0.55, 1],
      },
    }),
  };

  return (
    <div ref={containerRef} className="bg-zinc-900">
      <CustomCursor mouseX={mouseX} mouseY={mouseY} />
      <Navbar />

      {/* Hero Section - Split Design */}
      <section className="relative h-screen border-b border-zinc-800">
        <motion.div
          style={{ opacity, scale, y }}
          className="absolute inset-0 flex flex-col items-center justify-center p-6 md:flex-row"
        >
          <div className="relative flex w-full items-center justify-center md:w-1/2">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: [0.17, 0.55, 0.55, 1] }}
              className="relative z-10 p-8 md:p-16"
            >
              <h2 className="mb-4 font-[family-name:var(--font-ultra)] text-lg font-bold uppercase tracking-widest text-zinc-400">
                Latest Collection
              </h2>
              <div className="overflow-hidden">
                <motion.h1
                  variants={revealVariants}
                  initial="hidden"
                  animate="visible"
                  custom={1}
                  className="font-[family-name:var(--font-ultra)] text-7xl leading-none tracking-tighter text-white md:text-9xl"
                >
                  New
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1
                  variants={revealVariants}
                  initial="hidden"
                  animate="visible"
                  custom={2}
                  className="font-[family-name:var(--font-ultra)] text-7xl leading-none tracking-tighter text-white md:text-9xl"
                >
                  Arrivals
                </motion.h1>
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="mt-6 max-w-md text-lg text-zinc-400"
              >
                Discover our latest collection of premium products designed for
                the modern lifestyle.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="mt-8"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative overflow-hidden rounded-full bg-white px-8 py-3 font-medium text-black"
                >
                  Explore Collection
                  <motion.span
                    className="absolute inset-0 bg-zinc-900 mix-blend-difference"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.4 }}
                  />
                </motion.button>
              </motion.div>
            </motion.div>
          </div>

          {/* Featured product display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative flex h-1/2 w-full items-center justify-center overflow-hidden md:h-full md:w-1/2"
          >
            {featuredProduct && (
              <div className="relative h-full w-full">
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                  <motion.img
                    src={
                      featuredProduct.imageUrl ||
                      featuredProduct.images[0]?.imageUrl
                    }
                    alt={featuredProduct.name}
                    className="h-full w-full object-cover"
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                  <div className="absolute inset-0 bg-black opacity-30" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="rounded-lg bg-black/60 p-6 backdrop-blur-md"
                  >
                    <h3 className="text-lg font-medium text-white">
                      {featuredProduct.name}
                    </h3>
                    <p className="mt-2 text-zinc-300">
                      {featuredProduct.collection}
                    </p>
                    <div className="mt-3 flex items-center gap-3">
                      <span className="text-2xl font-bold text-white">
                        ${featuredProduct.price.toFixed(2)}
                      </span>
                      {featuredProduct.isOnSale && (
                        <span className="text-sm text-zinc-400 line-through">
                          ${featuredProduct.originalPrice?.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <motion.a
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      href={`/products/${featuredProduct.id}`}
                      className="mt-4 inline-block rounded-full border border-white px-6 py-2 text-sm font-medium text-white transition-all hover:bg-white hover:text-black"
                    >
                      View Product
                    </motion.a>
                  </motion.div>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-0 right-0 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="flex flex-col items-center"
          >
            <p className="mb-2 text-xs uppercase tracking-wider text-zinc-500">
              Scroll
            </p>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 5V19M12 19L18 13M12 19L6 13"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* Horizontal Scroll Section */}
      <section ref={horizontalRef} className="relative py-24">
        <div className="mb-16 px-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="overflow-hidden"
          >
            <h2 className="font-[family-name:var(--font-ultra)] text-5xl tracking-tight text-white">
              Featured Products
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="mt-4 max-w-xl text-zinc-400">
              Scroll horizontally to discover our curated selection.
            </p>
          </motion.div>
        </div>

        <div className="relative h-[50vh] overflow-hidden">
          <motion.div
            className="flex h-full gap-8 pl-8"
            style={{ x: horizontalTranslate, width: "200%" }}
          >
            {horizontalProducts.map((product, i) => (
              <motion.div
                key={product.id}
                className="relative h-full w-[80vw] max-w-2xl flex-shrink-0 overflow-hidden rounded-xl"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <img
                  src={product.imageUrl || product.images[0]?.imageUrl}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent p-8">
                  <span className="text-sm uppercase tracking-wider text-zinc-400">
                    {product.collection}
                  </span>
                  <h3 className="mt-2 text-3xl font-bold text-white">
                    {product.name}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-zinc-300">
                    {product.description}
                  </p>
                  <div className="mt-4 flex items-center gap-4">
                    <span className="text-2xl font-bold text-white">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.isOnSale && (
                      <span className="text-sm text-zinc-400 line-through">
                        ${product.originalPrice?.toFixed(2)}
                      </span>
                    )}
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      href={`/products/${product.id}`}
                      className="ml-auto rounded-full border border-zinc-400 px-6 py-2 text-sm font-medium text-white transition-all hover:border-white hover:bg-white hover:text-black"
                    >
                      View
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer with graphic element */}
      <footer className="border-t border-zinc-800 bg-black py-16">
        <div className="container mx-auto px-8">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div>
              <h2 className="text-2xl font-bold text-white">New Arrivals</h2>
              <p className="mt-2 text-zinc-400">© 2023 All Rights Reserved</p>
            </div>
            <div className="flex gap-8">
              <a
                href="#"
                className="text-zinc-400 transition-colors hover:text-white"
              >
                Instagram
              </a>
              <a
                href="#"
                className="text-zinc-400 transition-colors hover:text-white"
              >
                Twitter
              </a>
              <a
                href="#"
                className="text-zinc-400 transition-colors hover:text-white"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
