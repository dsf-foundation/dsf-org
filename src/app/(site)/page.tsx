import Image from "next/image";
import Link from "next/link";
import { IoArrowForward, IoCheckmarkCircle, IoGlobeOutline, IoShieldCheckmark } from "react-icons/io5";
import { Reveal } from "@/components/ui/reveal";
import { ImageReveal } from "@/components/ui/image-reveal";
import { Button } from "@/components/ui/button";
import { ImageCard } from "@/components/ui/card";
import { HeroSlider } from "@/components/ui/hero-slider";
import {
  EducationIcon,
  ServiceIcon,
  VolunteerIcon,
  CareerIcon,
} from "@/components/icons";
import { activities, activityCount } from "@/data/activities";
import { funds } from "@/data/funds";
import { getAllBlogPosts, getGalleryAlbumsData } from "@/lib/content";
import { img } from "@/data/images";
import { dict } from "@/data/dictionary";
import { site } from "@/data/site";

export const revalidate = 300;

export default async function Page() {
  const hero = dict.hero;
  const blogPosts = await getAllBlogPosts();
  const gallery = await getGalleryAlbumsData();
  const galleryPhotos = gallery.photos;
  const featured = activities[0];
  const others = activities.slice(1, 4);
  const counts = [
    { value: String(activityCount), label: "Program areas" },
    { value: "100%", label: "Donations reach programs" },
  ];

  const heroSlides = [
    { ...(hero.slides?.[0] ?? { kicker: "", title: "", subtitle: "", cta: "", href: "/donate" }), image: img.hero.children },
    { ...(hero.slides?.[1] ?? { kicker: "", title: "", subtitle: "", cta: "", href: "/donate" }), image: img.hero.education },
    { ...(hero.slides?.[2] ?? { kicker: "", title: "", subtitle: "", cta: "", href: "/activities" }), image: img.hero.community },
  ];

  const pillars = [
    {
      icon: EducationIcon,
      title: "Education for all",
      body: "Classrooms, materials and real skills that open doors for young people.",
    },
    {
      icon: ServiceIcon,
      title: "Relief in a crisis",
      body: "Food, water and essentials in the first critical days — and recovery after.",
    },
    {
      icon: VolunteerIcon,
      title: "People who stay",
      body: "Working through local volunteers who know their own communities best.",
    },
    {
      icon: CareerIcon,
      title: "Self-reliance",
      body: "Livelihoods and enterprise that help families provide for themselves.",
    },
  ];

  return (
    <>
      {/* ===== Hero — full-bleed sliding photo essay ===== */}
      <HeroSlider slides={heroSlides} />

      {/* ===== Who we are — editorial split with pillars ===== */}
      <section className="bg-surface">
        <div className="container-site section-pad">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            {/* Mission column */}
            <div className="lg:col-span-5">
              <Reveal>
                <h2 className="display-lg text-4xl text-ink">
                  We believe{" "}
                  <span className="text-primary">no one should be left behind</span>{" "}
                  by poverty, disaster or circumstance.
                </h2>
              </Reveal>
              <Reveal delay={140}>
                <p className="mt-6 max-w-md text-base leading-8 text-body">
                  So we work across education, food, shelter, healthcare and
                  livelihoods — helping people build a better life on their own
                  terms, with dignity and a real path forward.
                </p>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-5 max-w-md text-sm font-medium leading-7 text-muted">
                  {dict.home.whoWeAreOrigin}
                </p>
              </Reveal>
              <Reveal delay={200}>
                <div className="mt-10 flex flex-wrap gap-x-12 gap-y-4">
                  {counts.map((c) => (
                    <div key={c.label} className="flex flex-col gap-1">
                      <span className="stat-num text-3xl text-primary md:text-4xl">
                        {c.value}
                      </span>
                      <span className="text-sm font-medium text-muted">
                        {c.label}
                      </span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Pillars column */}
            <div className="lg:col-span-7">
              <div className="grid gap-px overflow-hidden bg-line sm:grid-cols-2">
                {pillars.map((p, i) => (
                  <Reveal key={p.title} delay={(i % 2) * 90} className="flex h-full">
                    <div className="group flex h-full w-full flex-col justify-between bg-paper p-7 transition hover:bg-white md:p-8">
                      <div>
                        <span className="flex h-12 w-12 items-center justify-center bg-primary-soft text-primary">
                          <p.icon className="h-6 w-6" />
                        </span>
                        <h3 className="mt-6 text-lg font-semibold text-ink">
                          {p.title}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-body">
                          {p.body}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Where we work — editorial split ===== */}
      <section className="section-pad">
        <div className="container-site grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="display-md text-3xl text-ink">
                Lasting change comes from working with communities
              </h2>
              <p className="mt-6 text-base leading-8 text-body md:text-lg md:leading-9">
                We don&apos;t parachute in and leave. We work through local
                people who know their needs best, deliver help where it&apos;s
                needed most, and stay through recovery until families are back
                on their feet.
              </p>
              <Button
                href="/about"
                variant="ghost"
                size="lg"
                className="mt-9"
              >
                More about us
                <IoArrowForward className="h-4 w-4" />
              </Button>
            </Reveal>
          </div>
          <div className="relative lg:col-span-7">
            <ImageReveal
              src={img.stories.field}
              alt="A community working together"
              className="aspect-[4/3] w-full"
              sizes="(max-width: 1024px) 100vw, 55vw"
              priority
            />
            <Reveal
              delay={200}
              className="absolute -bottom-10 -right-2 hidden w-64 bg-white p-6 shadow-soft md:block md:-right-6"
            >
              <p className="text-sm leading-6 text-body">
                &ldquo;The most durable help is the kind that lets people help
                themselves.&rdquo;
              </p>
              <p className="mt-4 text-xs font-semibold text-muted">
                A principle we work by
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== Programs — editorial numbered list ===== */}
      <section className="bg-warm">
        <div className="container-site section-pad">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="display-md text-3xl text-ink">Our programs</h2>
            </div>
            <Button href="/activities" variant="ghost">
              All programs
              <IoArrowForward className="h-4 w-4" />
            </Button>
          </Reveal>

          {/* Featured program — large image + copy */}
          <Reveal className="mt-12">
            <Link
              href={`/activities/${featured.slug}`}
              className="group grid gap-8 overflow-hidden bg-surface lg:grid-cols-2 lg:gap-0"
            >
              <div className="img-zoom relative aspect-[16/10] lg:aspect-auto lg:min-h-[26rem]">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-between p-8 md:p-12">
                <div>
                 
                  <h3 className="display-md text-3xl max-w-md text-ink">{featured.title}</h3>
                  <p className="mt-5 max-w-md text-base leading-7 text-body md:text-lg">
                    {featured.short}
                  </p>
                </div>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary transition group-hover:gap-3.5">
                  Read about this program
                  <IoArrowForward className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </Reveal>

          {/* Remaining programs — asymmetric staggered */}
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {others.map((a, i) => (
              <Reveal key={a.slug} delay={(i % 2) * 100}>
                <Link
                  href={`/activities/${a.slug}`}
                  className="group block overflow-hidden bg-surface"
                >
                  <div className="img-zoom relative aspect-[16/10]">
                    <Image
                      src={a.image}
                      alt={a.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex items-start justify-between gap-4 p-6 md:p-7">
                    <div>
                    
                      <h3 className=" text-lg font-semibold text-ink">
                        {a.title}
                      </h3>
                    </div>
                    <span className="index-num shrink-0 text-2xl text-muted transition group-hover:text-primary">
                      {`0${i + 2}`}
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Impact storytelling — full-width photo band ===== */}
      <section className="relative overflow-hidden">
        <Image
          src={img.programs.housing}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div aria-hidden className="absolute inset-0 bg-ink/70" />
        <div className="container-site relative section-pad">
          <div className="max-w-2xl">
            <Reveal>
              <p className="mb-5 inline-flex items-center gap-3 text-xs font-bold text-white/80">
                <span className="h-px w-8 bg-accent" />
                Why your help matters
              </p>
            </Reveal>
            <Reveal delay={80}>
              <p className="pullquote text-2xl text-white md:text-4xl">
                A home, a meal, an education, a chance to earn — for the
                families we serve, these aren&apos;t luxuries. They&apos;re the
                difference between struggle and hope.
              </p>
            </Reveal>
            <Reveal delay={160} className="mt-10">
              <Button href="/donate" size="lg" variant="light">
                Give what you can
                <IoArrowForward className="h-5 w-5" />
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== How donations help (funds) — asymmetric ===== */}
      <section className="section-pad">
        <div className="container-site">
          <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="display-md text-3xl text-ink">Where donations go</h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-muted">
              Every donation is a trust. We use it only for the purpose it was
              given and report on how it&apos;s spent.
            </p>
          </Reveal>

          <div className="overflow-hidden bg-surface shadow-soft">
            {/* Ledger header */}
            <div className="hidden grid-cols-12 items-center gap-6 bg-primary px-8 py-4 text-xs font-semibold text-white md:grid">
              <div className="col-span-4">Donation fund</div>
              <div className="col-span-7">How it&apos;s used</div>
              <div className="col-span-1 text-right">Give</div>
            </div>

            {funds.map((f, i) => (
              <Reveal key={f.slug} delay={i * 70}>
                <Link
                  href="/donate"
                  className="group grid grid-cols-1 gap-5 bg-surface px-7 py-7 transition hover:bg-paper md:grid-cols-12 md:items-center md:gap-6 md:px-8"
                >
                  <div className="md:col-span-4">
                    <div className="flex items-center gap-4">
                      <span className="index-num text-3xl text-primary">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-lg font-semibold text-ink transition group-hover:text-primary">
                        {f.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm leading-7 text-body md:col-span-7">
                    {f.description}
                  </p>
                  <div className="md:col-span-1 md:text-right">
                    <span className="text-link">
                      Give
                      <IoArrowForward className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* Trust strip */}
          <Reveal className="mt-10 flex flex-wrap items-center gap-x-9 gap-y-4">
            <span className="inline-flex items-center gap-2.5 text-sm font-medium text-body">
              <IoCheckmarkCircle className="h-5 w-5 text-primary" />
              100% of donations reach our programs
            </span>
            <span className="inline-flex items-center gap-2.5 text-sm font-medium text-body">
              <IoCheckmarkCircle className="h-5 w-5 text-primary" />
              Accounts audited annually
            </span>
            <span className="inline-flex items-center gap-2.5 text-sm font-medium text-body">
              <IoCheckmarkCircle className="h-5 w-5 text-primary" />
              Every donation receipted
            </span>
          </Reveal>
        </div>
      </section>

      {/* ===== Donors worldwide — international giving trust band ===== */}
      <section className="bg-warm">
        <div className="container-site section-pad">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Reveal>
                <h2 className="display-md text-4xl text-ink lg:text-5xl">
                  {dict.international.title}
                </h2>
              </Reveal>
              <Reveal delay={90}>
                <p className="mt-6 max-w-xl text-base leading-8 text-body md:text-lg">
                  {dict.international.intro}
                </p>
              </Reveal>
              <Reveal delay={180} className="mt-9">
                <Button href="/donate" size="lg">
                  {dict.international.cta}
                  <IoArrowForward className="h-5 w-5" />
                </Button>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal delay={120}>
                <div className="relative md:translate-x-3 md:rotate-[0.6deg]">
                  <div className="bg-surface shadow-soft">
                    <div className="flex items-center justify-between gap-3 bg-ink px-6 py-4">
                      <span className="inline-flex items-center gap-3 text-sm font-bold text-white">
                        <IoGlobeOutline className="h-5 w-5 text-accent" />
                        {site.country} registered
                      </span>
                      <span className="rounded-full bg-white/10 px-2.5 py-1 text-[0.7rem] font-semibold tracking-wide text-white/80">
                        Global donors welcome
                      </span>
                    </div>
                    <div className="p-6 md:p-8">
                      <p className="text-[0.7rem] font-bold tracking-[0.18em] text-muted">
                        DONATE FROM ANYWHERE, IN ANY CURRENCY
                      </p>
                      <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        {site.currencies.map((c) => (
                          <span
                            key={c}
                            className="display-md text-3xl text-ink"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                      <div className="my-6 h-px bg-line" />
                      <ul className="space-y-2.5">
                        {dict.international.points.map((point) => (
                          <li
                            key={point}
                            className="flex items-start gap-3 text-sm font-medium leading-6 text-body"
                          >
                            <IoCheckmarkCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                            {point}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6 flex items-center gap-3 bg-primary-soft px-5 py-4">
                        <IoShieldCheckmark className="h-5 w-5 shrink-0 text-primary" />
                        <p className="text-xs font-semibold leading-5 text-primary-dark">
                          Reg. {site.regNo} · {site.regAuthority}
                        </p>
                      </div>
                    </div>
                  </div>
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-3 -top-3 h-16 w-16 border-t-2 border-r-2 border-accent"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Gallery — independent editorial mosaic ===== */}
      <section className="bg-surface">
        <div className="container-site section-pad">
          <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="display-md text-3xl text-ink">Moments that matter</h2>
            </div>
            <Button href="/gallery" variant="ghost">
              View the full gallery
              <IoArrowForward className="h-4 w-4" />
            </Button>
          </Reveal>

          <div className="group relative grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {galleryPhotos.slice(20, 25).map((photo, i) => {
              const isFeatured = i === 0;
              return (
                <Link
                  key={photo.src}
                  href="/gallery"
                  aria-label={photo.caption}
                  className={`group/item block overflow-hidden ${
                    isFeatured ? "col-span-2 row-span-2 md:col-span-2 md:row-span-2" : ""
                  }`}
                >
                  <div
                    className={`img-zoom relative overflow-hidden ${
                      isFeatured
                        ? "aspect-square md:aspect-[4/5] h-full"
                        : "aspect-[4/5]"
                    }`}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.caption}
                      fill
                      sizes={
                        isFeatured
                          ? "(max-width: 768px) 100vw, 50vw"
                          : "(max-width: 768px) 50vw, 25vw"
                      }
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/60 via-transparent to-transparent p-5 opacity-0 transition duration-300 group-hover/item:opacity-100">
                      <p className="text-sm font-semibold text-white">
                        {photo.caption}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <p className="mt-6 text-center text-xs font-medium text-muted">
            Field photographs from our programs across education, relief, water
            and beyond.
          </p>
        </div>
      </section>

      {/* ===== News — separate editorial list ===== */}
      <section>
        <div className="container-site section-pad">
          <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="display-md text-3xl text-ink">From the field</h2>
            </div>
            <Button href="/blog" variant="ghost">
              All news
              <IoArrowForward className="h-4 w-4" />
            </Button>
          </Reveal>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 90} className="h-full">
                <ImageCard
                  href={`/blog/${post.slug}`}
                  image={post.image}
                  alt={post.title}
                  kicker={post.category}
                  title={post.title}
                  excerpt={post.excerpt}
                  meta={post.date}
                  ctaLabel="Read more"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Donate CTA — editorial end ===== */}
      <section className="bg-paper">
        <div className="container-site section-pad grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="relative order-2 lg:order-1 lg:col-span-6">
            <Reveal>
              <div className="img-zoom relative aspect-[4/3] overflow-hidden">
                <Image
                  src={img.programs.meals}
                  alt="A warm meal prepared with care"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <div className="absolute -bottom-5 left-5 bg-paper px-5 py-3 shadow-float ring-1 ring-line">
              <p className="text-xs font-semibold text-muted">
                Every donation, accounted for
              </p>
            </div>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-6 lg:pl-4">
            <Reveal>
              <h2 className="display-lg text-4xl text-ink">
                A little generosity goes a long way.
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-6 max-w-lg text-lg leading-8 text-body">
                You can give to a specific fund, or support wherever need is
                greatest. Once you send your donation, we verify it and email
                you a receipt so your kindness is fully accounted for.
              </p>
            </Reveal>
            <Reveal delay={180} className="mt-9 flex flex-wrap items-center gap-4">
              <Button href="/donate" size="lg">
                Donate today
                <IoArrowForward className="h-5 w-5" />
              </Button>
              <Button href="/get-involved" variant="ghost" size="lg">
                Or get involved another way
              </Button>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
