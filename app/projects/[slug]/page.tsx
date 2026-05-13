import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/projects";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return { title: "Project" };
  }
  return {
    title: `${project.title} | Khalil`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      <div className="mx-auto w-full max-w-3xl px-3 py-8 sm:px-6 sm:py-12 md:px-8 md:py-16 lg:max-w-4xl">
        <nav className="mb-6 sm:mb-8 md:mb-10">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition hover:text-foreground sm:text-sm"
          >
            <ArrowLeft className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" aria-hidden />
            Back to projects
          </Link>
        </nav>

        <header className="space-y-3 border-b border-border pb-6 sm:space-y-4 sm:pb-8 md:pb-10">
          <p className="break-words font-mono text-[10px] leading-relaxed text-muted-foreground sm:text-[11px] md:text-xs">
            /projects/{project.slug}
          </p>
          {project.cardTitle && project.cardTitle !== project.title && (
            <p className="text-xs font-semibold tracking-wide text-primary sm:text-sm">
              {project.cardTitle}
            </p>
          )}

          <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-start md:justify-between md:gap-6">
            <h1 className="min-w-0 flex-1 text-balance break-words text-[clamp(1.25rem,4.5vw+0.4rem,2.25rem)] font-bold leading-[1.12] tracking-tight text-foreground sm:text-[clamp(1.5rem,3.2vw+0.65rem,2.25rem)] md:text-4xl md:leading-[1.1] lg:text-[2.5rem] lg:leading-tight">
              {project.title}
            </h1>
            {(project.liveUrl || project.repoUrl) && (
              <div className="flex w-full min-w-0 shrink-0 flex-col gap-2 sm:w-auto sm:flex-row md:flex-col md:items-stretch lg:items-end">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground ring-2 ring-primary/20 transition hover:bg-primary/90 hover:ring-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto sm:whitespace-nowrap md:px-5 md:py-3 md:text-base"
                  >
                    <span className="min-w-0 truncate sm:truncate-none">
                      {project.liveUrlLabel ?? "Visit live site"}
                    </span>
                    <ExternalLink className="h-4 w-4 shrink-0 opacity-90 md:h-5 md:w-5" aria-hidden />
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-primary/40 bg-background px-4 py-2 text-sm font-semibold text-foreground transition hover:border-primary hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto sm:whitespace-nowrap md:px-5 md:py-2.5"
                  >
                    Source code
                    <ExternalLink className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
                  </a>
                )}
              </div>
            )}
          </div>

          <p className="text-pretty text-[0.9375rem] leading-relaxed text-muted-foreground sm:text-base sm:leading-relaxed md:text-lg md:leading-relaxed">
            {project.description}
          </p>
          <ul className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="max-w-full truncate rounded-full border border-border bg-muted/50 px-2.5 py-1 text-[11px] font-medium text-foreground sm:px-3 sm:text-xs"
                title={tag}
              >
                {tag}
              </li>
            ))}
          </ul>
        </header>

        {project.video && (
          <figure className="mt-8 overflow-hidden rounded-xl border border-border bg-black shadow-sm sm:mt-10">
            <div className="relative aspect-video w-full max-h-[70vh] min-h-[12rem]">
              <iframe
                className="h-full w-full"
                src={`https://drive.google.com/file/d/${project.video}/preview`}
                allow="autoplay; encrypted-media"
                allowFullScreen
                title={`${project.title} demo video`}
              />
            </div>
            <figcaption className="sr-only">Screen recording of {project.title}</figcaption>
          </figure>
        )}

        {!project.video && project.image && (
          <figure className="mt-8 overflow-hidden rounded-xl border border-border bg-muted shadow-sm sm:mt-10">
            <div className="relative aspect-video w-full max-h-[min(70vh,32rem)] min-h-[12rem] sm:min-h-[14rem]">
              <Image
                src={project.image}
                alt={`${project.title} preview`}
                fill
                className="object-cover object-top"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 56rem"
                priority
              />
            </div>
          </figure>
        )}

        <article className="mt-8 max-w-none space-y-4 text-[0.9375rem] leading-relaxed sm:mt-10 sm:space-y-6 sm:text-base">
          {project.body.map((paragraph, i) => (
            <p key={i} className="text-pretty text-muted-foreground">
              {paragraph}
            </p>
          ))}

          {project.subsections?.map((section) => (
            <section key={section.heading} className="mt-7 space-y-2.5 sm:mt-10 sm:space-y-3 md:space-y-4">
              <h2 className="text-balance break-words text-lg font-semibold leading-snug tracking-tight text-foreground sm:text-xl md:text-2xl md:leading-tight">
                {section.heading}
              </h2>
              {section.paragraphs.map((p, i) => (
                <p key={i} className="text-pretty text-muted-foreground">
                  {p}
                </p>
              ))}
            </section>
          ))}

          {project.featureTable && project.featureTable.length > 0 && (
            <section className="mt-7 space-y-2.5 sm:mt-10 sm:space-y-3 md:space-y-4">
              <h2 className="text-balance text-lg font-semibold leading-snug tracking-tight text-foreground sm:text-xl md:text-2xl md:leading-tight">
                Summary of features
              </h2>
              <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
                <div className="inline-block min-w-full overflow-hidden rounded-xl border border-border align-middle">
                  <table className="w-full min-w-[520px] border-collapse text-left text-sm">
                    <thead>
                      <tr className="border-b border-border bg-muted/50">
                        <th className="px-3 py-2.5 font-semibold text-foreground sm:px-4 sm:py-3 md:px-5">
                          Feature
                        </th>
                        <th className="px-3 py-2.5 font-semibold text-foreground sm:px-4 sm:py-3 md:px-5">
                          What it means for you
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {project.featureTable.map((row) => (
                        <tr key={row.feature} className="border-b border-border last:border-b-0">
                          <td className="align-top px-3 py-2.5 font-medium text-foreground sm:px-4 sm:py-3 md:px-5">
                            {row.feature}
                          </td>
                          <td className="px-3 py-2.5 text-muted-foreground sm:px-4 sm:py-3 md:px-5">
                            {row.meaning}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}

          {project.closingParagraphs?.map((p, i) => (
            <p key={`closing-${i}`} className="mt-8 text-muted-foreground">
              {p}
            </p>
          ))}
        </article>

        <p className="mt-12 pb-8 text-center text-sm text-muted-foreground sm:mt-14 sm:pb-10">
          <Link href="/" className="font-medium text-foreground underline-offset-4 hover:underline">
            Home
          </Link>
        </p>
      </div>
    </div>
  );
}
