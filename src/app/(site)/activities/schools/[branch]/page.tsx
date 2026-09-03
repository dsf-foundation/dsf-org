import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IoArrowBack, IoArrowForward, IoLocationOutline } from "react-icons/io5";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { schoolBranches, getSchoolBranch, getActivity } from "@/data/activities";

export function generateStaticParams() {
  return schoolBranches.map((b) => ({ branch: b.slug }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ branch: string }>;
}) {
  const { branch } = await params;
  const school = getSchoolBranch(branch);
  if (!school) notFound();

  const activity = getActivity("schools");
  const otherBranches = schoolBranches.filter((b) => b.slug !== branch);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[55vh] flex items-center overflow-hidden bg-ink">
        <Image
          src={school.image}
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
              School Support
            </p>
            <h1 className="display-xl text-5xl text-white">{school.name}</h1>
            <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent">
              <IoLocationOutline className="h-4 w-4" />
              {school.location}
            </p>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85">
              {school.description}
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-line bg-surface">
        <div className="container-site grid grid-cols-1 gap-6 py-10 sm:grid-cols-3">
          {school.stats.map((stat) => (
            <Reveal key={stat.label} className="text-center">
              <p className="display-lg text-4xl text-primary">{stat.value}</p>
              <p className="mt-2 text-sm font-medium text-muted">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Main content */}
      <section className="section-pad">
        <div className="container-site grid gap-14 lg:grid-cols-[1.7fr_1fr] lg:gap-16">
          <div className="space-y-10">
            <Reveal>
              <p className="text-xl leading-9 text-ink md:text-2xl md:leading-10">
                Every child in {school.location} deserves the chance to learn
                and thrive. Through our {school.name.toLowerCase().replace(" branch", "")}{" "}
                branch, we work hand-in-hand with local schools, teachers and
                families to turn that belief into reality — one classroom, one
                student and one schoolbag at a time.
              </p>
            </Reveal>

            <Reveal>
              <div className="grid gap-5 sm:grid-cols-2">
                {(activity?.blocks ?? []).length > 0 && (
                  <div className="border border-line bg-surface p-6">
                    <h3 className="mb-3 text-base font-semibold text-ink">
                      What this branch does
                    </h3>
                    <ul className="space-y-3 text-sm leading-6 text-body">
                      <li className="flex gap-2">
                        <span className="text-primary">•</span>
                        Classroom materials for under-resourced schools
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary">•</span>
                        Infrastructure support and essential equipment
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary">•</span>
                        Assistance for students from vulnerable families
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary">•</span>
                        Working with the community to keep progress lasting
                      </li>
                    </ul>
                  </div>
                )}
                <div className="border border-line bg-primary-soft p-6">
                  <h3 className="mb-3 text-base font-semibold text-ink">
                    Support this branch
                  </h3>
                  <p className="text-sm leading-6 text-body">
                    Your generosity directly helps students here in {school.location}{" "}
                    stay in school. Every donation is accounted for and
                    receipted.
                  </p>
                  <Button
                    href="/donate"
                    variant="primary"
                    className="mt-5 w-full"
                  >
                    Donate
                    <IoArrowForward className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <Button href="/activities/schools" variant="ghost">
                School Support overview
                <IoArrowForward className="h-4 w-4" />
              </Button>
            </Reveal>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <Reveal className="border border-line bg-surface p-7">
              <h3 className="mb-5 font-semibold text-ink">Other branches</h3>
              <ul className="space-y-4">
                {otherBranches.map((b) => (
                  <li key={b.slug}>
                    <Link
                      href={`/activities/schools/${b.slug}`}
                      className="group flex items-center gap-3"
                    >
                      <span className="relative h-14 w-20 shrink-0 overflow-hidden">
                        <Image
                          src={b.image}
                          alt=""
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </span>
                      <span className="text-sm font-semibold leading-5 text-ink transition group-hover:text-primary">
                        {b.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={80}>
              <Link
                href="/activities/schools"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:gap-3"
              >
                <IoArrowBack className="h-4 w-4" />
                All programs
              </Link>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}
