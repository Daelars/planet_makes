import React from "react";

import Navbar from "@/components/Navigation/Main/Navigation";

import PrintingShowcase from "@/components/Layout/Main/InfoCards";
import HeroSection from "@/components/Layout/Main/HeroSection";
import GradientBackgroundContainer from "@/components/Layout/Main/GradientBackgroundContainer";
import TextFeature from "@/components/Layout/Main/ProductSection";
export default async function Home() {
  return (
    <>
      <Navbar />
      <GradientBackgroundContainer centerContent={false}>
        <HeroSection />
      </GradientBackgroundContainer>
      <GradientBackgroundContainer centerContent={false}>
        <TextFeature />
      </GradientBackgroundContainer>

      <PrintingShowcase />
    </>
  );
}
