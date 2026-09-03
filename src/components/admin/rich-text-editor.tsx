"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import {
  IoTextOutline,
  IoListOutline,
  IoImageOutline,
  IoChatbubbleEllipsesOutline,
  IoRemoveOutline,
  IoArrowUndoOutline,
  IoArrowRedoOutline,
} from "react-icons/io5";
import { richBlocksToTipTap, tipTapToRichBlocks, type TipTapDoc } from "@/lib/rich-text";
import type { RichBlock } from "@/lib/firestore";
import { CloudinaryImageUpload } from "@/components/admin/cloudinary-image-upload";

type Props = {
  blocks: RichBlock[];
  onChange: (blocks: RichBlock[]) => void;
};

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
      className={`flex h-8 w-8 items-center justify-center text-sm transition ${
        active ? "bg-white/10 text-white" : "text-white/40 hover:text-white/70"
      } disabled:opacity-30`}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <div className="mx-1 h-6 w-px bg-white/10" />;
}

export function RichTextEditor({ blocks, onChange }: Props) {
  const editor = useEditor(
    {
      extensions: [
        StarterKit.configure({
          heading: { levels: [2, 3] },
        }),
        Image.configure({ inline: false, allowBase64: true }),
        Placeholder.configure({
          placeholder: "Start writing...",
        }),
      ],
      content: richBlocksToTipTap(blocks),
      onUpdate: ({ editor }) => {
        const doc = editor.getJSON() as unknown as TipTapDoc;
        onChange(tipTapToRichBlocks(doc));
      },
    },
    []
  );

  if (!editor) {
    return (
      <div className="min-h-[300px] border border-white/10 bg-white/5 p-4 text-sm text-white/30">
        Loading editor...
      </div>
    );
  }

  return (
    <div className="border border-white/10 bg-[#0d0d0d]">
      <div className="flex flex-wrap items-center gap-0.5 border-b border-white/10 bg-[#111] p-2">
        {toolbarBtn(
          () => editor.chain().focus().setParagraph().run(),
          editor.isActive("paragraph"),
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

        {toolbarBtn(
          () => {
            const url = window.prompt("Enter image URL:");
            if (url) editor.chain().focus().setImage({ src: url }).run();
          },
          false,
          false,
          <IoImageOutline className="h-4 w-4" />
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

      <EditorContent
        editor={editor}
        className="min-h-[300px] p-4 text-sm text-white/80 [&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-[280px] [&_.ProseMirror_h2]:text-xl [&_.ProseMirror_h2]:font-bold [&_.ProseMirror_h2]:text-white [&_.ProseMirror_h2]:mt-4 [&_.ProseMirror_h2]:mb-2 [&_.ProseMirror_h3]:text-lg [&_.ProseMirror_h3]:font-semibold [&_.ProseMirror_h3]:text-white/90 [&_.ProseMirror_h3]:mt-3 [&_.ProseMirror_h3]:mb-1.5 [&_.ProseMirror_blockquote]:border-l-2 [&_.ProseMirror_blockquote]:border-white/20 [&_.ProseMirror_blockquote]:pl-4 [&_.ProseMirror_blockquote]:text-white/60 [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:pl-6 [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:pl-6 [&_.ProseMirror_li]:mb-1 [&_.ProseMirror_hr]:border-white/10 [&_.ProseMirror_img]:max-w-full [&_.ProseMirror_img]:rounded"
      />
    </div>
  );
}