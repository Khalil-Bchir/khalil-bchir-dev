"use client";

import React, { useEffect, useRef } from "react";

interface AboutSectionProps {
  registerSection?: (id: string, element: HTMLElement | null) => void;
  isDesktop?: boolean;
}

export default function AboutSection({ registerSection, isDesktop }: AboutSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (registerSection && sectionRef.current) {
      registerSection("about", sectionRef.current);
    }
  }, [registerSection]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className={`relative flex w-full items-center justify-center overflow-hidden bg-background px-6 py-20 md:px-10 ${isDesktop ? 'h-screen' : 'min-h-screen'}`}
    >
      <div className="mx-auto w-full max-w-4xl">
        <div className="space-y-8">
          <h2 className="text-4xl font-bold text-foreground md:text-5xl">
             How I Build 
          </h2>


          <div className="space-y-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            <p>
              I take ideas from the first sketch all the way to live, paying users. No handoffs and no gaps. I own every step until the product ships and starts growing.
            </p>

            <p>
              My focus is technical design: crafting the architecture that scales, wiring up APIs that just work, and building systems that handle real traffic. I shape how data flows and how the app thinks, making sure it is fast, reliable, and ready to evolve.
            </p>

            <p>
              Whether it is a SaaS dashboard humming with activity or a Web3 platform processing on-chain transactions, I deliver complete products that solve problems and stick around. Right now I ship proofs-of-concept in really short time and turn them into revenue-ready platforms.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
