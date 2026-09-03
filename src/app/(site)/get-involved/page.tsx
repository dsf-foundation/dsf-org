"use client";

import Image from "next/image";
import {
  IoArrowForward,
  IoWallet,
  IoHeartOutline,
  IoRepeatOutline,
  IoPeopleOutline,
  IoBusinessOutline,
  IoFlagOutline,
  IoShareSocialOutline,
  IoShieldCheckmark,
} from "react-icons/io5";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { EmailForm } from "@/components/ui/email-form";
import { useClientHero } from "@/components/admin/client-hero";
import { site } from "@/data/site";
import { donationAccounts } from "@/data/accounts";

const ways = [
  {
    num: "01",
    title: "Give a one-time donation",
    tag: "Give now",
    icon: IoHeartOutline,
    excerpt:
      "No minimum and no maximum — every amount is accounted for and receipted. Give to a specific fund or wherever the need is greatest.",
    cta: { label: "Donate now", href: "/donate" },
  },
  {
    num: "02",
    title: "Become a regular donor",
    tag: "Give monthly",
    icon: IoRepeatOutline,
    excerpt:
      "Weekly, monthly or yearly gifts let our programs plan ahead. Even a small recurring amount compounds into real change — from home or abroad via SWIFT.",
    cta: { label: "Start giving", href: "/donate" },
  },
  {
    num: "03",
    title: "Volunteer your time",
    tag: "Give time",
    icon: IoPeopleOutline,
    excerpt:
      "From relief and winter drives to teaching and community clean-ups, volunteers make every program possible. Whatever your skills, there's a place for you.",
    cta: {
      label: "Email us to volunteer",
      href: `mailto:${site.email}?subject=${encodeURIComponent("Volunteering")}`,
    },
  },
  {
    num: "04",
    title: "Partner with us",
    tag: "Give as an organisation",
    icon: IoBusinessOutline,
    excerpt:
      "Matched giving, event support, pro-bono services and long-term sponsorship — transparent, mutually valuable partnerships in Bangladesh and abroad.",
    cta: {
      label: "Email us about partnering",
      href: `mailto:${site.email}?subject=${encodeURIComponent("Partnership")}`,
    },
  },
  {
    num: "05",
    title: "Sponsor a project",
    tag: "Follow one effort",
    icon: IoFlagOutline,
    excerpt:
      "Water, housing, education or livelihoods — pick a project and follow it through, with progress, photos and a final impact report.",
    cta: {
      label: "Email us to sponsor",
      href: `mailto:${site.email}?subject=${encodeURIComponent("Sponsoring a project")}`,
    },
  },
  {
    num: "06",
    title: "Spread the word",
    tag: "Give your voice",
    icon: IoShareSocialOutline,
    excerpt:
      "Follow us, share our stories, or host a small fundraiser — sharing multiplies our reach and it all compounds.",
    cta: { label: "Follow & share", href: site.socials.facebook },
  },
];

export default function GetInvolvedPage() {
  const hero = useClientHero("get-involved");
  return (
    <>
      <PageHero
        kicker={hero.kicker}
        title={hero.title}
        subtitle={hero.subtitle}
        image={hero.image}
      />

      {/* Ways — clean icon cards */}
      <section className="container-site section-pad">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="display-md text-3xl text-ink">
              Six ways to make a difference
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-muted">
            Each path has its own pace — from a single gift to a long-term
            partnership. Choose the one that fits you best.
          </p>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {ways.map((w, i) => (
            <Reveal key={w.num} delay={(i % 3) * 70}>
              <article className="group flex h-full flex-col overflow-hidden bg-surface shadow-soft transition hover:shadow-md">
                <div className="flex items-start gap-4 p-6 pb-0">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-primary-soft text-primary">
                    <w.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <span className="inline-flex items-center gap-2 text-[0.7rem] font-bold text-primary">
                      {w.tag}
                    </span>
                    <h3 className="mt-1 text-lg font-semibold text-ink">
                      {w.title}
                    </h3>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <p className="flex-1 text-sm leading-6 text-body">
                    {w.excerpt}
                  </p>

                  <div className="mt-6">
                    <Button
                      href={w.cta.href}
                      variant="ghost"
                      size="sm"
                      className="w-full"
                    >
                      {w.cta.label}
                      <IoArrowForward className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="px-6 ">
                  <span
                    className={`index-num text-2xl ${
                      w.num
                    }`}
                  />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Not sure where to start? */}
      <section className="bg-warm">
        <div className="container-site section-pad">
          <Reveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <h2 className="display-md text-3xl text-ink">
              We&apos;ll help you find the right fit.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-body">
              Tell us a little about yourself and what draws you to our work.
              A member of our team will reply with the options that suit you
              best — no pressure, no obligation.
            </p>
            <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary">
              Start below — we reply within a couple of days.
              <IoArrowForward className="h-4 w-4" />
            </span>
          </Reveal>
        </div>
      </section>

      {/* Contact form */}
      <section className="container-site section-pad">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <h2 className="display-lg text-3xl text-ink">
              Tell us how you&apos;d like to help.
            </h2>
            <p className="mt-5 text-base leading-8 text-body">
              Whether you want to volunteer, partner, sponsor a project or ask
              a question, the fastest way to reach our team is a short email.
              Fill in the form and we&apos;ll get back to you.
            </p>
            <div className="mt-6 flex items-start gap-3 bg-surface p-4 shadow-soft">
              <IoShieldCheckmark className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <p className="text-xs leading-6 text-muted">
                We read every message personally and never share your details.
              </p>
            </div>
          </Reveal>

          <Reveal
            delay={80}
            className="bg-surface p-7 shadow-soft md:p-10 lg:col-span-7"
          >
            <EmailForm />
          </Reveal>
        </div>
      </section>

      {/* Donation accounts */}
      <section className="border-t border-line bg-warm">
        <div className="container-site section-pad">
          <Reveal className="mx-auto max-w-3xl">
            <div className="border border-line bg-surface p-7 md:p-10">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <IoWallet className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold text-ink">
                    Donation accounts
                  </h3>
                </div>
                <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-bold text-primary">
                  Bangladesh & international
                </span>
              </div>
              <p className="mb-6 text-sm leading-6 text-muted">
                All accounts belong to the foundation. Copy the details to send
                your gift directly — then request your receipt on the donate
                page.
              </p>
              <div className="space-y-3">
                {donationAccounts.map((acc) => (
                  <div
                    key={acc.id}
                    className="flex items-center justify-between gap-3 border border-line bg-warm px-4 py-3"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      {acc.logo && (
                        <Image
                          src={acc.logo}
                          alt=""
                          width={48}
                          height={24}
                          className="h-6 w-auto shrink-0 object-contain"
                        />
                      )}
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-muted">
                          {acc.label}
                        </p>
                        <p
                          dir="ltr"
                          className="truncate text-sm font-bold text-ink md:text-base"
                        >
                          {acc.number}
                        </p>
                        <p className="mt-0.5 line-clamp-1 text-xs text-muted">
                          {acc.note}
                        </p>
                      </div>
                    </div>
                    <CopyButton
                      value={acc.number.replace(/-/g, "")}
                      label="Copy"
                      copiedLabel="Copied"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
                <p className="text-sm text-body">
                  After you send your donation, get your verified receipt.
                </p>
                <Button href="/donate" variant="ghost" size="sm">
                  Donate & request receipt
                  <IoArrowForward className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}