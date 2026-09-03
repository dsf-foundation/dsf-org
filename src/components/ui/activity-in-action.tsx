"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoArrowForward } from "react-icons/io5";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { useClientBatches } from "@/components/admin/client-content";
import type { GalleryBatch } from "@/lib/firestore";

function dateKey(batch: GalleryBatch): number {
  const t = batch.createdAt || batch.updatedAt || batch.date;
  if (!t) return 0;
  const ts = new Date(t).getTime();
  return Number.isNaN(ts) ? 0 : ts;
}

/**
 * "Support in action" strip — pulls the real, most recent donation batch for
 * this program and shows its photos (no batch title). "View all images" opens
 * the gallery pre-filtered to this program. Renders nothing when there are no
 * batches/photos yet, so no dummy content ever appears.
 */
export function ActivityInAction({
  slug,
  title,
}: {
  slug: string;
  title: string;
}) {
  const batches = useClientBatches();

  const latest = useMemo(() => {
    const mine = batches
      .filter((b) => b.activitySlug === slug)
      .sort((a, b) => dateKey(b) - dateKey(a));
    return mine[0];
  }, [batches, slug]);

  const photos = latest?.photos?.filter((p) => p.src) ?? [];

  if (!latest || photos.length === 0) return null;

  const galleryHref = `/gallery?album=${encodeURIComponent(slug)}`;

  return (
    <section className="bg-warm">
      <div className="container-site section-pad">
        <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="kicker-dot mb-5">Support in action</p>
            <h2 className="display-md text-3xl text-ink">{title}</h2>
          </div>
          <Button href={galleryHref} variant="ghost">
            View all images
            <IoArrowForward className="h-4 w-4" />
          </Button>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {photos.slice(0, 4).map((photo, i) => (
            <Reveal key={photo.src} delay={i * 80}>
              <Link
                href={galleryHref}
                aria-label={`${title} photo ${i + 1}`}
                className="group block"
              >
                <div className="img-zoom relative aspect-[4/3] overflow-hidden bg-surface">
                  <Image
                    src={photo.src}
                    alt={photo.caption || `${title} photo ${i + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                {photo.caption && (
                  <p className="mt-2 px-0.5 text-xs leading-5 text-muted">
                    {photo.caption}
                  </p>
                )}
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
