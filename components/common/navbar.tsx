"use client";
import { Command } from "lucide-react";

export default function Navbar() {
  return (
        <header className="flex justify-center bg-blur-md">
          <nav className="flex h-14 w-full max-w-4xl items-center justify-between rounded-full border border-white/10 bg-black/30 px-5 text-sm text-zinc-100 shadow-[0_0_40px_rgba(0,0,0,0.75)] backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center">
                <Command className="h-4 w-4  " />
              </div>
              <span className="text-sm font-bold uppercase tracking-tight text-zinc-50">
                Khalil
              </span>
            </div>
            <div className="flex items-center gap-6 text-xs font-medium text-zinc-200">
              <a href="#home" className="transition hover:text-white">
                Home
              </a>
              <a href="#projects" className="transition hover:text-white">
                Projects
              </a>
              <a href="#stack" className="transition hover:text-white">
                Stack
              </a>
              <a href="#contact" className="transition hover:text-white">
                Contact
              </a>
            </div>
          </nav>
        </header>
  );
}