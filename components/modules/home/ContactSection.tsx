"use client";

import React, { useEffect, useRef, useState } from "react";
import { Briefcase, Github, Linkedin, Loader2, Mail } from "lucide-react";
import { homeSectionInner, homeSectionPadding } from "@/lib/sectionLayout";

interface ContactSectionProps {
  registerSection?: (id: string, element: HTMLElement | null) => void;
  isDesktop?: boolean;
}

export default function ContactSection({ registerSection }: ContactSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (registerSection && sectionRef.current) {
      registerSection("contact", sectionRef.current);
    }
  }, [registerSection]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const subject = String(fd.get("subject") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={`relative flex w-full items-center justify-center bg-background ${homeSectionPadding}`}
    >
      <div className={homeSectionInner}>
        <div className="grid gap-6 sm:gap-8 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:items-start">
          {/* Form side */}
          <div className="space-y-6 rounded-2xl border border-border bg-card/80 p-5 shadow-lg backdrop-blur sm:p-6 md:p-8">
            <div className="space-y-2 text-left">
              <h2 className="text-xl font-semibold leading-tight tracking-tight text-foreground text-pretty min-[380px]:text-2xl sm:text-3xl md:text-4xl">
                Let&apos;s build something
              </h2>
              <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
                Share a bit about your idea, product, or team. I usually reply within a day.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
              <div className="grid gap-4 md:grid-cols-2">
                <FloatingLabelField
                  label="Name"
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                />
                <FloatingLabelField
                  label="Email"
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                />
              </div>

              <FloatingLabelField
                label="What are you working on?"
                id="subject"
                name="subject"
                type="text"
                autoComplete="off"
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

              {status === "success" && (
                <p className="text-sm font-medium text-primary" role="status">
                  Message sent. I&apos;ll get back to you soon.
                </p>
              )}
              {status === "error" && (
                <p className="text-sm font-medium text-destructive" role="alert">
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg transition hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-60 md:w-auto"
              >
                {status === "loading" ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                ) : (
                  <Mail className="h-4 w-4" aria-hidden />
                )}
                {status === "loading" ? "Sending…" : "Send message"}
              </button>
            </form>
          </div>

          {/* Socials / direct contact side */}
          <div className="space-y-6 text-left">
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
                Connect
              </p>
              <h3 className="text-lg font-semibold leading-snug tracking-tight text-foreground sm:text-xl">
                Prefer a quick DM?
              </h3>
              <p className="text-sm text-muted-foreground">
                Reach out on any of these and I&apos;ll get back as soon as I can.
              </p>
            </div>

            <div className="space-y-3">
              <SocialRow
                icon={<Linkedin className="h-4 w-4" />}
                label="LinkedIn"
                handle="mohamed-khalil-bchir"
                href="https://www.linkedin.com/in/mohamed-khalil-bchir/"
              />
              <SocialRow
                icon={<Github className="h-4 w-4" />}
                label="GitHub"
                handle="Khalil-Bchir"
                href="https://github.com/Khalil-Bchir"
              />
              <SocialRow
                icon={<Mail className="h-4 w-4" />}
                label="Email"
                handle="khalil.bchir@proton.me"
                href="mailto:khalil.bchir@proton.me"
              />
              <SocialRow
                icon={<Briefcase className="h-4 w-4" />}
                label="Upwork"
                handle="Freelancer profile"
                href="https://www.upwork.com/freelancers/~0119a7bea10c4d7b73?mp_source=share"
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
  name: string;
  type: string;
  required?: boolean;
  autoComplete?: string;
}

function FloatingLabelField({
  label,
  id,
  name,
  type,
  required,
  autoComplete,
}: FloatingLabelFieldProps) {
  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
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
  const isMailto = href.startsWith("mailto:");
  return (
    <a
      href={href}
      target={isMailto ? undefined : "_blank"}
      rel={isMailto ? undefined : "noopener noreferrer"}
      className="flex min-w-0 items-center justify-between gap-3 rounded-xl border border-border bg-card/70 px-3 py-3 text-sm text-card-foreground transition hover:border-primary/60 hover:bg-card sm:px-4"
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          {icon}
        </div>
        <div className="min-w-0 flex flex-col">
          <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {label}
          </span>
          <span className="truncate text-sm font-medium">{handle}</span>
        </div>
      </div>
      <span className="text-xs text-muted-foreground">Open</span>
    </a>
  );
}
