import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  IoArrowForward,
  IoArrowBack,
  IoLocationOutline,
  IoHeartOutline,
  IoShieldCheckmark,
  IoGlobeOutline,
  IoCheckmarkCircle,
} from "react-icons/io5";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { ActivityInAction } from "@/components/ui/activity-in-action";
import {
  ActivityBlocks,
  DonationImpact,
  type DonationTier,
} from "@/components/ui/activity-content";
import {
  activities,
  getActivity,
  schoolBranches,
} from "@/data/activities";
import { site } from "@/data/site";

export function generateStaticParams() {
  return activities.map((a) => ({ slug: a.slug }));
}

// Real per-dollar framing shown in the donor rail. Values are illustrative
// living-cost figures; keep in sync with donate page messaging where possible.
const RAIL_TIERS: DonationTier[] = [
  { label: "$10", taka: "৳1,160", impact: "A week of classroom supplies" },
  { label: "$25", taka: "৳2,900", impact: "A school essentials kit" },
  { label: "$50", taka: "৳5,800", impact: "Uniform + shoes + a bag" },
];

const TRUST_NOTES = [
  { icon: IoShieldCheckmark, text: "100% of donations reach our programs" },
  { icon: IoGlobeOutline, text: "Donate from Bangladesh or worldwide" },
  { icon: IoCheckmarkCircle, text: "Official receipt & certificate" },
];

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
  const meta = activity.meta.filter((m) => m.label !== "Status");

  return (
    <>
      {/* ===== Cinematic hero ===== */}
      <section className="relative flex min-h-[78vh] items-end overflow-hidden bg-ink">
        <Image
          src={activity.image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/40 to-ink/30" />

        <div className="container-site relative z-10 pb-16 pt-40 md:pb-24">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <Reveal>
                <p className="mb-6 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-white/85">
                  <span className="h-px w-8 bg-accent" />
                  {activity.tag}
                </p>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="display-xl text-5xl text-white md:text-6xl">
                  {activity.title}
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <div className="mt-7 max-w-xl border-l-2 border-accent pl-5">
                  <p className="pullquote text-lg text-white/95 md:text-xl">
                    {activity.short}
                  </p>
                </div>
              </Reveal>
              <Reveal delay={240} className="mt-9 flex flex-wrap items-center gap-4">
                <Button href="/donate" size="lg" variant="light">
                  Donate to this cause
                  <IoArrowForward className="h-5 w-5" />
                </Button>
                <a
                  href="#give"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 underline-offset-4 hover:underline"
                >
                  <IoHeartOutline className="h-4 w-4 text-accent" />
                  Give monthly
                </a>
              </Reveal>
            </div>

            <div className="flex items-end lg:col-span-4">
              <Reveal delay={200} className="w-full">
                <div className="grid grid-cols-2 gap-px overflow-hidden bg-white/15">
                  {meta.slice(0, 2).map((m) => (
                    <div key={m.label} className="bg-ink/40 p-5 backdrop-blur-sm">
                      <p className="text-xs font-medium uppercase tracking-wider text-white/55">
                        {m.label}
                      </p>
                      <p className="mt-2 text-sm font-semibold leading-5 text-white">
                        {m.value}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Support in action (real latest batch, hidden if empty) ===== */}
      <ActivityInAction slug={activity.slug} title={activity.title} />

      {/* ===== Narrative + persistent donor rail ===== */}
      <section className="section-pad bg-paper">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Main editorial narrative */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="lead text-2xl font-display leading-[1.45] text-ink md:text-[1.7rem]">
                {activity.intro}
              </p>
            </Reveal>

            <div className="mt-12">
              <ActivityBlocks blocks={activity.blocks} />
            </div>

            <Reveal className="mt-12 flex flex-wrap items-center gap-4 border-t border-line pt-8">
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
            </Reveal>
          </div>

          {/* Persistent donor rail */}
          <aside className="lg:col-span-5">
            <div id="give" className="lg:sticky lg:top-28 lg:h-fit lg:scroll-mt-28">
              <Reveal className="overflow-hidden border border-line bg-surface shadow-soft">
                <div className="bg-ink p-7 text-white">
                  <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-white/60">
                    Your impact
                  </p>
                  <h2 className="display-md mt-2 text-2xl text-white">
                    Make it real
                  </h2>
                </div>

                <div className="space-y-4 p-6">
                  {RAIL_TIERS.map((tier) => (
                    <div key={tier.label} className="group">
                      <div className="flex items-baseline justify-between">
                        <span className="stat-num text-2xl text-primary">
                          {tier.label}
                        </span>
                        <span className="text-xs text-muted">
                          {tier.taka}
                        </span>
                      </div>
                      <p className="mt-1 text-sm leading-6 text-body">
                        {tier.impact}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-line p-6">
                  <Button
                    href="/donate"
                    variant="primary"
                    size="lg"
                    className="w-full"
                  >
                    Donate now
                    <IoArrowForward className="h-4 w-4" />
                  </Button>
                  <p className="mt-3 text-center text-xs font-medium text-muted">
                    One-time or monthly · any amount · any currency
                  </p>

                  <ul className="mt-6 space-y-3">
                    {TRUST_NOTES.map((t) => (
                      <li key={t.text} className="flex items-center gap-2.5">
                        <t.icon className="h-4 w-4 shrink-0 text-accent" />
                        <span className="text-xs leading-5 text-body">
                          {t.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </aside>
        </div>
      </section>

      {/* ===== Donation impact band (callout) ===== */}
      <DonationImpact blocks={activity.blocks} title={activity.title} />

      {/* ===== School branches ===== */}
      {branches.length > 0 && (
        <section className="section-pad bg-surface">
          <div className="container-site">
            <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="kicker-dot mb-5">School branches</p>
                <h2 className="display-md text-3xl text-ink">
                  Where we work
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

      {/* ===== Final conversion — global giving ===== */}
      <section className="relative overflow-hidden bg-primary">
        <div className="container-site section-pad">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="mb-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white/85">
                  <IoGlobeOutline className="h-4 w-4" />
                  Help from anywhere
                </p>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="display-md text-3xl text-white md:text-4xl">
                  Every child deserves hope.
                </h2>
              </Reveal>
              <Reveal delay={140}>
                <p className="mt-5 max-w-xl text-base leading-8 text-white/85">
                  {site.internationalDonations}
                </p>
              </Reveal>
              <Reveal delay={200} className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
                {site.currencies.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-white/90"
                  >
                    <IoCheckmarkCircle className="h-4 w-4 text-accent" />
                    {c}
                  </span>
                ))}
              </Reveal>
            </div>
            <div className="lg:col-span-5">
              <Reveal delay={120}>
                <div className="flex flex-col items-start gap-4">
                  <Button href="/donate" size="lg" variant="light">
                    Donate now
                    <IoArrowForward className="h-5 w-5" />
                  </Button>
                  <a
                    href="#give"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 underline-offset-4 hover:underline"
                  >
                    <IoHeartOutline className="h-4 w-4 text-accent" />
                    Become a monthly giver
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Related ===== */}
      <section className="border-t border-line bg-paper py-20 md:py-24">
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

      {/* ===== Mobile sticky donate bar ===== */}
      <div aria-hidden className="lg:hidden h-20" />
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-surface/95 p-3 backdrop-blur lg:hidden">
        <Button href="/donate" size="lg" className="w-full">
          Donate to {activity.title}
          <IoArrowForward className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
}
