"use client";

export default function About() {
  return (
    <section className="relative flex h-screen w-screen items-center justify-center overflow-hidden bg-black">
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <h2 className="text-4xl font-bold text-zinc-50">About Me</h2>
        <p className="mt-3 max-w-xl text-sm text-zinc-300/90 sm:text-base">
          I'm a full-stack engineer with a passion for building performant
          frontends and robust backends.
        </p>
      </div>
    </section>
  );
}