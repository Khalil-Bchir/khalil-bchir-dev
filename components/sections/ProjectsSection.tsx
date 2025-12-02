"use client";

import React, { useEffect, useRef } from "react";
import { CircleArrowOutUpRight } from "lucide-react";

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
}

interface ProjectsSectionProps {
  registerSection?: (id: string, element: HTMLElement | null) => void;
  isDesktop?: boolean;
}

export default function ProjectsSection({ registerSection, isDesktop }: ProjectsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (registerSection && sectionRef.current) {
      registerSection("projects", sectionRef.current);
    }
  }, [registerSection]);

  const projects: Project[] = [
    {
      id: "1",
      title: "SaaS Analytics Dashboard",
      description: "Multi-tenant analytics platform with billing, teams, and real-time product metrics.",
      image: "/scream.jpg",
      href: "#",
    },
    {
      id: "2",
      title: "Web3 Platform",
      description: "Launchpad for NFT-style drops with on-chain access control and dashboards.",
      image: "/scream.jpg",
      href: "#",
    },
    {
      id: "3",
      title: "DevTools Extension",
      description: "Browser-first devtool that streamlines debugging and API exploration.",
      image: "/scream.jpg",
      href: "#",
    },
    {
      id: "4",
      title: "Next.js Starter Kit",
      description: "Production-ready starter with auth, billing, and a clean design system.",
      image: "/scream.jpg",
      href: "#",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="projects"
      className={`relative flex w-full items-center justify-center overflow-hidden bg-background px-6 py-20 md:px-10 ${isDesktop ? "h-screen" : "min-h-screen"}`}
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="space-y-10 md:space-y-12">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-4xl font-bold text-foreground md:text-5xl">
                My Top Projects
              </h2>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground md:text-base">
                A snapshot of products I&apos;ve shipped—from SaaS tools to Web3 platforms.
              </p>
            </div>
          </div>

          <div className="grid auto-rows-[220px] gap-4 md:auto-rows-[260px] md:grid-cols-4">
            {/* Big left tile */}
            <ProjectTile project={projects[0]} className="md:col-span-2 md:row-span-2" />
            {/* Top-right tiles */}
            <ProjectTile project={projects[1]} className="md:col-span-1" />
            <ProjectTile project={projects[2]} className="md:col-span-1" />
            <ProjectTile project={projects[3]} className="md:col-span-2" />
          </div>
        </div>
      </div>
    </section>
  );
}

interface ProjectTileProps {
  project: Project;
  className?: string;
}

function ProjectTile({ project, className }: ProjectTileProps) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative overflow-hidden rounded-2xl border border-border bg-card/80 shadow-lg transition hover:border-primary/60 hover:shadow-xl ${className ?? ""}`}
      style={{
        backgroundImage: `url(${project.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-black/60 transition-opacity group-hover:from-black/80 group-hover:via-black/60 group-hover:to-black/80" />

      <div className="relative flex h-full flex-col justify-between p-5 md:p-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-white md:text-xl">
            {project.title}
          </h3>
          <p className="max-w-md text-xs text-zinc-200/80 md:text-sm">
            {project.description}
          </p>
        </div>

        <div className="flex items-center justify-end">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/60 text-white transition group-hover:border-primary/70 group-hover:bg-primary/90 group-hover:text-primary-foreground">
            <CircleArrowOutUpRight className="h-5 w-5" />
          </div>
        </div>
      </div>
    </a>
  );
}