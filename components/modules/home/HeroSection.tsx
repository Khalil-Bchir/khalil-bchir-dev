"use client";

import React, { useEffect, useRef } from "react";
import { homeSectionInner, homeSectionPadding } from "@/lib/sectionLayout";

interface HeroSectionProps {
  registerSection?: (id: string, element: HTMLElement | null) => void;
  isDesktop?: boolean;
}

export default function HeroSection({ registerSection }: HeroSectionProps) {
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
      className={`relative flex w-full min-h-[100dvh] flex-col items-center justify-center bg-background ${homeSectionPadding}`}
    >
      {/* Hero content */}
      <div className={`relative z-10 flex w-full flex-col gap-6 sm:gap-8 ${homeSectionInner}`}>
        <div className="flex flex-col items-center justify-center text-center">
          <div className="inline-flex max-w-[min(100%,22rem)] items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1.5 text-center text-[11px] font-medium leading-snug text-muted-foreground shadow-lg backdrop-blur sm:max-w-none sm:px-4 sm:py-1 sm:text-xs">
            <span className="inline-flex h-2 w-2 shrink-0 rounded-full bg-primary shadow-[0_0_12px_rgba(var(--primary),0.5)]" />
            <span>Full-stack developer · Web2 & Web3 · SaaS products</span>
          </div>

          <div className="mt-7 space-y-4 sm:space-y-5 md:mt-9">
            <h1 className="bg-gradient-to-br from-foreground via-foreground/90 to-foreground/60 bg-clip-text px-1 text-2xl font-semibold leading-[1.12] tracking-tight text-transparent text-pretty min-[380px]:text-3xl sm:px-0 sm:text-4xl sm:leading-tight md:text-5xl lg:text-6xl">
              I build web products from idea to launch.
            </h1>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base md:max-w-xl">
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
