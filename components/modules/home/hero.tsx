"use client";

import PixelBlast from "@/components/PixelBlast";
import Navbar from "@/components/common/navbar";

export default function Hero() {
  return (
    <section className="relative flex h-screen w-screen items-center justify-center overflow-hidden bg-black">
      {/* DarkVeil background */}
      <div className="absolute top-0 left-0 h-90 w-full">
        <PixelBlast
          variant="diamond"
          pixelSize={6}
          color="#B19EEF"
          patternScale={3}
          patternDensity={1.2}
          pixelSizeJitter={1.5}
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
        />
      </div>

      {/* Foreground layout */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col gap-10 px-6 py-8 md:px-10 md:py-10">

        <Navbar />

        {/* Hero content */}
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-700/80 bg-zinc-900/60 px-4 py-1 text-xs font-medium text-zinc-300 shadow-lg shadow-black/60 backdrop-blur">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
            <span>Full‑stack engineer · Next.js · Node · TypeScript</span>
          </div>

          <div className="mt-7 space-y-5 md:mt-9">
            <h1 className="bg-gradient-to-br from-zinc-50 via-zinc-100 to-zinc-400 bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl md:text-6xl">
              I build end‑to‑end web products
            </h1>
            <p className="mx-auto max-w-2xl text-sm text-zinc-300/90 sm:text-base md:max-w-xl">
              I design and ship performant frontends and robust backends, from
              pixel‑perfect interfaces to scalable APIs, databases, and
              deployment pipelines.
            </p>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3 md:justify-start">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-zinc-50 px-5 py-2.5 text-sm font-medium text-black shadow-lg shadow-black/60 transition hover:bg-white"
            >
              View full‑stack projects
              <span className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-500/70 bg-zinc-900/60 px-5 py-2.5 text-sm font-medium text-zinc-100 shadow-[0_0_25px_rgba(0,0,0,0.9)] backdrop-blur transition hover:border-zinc-300"
            >
              Book a call
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-[11px] text-zinc-300/80 md:justify-start">
            <span className="inline-flex items-center gap-2">
              {/* <span className="h-px w-8 bg-zinc-500/70" /> */}
              Frontend: React, Next.js, Tailwind
            </span>
            <span className="hidden text-zinc-600 md:inline">/</span>
            <span className="inline-flex items-center gap-2">
              Backend: Node, REST & APIs, SQL/NoSQL
            </span>
            <span className="hidden text-zinc-600 md:inline">/</span>
            <span className="inline-flex items-center gap-2">
              CI/CD & cloud‑ready architectures
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}