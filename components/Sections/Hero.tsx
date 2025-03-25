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
      direction: number,
    ) => {
      if (!ref.current) return null;

      let position = 0;
      const speed = 0.1; // pixels per frame

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
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-zinc-100 to-neutral-200 p-6">
      <div className="grid h-full w-full grid-cols-1 overflow-hidden rounded-2xl bg-black lg:grid-cols-2">
        {/* Left Section */}
        <div className="flex flex-col justify-center bg-zinc-950 p-16 text-white">
          <div className="mb-8">
            <img src="/Vector.png" alt="Skill Swap Logo" className="mb-8 h-8" />
            <h1 className="mb-4 font-[family-name:var(--font-ultra)] text-7xl leading-loose">
              Planet Makes.
            </h1>
            <p className="mb-6 font-[family-name:var(--font-pt-serif)] text-zinc-400">
              We Craft. We. Make. We Print. We Sell.
            </p>
            <button className="rounded-full bg-white px-6 py-3 font-[family-name:var(--font-pt-serif)] font-semibold text-black shadow-md transition hover:bg-zinc-200">
              Shop now
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="relative flex h-full flex-col justify-between overflow-hidden bg-zinc-950 text-white">
          <div className="z-10 mb-8 flex justify-end space-x-6 p-10 text-sm lg:p-16"></div>
          <div className="relative z-0 flex h-full flex-col justify-center gap-12">
            <div className="flex flex-col gap-6">
              {/* Row 1 - Scrolling left */}
              <div className="w-full overflow-hidden">
                <div
                  ref={row1Ref}
                  className="flex gap-4"
                  style={{ willChange: "transform" }}
                >
                  {[...Array(10)].map((_, idx) => (
                    <div
                      key={`row1-${idx}`}
                      className="flex h-64 w-64 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#FDEDDC]"
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
                      className="flex h-64 w-64 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#FDEDDC]"
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
              <div className="w-full overflow-hidden">
                <div
                  ref={row2Ref}
                  className="flex gap-4"
                  style={{ willChange: "transform" }}
                >
                  {[...Array(10)].map((_, idx) => (
                    <div
                      key={`row2-${idx}`}
                      className="flex h-64 w-64 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#D6C3F2]"
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
                      className="flex h-64 w-64 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#D6C3F2]"
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
