// src/components/TextFeature.tsx
"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // Import ScrollTrigger

// --- Assuming these are imported from your actual placeholder location ---
// Example placeholder definitions (replace with your actual ones)
const CirclePlaceholder: React.FC<{ className?: string }> = ({
  className = "",
}) => (
  // Added common class 'circle-anim' for GSAP targeting
  <div
    className={`circle-anim inline-flex items-center justify-center rounded-full bg-gray-200 ${className}`}
  >
    <div className="h-1/5 w-1/5 rounded-full bg-gray-400"></div>
  </div>
);

const FeatureIconPlaceholder: React.FC<{ className?: string }> = ({
  className = "",
}) => (
  <div className={`relative ${className}`}>
    <div className="absolute bottom-0 left-0 h-2/3 w-full rounded-md bg-purple-300"></div>
    <div className="absolute right-1/4 top-0 h-1/3 w-1/3 rounded-full bg-purple-500"></div>
  </div>
);
// --- End of example placeholders ---

// Register ScrollTrigger with GSAP (IMPORTANT!)
// You should ideally do this once at the top level of your app (e.g., App.tsx or index.tsx)
// Doing it here works but is less efficient if the component re-renders often without unmounting.
gsap.registerPlugin(ScrollTrigger);

const TextFeature: React.FC = () => {
  // --- Values to potentially fine-tune ---
  const featureBoxLeftPercent = "75%";
  const featureBoxWidthClass = "w-[25rem]";
  const thirdLinePaddingLeft = "pl-[15rem]";
  const featureBoxHeightClass = "h-[15rem]";
  // ---

  // Refs for animation targets
  const containerRef = useRef<HTMLDivElement>(null); // Main component container
  const contentWrapperRef = useRef<HTMLDivElement>(null); // Inner content wrapper (trigger)
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const featureBoxRef = useRef<HTMLDivElement>(null);
  // Circles targeted by class 'circle-anim'

  useEffect(() => {
    // Ensure refs are available
    if (!containerRef.current || !contentWrapperRef.current) return;

    // Use GSAP context for automatic cleanup
    const ctx = gsap.context(() => {
      // Target all elements with the 'circle-anim' class within the container
      const circles = gsap.utils.toArray(".circle-anim");

      // Create a timeline for sequenced animations
      const tl = gsap.timeline({
        // Add ScrollTrigger configuration directly to the timeline
        scrollTrigger: {
          trigger: contentWrapperRef.current, // Element that triggers the animation
          start: "top 80%", // When the top of the trigger hits 80% down from the top of the viewport
          // end: "bottom 20%", // Optional: Define an end point
          toggleActions: "play none none none", // Play the animation once when entering, do nothing else
          // markers: true, // Uncomment during development to see trigger points
        },
        defaults: { ease: "power3.out", duration: 0.8 },
      });

      // Animation sequence (same as before, but now controlled by ScrollTrigger)
      tl.from(
        circles,
        {
          opacity: 0,
          scale: 0.5,
          y: 30,
          stagger: 0.15,
        },
        0.2,
      )
        .from(
          featureBoxRef.current,
          {
            opacity: 0,
            scale: 0.8,
            x: 50,
          },
          "<0.3",
        )
        .from(
          [line1Ref.current, line2Ref.current, line3Ref.current],
          {
            opacity: 0,
            y: 40,
            stagger: 0.2,
          },
          "-=0.5",
        );
    }, containerRef); // Scope context to the main container

    // Cleanup function
    return () => ctx.revert();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    // Add ref to the main container
    <div
      ref={containerRef}
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-16 py-16 text-gray-900 md:px-20 md:py-20" // Added bg-white for context
    >
      {/* Content Wrapper - Add ref */}
      <div
        ref={contentWrapperRef}
        className="relative mx-auto w-full max-w-6xl"
      >
        {/* Text Block Container */}
        <div className="font-[family-name:var(--font-ultra)] text-8xl font-medium leading-tight text-gray-900">
          {/* Line 1 - Add ref */}
          <div ref={line1Ref} className="mb-2 flex items-center">
            <span className="mr-4 inline-flex items-center">
              <CirclePlaceholder className="h-20 w-20 opacity-75" />
              <CirclePlaceholder className="ml-3 h-20 w-20 opacity-75" />
            </span>
            <span>Look</span>
          </div>

          {/* Line 2 - Add ref */}
          <div ref={line2Ref} className="mb-2">
            <span className="mr-4 inline-block">at</span>
            <span className="mr-4 inline-block">our</span>
            <span className="mr-4 inline-block">newest</span>
          </div>

          {/* Line 3 - Add ref */}
          <div
            ref={line3Ref}
            className={`flex items-center ${thirdLinePaddingLeft}`}
          >
            <span className="mr-4 inline-block">products</span>
            <CirclePlaceholder className="mx-2 h-14 w-14 opacity-75" />
            <span className="ml-2 inline-block">now!</span>
          </div>
        </div>{" "}
        {/* End of Text Block Container */}
        {/* Feature Placeholder Box - Add ref */}
        <div
          ref={featureBoxRef}
          className={`absolute top-4 ${featureBoxWidthClass} flex ${featureBoxHeightClass} items-center justify-center rounded-xl bg-gray-50 p-4 shadow-sm`}
          style={{ left: featureBoxLeftPercent }}
        >
          <FeatureIconPlaceholder className="h-8 w-8" />
          {/* Small circle decoration */}
          <div className="absolute -right-4 -top-4 opacity-75">
            <CirclePlaceholder className="h-8 w-8" />
          </div>
        </div>
      </div>{" "}
      {/* End of Content Wrapper */}
    </div> // End of Fullscreen container
  );
};

export default TextFeature;
