"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      // Tick progress while fonts load
      const progressInterval = setInterval(() => {
        setProgress((p) => Math.min(p + 1, 90));
      }, 30);

      try {
        await document.fonts.ready;
      } catch {
        // fonts.ready not supported — continue
      }

      clearInterval(progressInterval);
      if (cancelled) return;

      // Preload all <img> and Next.js <Image> sources already in the DOM
      const images = Array.from(document.querySelectorAll("img"));
      if (images.length > 0) {
        const pending = images
          .filter((img) => !img.complete)
          .map(
            (img) =>
              new Promise<void>((resolve) => {
                img.addEventListener("load", () => resolve(), { once: true });
                img.addEventListener("error", () => resolve(), { once: true });
              })
          );

        setProgress(92);
        await Promise.all(pending);
      }

      if (cancelled) return;

      setProgress(100);
      // Brief pause so the user sees 100%
      await new Promise((r) => setTimeout(r, 300));
      if (cancelled) return;
      setDone(true);
      // Wait for the exit animation to finish
      setTimeout(() => setHidden(true), 700);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      className={`preloader ${done ? "preloader--done" : ""}`}
      aria-hidden={done}
    >
      <div className="preloader__inner">
        <span className="preloader__name">KB</span>
        <div className="preloader__bar-track">
          <div
            className="preloader__bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="preloader__pct">{progress}%</span>
      </div>
    </div>
  );
}
