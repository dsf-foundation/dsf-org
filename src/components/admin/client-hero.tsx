"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import type { PageHero } from "@/lib/firestore";

const EMPTY_HERO: PageHero = { kicker: "", title: "", subtitle: "", image: "" };

/** Fetch a page hero from Firestore on the client. Returns empty until loaded. */
export function useClientHero(page: string): PageHero {
  const [hero, setHero] = useState<PageHero>(EMPTY_HERO);

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