import Image from "next/image";
import {
  IoHeartOutline,
  IoShieldCheckmark,
  IoCheckmarkCircle,
  IoGlobeOutline,
  IoArrowForward,
} from "react-icons/io5";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";
import type { RichBlock } from "@/components/ui/rich-content";

export type DonationTier = { label: string; taka: string; impact: string };

const TIER_FALLBACK: DonationTier[] = [
  {
    label: "$25",
    taka: "৳2,900",
    impact: "School essentials for one student for a full year",
  },
  {
    label: "$50",
    taka: "৳5,800",
    impact: "Uniform, shoes and a bag — the dignity to walk into class",
  },
  {
    label: "$100",
    taka: "৳11,600",
    impact: "Keeps several children learning for months",
  },
];

/** Editorial renderer that keeps the "callout" block as a donation-impact note. */
export function ActivityBlocks({ blocks }: { blocks: RichBlock[] }) {
  return (
    <div className="space-y-7">
      {blocks.map((block, i) =>
        block.type === "callout" ? null : (
          <Reveal key={i} delay={(i % 3) * 60}>
            <BlockRenderer block={block} />
          </Reveal>
        )
      )}
    </div>
  );
}

function BlockRenderer({ block }: { block: Exclude<RichBlock, { type: "callout" }> }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="text-base leading-8 text-body md:text-lg md:leading-9">
          {block.text}
        </p>
      );

    case "heading":
      return (
        <h2 className="display-md pt-6 text-2xl text-ink md:text-3xl">
          {block.text}
        </h2>
      );

    case "subheading":
      return (
        <h3 className="pt-2 text-xl font-semibold text-ink md:text-2xl">
          {block.text}
        </h3>
      );

    case "list": {
      const Comp = block.ordered ? "ol" : "ul";
      return (
        <Comp
          className={`space-y-3 ${
            block.ordered
              ? "list-decimal pl-5"
              : "grid gap-x-8 gap-y-3 md:grid-cols-2"
          }`}
        >
          {block.items.map((item, idx) => (
            <li
              key={idx}
              className="flex gap-3 text-base leading-7 text-body md:text-lg"
            >
              {!block.ordered && (
                <IoCheckmarkCircle className="mt-1 h-5 w-5 shrink-0 text-accent" />
              )}
              <span>{item}</span>
            </li>
          ))}
        </Comp>
      );
    }

    case "quote":
      return (
        <figure className="my-10">
          <blockquote className="pullquote border-l-[3px] border-accent pl-6 text-lg text-ink md:text-2xl">
            &ldquo;{block.text}&rdquo;
          </blockquote>
          {block.cite && (
            <figcaption className="mt-4 text-sm font-bold text-primary">
              — {block.cite}
            </figcaption>
          )}
        </figure>
      );

    case "image":
      return block.src ? (
        <figure className="my-2">
          <div className="img-zoom relative aspect-[16/10] overflow-hidden">
            <Image
              src={block.src}
              alt={block.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 52vw"
              className="object-cover"
            />
          </div>
          {(block.caption || block.credit) && (
            <figcaption className="mt-3 flex items-baseline justify-between gap-4 text-xs text-muted">
              <span>{block.caption}</span>
              {block.credit && (
                <span className="shrink-0 italic">{block.credit}</span>
              )}
            </figcaption>
          )}
        </figure>
      ) : null;

    default:
      return null;
  }
}

/** The one "callout" block — rendered as a premium donation-impact band. */
export function DonationImpact({
  blocks,
  title,
}: {
  blocks: RichBlock[];
  title?: string;
}) {
  const callout = blocks.find(
    (b): b is Extract<RichBlock, { type: "callout" }> => b.type === "callout"
  );
  return (
    <div className="overflow-hidden bg-ink text-white">
      <div className="container-site grid gap-8 py-16 md:py-20 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-white/90">
              <IoHeartOutline className="h-4 w-4 text-accent" />
              {callout?.title ?? "Your donation at work"}
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="display-md text-3xl text-white">
              What your gift makes possible
            </h2>
          </Reveal>
          {callout?.text && (
            <Reveal delay={140}>
              <p className="mt-5 text-base leading-8 text-white/80">
                {callout.text}
              </p>
            </Reveal>
          )}
          <Reveal delay={200}>
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-white/15 pt-6">
              <span className="inline-flex items-center gap-2 text-sm text-white/85">
                <IoShieldCheckmark className="h-4 w-4 text-accent" />
                100% reaches the field
              </span>
              <span className="inline-flex items-center gap-2 text-sm text-white/85">
                <IoGlobeOutline className="h-4 w-4 text-accent" />
                Donate from {site.country} or worldwide
              </span>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <div className="grid gap-px overflow-hidden bg-white/10 sm:grid-cols-3">
            {TIER_FALLBACK.map((tier, i) => (
              <Reveal key={tier.label} delay={i * 90}>
                <div className="flex h-full flex-col justify-between gap-6 bg-ink p-7">
                  <div>
                    <p className="stat-num text-4xl text-accent">{tier.label}</p>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-white/50">
                      approx. {tier.taka}
                    </p>
                  </div>
                  <p className="text-sm leading-6 text-white/85">
                    {tier.impact}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120} className="mt-8">
            <Button href="/donate" size="lg" variant="light" className="w-full">
              Give{title ? ` to ${title}` : " now"}
              <IoArrowForward className="h-5 w-5" />
            </Button>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
