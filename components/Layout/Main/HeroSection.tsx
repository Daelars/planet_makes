// src/components/HeroSection.tsx
import React from "react";

// Simple placeholder for the logo - Replace with your actual logo SVG/component
const LogoPlaceholder: React.FC = () => (
  <div className="flex items-center space-x-2">
    {/* Placeholder shape */}
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 0L25.6 4.8V14.4L16 19.2L6.4 14.4V4.8L16 0Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.4 17.6V27.2L16 32L25.6 27.2V17.6L16 22.4L6.4 17.6Z"
        fill="white"
        fillOpacity="0.6" // Example opacity
      />
    </svg>
    <span className="text-xl font-semibold text-white">skill swap</span>
  </div>
);

// Simple placeholder component for grid items
const ImagePlaceholder: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`aspect-square rounded-lg ${className}`}></div>
);

const HeroSection: React.FC = () => {
  return (
    // Fullscreen container with dark background, padding, and rounded corners
    <div className="flex min-h-screen w-full flex-col overflow-hidden rounded-2xl bg-gray-900 p-8 text-white shadow-xl sm:p-12 md:flex-row md:p-16 lg:p-20">
      {/* Left Panel: Logo, Text Content & Button */}
      {/* Removed outer padding, added flex structure for vertical alignment */}
      <div className="order-2 flex w-full flex-col justify-center py-8 md:order-1 md:w-1/2 md:py-0 md:pr-8 lg:pr-12">
        {/* Logo Area */}
        <div className="mb-12 lg:mb-16">
          <LogoPlaceholder />
        </div>

        {/* Text Content Area */}
        <div>
          <h1 className="mb-4 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Non-technical online school.
          </h1>
          <p className="mb-8 text-lg text-gray-400">
            Whether you want to learn or to share what you know, you've come to
            the right place. We connect people through knowledge.
          </p>
          <button className="self-start rounded-full bg-white px-8 py-3 font-semibold text-gray-900 transition duration-300 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900">
            Register now
          </button>
        </div>
      </div>

      {/* Right Panel: Image Grid Container */}
      {/* Removed outer padding, kept flex centering for the grid */}
      <div className="order-1 flex w-full items-center justify-center py-8 md:order-2 md:w-1/2 md:py-0 md:pl-8 lg:pl-12">
        {/* Image Grid */}
        <div className="grid w-full max-w-md grid-cols-3 grid-rows-2 gap-4">
          {/* Row 1 */}
          <ImagePlaceholder className="bg-yellow-100" />
          <ImagePlaceholder className="bg-orange-500" />
          <ImagePlaceholder className="bg-blue-200" />

          {/* Row 2 */}
          <ImagePlaceholder className="bg-blue-400" />
          <ImagePlaceholder className="bg-white" />
          <ImagePlaceholder className="bg-purple-200" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
