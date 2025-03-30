// src/components/GradientBackgroundContainer.tsx
import React from "react";

interface GradientBackgroundContainerProps {
  children: React.ReactNode;
  className?: string; // Allow passing additional classes if needed
  centerContent?: boolean; // New optional prop to control centering
}

const GradientBackgroundContainer: React.FC<
  GradientBackgroundContainerProps
> = ({
  children,
  className = "",
  centerContent = true, // Default to true to maintain original behavior
}) => {
  // Base classes that are always applied
  const baseClasses =
    "flex min-h-screen bg-gradient-to-br from-purple-200 via-white to-indigo-300 p-4 sm:p-8";

  // Conditionally add centering classes
  const centeringClasses = centerContent ? "items-center justify-center" : "";

  // Combine all classes, ensuring clean spacing and trimming potential extra spaces
  const combinedClasses = `${baseClasses} ${centeringClasses} ${className}`
    .replace(/\s+/g, " ") // Replace multiple spaces/newlines with single space
    .trim(); // Remove leading/trailing spaces

  return <div className={combinedClasses}>{children}</div>;
};

export default GradientBackgroundContainer;
