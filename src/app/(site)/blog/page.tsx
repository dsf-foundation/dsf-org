"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoSearch, IoClose, IoArrowForward } from "react-icons/io5";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { ImageCard } from "@/components/ui/card";
import { useClientHero } from "@/components/admin/client-hero";
import { useClientBlogs } from "@/components/admin/client-content";

export default function Page() {
  const hero = useClientHero("blog");
  const blogPosts = useClientBlogs();
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const filtered = q
    ? blogPosts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q)
      )
    : blogPosts;

  const [featured, ...rest] = filtered;

  return (
    <>
      <PageHero
        kicker={hero.kicker}
        title={hero.title}
        subtitle={hero.subtitle}
        image={hero.image}
      />

      <section className="container-site section-pad">
        <Reveal className="mx-auto mb-12 max-w-xl">
          <div className="flex items-center gap-3 border border-line bg-surface px-5 focus-within:ring-2 focus-within:ring-primary">
            <IoSearch className="h-5 w-5 shrink-0 text-muted" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search news..."
              className="w-full bg-transparent py-3 text-base text-ink outline-none placeholder:text-muted"
            />
            {query && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => setQuery("")}
                className="shrink-0 rounded-full p-1 text-muted transition hover:bg-primary-soft hover:text-primary"
              >
                <IoClose className="h-4 w-4" />
              </button>
            )}
          </div>
        </Reveal>

        {filtered.length > 0 ? (
          <>
            {!q && featured && (
              <Reveal className="mb-14">
                <Link
                  href={`/blog/${featured.slug}`}
                  className="group relative block min-h-[420px] overflow-hidden md:min-h-[480px]"
                >
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 78rem"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div aria-hidden className="absolute inset-0 hero-overlay" />
                  <div className="absolute inset-x-0 bottom-0 p-8 md:p-12">
                    <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold text-white/80">
                      <span className="h-px w-6 bg-accent" />
                      {featured.category} · Featured story
                    </p>
                    <h2 className="max-w-3xl text-2xl font-semibold leading-tight text-white md:text-4xl">
                      {featured.title}
                    </h2>
                    <p className="mt-3 max-w-xl text-sm leading-6 text-white/80 md:text-base">
                      {featured.excerpt}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 bg-primary px-5 py-2.5 text-sm font-semibold text-white transition group-hover:bg-accent group-hover:text-ink">
                      Read story
                      <IoArrowForward className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            )}

            {rest.length > 0 && (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {(q ? filtered : rest).map((post, i) => (
                  <Reveal key={post.slug} delay={(i % 3) * 80} className="h-full">
                    <ImageCard
                      href={`/blog/${post.slug}`}
                      image={post.image}
                      alt={post.title}
                      kicker={post.category}
                      title={post.title}
                      excerpt={post.excerpt}
                      meta={post.date}
                      ctaLabel="Read story"
                    />
                  </Reveal>
                ))}
              </div>
            )}
          </>
        ) : (
          <p className="py-16 text-center text-muted">
            No posts found for your search.
          </p>
        )}
      </section>
    </>
  );
}
