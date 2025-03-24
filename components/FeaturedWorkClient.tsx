"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";

// Define our project data type
interface Project {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  color: string;
  href: string;
  year: string;
}

// Sample data with vibrant accent colors
const projects: Project[] = [
  {
    id: "01",
    title: "Nebula Dreams",
    category: "Interactive Experience",
    imageUrl: "/api/placeholder/1200/800",
    color: "#FF3366",
    href: "/work/nebula-dreams",
    year: "2024",
  },
  {
    id: "02",
    title: "Quantum Flux",
    category: "Digital Installation",
    imageUrl: "/api/placeholder/1200/800",
    color: "#33CCFF",
    href: "/work/quantum-flux",
    year: "2023",
  },
  {
    id: "03",
    title: "Echoes Within",
    category: "Immersive Storytelling",
    imageUrl: "/api/placeholder/1200/800",
    color: "#66FF99",
    href: "/work/echoes-within",
    year: "2023",
  },
  {
    id: "04",
    title: "Prismatic Void",
    category: "Virtual Gallery",
    imageUrl: "/api/placeholder/1200/800",
    color: "#CC66FF",
    href: "/work/prismatic-void",
    year: "2022",
  },
  {
    id: "05",
    title: "Sentient Spaces",
    category: "AI Experience",
    imageUrl: "/api/placeholder/1200/800",
    color: "#FFCC33",
    href: "/work/sentient-spaces",
    year: "2022",
  },
];

const CustomCursor = ({
  position,
  isActive,
}: {
  position: { x: number; y: number };
  isActive: boolean;
}) => {
  return (
    <motion.div
      className="fixed pointer-events-none z-50 mix-blend-difference"
      animate={{
        x: position.x - 32,
        y: position.y - 32,
        scale: isActive ? 1 : 0.5,
        opacity: isActive ? 1 : 0,
      }}
      transition={{ type: "spring", mass: 0.1, stiffness: 100, damping: 15 }}
    >
      <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white text-black text-xs font-medium">
        View
      </div>
    </motion.div>
  );
};

// The main project item component
const ProjectItem = ({
  project,
  index,
  setActiveCursor,
}: {
  project: Project;
  index: number;
  setActiveCursor: (active: boolean) => void;
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  // Project reveal animation based on scroll
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "end start"],
  });

  // Parallax effect variables
  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const titleX = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  // Check if project is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => {
      if (itemRef.current) {
        observer.unobserve(itemRef.current);
      }
    };
  }, []);

  return (
    <motion.div
      ref={itemRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <Link
        href={project.href}
        className="block w-full h-full absolute inset-0 z-10"
        onMouseEnter={() => setActiveCursor(true)}
        onMouseLeave={() => setActiveCursor(false)}
      >
        <span className="sr-only">View {project.title}</span>
      </Link>

      {/* Background color overlay */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{ backgroundColor: project.color }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 0.1 : 0 }}
        transition={{ duration: 1 }}
      />

      {/* Full-screen background image with parallax */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y: imageY }}
      >
        <div className="relative w-full h-full overflow-hidden">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover opacity-40"
            sizes="100vw"
            priority={index < 2}
          />
          {/* Grain overlay */}
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
        </div>
      </motion.div>

      {/* Project info container */}
      <div className="relative z-20 max-w-6xl mx-auto w-full px-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Project number */}
          <motion.div
            className="col-span-12 md:col-span-1 text-4xl font-mono text-white opacity-50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 0.5 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {project.id}
          </motion.div>

          {/* Project title with horizontal motion */}
          <motion.div
            className="col-span-12 md:col-span-8 overflow-hidden"
            style={{ x: titleX }}
          >
            <motion.h2
              className="text-5xl md:text-7xl lg:text-9xl font-bold text-white tracking-tighter"
              initial={{ y: 100 }}
              animate={{ y: isInView ? 0 : 100 }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              {project.title}
            </motion.h2>
          </motion.div>

          {/* Project details */}
          <motion.div
            className="col-span-12 md:col-span-3 flex flex-col gap-4 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="text-sm text-gray-400 uppercase tracking-wider">
              Category
            </div>
            <div className="text-xl text-white">{project.category}</div>

            <div className="text-sm text-gray-400 uppercase tracking-wider mt-4">
              Year
            </div>
            <div className="text-xl text-white">{project.year}</div>

            {/* Accent color bar */}
            <motion.div
              className="h-1 w-16 mt-8"
              style={{ backgroundColor: project.color }}
              initial={{ width: 0 }}
              animate={{ width: isInView ? 64 : 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export const FeaturedWorkSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorActive, setCursorActive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section className="bg-gray-900 text-white">
      {/* Custom cursor */}
      <CustomCursor position={mousePosition} isActive={cursorActive} />

      {/* Header */}
      <div className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="z-10 text-center px-6"
        >
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tighter"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Featured Work
          </motion.h1>

          <motion.p
            className="text-xl text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            A collection of award-winning digital experiences that push the
            boundaries of imagination and technology.
          </motion.p>
        </motion.div>

        {/* Animated down arrow */}
        <motion.div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4V20M12 20L6 14M12 20L18 14"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </div>

      {/* Project items */}
      {projects.map((project, index) => (
        <ProjectItem
          key={project.id}
          project={project}
          index={index}
          setActiveCursor={setCursorActive}
        />
      ))}

      {/* Footer CTA */}
      <motion.div
        className="h-screen flex items-center justify-center text-center px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div>
          <motion.h2
            className="text-4xl md:text-6xl font-bold mb-12 tracking-tighter"
            initial={{ y: 50 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Ready to explore all our work?
          </motion.h2>

          <Link
            href="/work"
            className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden rounded-full border border-gray-700 bg-transparent text-white text-lg font-medium transition-all duration-500 hover:border-white"
            onMouseEnter={() => setCursorActive(true)}
            onMouseLeave={() => setCursorActive(false)}
          >
            <span className="relative z-10 flex items-center gap-2">
              View All Projects
              <motion.span
                className="inline-block ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                }}
              >
                →
              </motion.span>
            </span>
            <span className="absolute inset-0 transform -translate-x-full group-hover:translate-x-0 bg-white transition-transform duration-500 ease-in-out z-0"></span>
            <span className="absolute inset-0 transform -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-30 transition-transform duration-700 ease-in-out z-0 delay-100"></span>
          </Link>
        </div>
      </motion.div>
    </section>
  );
};
