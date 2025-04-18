"use client";
import React, { useEffect, useRef } from "react";

interface ScreenFitTextProps {
  text: string;
  className?: string;
  containerClassName?: string;
  textClassName?: string;
}

export const ScreenFitText: React.FC<ScreenFitTextProps> = ({
  text,
  className = "",
  containerClassName = "flex h-screen w-full items-center overflow-hidden bg-slate-950",
  textClassName = "absolute bottom-0 left-0 mx-auto whitespace-nowrap text-center font-bold uppercase text-slate-700",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    resizeText();
    window.addEventListener("resize", resizeText);

    return () => {
      window.removeEventListener("resize", resizeText);
    };
  }, [text]);

  const resizeText = () => {
    const container = containerRef.current;
    const textElement = textRef.current;

    if (!container || !textElement) {
      return;
    }

    const containerWidth = container.offsetWidth;
    let min = 1;
    let max = 2500;

    while (min <= max) {
      const mid = Math.floor((min + max) / 2);
      textElement.style.fontSize = mid + "px";

      if (text && textElement.offsetWidth <= containerWidth) {
        min = mid + 1;
      } else {
        max = mid - 1;
      }
    }

    textElement.style.fontSize = max + "px";
  };

  return (
    <div className={`${containerClassName} ${className}`} ref={containerRef}>
      <span className={`${textClassName}`} ref={textRef}>
        {text}
      </span>
    </div>
  );
};
