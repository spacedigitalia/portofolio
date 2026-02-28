"use client";

import React from "react";

import LightRays from "@/components/ui/LightRays";

export default function HeroProjects() {
  return (
    <div className="w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] relative">
      <LightRays
        variant="circle"
        pixelSize={6}
        patternScale={3}
        patternDensity={1.2}
        pixelSizeJitter={0.5}
        enableRipples
        rippleSpeed={0.4}
        rippleThickness={0.12}
        rippleIntensityScale={1.5}
        liquid
        liquidStrength={0.12}
        liquidRadius={1.2}
        liquidWobbleSpeed={5}
        speed={0.6}
        edgeFade={0.25}
        transparent
        className="z-20"
      />
      {/* Background overlay beneath LightRays */}
      <div className="absolute inset-0 z-0 bg-linear-to-b from-background/80 to-background/0" />
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center px-4 sm:px-6 max-w-4xl mx-auto">
          <button
            className="mx-auto mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-foreground/5 px-4 sm:px-5 py-2 text-xs sm:text-sm font-medium text-foreground/90 backdrop-blur hover:bg-foreground/10 transition-colors"
            type="button"
            aria-label="New Background"
          >
            <span className="inline-block h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-sm bg-foreground/60" />
            <span className="xs:hidden">Projects</span>
          </button>
          <h1 className="text-foreground font-extrabold leading-tight tracking-tight">
            <span className="block text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              Collection of Projects
            </span>
            <span className="block text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-1">
              I've Made.
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
}
