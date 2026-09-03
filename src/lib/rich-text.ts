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

function textNode(text: string): TipTapBlock | null {
  return text ? { type: "text", text } : null;
}

function blockToTipTap(block: RichBlock): TipTapBlock {
  switch (block.type) {
    case "paragraph": {
      const tn = textNode(block.text);
      return { type: "paragraph", ...(tn ? { content: [tn] } : {}) };
    }
    case "heading":
      return {
        type: "heading",
        attrs: { level: 2 },
        content: [textNode(block.text)].filter(Boolean) as TipTapBlock[],
      };
    case "subheading":
      return {
        type: "heading",
        attrs: { level: 3 },
        content: [textNode(block.text)].filter(Boolean) as TipTapBlock[],
      };
    case "list":
      return {
        type: block.ordered ? "orderedList" : "bulletList",
        content: [
          {
            type: "listItem",
            content: block.items.map((item) => ({
              type: "paragraph",
              ...(item
                ? { content: [textNode(item) as TipTapBlock] }
                : {}),
            })),
          },
        ],
      };
    case "quote": {
      const tn = textNode(block.text);
      return {
        type: "blockquote",
        content: [
          {
            type: "paragraph",
            ...(tn ? { content: [tn] } : {}),
          },
        ],
      };
    }
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
    case "callout": {
      const tn = textNode(block.text);
      return {
        type: "callout",
        attrs: { title: block.title || "", text: block.text || "" },
        content: [
          {
            type: "paragraph",
            ...(tn ? { content: [tn] } : {}),
          },
        ],
      };
    }
    default:
      return { type: "paragraph" };
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
      const src = (block.attrs?.src as string) || "";
      const alt = (block.attrs?.alt as string) || "";
      const caption = (block.attrs?.caption as string) || "";
      const credit = (block.attrs?.credit as string) || "";
      return {
        type: "image",
        src,
        alt,
        ...(caption ? { caption } : {}),
        ...(credit ? { credit } : {}),
      };
    }
    case "callout": {
      const para = block.content?.[0] as TipTapBlock | undefined;
      const text = para ? getTextContent(para) : (block.attrs?.text as string) || "";
      const title = (block.attrs?.title as string) || "";
      return {
        type: "callout",
        ...(title ? { title } : {}),
        text,
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