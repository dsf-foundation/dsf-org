import { Reveal } from "@/components/ui/reveal";
import { PageHero } from "@/components/ui/page-hero";
import { ImageCard } from "@/components/ui/card";
import { activities } from "@/data/activities";
import { getHeroForPage } from "@/lib/content";

export const revalidate = 300;

export default async function Page() {

  const hero = await getHeroForPage("activities");

  return (
    <>
      <PageHero
        kicker={hero.kicker}
        title={hero.title}
        subtitle={hero.subtitle}
        image={hero.image}
      />

      <section className="container-site section-pad">
     
        {/* Program card grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {activities.map((a, i) => (
            <Reveal key={a.slug} delay={(i % 3) * 80} className="h-full">
              <ImageCard
                href={`/activities/${a.slug}`}
                image={a.image}
                alt={a.title}
                kicker={a.tag}
                title={a.title}
                excerpt={a.short}
                ctaLabel="Explore program"
              />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
