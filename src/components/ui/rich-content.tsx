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
  const visible = blocks.filter((b) => b.type !== "callout");
  return (
    <div className="space-y-7">
      {visible.map((block, i) => (
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
        <blockquote className="pullquote border-l-[3px] border-accent pl-5 text-lg text-ink md:text-xl">
          {block.text}
          {block.cite && (
            <cite className="mt-3 block text-sm font-bold text-primary not-italic">
              — {block.cite}
            </cite>
          )}
        </blockquote>
      );

    case "image":
      return block.src ? (
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
      ) : null;

    case "callout":
      return null;

    default:
      return null;
  }
}
