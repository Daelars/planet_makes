import React from "react";

export interface PrintingCardProps {
  heading: string;
  description: string;
  listItems: string[];
  logoText: string;
  tagline: React.ReactNode; // Allow multi-line taglines via <br />
  imageSrc: string;
  imageAlt: string;
  accentColorClass?: string; // e.g., 'bg-brand-pink', 'bg-blue-400'
  dotColorClass?: string; // e.g., 'bg-brand-lime', 'bg-orange-400'
  backgroundColor?: string; // e.g., 'bg-brand-light-purple', 'bg-brand-dark-purple'
}

const PrintingBusinessCard: React.FC<PrintingCardProps> = ({
  heading,
  description,
  listItems,
  logoText,
  tagline,
  imageSrc,
  imageAlt,
  accentColorClass = "bg-brand-pink", // Default accent
  dotColorClass = "bg-brand-lime", // Default dot color
  backgroundColor = "bg-brand-light-purple", // Default background
}) => {
  return (
    <div className={`${backgroundColor} p-8 md:p-12`}>
      <div className="flex flex-col items-stretch gap-8 md:flex-row">
        {/* Left Section */}
        <div className="flex flex-1 flex-col gap-8 md:gap-12">
          <div className="flex items-center">
            <span
              className={`h-4 w-4 ${accentColorClass} mr-3 flex-shrink-0 rounded-full`}
            ></span>
            {/* Apply Ultra font using arbitrary value */}
            <h1 className="card-heading font-[family-name:var(--font-ultra)] text-5xl font-bold leading-tight text-black md:text-7xl">
              {heading}
            </h1>
          </div>
          {/* Apply PT Serif font using arbitrary value */}
          <p className="font-[family-name:var(--font-pt-serif)] text-lg leading-relaxed text-gray-800">
            {description}
          </p>
          {/* Apply PT Serif font using arbitrary value */}
          <ul className="mt-auto space-y-1 font-[family-name:var(--font-pt-serif)] text-sm text-gray-700">
            {listItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Right Section */}
        <div className="relative flex min-h-[300px] flex-1 flex-col overflow-hidden rounded-lg bg-brand-dark-purple p-8 text-white md:min-h-0">
          {/* Apply Ultra font using arbitrary value */}
          <div className="inline-block border-b border-white pb-0.5 font-[family-name:var(--font-ultra)] text-sm tracking-wider">
            {logoText}
          </div>

          {/* Abstract Image */}
          <img
            src={imageSrc}
            alt={imageAlt}
            className="absolute right-6 top-6 h-24 w-24 rounded-full border-2 border-gray-700 object-cover md:h-32 md:w-32"
          />

          {/* Decorative Dots */}
          <div
            className={`absolute right-[140px] top-8 h-3 w-3 md:right-[180px] ${dotColorClass} rounded-full`}
          ></div>
          <div
            className={`absolute bottom-8 right-12 h-2 w-2 ${dotColorClass} rounded-full`}
          ></div>

          {/* Apply Ultra font using arbitrary value */}
          <div className="mt-auto">
            <h2 className="font-[family-name:var(--font-ultra)] text-4xl leading-tight md:text-5xl">
              {tagline}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintingBusinessCard;
