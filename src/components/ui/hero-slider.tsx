"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { IoArrowForward } from "react-icons/io5";
import { Button } from "@/components/ui/button";

export function HeroSlider({
  slides,
}: {
  slides: {
    kicker: string;
    title: string;
    subtitle: string;
    cta: string;
    href: string;
    image: string;
  }[];
}) {
  const [index, setIndex] = useState(0);

  // Auto slide interval
  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const activeSlide = slides[index];

  return (
    <section className="relative flex h-[calc(100dvh-var(--header-topbar-h)-var(--header-nav-h))] w-full flex-col overflow-hidden bg-ink">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="absolute inset-0 h-full w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          {/* Background Image with Slow Zoom (Ken Burns) */}
          <motion.div
            className="absolute inset-0 h-full w-full"
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 7, ease: "linear" }}
          >
            <Image
              src={activeSlide.image}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>

          {/* Dark Overlay */}
          <div
            aria-hidden
            className="absolute inset-0 bg-linear-to-t from-ink/90 via-ink/40 to-transparent"
          />

          {/* Content Wrapper */}
          <div className="container-site relative z-10 flex h-full items-center py-20 md:py-28">
            <div className="max-w-3xl pt-10">
              {/* Title Animation */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="display-xl text-4xl font-extrabold tracking-tight text-white md:text-6xl"
              >
                {activeSlide.title}
              </motion.h1>

              {/* Subtitle Animation */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="mt-6 max-w-xl text-base leading-relaxed text-white/85 md:text-lg"
              >
                {activeSlide.subtitle}
              </motion.p>

              {/* Button Animation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-9"
              >
                <Button href={activeSlide.href} size="lg" variant="light">
                  {activeSlide.cta}
                  <IoArrowForward className="h-5 w-5" />
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
