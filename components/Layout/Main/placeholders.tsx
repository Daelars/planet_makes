// src/components/placeholders.tsx
import React from "react";

// Placeholder for the logo icon
export const LogoIconPlaceholder: React.FC<{ className?: string }> = ({
  className = "w-6 h-6",
}) => (
  <div
    className={`rounded bg-purple-300 ${className}`}
    style={{
      // Simple 3D box illusion
      clipPath: "polygon(0% 20%, 20% 0%, 100% 0%, 100% 80%, 80% 100%, 0% 100%)",
    }}
  ></div>
);

// Placeholder for the decorative circles
export const CirclePlaceholder: React.FC<{ className?: string }> = ({
  className = "w-10 h-10",
}) => (
  <div
    className={`inline-flex items-center justify-center rounded-full bg-gray-200 ${className}`}
  >
    <div className="h-2 w-2 rounded-full bg-gray-400"></div> {/* Inner dot */}
  </div>
);

// Placeholder for the feature box content
export const FeatureIconPlaceholder: React.FC<{ className?: string }> = ({
  className = "w-8 h-8",
}) => (
  <div className={`relative ${className}`}>
    <div className="absolute bottom-0 left-0 h-2/3 w-full rounded-md bg-purple-300"></div>
    <div className="absolute right-1/4 top-0 h-3 w-3 rounded-full bg-purple-500"></div>
  </div>
);
