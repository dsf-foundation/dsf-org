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
  IoBookOutline,
  IoPeopleOutline,
  IoTelescopeOutline,
  IoBuildOutline,
} from "react-icons/io5";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { ActivityInAction } from "@/components/ui/activity-in-action";
import { schoolBranches, getSchoolBranch } from "@/data/activities";
import { programs } from "@/data/images";
import { site } from "@/data/site";

export function generateStaticParams() {
  return schoolBranches.map((b) => ({ branch: b.slug }));
}

const SERVICES = [
  {
    icon: IoBookOutline,
    title: "Classroom essentials",
    text: "Books, notebooks, stationery and learning materials for schools that cannot afford them.",
  },
  {
    icon: IoBuildOutline,
    title: "Infrastructure & equipment",
    text: "Desks, fans, repairs and essential equipment so classrooms are safe and comfortable to learn in.",
  },
  {
    icon: IoPeopleOutline,
    title: "Student sponsorship",
    text: "Tuition, uniform and exam-fee support for children from financially struggling families.",
  },
  {
    icon: IoTelescopeOutline,
    title: "Community & recovery",
    text: "Working alongside parents and teachers to keep schools open — including recovery after floods and emergencies.",
  },
];

const TRUST_NOTES = [
  { icon: IoShieldCheckmark, text: "100% of donations reach our programs" },
  { icon: IoGlobeOutline, text: "Donate from Bangladesh or worldwide" },
  { icon: IoCheckmarkCircle, text: "Official receipt & certificate" },
];

