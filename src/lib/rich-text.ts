import type { RichBlock } from "./firestore";

interface TipTapBlock {
  type: string;
  attrs?: Record<string, unknown>;
  content?: TipTapBlock[];
  text?: string;
}

export interface TipTapDoc {
  type: "doc";
  content: TipTapBlock[];
}

export function richBlocksToTipTap(blocks: RichBlock[]): TipTapDoc {
  const content = blocks.map((block) => blockToTipTap(block));
  return { type: "doc", content };
}

function blockToTipTap(block: RichBlock): TipTapBlock {
  switch (block.type) {
    case "paragraph":
      return { type: "paragraph", content: [{ type: "text", text: block.text }] };
    case "heading":
      return {
        type: "heading",
        attrs: { level: 2 },
        content: [{ type: "text", text: block.text }],
      };
    case "subheading":
      return {
        type: "heading",
        attrs: { level: 3 },
        content: [{ type: "text", text: block.text }],
      };
    case "list":
      return {
        type: block.ordered ? "orderedList" : "bulletList",
        content: [
          {
            type: "listItem",
            content: block.items.map((item) => ({
              type: "paragraph",
              content: [{ type: "text", text: item }],
            })),
          },
        ],
      };
    case "quote":
      return {
        type: "blockquote",
        content: [{ type: "paragraph", content: [{ type: "text", text: block.text }] }],
      };
    case "image":
      return {
        type: "image",
        attrs: {
          src: block.src,
          alt: block.alt,
          caption: block.caption || "",
          credit: block.credit || "",
        },
      };
    case "callout":
      return {
        type: "callout",
        attrs: { title: block.title || "", text: block.text },
        content: [{ type: "paragraph", content: [{ type: "text", text: block.text }] }],
      };
    default:
      return { type: "paragraph", content: [{ type: "text", text: "" }] };
  }
}

export function tipTapToRichBlocks(doc: TipTapDoc): RichBlock[] {
  return doc.content.map((block) => tipTapBlockToRichBlock(block)).filter(Boolean) as RichBlock[];
}

function tipTapBlockToRichBlock(block: TipTapBlock): RichBlock | null {
  switch (block.type) {
    case "paragraph": {
      const text = getTextContent(block);
      return { type: "paragraph", text };
    }
    case "heading": {
      const level = block.attrs?.level || 2;
      const text = getTextContent(block);
      return level === 3
        ? { type: "subheading", text }
        : { type: "heading", text };
    }
    case "bulletList":
    case "orderedList": {
      const items = (block.content || []).map((li) => {
        const para = (li as TipTapBlock).content?.[0] as TipTapBlock | undefined;
        return para ? getTextContent(para) : "";
      }).filter(Boolean);
      return { type: "list", ordered: block.type === "orderedList", items };
    }
    case "listItem": {
      const para = block.content?.[0] as TipTapBlock | undefined;
      return para ? { type: "paragraph", text: getTextContent(para) } : null;
    }
    case "blockquote": {
      const para = block.content?.[0] as TipTapBlock | undefined;
      const text = para ? getTextContent(para) : "";
      return { type: "quote", text };
    }
    case "image": {
      return {
        type: "image",
        src: (block.attrs?.src as string) || "",
        alt: (block.attrs?.alt as string) || "",
        caption: (block.attrs?.caption as string) || undefined,
        credit: (block.attrs?.credit as string) || undefined,
      };
    }
    case "callout": {
      return {
        type: "callout",
        title: (block.attrs?.title as string) || undefined,
        text: (block.attrs?.text as string) || "",
      };
    }
    default:
      return null;
  }
}

function getTextContent(block: TipTapBlock): string {
  if (block.text !== undefined) return block.text;
  return (block.content || []).map(getTextContent).join("");
}