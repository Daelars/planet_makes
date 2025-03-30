"use client";
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import PrintingBusinessCard from "./BlankInfoCard";

gsap.registerPlugin(ScrollTrigger);

const ProductCards: React.FC = () => {
  const main = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards: HTMLElement[] =
        gsap.utils.toArray<HTMLElement>(".card-container");
      if (cards.length <= 1 || !main.current) return;

      // Measure each card’s total height and heading height.
      const cardHeights = cards.map(
        (card) => card.offsetHeight || 400, // fallback estimate
      );
      const headingHeights = cards.map((card) => {
        const headingEl = card.querySelector(".card-heading") as HTMLElement;
        return headingEl?.offsetHeight || 72;
      });

      // Pre-calculate how far each card should move up (the offset).
      // For card i, total offset = sum of (cardHeights[j] - headingHeights[j]) for j < i
      let offsets: number[] = [];
      offsets[0] = 0; // first card does not move
      for (let i = 1; i < cards.length; i++) {
        offsets[i] =
          offsets[i - 1] + (cardHeights[i - 1] - headingHeights[i - 1]);
      }

      // The total scroll distance (end) should be the final offset of the last card
      const finalOffset = offsets[offsets.length - 1] || 0;

      // Create the timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: main.current,
          pin: true,
          start: "top top",
          end: `+=${finalOffset}`,
          scrub: 1,
          // markers: true, // enable for debugging
        },
      });

      // Animate each card’s y-position from 0 to -offsets[i]
      cards.forEach((card, i) => {
        tl.to(
          card,
          {
            y: -offsets[i],
            ease: "none",
          },
          0, // all in one “scrubbed” timeline
        );
      });
    }, main);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={main} className="relative">
      <div className="space-y-10">
        {/* Card 1: Organizers & Utility Prints */}
        <div className="card-container relative z-10">
          <PrintingBusinessCard
            heading="Organizers & Utility Prints"
            description="Smart 3D printed solutions for home, office, and workshop. Keep your space tidy and efficient with our functional designs."
            listItems={[
              "Desk & Drawer Organizers",
              "Pegboard Hooks & Mounts",
              "Battery & Cable Management",
              "Workshop Tool Holders",
              "Functional Storage Solutions",
            ]}
            logoText="PLANET MAKES"
            tagline={
              <>
                Organize Everything,
                <br />
                Precisely.
              </>
            }
            imageSrc="https://images.unsplash.com/photo-1679403769032-9506c6104604?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8M2QlMjBwcmludGVkJTIwb3JnYW5pemVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
            imageAlt="Collection of 3D printed organizers"
            accentColorClass="bg-teal-500"
            dotColorClass="bg-teal-300"
            backgroundColor="bg-emerald-200"
          />
        </div>

        {/* Card 2: Tech Accessories */}
        <div className="card-container relative z-20">
          <PrintingBusinessCard
            heading="Tech Accessories"
            description="Enhance your devices with clever 3D printed stands, mounts, and cases designed for modern tech and gaming gear."
            listItems={[
              "Device Stands (Phones, Tablets)",
              "Gaming Console Accessories (Steam Deck)",
              "Smartwatch & Charger Docks",
              "Headphone Holders & Mounts",
              "Protective Cases & Gadget Mounts",
            ]}
            logoText="PLANET MAKES"
            tagline={
              <>
                Elevate Your
                <br />
                Tech Setup.
              </>
            }
            imageSrc="https://images.unsplash.com/photo-1611911813383-667910c9a29a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8M2QlMjBwcmludGVkJTIwcGhvbmUlMjBzdGFuZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
            imageAlt="3D printed stand holding a smartphone"
            accentColorClass="bg-indigo-500"
            dotColorClass="bg-indigo-300"
            backgroundColor="bg-indigo-200"
          />
        </div>

        {/* Card 3: Gaming Gear */}
        <div className="card-container relative z-30">
          <PrintingBusinessCard
            heading="Gaming Gear"
            description="Level up your gaming station with custom-designed 3D printed stands, mounts, and accessories for controllers and consoles."
            listItems={[
              "Controller Stands & Wall Mounts",
              "Handheld Console Accessories",
              "Headset Holders",
              "Cable Management for Setups",
              "Desk Enhancements for Gamers",
            ]}
            logoText="PLANET MAKES"
            tagline={
              <>
                Gear Up,
                <br />
                Game On.
              </>
            }
            imageSrc="https://images.unsplash.com/photo-1587202372634-32705e577e14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fDNkJTIwcHJpbnRlZCUyMGdhbWluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
            imageAlt="3D printed controller stand on a desk"
            accentColorClass="bg-red-500"
            dotColorClass="bg-red-300"
            backgroundColor="bg-rose-200"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCards;