export default async function Page({
  params,
}: {
  params: Promise<{ branch: string }>;
}) {
  const { branch } = await params;
  const school = getSchoolBranch(branch);
  if (!school) notFound();

  const otherBranches = schoolBranches.filter((b) => b.slug !== branch);
  const areaName = school.location.split(",")[0].trim();
  const branchName = school.name.replace(/ Branch$/, "");

  const collage = programs.schools.slice(0, 5);

  return (
    <>
      {/* ===== Cinematic hero ===== */}
      <section className="relative flex min-h-[70vh] items-end overflow-hidden bg-ink">
        <Image
          src={school.image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/45 to-ink/30" />
        <div className="container-site relative z-10 pb-14 pt-40 md:pb-20">
          <div className="max-w-3xl">
            <Reveal>
              <p className="mb-5 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-white/85">
                <span className="h-px w-8 bg-accent" />
                School Support Branch
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="display-xl text-4xl text-white md:text-6xl">
                {branchName}
              </h1>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                <IoLocationOutline className="h-4 w-4" />
                {school.location}
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/90">
                {school.description}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== Real stat band ===== */}
      <section className="border-b border-line bg-surface">
        <div className="container-site grid grid-cols-1 gap-6 py-10 sm:grid-cols-3">
          {school.stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 80} className="text-center">
              <p className="display-lg text-4xl text-primary">{stat.value}</p>
              <p className="mt-2 text-sm font-medium text-muted">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== Support in action (real latest batch, hidden if empty) ===== */}
      <ActivityInAction slug="schools" title={`${branchName} Branch`} />

      {/* ===== About the branch + services ===== */}
      <section className="section-pad bg-paper">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Main */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="kicker-dot mb-6">About this branch</p>
            </Reveal>
            <Reveal>
              <h2 className="display-md text-3xl text-ink md:text-4xl">
                A school, a community,{" "}
                <span className="text-primary">a future</span>
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-6 text-lg leading-9 text-body">
                In {school.location}, the local school is often the only path
                out of poverty for an entire generation. Our {branchName} branch
                works hand-in-hand with under-resourced schools, teachers and
                families to keep that path open — one classroom, one student and
                one schoolbag at a time.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-5 text-lg leading-9 text-body">
                Every {branchName} donation is directed to the schools serving
                this area. We coordinate with school leadership to identify what
                is needed most, deliver it with local volunteers, and report
                back on the difference it made.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {SERVICES.map((s, i) => (
                <Reveal key={s.title} delay={i * 70}>
                  <div className="flex h-full flex-col border border-line bg-surface p-6">
                    <span className="flex h-11 w-11 items-center justify-center bg-primary-soft text-primary">
                      <s.icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 text-base font-semibold text-ink">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-body">{s.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-10 flex flex-wrap items-center gap-4 border-t border-line pt-8">
              <Button href="/donate" size="lg" variant="accent">
                Support {branchName}
                <IoArrowForward className="h-5 w-5" />
              </Button>
              <Link
                href="/activities/schools"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:gap-3"
              >
                <IoArrowBack className="h-4 w-4" />
                School Support overview
              </Link>
            </Reveal>
          </div>

          {/* Persist donor rail */}
          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-28 lg:h-fit">
              <Reveal className="overflow-hidden border border-line bg-surface shadow-soft">
                <div className="bg-ink p-7 text-white">
                  <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-white/60">
                    Support this branch
                  </p>
                  <h2 className="display-md mt-2 text-2xl text-white">
                    {branchName}, Bangladesh
                  </h2>
                </div>
                <div className="border-t border-line p-6">
                  <p className="text-sm leading-6 text-body">
                    Your generosity directly supports the schools and students
                    of {school.location} — keeping children in class and giving
                    them a real chance to learn.
                  </p>
                  <Button
                    href="/donate"
                    variant="primary"
                    size="lg"
                    className="mt-6 w-full"
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

      {/* ===== Photo collage ===== */}
      <section className="bg-warm section-pad">
        <div className="container-site">
          <Reveal className="mb-8">
            <p className="kicker-dot mb-5">The classrooms we support</p>
            <h2 className="display-md text-3xl text-ink">
              School life in {areaName}
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            {collage.map((src, i) => (
              <Reveal
                key={src}
                delay={i * 60}
                className={i === 0 ? "col-span-2 row-span-2" : ""}
              >
                <div
                  className={`img-zoom relative w-full overflow-hidden ${
                    i === 0 ? "aspect-square" : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={src}
                    alt={`${branchName} Branch school photo ${i + 1}`}
                    fill
                    sizes="(max-width: 640px) 50vw, 20vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Final conversion ===== */}
      <section className="bg-primary">
        <div className="container-site section-pad">
          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-8">
              <Reveal>
                <h2 className="display-md text-3xl text-white md:text-4xl">
                  Help a child in {areaName} stay in school.
                </h2>
              </Reveal>
              <Reveal delay={90}>
                <p className="mt-4 max-w-xl text-base leading-8 text-white/85">
                  {site.internationalDonations}
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-4">
              <Reveal delay={120}>
                <Button href="/donate" size="lg" variant="light" className="w-full">
                  Donate now
                  <IoArrowForward className="h-5 w-5" />
                </Button>
                <p className="mt-3 text-center text-xs font-medium text-white/85">
                  <IoHeartOutline className="mr-1 inline h-3.5 w-3.5 text-accent" />
                  Or become a monthly giver
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Other branches ===== */}
      <section className="border-t border-line bg-paper py-20 md:py-24">
        <div className="container-site">
          <Reveal className="mb-10 flex items-end justify-between gap-6">
            <h2 className="display-md text-3xl text-ink">Other branches</h2>
            <Button href="/activities/schools" variant="ghost">
              School Support overview
              <IoArrowForward className="h-4 w-4" />
            </Button>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {otherBranches.map((b, i) => (
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
                      sizes="(max-width: 768px) 100vw, 25vw"
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

      {/* ===== Mobile sticky donate bar ===== */}
      <div aria-hidden className="lg:hidden h-20" />
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-surface/95 p-3 backdrop-blur lg:hidden">
        <Button href="/donate" size="lg" className="w-full">
          Support {branchName}
          <IoArrowForward className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
}
