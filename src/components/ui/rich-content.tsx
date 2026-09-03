import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";

export type RichBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "subheading"; text: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "quote"; text: string; cite?: string }
  | {
      type: "image";
      src: string;
      alt: string;
      caption?: string;
      credit?: string;
    }
  | { type: "callout"; title?: string; text: string };

export function RichContent({ blocks }: { blocks: RichBlock[] }) {
  return (
    <div className="space-y-7">
      {blocks.map((block, i) => (
        <Reveal key={i} delay={(i % 3) * 60}>
          <BlockRenderer block={block} />
        </Reveal>
      ))}
    </div>
  );
}

function BlockRenderer({ block }: { block: RichBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="text-base leading-8 text-body md:text-lg md:leading-9">
          {block.text}
        </p>
      );

    case "heading":
      return (
        <h2 className="pt-4 text-2xl font-semibold text-ink md:text-3xl">
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
          className={`space-y-2.5 ${
            block.ordered
              ? "list-decimal pl-5"
              : "list-disc pl-5 marker:text-accent"
          }`}
        >
          {block.items.map((item, idx) => (
            <li key={idx} className="text-base leading-8 text-body md:text-lg">
              {item}
            </li>
          ))}
        </Comp>
      );
    }

    case "quote":
      return (
        <figure className="border-l-[3px] border-accent bg-cream px-6 py-6 md:px-8">
          <blockquote className="pullquote text-xl text-ink md:text-2xl">
            {block.text}
          </blockquote>
          {block.cite && (
            <figcaption className="mt-3 text-sm font-bold text-primary">
              — {block.cite}
            </figcaption>
          )}
        </figure>
      );

    case "image":
      return (
        <figure>
          <div className="img-zoom relative aspect-[16/9] overflow-hidden">
            <Image
              src={block.src}
              alt={block.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />
          </div>
          {(block.caption || block.credit) && (
            <figcaption className="mt-3 flex items-baseline justify-between gap-4 text-xs text-muted">
              <span>{block.caption}</span>
              {block.credit && <span className="shrink-0 italic">{block.credit}</span>}
            </figcaption>
          )}
        </figure>
      );

    case "callout":
      return (
        <div className="border border-primary/20 bg-primary-soft p-6 md:p-8">
          {block.title && (
            <p className="mb-2 text-sm font-bold text-primary">
              {block.title}
            </p>
          )}
          <p className="text-base leading-8 text-ink md:text-lg">{block.text}</p>
        </div>
      );

    default:
      return null;
  }
}
