"use client";

import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import {
  IoTextOutline,
  IoListOutline,
  IoChatbubbleEllipsesOutline,
  IoRemoveOutline,
  IoArrowUndoOutline,
  IoArrowRedoOutline,
  IoTrashOutline,
} from "react-icons/io5";
import { richBlocksToTipTap, tipTapToRichBlocks, type TipTapDoc } from "@/lib/rich-text";
import type { RichBlock } from "@/lib/firestore";
import { CloudinaryImageUpload } from "@/components/admin/cloudinary-image-upload";
import { Callout } from "@/components/admin/tiptap-callout";
import { RichImage } from "@/components/admin/tiptap-image";

type Props = {
  blocks: RichBlock[];
  onChange: (blocks: RichBlock[]) => void;
};

type SelectedImage = {
  src: string;
  alt: string;
  caption: string;
};

function getSelectedImage(editor: NonNullable<ReturnType<typeof useEditor>>): SelectedImage | null {
  const { selection } = editor.state;
  const selectedNode =
    "node" in selection && (selection as { node?: { type?: { name?: string }; attrs?: Record<string, unknown> } }).node;
  if (!selectedNode || selectedNode.type?.name !== "image") return null;
  const attrs = selectedNode.attrs ?? {};
  return {
    src: (attrs.src as string) || "",
    alt: (attrs.alt as string) || "",
    caption: (attrs.caption as string) || "",
  };
}

function toolbarBtn(
  onClick: () => void,
  active: boolean,
  disabled: boolean,
  children: React.ReactNode
) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex h-8 w-8 items-center justify-center rounded text-sm transition disabled:opacity-30 ${
        active
          ? "bg-primary text-white shadow-sm"
          : "text-gray-500 hover:bg-gray-200 hover:text-gray-800"
      }`}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <div className="mx-1 h-6 w-px bg-gray-200" />;
}

export function RichTextEditor({ blocks, onChange }: Props) {
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(null);

  const editor = useEditor(
    {
      extensions: [
        StarterKit.configure({
          heading: { levels: [2, 3] },
        }),
        Callout,
        RichImage.configure({ inline: false }),
        Placeholder.configure({
          placeholder: "Start writing...",
        }),
      ],
      content: richBlocksToTipTap(blocks),
      onUpdate: ({ editor }) => {
        const doc = editor.getJSON() as unknown as TipTapDoc;
        onChange(tipTapToRichBlocks(doc));
      },
      onSelectionUpdate: ({ editor }) => {
        setSelectedImage(getSelectedImage(editor));
      },
    },
    []
  );

  useEffect(() => {
    return () => setSelectedImage(null);
  }, []);

  if (!editor) {
    return (
      <div className="min-h-[300px] rounded-lg border border-line bg-white p-4 text-sm text-gray-400">
        Loading editor...
      </div>
    );
  }

  const captionValue = selectedImage ? selectedImage.caption : "";

  return (
    <div className="overflow-hidden rounded-lg border border-line bg-white">
      <div className="flex flex-wrap items-center gap-0.5 border-b border-line bg-gray-50 p-2">
        {toolbarBtn(
          () => editor.chain().focus().setParagraph().run(),
          editor.isActive("paragraph") &&
            !editor.isActive("heading") &&
            !editor.isActive("bulletList") &&
            !editor.isActive("orderedList") &&
            !editor.isActive("blockquote"),
          false,
          <IoTextOutline className="h-4 w-4" />
        )}

        <Divider />

        {toolbarBtn(
          () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
          editor.isActive("heading", { level: 2 }),
          false,
          <span className="text-xs font-bold">H2</span>
        )}
        {toolbarBtn(
          () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
          editor.isActive("heading", { level: 3 }),
          false,
          <span className="text-[10px] font-bold">H3</span>
        )}

        <Divider />

        {toolbarBtn(
          () => editor.chain().focus().toggleBulletList().run(),
          editor.isActive("bulletList"),
          false,
          <IoListOutline className="h-4 w-4" />
        )}
        {toolbarBtn(
          () => editor.chain().focus().toggleOrderedList().run(),
          editor.isActive("orderedList"),
          false,
          <span className="text-xs font-bold">1.</span>
        )}

        <Divider />

        {toolbarBtn(
          () => editor.chain().focus().toggleBlockquote().run(),
          editor.isActive("blockquote"),
          false,
          <IoChatbubbleEllipsesOutline className="h-4 w-4" />
        )}

        <CloudinaryImageUpload
          variant="toolbar"
          onUploaded={(url) => editor.chain().focus().setImage({ src: url }).run()}
        />

        <Divider />

        {toolbarBtn(
          () => editor.chain().focus().setHorizontalRule().run(),
          false,
          false,
          <IoRemoveOutline className="h-4 w-4" />
        )}

        <div className="ml-auto flex items-center gap-0.5">
          {toolbarBtn(
            () => editor.chain().focus().undo().run(),
            false,
            !editor.can().undo(),
            <IoArrowUndoOutline className="h-4 w-4" />
          )}
          {toolbarBtn(
            () => editor.chain().focus().redo().run(),
            false,
            !editor.can().redo(),
            <IoArrowRedoOutline className="h-4 w-4" />
          )}
        </div>
      </div>

      {selectedImage && (
        <div className="flex flex-wrap items-center gap-3 border-b border-line bg-gray-50 px-3 py-2">
          <label className="flex min-w-0 flex-1 items-center gap-2 text-xs text-gray-500">
            Caption
            <input
              value={captionValue}
              onChange={(e) => {
                const v = e.target.value;
                setSelectedImage((s) => (s ? { ...s, caption: v } : s));
                editor.chain().updateAttributes("image", { caption: v }).run();
              }}
              placeholder="Optional caption under the image"
              className="h-8 min-w-0 flex-1 border border-input bg-white px-3 text-sm text-gray-800 outline-none focus:border-primary"
            />
          </label>
          <button
            type="button"
            onClick={() => {
              editor.chain().focus().deleteSelection().run();
              setSelectedImage(null);
            }}
            className="inline-flex h-8 items-center gap-2 bg-red-500/90 px-3 text-xs font-semibold text-white hover:bg-red-500"
          >
            <IoTrashOutline className="h-4 w-4" />
            Remove image
          </button>
        </div>
      )}

      <EditorContent
        editor={editor}
        className="rich-editor min-h-[300px] p-4 text-sm"
      />
    </div>
  );
}
