import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IoArrowForward, IoArrowBack, IoLocationOutline } from "react-icons/io5";
import { Reveal } from "@/components/ui/reveal";
import { RichContent } from "@/components/ui/rich-content";
import { Button } from "@/components/ui/button";
import {
  activities,
  getActivity,
  getActivityGalleryImages,
  schoolBranches,
} from "@/data/activities";

export function generateStaticParams() {
  return activities.map((a) => ({ slug: a.slug }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const activity = getActivity(slug);
  if (!activity) notFound();

  const others = activities.filter((a) => a.slug !== slug).slice(0, 3);
  const branches =
    activity.hasBranches && slug === "schools" ? schoolBranches : [];

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[55vh] flex items-center overflow-hidden bg-ink">
        <Image
          src={activity.image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-80"
        />

        <div aria-hidden className="absolute inset-0 hero-overlay" />
        <div className="container-site relative z-10 py-24 md:py-28">
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex items-center gap-3 text-xs font-bold text-white/85">
              <span className="h-px w-8 bg-accent" />
              {activity.tag}
            </p>
            <h1 className="display-xl text-5xl text-white">{activity.title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85">
              {activity.short}
            </p>
            <Button href="/donate" size="lg" variant="light" className="mt-8">
              Donate to this cause
              <IoArrowForward className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Impact / key facts strip */}
      <section className="border-b border-line bg-surface">
        <div className="container-site grid grid-cols-1 gap-6 py-10 sm:grid-cols-3">
          {activity.meta
            .filter((m) => m.label !== "Status")
            .slice(0, 3)
            .map((m) => (
              <Reveal key={m.label} className="text-center">
                <p className="display-lg text-4xl text-primary">{m.value}</p>
                <p className="mt-2 text-sm font-medium text-muted">
                  {m.label}
                </p>
              </Reveal>
            ))}
          {activity.meta.length === 0 && (
            <Reveal className="text-center">
              <p className="display-lg text-4xl text-primary">100%</p>
              <p className="mt-2 text-sm font-medium text-muted">
                of donations reach the field
              </p>
            </Reveal>
          )}
        </div>
      </section>

      {/* School branches */}
      {branches.length > 0 && (
        <section className="section-pad">
          <div className="container-site">
            <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-6">
              <div>
                <h2 className="display-md text-3xl text-ink">
                  Our school branches
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-6 text-body">
                  We run dedicated school support branches across Bangladesh.
                  Explore each one to see the communities we serve.
                </p>
              </div>
            </Reveal>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {branches.map((b, i) => (
                <Reveal key={b.slug} delay={i * 80}>
                  <Link
                    href={`/activities/schools/${b.slug}`}
                    className="group block overflow-hidden bg-surface"
                  >
                    <div className="img-zoom relative aspect-[4/3]">
                      <Image
                        src={b.image}
                        alt={b.name}
                        fill
                        sizes="(max-width: 1024px) 50vw, 25vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
                        <IoLocationOutline className="h-3.5 w-3.5" />
                        {b.location}
                      </p>
                      <h3 className="mt-2 text-base font-semibold leading-snug text-ink transition group-hover:text-primary">
                        {b.name}
                      </h3>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* See photos from this program */}
      <section className="section-pad bg-warm">
        <div className="container-site">
          <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="display-md text-3xl text-ink">
                See {activity.title} in action
              </h2>
            </div>
            <Button href={`/gallery?album=${activity.slug}`} variant="ghost">
              See all photos
              <IoArrowForward className="h-4 w-4" />
            </Button>
          </Reveal>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {getActivityGalleryImages(activity.slug).map((src, i) => (
              <Link
                key={src}
                href={`/gallery?album=${activity.slug}`}
                aria-label={`${activity.title} photo ${i + 1}`}
                className="group block overflow-hidden"
              >
                <div className="img-zoom relative aspect-[4/3]">
                  <Image
                    src={src}
                    alt={`${activity.title} photo ${i + 1}`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 15vw"
                    className="object-cover"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Donate CTA banner */}
      <section className="bg-primary">
        <div className="container-site flex flex-col items-center gap-6 py-16 text-center md:flex-row md:justify-between md:text-left">
          <Reveal>
            <h2 className="display-md text-3xl text-white">
              Every child deserves hope.
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-white/85">
              Your kindness changes lives in {activity.title}. Join us today.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <Button href="/donate" size="lg" variant="light">
              Donate now
              <IoArrowForward className="h-5 w-5" />
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site grid gap-14 lg:grid-cols-[1.7fr_1fr] lg:gap-16">
          {/* Main content */}
          <div className="space-y-10">
            <Reveal>
              <p className="text-xl leading-9 text-ink md:text-2xl md:leading-10">
                {activity.intro}
              </p>
            </Reveal>

            <RichContent blocks={activity.blocks} />

            <Reveal>
              <div className="flex flex-wrap items-center gap-4 border-t border-line pt-8">
                <Button href="/donate" size="lg" variant="accent">
                  Support this work
                  <IoArrowForward className="h-5 w-5" />
                </Button>
                <Link
                  href="/activities"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:gap-3"
                >
                  <IoArrowBack className="h-4 w-4" />
                  All programs
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <Reveal className="border border-line bg-surface p-7">
              <dl className="space-y-5 text-sm">
                {activity.meta.map((m) => (
                  <div key={m.label}>
                    <dt className="text-xs font-semibold text-muted">
                      {m.label}
                    </dt>
                    <dd className="mt-1 font-semibold text-ink">{m.value}</dd>
                  </div>
                ))}
              </dl>
              <Button
                href="/donate"
                variant="accent"
                size="lg"
                className="mt-8 w-full"
              >
                Donate
              </Button>
            </Reveal>

            <Reveal delay={80} className="border border-line bg-surface p-7">
              <h3 className="mb-5 font-semibold text-ink">More programs</h3>
              <ul className="space-y-4">
                {others.map((other) => (
                  <li key={other.slug}>
                    <Link
                      href={`/activities/${other.slug}`}
                      className="group flex items-center gap-3"
                    >
                      <span className="relative h-14 w-20 shrink-0 overflow-hidden">
                        <Image
                          src={other.image}
                          alt=""
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </span>
                      <span className="text-sm font-semibold leading-5 text-ink transition group-hover:text-primary">
                        {other.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </aside>
        </div>
      </section>

      {/* Related */}
      <section className="border-t border-line bg-warm py-20 md:py-24">
        <div className="container-site">
          <Reveal className="mb-10 flex items-end justify-between gap-6">
            <h2 className="display-md text-3xl text-ink">More programs</h2>
            <Button href="/activities" variant="ghost">
              All programs
              <IoArrowForward className="h-4 w-4" />
            </Button>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {others.map((other, i) => (
              <Reveal key={other.slug} delay={i * 80}>
                <Link
                  href={`/activities/${other.slug}`}
                  className="group block overflow-hidden bg-surface"
                >
                  <div className="img-zoom relative aspect-[16/10]">
                    <Image
                      src={other.image}
                      alt={other.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-4 p-5">
                    <h3 className="text-base font-semibold leading-snug text-ink transition group-hover:text-primary">
                      {other.title}
                    </h3>
                    <IoArrowForward className="h-4 w-4 shrink-0 text-muted transition group-hover:translate-x-1 group-hover:text-primary" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
