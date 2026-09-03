"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { toast } from "sonner";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { CloudinaryImageUpload } from "@/components/admin/cloudinary-image-upload";
import type { RichBlock } from "@/lib/firestore";

type BlogPost = {
  slug: string;
  thumbnail: string;
  title: string;
  summary: string;
  category: string;
  blocks: RichBlock[];
};

const emptyBlog: BlogPost = {
  slug: "",
  thumbnail: "",
  title: "",
  summary: "",
  category: "",
  blocks: [],
};

function sanitize(value: unknown): unknown {
  if (value === undefined || value === null) return undefined;
  if (Array.isArray(value)) {
    const arr = value.map(sanitize).filter((v) => v !== undefined);
    return arr;
  }
  if (typeof value === "object") {
    const obj: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      const clean = sanitize(v);
      if (clean !== undefined) obj[k] = clean;
    }
    return obj;
  }
  return value;
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const snap = await getDocs(collection(db, "blogs"));
        setBlogs(snap.docs.map((d) => d.data() as BlogPost));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load blogs");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  function startNew() {
    setEditing({ ...emptyBlog });
    setIsNew(true);
  }

  function startEdit(blog: BlogPost) {
    setEditing({ ...blog });
    setIsNew(false);
  }

  async function save() {
    if (!editing) return;
    if (!editing.slug || !editing.title) {
      toast.error("Slug and title are required");
      return;
    }
    setSaving(true);
    try {
      const now = new Date().toISOString();
      const post: BlogPost = {
        ...editing,
        slug: editing.slug.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
        createdAt: (editing as unknown as Record<string, string>).createdAt || now,
        updatedAt: now,
      } as BlogPost;
      const clean = sanitize(post) as BlogPost;
      await setDoc(doc(db, "blogs", clean.slug), clean);
      if (isNew) {
        setBlogs((prev) => [clean, ...prev]);
      } else {
        setBlogs((prev) => prev.map((b) => (b.slug === clean.slug ? clean : b)));
      }
      setEditing(null);
      setIsNew(false);
      toast.success("Blog post saved");
    } catch (err) {
      const detail = err instanceof Error ? err.message : "";
      toast.error(detail ? `Failed to save blog post: ${detail}` : "Failed to save blog post");
    } finally {
      setSaving(false);
    }
  }

  async function remove(slug: string) {
    if (!confirm("Delete this blog post?")) return;
    try {
      await deleteDoc(doc(db, "blogs", slug));
      setBlogs((prev) => prev.filter((b) => b.slug !== slug));
      toast.success("Blog post deleted");
    } catch {
      toast.error("Failed to delete blog post");
    }
  }

  if (loading) return <p className="text-gray-500 text-sm">Loading posts...</p>;

  if (error) {
    return (
      <div className="border border-red-200 bg-red-50 p-4">
        <p className="text-sm font-semibold text-red-700">Failed to load blog posts</p>
        <p className="mt-1 text-xs text-red-600">
          {error}. Check that the signed-in user can read the{" "}
          <code className="font-mono">blogs</code> collection in Firestore rules, then refresh.
        </p>
      </div>
    );
  }

  if (editing) {
    return (
      <div>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
              Blog Editor
            </p>
            <h1 className="mt-1 text-xl font-bold text-gray-900">
              {isNew ? "New Post" : "Edit Post"}
            </h1>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => { setEditing(null); setIsNew(false); }}
              className="h-9 px-4 border border-gray-200 text-xs font-medium text-gray-600 hover:text-gray-900 hover:border-gray-400"
            >
              Back
            </button>
            <button
              onClick={save}
              disabled={saving}
              className="h-9 px-5 bg-primary text-xs font-semibold text-white hover:bg-primary-dark disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>

        <div className="space-y-5 border border-gray-200 bg-white p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Slug" value={editing.slug} onChange={(v) => setEditing({ ...editing, slug: v })} placeholder="my-blog-post" disabled={!isNew} />
            <Field label="Title" value={editing.title} onChange={(v) => setEditing({ ...editing, title: v })} placeholder="Blog post title" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Category" value={editing.category} onChange={(v) => setEditing({ ...editing, category: v })} placeholder="e.g. Emergency Relief" />
            <Field label="Summary" value={editing.summary} onChange={(v) => setEditing({ ...editing, summary: v })} placeholder="Short summary shown on the blog card" multiline />
          </div>
          <div>
            <label className="mb-2 block text-xs font-semibold text-gray-600">
              Thumbnail
            </label>
            <CloudinaryImageUpload
              onUploaded={(url) => setEditing({ ...editing, thumbnail: url })}
              label="Upload thumbnail"
            />
            {editing.thumbnail && (
              <div className="relative aspect-[16/9] w-full max-w-lg overflow-hidden border border-gray-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={editing.thumbnail} alt="" className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => setEditing({ ...editing, thumbnail: "" })}
                  className="absolute right-2 top-2 bg-red-500 px-2.5 py-1 text-xs font-semibold text-white hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
          <div>
            <label className="mb-2 block text-xs font-semibold text-gray-600">
              Content (Rich Text)
            </label>
            <RichTextEditor
              key={editing.slug || "new"}
              blocks={editing.blocks}
              onChange={(blocks) => setEditing({ ...editing, blocks })}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
            Content
          </p>
          <h1 className="mt-1 text-2xl font-bold text-gray-900">Blog Posts</h1>
          <p className="mt-2 max-w-lg text-sm text-gray-500">
            {blogs.length} {blogs.length === 1 ? "post" : "posts"} total.
          </p>
        </div>
        <button
          onClick={startNew}
          className="h-10 px-5 bg-primary text-sm font-semibold text-white hover:bg-primary-dark"
        >
          + New Post
        </button>
      </div>

      <div className="space-y-3">
        {blogs.map((blog) => (
          <div
            key={blog.slug}
            className="flex items-center gap-4 border border-gray-200 bg-white p-4"
          >
            {blog.thumbnail && (
              <div className="h-16 w-28 shrink-0 overflow-hidden bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={blog.thumbnail} alt="" className="h-full w-full object-cover" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900">
                {blog.title || "(untitled)"}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                {blog.category && `${blog.category}`}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => startEdit(blog)}
                className="h-8 px-3 border border-gray-200 text-xs font-medium text-gray-600 hover:text-gray-900 hover:border-gray-400"
              >
                Edit
              </button>
              <button
                onClick={() => remove(blog.slug)}
                className="h-8 px-3 text-xs font-medium text-red-400/60 hover:text-red-400"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {blogs.length === 0 && (
          <p className="border border-gray-200 bg-white py-16 text-center text-sm text-gray-400">
            No blog posts yet. Click &quot;+ New Post&quot; to create one.
          </p>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  multiline = false,
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  multiline?: boolean;
  disabled?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-gray-600">
        {label}
      </label>
      {multiline ? (
        <textarea
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full resize-y border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-primary disabled:opacity-50"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="h-10 w-full border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none focus:border-primary disabled:opacity-50"
        />
      )}
    </div>
  );
}
