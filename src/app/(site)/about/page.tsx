import Image from "next/image";
import { IoArrowForward } from "react-icons/io5";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import {
  EducationIcon,
  ServiceIcon,
  VolunteerIcon,
  CareerIcon,
} from "@/components/icons";
import { activityCount } from "@/data/activities";
import { fundCount } from "@/data/funds";
import { img } from "@/data/images";
import { getHeroForPage } from "@/lib/content";

export const revalidate = 300;
const values = [
  {
    icon: ServiceIcon,
    title: "People first",
    text: "We prioritise people who are poor, vulnerable or affected by disaster — whoever they are and wherever they come from.",
  },
  {
    icon: EducationIcon,
    title: "Sustainable change",
    text: "We work toward lasting results, not short-term assistance — helping people stand on their own and build a better life.",
  },
  {
    icon: VolunteerIcon,
    title: "Impartial & independent",
    text: "We are non-political and non-religious. Our only commitment is to people in need, free from any affiliation.",
  },
  {
    icon: CareerIcon,
    title: "Fully transparent",
    text: "Every donation is a trust. Every source is recorded and every expenditure is audited with full accountability.",
  },
];

const principles = [
  "Prioritising people who are poor, vulnerable or affected by disaster.",
  "Working toward sustainable change, not just short-term assistance.",
  "Treating every donation as a trust and using it only for its purpose.",
  "Keeping full, transparent records of every fund collected and spent.",
  "Being accountable to our donors and the communities we serve.",
  "Holding ourselves to the highest standards of honesty and integrity.",
  "Delivering quality in education, relief and every service we provide.",
  "Working impartially, free from any political or religious affiliation.",
  "Building the capacity of the people and teams we work with.",
  "Caring for every person, regardless of religion, background or community.",
];

const objectives = [
  "Expanding education and practical skill development for young people.",
  "Making quality learning accessible across every community we serve.",
  "Supporting children to stay in school with materials and mentoring.",
  "Helping women become self-reliant through training and enterprise.",
  "Providing food, clean water and essentials when disaster strikes.",
  "Supporting families to rebuild homes and livelihoods after loss.",
  "Helping people access the healthcare they cannot otherwise afford.",
  "Strengthening communities through local volunteers and stewardship.",
];

const incomeSources = [
  "Voluntary donations and grants from individuals and institutions.",
  "One-time and regular donations from members and supporters in Bangladesh.",
  "International donations and remittances from supporters abroad.",
  "Funds raised for specific projects and campaigns.",
  "Funds raised for special relief and welfare efforts.",
  "Income from the foundation's own activities.",
];

export default async function Page() {
  const hero = await getHeroForPage("about");
  const stats = [
    { value: String(activityCount), label: "Program areas" },
    { value: String(fundCount), label: "Donation funds" },
  ];

  return (
    <>
      {/* ===== Hero ===== */}
      <PageHero
        kicker={hero.kicker}
        title={hero.title}
        subtitle={hero.subtitle}
        image={hero.image}
        // stats={stats}
      />

      {/* ===== Our story ===== */}
      <section className="section-pad">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <h2 className="display-md text-3xl text-ink">
              A nonprofit that treats every donation as a trust
            </h2>
            <p className="mt-6 text-base leading-8 text-body md:text-lg md:leading-9">
              We work every day to serve people who are often forgotten —
              helping them access education and skills, standing beside
              families during disasters, and creating pathways to
              self-reliance.
            </p>
            <p className="mt-5 text-base leading-8 text-body md:text-lg md:leading-9">
              We are non-political and non-religious. Our only commitment is to
              people in need, whoever they are and wherever they come from. Rooted
              in Bangladesh, we are proud to be trusted by supporters at home and
              in communities around the world.
            </p>
            <Button href="/activities" variant="ghost" size="lg" className="mt-9">
              See what we do
              <IoArrowForward className="h-4 w-4" />
            </Button>
          </Reveal>
          <Image
            src={img.programs.classrooms}
            width={800}
            height={1000}
            alt="Children learning in a classroom"
            className="order-1 object-cover aspect-4/5 w-full lg:order-2"
            // sizes="(max-width: 1024px) 100vw, 45vw"
          />
        </div>
      </section>

      {/* ===== What we stand for — values cards ===== */}
      <section className="bg-surface">
        <div className="container-site section-pad">
          <SectionHeader
            kicker="What we stand for"
            title="Values that guide every decision"
            subtitle="A clear set of principles shapes how we choose, act and account for our work."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 80}>
                <div className="group flex h-full flex-col bg-paper p-7 transition hover:bg-white hover:shadow-soft">
                  <span className="flex h-12 w-12 items-center justify-center bg-primary-soft text-primary transition group-hover:bg-primary group-hover:text-white">
                    <v.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-6 text-lg font-semibold text-ink">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-body">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Principles — editorial two-column numbered grid ===== */}
      <section className="bg-warm">
        <div className="container-site section-pad grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeader
              kicker="How we work"
              title="Our principles"
              subtitle="Clear values guide every decision — people first, trust always."
            />
          </div>
          <ol className="grid gap-x-12 md:grid-cols-2">
            {principles.map((item, i) => (
              <Reveal key={i} delay={(i % 2) * 70}>
                <li className="group flex gap-5 py-5">
                  <span className="index-num shrink-0 text-2xl text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm leading-7 text-body md:text-base">
                    {item}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ===== Belief pull-quote band ===== */}
      <section className="relative overflow-hidden">
        <Image
          src={img.stories.hands}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div aria-hidden className="absolute inset-0 bg-ink/80" />
        <div className="container-site relative section-pad">
          <Reveal className="mx-auto max-w-3xl">
            <p className="mb-5 inline-flex items-center gap-3 text-xs font-bold text-white/70">
              <span className="h-px w-8 bg-accent" />
              What we believe
            </p>
            <p className="pullquote text-2xl text-white md:text-4xl">
              We don&apos;t measure our success in reports — we measure it in
              the people whose lives change for the better.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== Goals ===== */}
      <section className="section-pad">
        <div className="container-site">
          <SectionHeader kicker="What we aim for" title="Our goals" />
          <ol className="grid gap-6 md:grid-cols-2">
            {objectives.map((item, i) => (
              <Reveal key={i} delay={(i % 2) * 80}>
                <li className="group flex gap-5 bg-surface p-6 transition hover:bg-primary-soft/40">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm leading-7 text-body md:text-base">
                    {item}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ===== Transparency ===== */}
      <section className="bg-surface">
        <div className="container-site section-pad grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeader kicker="Transparency" title="Income & spending" />
            <p className="mt-4 text-base leading-7 text-muted">
              Every donation is a trust. Every source is recorded and every
              expenditure is audited.
            </p>
          </div>
          <div>
            <h3 className="mb-6 flex items-center gap-3 text-lg font-semibold text-ink">
              <span className="h-2 w-2 rounded-full bg-accent" />
              Sources of income
            </h3>
            <ol className="space-y-0">
              {incomeSources.map((item, i) => (
                <Reveal key={i}>
                  <li className="flex gap-5 py-5">
                    <span className="index-num shrink-0 text-sm text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm leading-7 text-body md:text-base">
                      {item}
                    </span>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
