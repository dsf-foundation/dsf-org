"use client";

import { useState } from "react";
import Image from "next/image";
import {
  IoCall,
  IoLocationOutline,
  IoMailOutline,
  IoChatbubbleEllipsesOutline,
  IoArrowForward,
  IoTimeOutline,
  IoGlobeOutline,
} from "react-icons/io5";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { FacebookIcon, YoutubeIcon, WhatsappIcon } from "@/components/icons";
import { site } from "@/data/site";
import { img } from "@/data/images";
import { useClientHero } from "@/components/admin/client-hero";

export default function ContactPage() {
  const hero = useClientHero("contact");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const subject = encodeURIComponent(
    `Contact: ${topic ? topic + " — " : ""}${name || "Website"}`
  );
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nTopic: ${topic || "General"}\n\nMessage:\n${message}`
  );
  const mailto = `mailto:${site.email}?subject=${subject}&body=${body}`;

  const channels = [
    {
      icon: IoMailOutline,
      label: "Email",
      value: site.email,
      href: `mailto:${site.email}`,
      note: "For donations, receipts and general enquiries",
      dir: undefined,
    },
    {
      icon: IoCall,
      label: "Phone",
      value: site.phoneDisplay,
      href: `tel:${site.phoneDisplay}`,
      note: "Mon–Fri, 9:00am – 6:00pm (GMT+6)",
      dir: "ltr" as const,
    },
    {
      icon: IoLocationOutline,
      label: "Office",
      value: site.address,
      href: undefined,
      note: "Visits by appointment — let us know before you come",
      dir: undefined,
    },
  ];

  const topics = [
    "Donations & receipts",
    "Volunteering",
    "Partnerships",
    "Media & press",
    "Something else",
  ];

  return (
    <>
      <PageHero
        kicker={hero.kicker}
        title={hero.title}
        subtitle={hero.subtitle}
        image={hero.image}
      />

      {/* Editorial intro */}
      <section className="container-site section-pad">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="display-lg text-4xl text-ink">
                We’d love to hear from you.
              </h2>
              <p className="mt-6 text-lg leading-8 text-body">
                Our team is small, approachable and genuinely happy to help.
                Tell us what’s on your mind and we’ll point you to the right
                person — no phone trees, no automated replies.
              </p>
              <p className="mt-4 text-sm leading-7 text-muted">
                Prefer to write to us directly? You can reach us on email,
                phone, or WhatsApp — or use the form below and we’ll get back
                to you quickly.
              </p>
            </Reveal>

            <Reveal delay={120} className="mt-10 space-y-5">
              {channels.map((c) => (
                <div
                  key={c.label}
                  className="flex items-start gap-4 bg-surface p-5 shadow-soft transition hover:shadow-md"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-primary-soft text-primary">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-primary">
                      {c.label}
                    </p>
                    {c.href ? (
                      <div className="mt-1 flex items-center gap-2">
                        <a
                          href={c.href}
                          dir={c.dir}
                          className="break-all font-semibold text-ink transition hover:text-primary"
                        >
                          {c.value}
                        </a>
                        <CopyButton
                          value={c.value}
                          label="Copy"
                          copiedLabel="Copied"
                          className="text-xs"
                        />
                      </div>
                    ) : (
                      <p className="mt-1 font-semibold leading-6 text-ink">
                        {c.value}
                      </p>
                    )}
                    <p className="mt-1 text-xs leading-5 text-muted">
                      {c.note}
                    </p>
                  </div>
                </div>
              ))}
            </Reveal>

            <Reveal delay={180} className="mt-8">
              <p className="text-xs font-bold text-muted">
                Follow our work
              </p>
              <div className="mt-3 flex items-center gap-3">
                <a
                  href={site.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex h-11 w-11 items-center justify-center bg-surface text-body transition hover:bg-primary-soft hover:text-primary"
                >
                  <FacebookIcon className="h-4 w-4" />
                </a>
                <a
                  href={site.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="flex h-11 w-11 items-center justify-center bg-surface text-body transition hover:bg-primary-soft hover:text-primary"
                >
                  <YoutubeIcon className="h-4 w-4" />
                </a>
                <a
                  href={site.socials.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="flex h-11 w-11 items-center justify-center bg-surface text-body transition hover:bg-primary-soft hover:text-primary"
                >
                  <WhatsappIcon className="h-4 w-4" />
                </a>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <Reveal delay={80} className="lg:pl-6">
              <div className="bg-surface p-7 shadow-soft md:p-10">
                <div className="flex items-start gap-4 pb-6">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-accent-soft text-accent">
                    <IoChatbubbleEllipsesOutline className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-ink">
                      Send us a message
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-muted">
                      Fill this in and we’ll reply by email — usually within a
                      working day.
                    </p>
                  </div>
                </div>

                {sent ? (
                  <div className="mt-8 bg-primary-soft p-8 text-center">
                    <p className="text-xl font-semibold text-ink">
                      Thank you, {name || "friend"}.
                    </p>
                    <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-body">
                      Your message is ready — your email app should now be open
                      with everything pre-filled. Just press send and we’ll get
                      back to you.
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-5"
                      onClick={() => {
                        setSent(false);
                        setName("");
                        setEmail("");
                        setTopic("");
                        setMessage("");
                      }}
                    >
                      Send another message
                    </Button>
                  </div>
                ) : (
                  <form
                    className="mt-8 space-y-5"
                    onSubmit={(e) => {
                      e.preventDefault();
                      window.location.href = mailto;
                      setSent(true);
                    }}
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field
                        label="Your name"
                        required
                        value={name}
                        onChange={setName}
                        placeholder="Full name"
                      />
                      <Field
                        label="Email address"
                        required
                        type="email"
                        value={email}
                        onChange={setEmail}
                        placeholder="you@example.com"
                      />
                    </div>
                    <div>
                      <span className="mb-1.5 block text-sm font-semibold text-ink">
                        What’s it about? <span className="text-accent">*</span>
                      </span>
                      <select
                        required
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="w-full border border-line bg-surface px-3.5 py-3 text-sm text-ink outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                      >
                        <option value="" disabled>
                          Choose a topic
                        </option>
                        {topics.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <span className="mb-1.5 block text-sm font-semibold text-ink">
                        Your message <span className="text-accent">*</span>
                      </span>
                      <textarea
                        rows={5}
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="How can we help?"
                        className="w-full resize-y border border-line bg-surface px-3.5 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div className="flex flex-wrap items-center gap-4 pt-1">
                      <Button type="submit" variant="primary" size="lg">
                        Send message
                        <IoArrowForward className="h-4 w-4" />
                      </Button>
                      <p className="text-xs text-muted">
                        Opens your mail app pre-filled — just press send.
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Large supporting image + response promise */}
      <section className="bg-cream">
        <div className="container-site section-pad grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="img-zoom relative aspect-[16/10] overflow-hidden">
              <Image
                src={img.stories.team}
                alt="Members of the foundation team at work"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="display-md text-3xl text-ink">
              You’ll always reach a person who cares.
            </h2>
            <div className="mt-8 space-y-4">
              <PromiseRow
                icon={IoTimeOutline}
                title="Fast, human replies"
                text="We respond to every genuine message — usually within one working day."
              />
              <PromiseRow
                icon={IoGlobeOutline}
                title="Local & international"
                text="Wherever you are in the world, we’re glad to hear from you."
              />
              <PromiseRow
                icon={IoMailOutline}
                title="Concerned about a donation?"
                text="Include your transaction details and we’ll verify and issue a receipt right away."
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function PromiseRow({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof IoTimeOutline;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center bg-surface text-accent">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="font-semibold text-ink">{title}</p>
        <p className="mt-1 text-sm leading-6 text-body">{text}</p>
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <span className="mb-1.5 block text-sm font-semibold text-ink">
        {label} {required && <span className="text-accent">*</span>}
      </span>
      <input
        type={type}
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-line bg-surface px-3.5 py-3 text-sm text-ink outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}
