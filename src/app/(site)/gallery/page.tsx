"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoImagesOutline, IoCalendarOutline, IoArrowForward } from "react-icons/io5";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { useClientHero } from "@/components/admin/client-hero";
import { useClientBatches } from "@/components/admin/client-content";
import { activities } from "@/data/activities";

const activityOptions = activities
  .map((a) => ({ slug: a.slug, title: a.title, tag: a.tag }))
  .sort((a, b) => a.title.localeCompare(b.title));

function getInitialAlbum(): string {
  if (typeof window === "undefined") return "all";
  const params = new URLSearchParams(window.location.search);
  return params.get("album") ?? "all";
}

function formatDate(date?: string): string {
  if (!date) return "";
  const d = new Date(date);
  if (isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function Page() {
  const hero = useClientHero("gallery");
  const batches = useClientBatches();
  const [album, setAlbum] = useState(getInitialAlbum);

  useEffect(() => {
    function onUrlChange() {
      const params = new URLSearchParams(window.location.search);
      setAlbum(params.get("album") ?? "all");
    }
    window.addEventListener("popstate", onUrlChange);
    return () => window.removeEventListener("popstate", onUrlChange);
  }, []);

  const visibleBatches =
    album === "all"
      ? batches
      : batches.filter((b) => b.activitySlug === album);

  const activeAlbumTitle =
    album === "all"
      ? "All donations"
      : (activityOptions.find((a) => a.slug === album)?.title ?? album);

  return (
    <>
      <PageHero
        title={hero.title}
        subtitle={hero.subtitle}
        image={hero.image}
      />

      <section className="section-pad bg-warm">
        <div className="container-site grid gap-10 lg:grid-cols-[260px_1fr] lg:gap-14">
          {/* Sidebar filters */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <Reveal className="bg-surface p-6">
              <h2 className="text-base font-bold text-ink">Filter by program</h2>
              <p className="mt-2 text-sm leading-6 text-body">
                Browse donation updates by program. Each entry shares the story,
                the people and the progress your support made possible.
              </p>

              {album !== "all" && (
                <div className="mt-4 flex items-center justify-between gap-2 bg-primary-soft px-3 py-2 text-sm font-semibold text-primary">
                  <span className="truncate">{activeAlbumTitle}</span>
                  <button
                    type="button"
                    onClick={() => setAlbum("all")}
                    className="shrink-0 text-xs text-muted hover:text-ink"
                  >
                    Clear
                  </button>
                </div>
              )}

              <div className="mt-7">
                <p className="mb-3 text-xs font-bold text-muted">Programs</p>
                <div className="flex flex-wrap gap-2 lg:flex-col lg:items-stretch">
                  <button
                    type="button"
                    onClick={() => setAlbum("all")}
                    className={`whitespace-nowrap rounded-md px-3 py-2 text-left text-sm font-medium transition lg:flex lg:items-center lg:gap-2 ${
                      album === "all"
                        ? "bg-primary text-white"
                        : "bg-surface text-body hover:text-primary"
                    }`}
                  >
                    <IoImagesOutline className="h-4 w-4 shrink-0" />
                    All donations
                  </button>
                  {activityOptions.map((a) => (
                    <button
                      key={a.slug}
                      type="button"
                      onClick={() => setAlbum(a.slug)}
                      className={`whitespace-nowrap rounded-md px-3 py-2 text-left text-sm font-medium transition lg:flex lg:items-center lg:gap-2 ${
                        album === a.slug
                          ? "bg-primary text-white"
                          : "bg-surface text-body hover:text-primary"
                      }`}
                    >
                      <span className="hidden h-1.5 w-1.5 shrink-0 rounded-full bg-accent lg:inline-block" />
                      {a.title}
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>
          </aside>

          {/* Batch cards */}
          <div>
            <Reveal className="mb-6 flex items-end justify-between gap-4">
              <div>
                <h2 className="display-md text-2xl text-ink">{activeAlbumTitle}</h2>
                <p className="mt-1 text-sm text-muted">
                  {visibleBatches.length}{" "}
                  {visibleBatches.length === 1 ? "donation" : "donations"}
                </p>
              </div>
            </Reveal>

            {visibleBatches.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-2">
                {visibleBatches.map((batch, i) => {
                  const activityName =
                    activityOptions.find(
                      (a) => a.slug === batch.activitySlug
                    )?.title ?? batch.activitySlug;
                  const cover = batch.photos[0]?.src;
                  return (
                    <Reveal key={batch.id} delay={(i % 2) * 80}>
                      <Link
                        href={`/gallery/${batch.id}`}
                        className="group block overflow-hidden bg-surface transition hover:shadow-float"
                      >
                        <div className="img-zoom relative aspect-[16/10]">
                          {cover ? (
                            <Image
                              src={cover}
                              alt={batch.title}
                              fill
                              sizes="(max-width: 640px) 100vw, 50vw"
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-primary-soft">
                              <IoImagesOutline className="h-10 w-10 text-primary/40" />
                            </div>
                          )}
                          <span className="absolute left-3 top-3 bg-primary/90 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                            {activityName}
                          </span>
                          {batch.photos.length > 0 && (
                            <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 bg-ink/70 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                              <IoImagesOutline className="h-3.5 w-3.5" />
                              {batch.photos.length}
                            </span>
                          )}
                        </div>
                        <div className="p-5">
                          <h3 className="text-lg font-semibold leading-snug text-ink transition group-hover:text-primary">
                            {batch.title || "Untitled update"}
                          </h3>
                          {batch.description && (
                            <p className="mt-2 line-clamp-3 text-sm leading-6 text-body">
                              {batch.description}
                            </p>
                          )}
                          <div className="mt-4 flex items-center gap-4 border-t border-line pt-4">
                            {batch.date && (
                              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted">
                                <IoCalendarOutline className="h-3.5 w-3.5 text-accent" />
                                {formatDate(batch.date)}
                              </span>
                            )}
                            <span className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-primary">
                              View photos
                              <IoArrowForward className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    </Reveal>
                  );
                })}
              </div>
            ) : (
              <div className="bg-surface py-16 text-center">
                <IoImagesOutline className="mx-auto h-10 w-10 text-muted/40" />
                <p className="mt-4 text-muted">
                  No donation updates in this program yet.
                </p>
                <Button href="/donate" variant="primary" className="mt-6">
                  Support this program
                  <IoArrowForward className="h-4 w-4" />
                </Button>
              </div>
            )}

            {visibleBatches.length > 0 && (
              <Reveal className="mt-10">
                <div className="flex items-center justify-between border border-line bg-surface p-6">
                  <p className="text-sm leading-6 text-body">
                    Want to be part of stories like these? Your support turns
                    plans into homes, meals and classrooms.
                  </p>
                  <Button href="/donate" variant="primary" className="shrink-0">
                    Donate now
                    <IoArrowForward className="h-4 w-4" />
                  </Button>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
