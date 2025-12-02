"use client";

import React, { useEffect, useRef } from "react";
import { Mail, Github, Linkedin, Twitter } from "lucide-react";

interface ContactSectionProps {
  registerSection?: (id: string, element: HTMLElement | null) => void;
  isDesktop?: boolean;
}

export default function ContactSection({ registerSection, isDesktop }: ContactSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (registerSection && sectionRef.current) {
      registerSection("contact", sectionRef.current);
    }
  }, [registerSection]);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={`relative flex w-full items-center justify-center overflow-hidden bg-background px-6 py-20 md:px-10 ${isDesktop ? "h-screen" : "min-h-screen"}`}
    >
      <div className="mx-auto w-full max-w-5xl">
        <div className="grid gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:items-start">
          {/* Form side */}
          <div className="space-y-6 rounded-2xl border border-border bg-card/80 p-6 shadow-lg backdrop-blur md:p-8">
            <div className="space-y-2 text-left">
              <h2 className="text-3xl font-semibold text-foreground md:text-4xl">
                Let&apos;s build something
              </h2>
              <p className="max-w-md text-sm text-muted-foreground md:text-base">
                Share a bit about your idea, product, or team. I usually reply within a day.
              </p>
            </div>

            <form
              className="space-y-5"
              action="mailto:youremail@example.com"
              method="post"
              encType="text/plain"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <FloatingLabelField label="Name" id="name" type="text" required />
                <FloatingLabelField label="Email" id="email" type="email" required />
              </div>

              <FloatingLabelField
                label="What are you working on?"
                id="subject"
                type="text"
                required
              />

              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="peer w-full rounded-xl border border-border bg-background/80 px-4 py-3 text-sm text-foreground shadow-inner outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder=" "
                />
                <label
                  htmlFor="message"
                  className="pointer-events-none absolute left-4 top-2.5 bg-background px-1 text-xs text-muted-foreground transition-all peer-focus:-translate-y-3 peer-focus:text-[10px] peer-focus:text-primary peer-[&:not(:placeholder-shown)]:-translate-y-3 peer-[&:not(:placeholder-shown)]:text-[10px]"
                >
                  Tell me about your project, timeline, and goals
                </label>
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg transition hover:bg-primary/90 md:w-auto"
              >
                <Mail className="h-4 w-4" />
                Send message
              </button>
            </form>
          </div>

          {/* Socials / direct contact side */}
          <div className="space-y-6 text-left">
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
                Connect
              </p>
              <h3 className="text-xl font-semibold text-foreground">
                Prefer a quick DM?
              </h3>
              <p className="text-sm text-muted-foreground">
                Reach out on any of these and I&apos;ll get back as soon as I can.
              </p>
            </div>

            <div className="space-y-3">
              <SocialRow
                icon={<Mail className="h-4 w-4" />}
                label="Email"
                handle="youremail@example.com"
                href="mailto:youremail@example.com"
              />
              <SocialRow
                icon={<Linkedin className="h-4 w-4" />}
                label="LinkedIn"
                handle="@your-linkedin"
                href="https://linkedin.com/in/yourprofile"
              />
              <SocialRow
                icon={<Github className="h-4 w-4" />}
                label="GitHub"
                handle="@your-github"
                href="https://github.com/yourhandle"
              />
              <SocialRow
                icon={<Twitter className="h-4 w-4" />}
                label="Twitter"
                handle="@your-handle"
                href="https://twitter.com/yourhandle"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface FloatingLabelFieldProps {
  label: string;
  id: string;
  type: string;
  required?: boolean;
}

function FloatingLabelField({ label, id, type, required }: FloatingLabelFieldProps) {
  return (
    <div className="relative">
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        className="peer w-full rounded-xl border border-border bg-background/80 px-4 py-3 text-sm text-foreground shadow-inner outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        placeholder=" "
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-4 top-2.5 bg-background px-1 text-xs text-muted-foreground transition-all peer-focus:-translate-y-3 peer-focus:text-[10px] peer-focus:text-primary peer-[&:not(:placeholder-shown)]:-translate-y-3 peer-[&:not(:placeholder-shown)]:text-[10px]"
      >
        {label}
      </label>
    </div>
  );
}

interface SocialRowProps {
  icon: React.ReactNode;
  label: string;
  handle: string;
  href: string;
}

function SocialRow({ icon, label, handle, href }: SocialRowProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between rounded-xl border border-border bg-card/70 px-4 py-3 text-sm text-card-foreground transition hover:border-primary/60 hover:bg-card"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
          {icon}
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {label}
          </span>
          <span className="text-sm font-medium">{handle}</span>
        </div>
      </div>
      <span className="text-xs text-muted-foreground">Open</span>
    </a>
  );
}
