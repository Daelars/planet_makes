"use client";
import React, { useEffect, useRef, useState } from "react";

const HomePage: React.FC = () => {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [heroImages, setHeroImages] = useState<string[]>([]);

  useEffect(() => {
    // Fetch image URLs from an API endpoint that accesses your database
    fetch("/api/hero-images")
      .then((res) => res.json())
      .then((data) => {
        // Assuming data is an array of image URLs returned from the DB
        setHeroImages(data);
      })
      .catch(() => {
        // Fallback to a static default if the fetch fails
        setHeroImages([]);
      });

    // Mark component as loaded
    setIsLoaded(true);

    const createScrollAnimation = (
      ref: React.RefObject<HTMLDivElement | null>,
      direction: number
    ) => {
      if (!ref.current) return null;

      let position = 0;
      const speed = 0.5; // pixels per frame

      // Animation function
      const animate = () => {
        if (!ref.current) return;

        // Move position based on direction (positive = right, negative = left)
        position += speed * direction;

        // Apply transform
        ref.current.style.transform = `translateX(${position}px)`;

        // Check if we need to reset
        const firstChild = ref.current.children[0] as HTMLElement;
        if (firstChild) {
          const width = firstChild.offsetWidth + 16; // width + gap

          // Reset logic: When first item moves completely out of view
          if (direction < 0 && position < -width) {
            // For left scrolling, jump ahead by one item width
            position += width;
          } else if (direction > 0 && position > 0) {
            // For right scrolling, jump back by one item width
            position -= width;
          }
        }

        return requestAnimationFrame(animate);
      };

      // Start the animation
      const animationId = requestAnimationFrame(animate);

      // Return cleanup function
      return () => cancelAnimationFrame(animationId);
    };

    // Start animations with a short delay to ensure refs are properly set
    const timer = setTimeout(() => {
      const cleanup1 = createScrollAnimation(row1Ref, -1); // Left scrolling
      const cleanup2 = createScrollAnimation(row2Ref, 1); // Right scrolling

      return () => {
        cleanup1 && cleanup1();
        cleanup2 && cleanup2();
      };
    }, 100);

    return () => clearTimeout(timer);
  }, [isLoaded]);

  return (
    <div className="h-screen bg-gradient-to-r from-zinc-100 to-neutral-200 flex items-center justify-center p-6">
      <div className="h-full w-full max-w-screen-2xl bg-black rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        {/* Left Section */}
        <div className="bg-zinc-900 text-white flex flex-col justify-center p-16">
          <div className="mb-8">
            <img src="/Vector.png" alt="Skill Swap Logo" className="h-8 mb-8" />
            <h1 className="text-5xl font-bold leading-tight mb-4">
              Non-technical online school.
            </h1>
            <p className="text-zinc-400 mb-6">
              Whether you want to learn or to share what you know, you've come
              to the right place. We connect people through knowledge.
            </p>
            <button className="bg-white text-black font-semibold py-3 px-6 rounded-full shadow-md hover:bg-zinc-200 transition">
              Register now
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-zinc-950 text-white  flex flex-col justify-between h-full relative overflow-hidden">
          <div className="flex justify-end space-x-6 text-sm mb-8 z-10 p-10 lg:p-16">
            <a href="#" className="hover:underline">
              About
            </a>
            <a href="#" className="hover:underline">
              Courses
            </a>
            <a href="#" className="hover:underline">
              Blog
            </a>
            <a href="#" className="hover:underline">
              Support
            </a>
          </div>
          <div className="flex flex-col gap-12 justify-center h-full relative z-0">
            <div className="flex flex-col gap-6">
              {/* Row 1 - Scrolling left */}
              <div className="overflow-hidden w-full">
                <div
                  ref={row1Ref}
                  className="flex gap-4"
                  style={{ willChange: "transform" }}
                >
                  {[...Array(10)].map((_, idx) => (
                    <div
                      key={`row1-${idx}`}
                      className="w-64 h-64 bg-[#FDEDDC] flex items-center justify-center rounded-lg overflow-hidden shrink-0"
                    >
                      <img
                        src={
                          heroImages.length
                            ? heroImages[idx % heroImages.length]
                            : "/Vector.png"
                        }
                        alt={`Art ${idx + 1}`}
                      />
                    </div>
                  ))}
                  {/* Duplicate for seamless scrolling */}
                  {[...Array(10)].map((_, idx) => (
                    <div
                      key={`row1-dup-${idx}`}
                      className="w-64 h-64 bg-[#FDEDDC] flex items-center justify-center rounded-lg overflow-hidden shrink-0"
                    >
                      <img
                        src={
                          heroImages.length
                            ? heroImages[idx % heroImages.length]
                            : "/Vector.png"
                        }
                        alt={`Art ${idx + 1}`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 2 - Scrolling right */}
              <div className="overflow-hidden w-full">
                <div
                  ref={row2Ref}
                  className="flex gap-4"
                  style={{ willChange: "transform" }}
                >
                  {[...Array(10)].map((_, idx) => (
                    <div
                      key={`row2-${idx}`}
                      className="w-64 h-64 bg-[#D6C3F2] flex items-center justify-center rounded-lg overflow-hidden shrink-0"
                    >
                      <img
                        src={
                          heroImages.length
                            ? heroImages[idx % heroImages.length]
                            : "/Vector.png"
                        }
                        alt={`Art ${idx + 11}`}
                      />
                    </div>
                  ))}
                  {/* Duplicate for seamless scrolling */}
                  {[...Array(10)].map((_, idx) => (
                    <div
                      key={`row2-dup-${idx}`}
                      className="w-64 h-64 bg-[#D6C3F2] flex items-center justify-center rounded-lg overflow-hidden shrink-0"
                    >
                      <img
                        src={
                          heroImages.length
                            ? heroImages[idx % heroImages.length]
                            : "/Vector.png"
                        }
                        alt={`Art ${idx + 11}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
