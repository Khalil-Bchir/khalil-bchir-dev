"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CircleArrowOutUpRight, Clapperboard } from "lucide-react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { PROJECTS, type ProjectDetail } from "@/lib/projects";
import { homeSectionInner, homeSectionPadding, homeSectionStackGap } from "@/lib/sectionLayout";

const PREVIEW_W = 320;
const PREVIEW_H = 200;

interface ProjectsSectionProps {
  registerSection?: (id: string, element: HTMLElement | null) => void;
  isDesktop?: boolean;
}

export default function ProjectsSection({ registerSection }: ProjectsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [active, setActive] = useState<ProjectDetail | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 420, damping: 38 });
  const springY = useSpring(y, { stiffness: 420, damping: 38 });

  useEffect(() => {
    if (registerSection && sectionRef.current) {
      registerSection("projects", sectionRef.current);
    }
  }, [registerSection]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(
    () => () => {
      if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    },
    []
  );

  const setPreviewPosition = useCallback(
    (clientX: number, clientY: number) => {
      const pad = 12;
      let nx = clientX + 20;
      let ny = clientY - PREVIEW_H / 2;
      nx = Math.min(window.innerWidth - PREVIEW_W - pad, Math.max(pad, nx));
      ny = Math.min(window.innerHeight - PREVIEW_H - pad, Math.max(pad, ny));
      x.set(nx);
      y.set(ny);
    },
    [x, y]
  );

  useEffect(() => {
    if (!active || reducedMotion) return;
    const onMove = (e: MouseEvent) => setPreviewPosition(e.clientX, e.clientY);
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [active, reducedMotion, setPreviewPosition]);

  const cancelHide = useCallback(() => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
  }, []);

  const onRowEnter = useCallback(
    (project: ProjectDetail, e: React.MouseEvent) => {
      cancelHide();
      setActive(project);
      if (!reducedMotion) {
        setPreviewPosition(e.clientX, e.clientY);
      }
    },
    [cancelHide, reducedMotion, setPreviewPosition]
  );

  const onRowLeave = useCallback(() => {
    cancelHide();
    leaveTimerRef.current = setTimeout(() => setActive(null), 140);
  }, [cancelHide]);

  const projects = PROJECTS;

  return (
    <section
      ref={sectionRef}
      id="projects"
      className={`relative flex w-full items-center justify-center bg-background ${homeSectionPadding}`}
    >
      <div className={homeSectionInner}>
        <div className={homeSectionStackGap}>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-bold leading-tight tracking-tight text-foreground text-pretty min-[380px]:text-3xl sm:text-4xl md:text-5xl">
                My Top Projects
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                Hover a row to preview the work—click through for the full case study.
              </p>
            </div>
          </div>

          <div className="relative">
            <ul className="divide-y divide-border">
              {projects.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="group block py-7 transition-colors hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:py-8"
                    onMouseEnter={(e) => onRowEnter(project, e)}
                    onMouseLeave={onRowLeave}
                  >
                    <div className="flex items-start justify-between gap-6 pr-1">
                      <div className="min-w-0 flex-1 space-y-2">
                        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground md:text-xs">
                          /projects/{project.slug}
                        </p>
                        <h3 className="text-lg font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary min-[380px]:text-xl sm:text-2xl md:text-3xl">
                          {project.cardTitle ?? project.title}
                        </h3>
                        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                          {project.description}
                        </p>
                      </div>
                      <span className="mt-1 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-foreground">
                        <CircleArrowOutUpRight className="h-5 w-5 md:h-6 md:w-6" aria-hidden />
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Cursor-following preview (desktop / fine pointer) */}
      <AnimatePresence>
        {active && !reducedMotion && (
          <motion.div
            key={active.slug}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="pointer-events-none fixed top-0 left-0 z-50 hidden overflow-hidden rounded-xl border border-border bg-card shadow-2xl ring-1 ring-black/5 [@media(hover:hover)_and_(pointer:fine)]:block dark:ring-white/10"
            style={{
              width: PREVIEW_W,
              height: PREVIEW_H,
              x: springX,
              y: springY,
            }}
          >
            <PreviewMedia project={active} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function PreviewMedia({ project }: { project: ProjectDetail }) {
  if (project.image) {
    return (
      <div className="relative h-full w-full bg-muted">
        <Image
          src={project.image}
          alt=""
          fill
          className="object-cover object-top"
          sizes={`${PREVIEW_W}px`}
          priority={false}
        />
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-muted/80">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background/90 text-muted-foreground">
        <Clapperboard className="h-5 w-5" aria-hidden />
      </div>
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        Video demo
      </span>
    </div>
  );
}
