"use client";

import React, { useEffect, useRef } from "react";
interface HeroSectionProps {
  registerSection?: (id: string, element: HTMLElement | null) => void;
  isDesktop?: boolean;
}

export default function HeroSection({ registerSection, isDesktop }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (registerSection && sectionRef.current) {
      registerSection("hero", sectionRef.current);
    }
  }, [registerSection]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className={`relative flex w-full items-center justify-center overflow-hidden bg-background ${isDesktop ? "h-screen" : "min-h-screen"}`}
    >

      {/* Hero content */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col gap-10 px-6 py-8 md:px-10 md:py-10">
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1 text-xs font-medium text-muted-foreground shadow-lg backdrop-blur">
            <span className="inline-flex h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_rgba(var(--primary),0.5)]" />
            <span>Full-stack developer · Web2 & Web3 · SaaS products</span>
          </div>

          <div className="mt-7 space-y-5 md:mt-9">
            <h1 className="bg-gradient-to-br from-foreground via-foreground/90 to-foreground/60 bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl md:text-6xl">
              I build web products from idea to launch.
            </h1>
            <p className="mx-auto max-w-2xl text-sm text-muted-foreground sm:text-base md:max-w-xl">
              Full-stack developer focused on clean UX, solid architecture, and products that actually ship.
            </p>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3 md:justify-start">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-lg transition hover:bg-primary/90"
            >
              See what I’ve launched
              <span className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-card-foreground shadow-lg backdrop-blur transition hover:border-primary/50"
            >
              Let’s collaborate
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-[11px] text-muted-foreground md:justify-start">
            <span className="inline-flex items-center gap-2">
              Crafting useful, human-centered products.
            </span>
            <span className="hidden text-zinc-600 md:inline">/</span>
            <span className="inline-flex items-center gap-2">
              Startup mindset, from zero to growth.
            </span>
            <span className="hidden text-zinc-600 md:inline">/</span>
            <span className="inline-flex items-center gap-2">
              Future‑proofing ideas for tomorrow’s web.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
