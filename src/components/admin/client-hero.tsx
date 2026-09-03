"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import type { PageHero } from "@/lib/firestore";
import { dict } from "@/data/dictionary";
import { img } from "@/data/images";

const STATIC_HEROES: Record<string, PageHero> = {
  home: {
    kicker: dict.hero.kicker,
    title: dict.hero.title,
    subtitle: dict.hero.subtitle,
    image: img.hero.community,
  },
  about: {
    kicker: "Who we are",
    title: "About our foundation",
    subtitle:
      "Do Something Foundation is a government-registered Bangladeshi nonprofit working for education, relief and practical support.",
    image: img.stories.river,
  },
  activities: {
    kicker: "What we do",
    title: "Our programs",
    subtitle:
      "From education to emergency relief, water, shelter, healthcare and livelihoods — explore the ongoing humanitarian work of Do Something Foundation.",
    image: img.programs.shelter,
  },
  blog: {
    kicker: "News & stories",
    title: "News",
    subtitle:
      "Field reports and updates from our education, relief and humanitarian work.",
    image: img.stories.field,
  },
  gallery: {
    kicker: "Moments that matter",
    title: "Gallery",
    subtitle:
      "Real moments from real programs — captured as it happens on the ground.",
    image: img.hero.community,
  },
  contact: {
    kicker: "Get in touch",
    title: "Contact us",
    subtitle:
      "Whether it's about donations, volunteering, a partnership or a press enquiry, we're glad to hear from you.",
    image: img.programs.skills,
  },
  donate: {
    kicker: "Support our mission",
    title: "Donate",
    subtitle:
      "Every contribution — however small — keeps education, relief and skill programs running.",
    image: img.programs.relief,
  },
  "get-involved": {
    kicker: "Partner with us",
    title: "Get involved",
    subtitle:
      "There are many genuine ways to be part of our work — by giving, volunteering, partnering, or spreading the word.",
    image: "/images/programs/community/img-07.jpg",
  },
};

export function heroesStaticFallback(page: string): PageHero {
  return (
    STATIC_HEROES[page] ?? {
      kicker: "",
      title: "",
      subtitle: "",
      image: img.hero.community,
    }
  );
}

/** Fetch a page hero from Firestore on the client, falling back to the bundled static copy. */
export function useClientHero(page: string): PageHero {
  const [hero, setHero] = useState<PageHero>(() => heroesStaticFallback(page));

  useEffect(() => {
    let active = true;
    getDoc(doc(db, "heroes", page))
      .then((snap) => {
        if (!active) return;
        if (snap.exists()) {
          const data = snap.data() as Partial<PageHero>;
          setHero((prev) => ({
            ...prev,
            ...(data.kicker ? { kicker: data.kicker } : {}),
            ...(data.title ? { title: data.title } : {}),
            ...(data.subtitle ? { subtitle: data.subtitle } : {}),
            ...(data.image ? { image: data.image } : {}),
          }));
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [page]);

  return hero;
}