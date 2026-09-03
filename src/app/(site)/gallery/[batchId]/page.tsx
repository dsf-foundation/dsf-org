"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  IoClose,
  IoChevronBack,
  IoChevronForward,
  IoImagesOutline,
  IoCalendarOutline,
  IoArrowBack,
} from "react-icons/io5";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { useClientBatches } from "@/components/admin/client-content";
import { activities } from "@/data/activities";

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

export default function Page({ params }: { params: Promise<{ batchId: string }> }) {
  const [batchId, setBatchId] = useState<string | null>(null);
  const batches = useClientBatches();
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    params.then((p) => setBatchId(p.batchId));
  }, [params]);

  const batch = useMemo(
    () => batches.find((b) => b.id === batchId),
    [batches, batchId]
  );

  if (batchId && batchId !== "" && batches.length > 0 && !batch) {
    notFound();
  }

  if (!batch) {
    return (
      <div className="container-site flex min-h-[60vh] items-center justify-center">
        <p className="text-muted">Loading donation update...</p>
      </div>
    );
  }

  const activityName =
    activities.find((a) => a.slug === batch.activitySlug)?.title ??
    batch.activitySlug;
  const photos = batch.photos || [];

  return (
    <>
      {/* Header */}
      <section className="border-b border-line bg-surface">
        <div className="container-site py-14 md:py-16">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:gap-3"
          >
            <IoArrowBack className="h-4 w-4" />
            All donation updates
          </Link>

          <Reveal className="mt-6 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                <span className="h-px w-8 bg-accent" />
                {activityName}
              </p>
              <h1 className="display-lg text-4xl text-ink">
                {batch.title || "Untitled update"}
              </h1>
              {batch.description && (
                <p className="mt-4 text-lg leading-8 text-body">
                  {batch.description}
                </p>
              )}
            </div>
            <div className="flex flex-col items-start gap-3 lg:items-end">
              {batch.date && (
                <span className="inline-flex items-center gap-2 text-sm font-medium text-muted">
                  <IoCalendarOutline className="h-4 w-4 text-accent" />
                  {formatDate(batch.date)}
                </span>
              )}
              <span className="inline-flex items-center gap-2 text-sm font-medium text-muted">
                <IoImagesOutline className="h-4 w-4 text-accent" />
                {photos.length} {photos.length === 1 ? "photo" : "photos"}
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Photo grid */}
      <section className="section-pad bg-warm">
        <div className="container-site">
          {photos.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {photos.map((photo, i) => (
                <Reveal key={i} delay={(i % 3) * 70}>
                  <button
                    type="button"
                    onClick={() => setLightbox(i)}
                    className="group relative block w-full overflow-hidden"
                  >
                    <div className="img-zoom relative aspect-[4/3]">
                      <Image
                        src={photo.src}
                        alt={photo.caption || `${batch.title} photo ${i + 1}`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                  </button>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="bg-surface py-16 text-center">
              <IoImagesOutline className="mx-auto h-10 w-10 text-muted/40" />
              <p className="mt-4 text-muted">No photos in this update yet.</p>
            </div>
          )}

          {/* CTA */}
          <Reveal className="mt-12">
            <div className="flex flex-col items-center justify-between gap-5 bg-primary p-8 text-center md:flex-row md:text-left">
              <div>
                <p className="display-md text-2xl text-white">
                  Stories like this are made possible by donors like you.
                </p>
                <p className="mt-2 text-sm text-white/85">
                  Help us turn more plans into real change in {activityName}.
                </p>
              </div>
              <Button href="/donate" size="lg" variant="light" className="shrink-0">
                Donate now
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && photos[lightbox] && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setLightbox(null)}
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25"
          >
            <IoClose className="h-5 w-5" />
          </button>
          {lightbox > 0 && (
            <button
              type="button"
              aria-label="Previous"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox(lightbox - 1);
              }}
              className="absolute left-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25"
            >
              <IoChevronBack className="h-6 w-6" />
            </button>
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photos[lightbox].src}
            alt={photos[lightbox].caption || batch.title}
            className="max-h-[90vh] max-w-5xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm font-medium text-white/80">
            {photos[lightbox].caption || photos[lightbox].src}
          </p>
          {lightbox < photos.length - 1 && (
            <button
              type="button"
              aria-label="Next"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox(lightbox + 1);
              }}
              className="absolute right-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25"
            >
              <IoChevronForward className="h-6 w-6" />
            </button>
          )}
        </div>
      )}
    </>
  );
}
