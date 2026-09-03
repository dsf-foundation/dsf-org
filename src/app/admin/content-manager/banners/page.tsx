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
import { CloudinaryImageUpload } from "@/components/admin/cloudinary-image-upload";

type HeroData = {
  kicker: string;
  title: string;
  subtitle: string;
  image: string;
};

const PAGE_IDS = [
  "home",
  "about",
  "activities",
  "blog",
  "gallery",
  "contact",
  "donate",
  "get-involved",
] as const;

const PAGE_LABELS: Record<string, string> = {
  home: "Home",
  about: "About",
  activities: "Our Programs",
  blog: "News",
  gallery: "Gallery",
  contact: "Contact",
  donate: "Donate",
  "get-involved": "Get Involved",
};

export default function BannersPage() {
  const [heroes, setHeroes] = useState<Record<string, HeroData>>({});
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<HeroData>({ kicker: "", title: "", subtitle: "", image: "" });
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const snap = await getDocs(collection(db, "heroes"));
        const data: Record<string, HeroData> = {};
        snap.forEach((d) => {
          data[d.id] = d.data() as HeroData;
        });
        setHeroes(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load banners");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  function startEdit(id: string) {
    setEditing(id);
    setForm(heroes[id] || { kicker: "", title: "", subtitle: "", image: "" });
  }

  async function save() {
    if (!editing) return;
    setSaving(true);
    try {
      await setDoc(doc(db, "heroes", editing), form);
      setHeroes((prev) => ({ ...prev, [editing]: form }));
      setEditing(null);
      toast.success("Banner saved");
    } catch {
      toast.error("Failed to save banner");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this banner?")) return;
    try {
      await deleteDoc(doc(db, "heroes", id));
      setHeroes((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
      toast.success("Banner deleted");
    } catch {
      toast.error("Failed to delete banner");
    }
  }

  if (loading) {
    return <p className="text-gray-500 text-sm">Loading banners...</p>;
  }

  if (error) {
    return (
      <div className="border border-red-200 bg-red-50 p-4">
        <p className="text-sm font-semibold text-red-700">Failed to load banners</p>
        <p className="mt-1 text-xs text-red-600">
          {error}. Check that the signed-in user can read the{" "}
          <code className="font-mono">heroes</code> collection in Firestore rules, then refresh.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
          Content
        </p>
        <h1 className="mt-1 text-2xl font-bold text-gray-900">Page Banners</h1>
        <p className="mt-2 max-w-lg text-sm text-gray-500">
          Edit the hero section (kicker, title, subtitle and image) for each page.
        </p>
      </div>

      {editing && (
        <div className="mb-8 border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-sm font-semibold text-gray-900">
            Editing: {PAGE_LABELS[editing] || editing}
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-600">
                Kicker
              </label>
              <input
                value={form.kicker}
                onChange={(e) => setForm({ ...form, kicker: e.target.value })}
                placeholder="e.g. Who we are"
                className="h-10 w-full border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-600">
                Title
              </label>
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. About our foundation"
                className="h-10 w-full border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="mb-1.5 block text-xs font-semibold text-gray-600">
              Subtitle
            </label>
            <textarea
              rows={3}
              value={form.subtitle}
              onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
              placeholder="Brief description for this page"
              className="w-full resize-y border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-primary"
            />
          </div>

          <div className="mt-4">
            <label className="mb-1.5 block text-xs font-semibold text-gray-600">
              Image
            </label>
            <input
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              placeholder="/images/... or Cloudinary URL"
              className="h-10 w-full border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none focus:border-primary"
            />
            <div className="mt-2">
              <CloudinaryImageUpload
                onUploaded={(url) => setForm({ ...form, image: url })}
                label="Upload image"
              />
            </div>
            {form.image && (
              <div className="mt-3 relative aspect-[16/7] w-full max-w-md overflow-hidden border border-gray-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={form.image} alt="" className="h-full w-full object-cover" />
              </div>
            )}
          </div>

          <div className="mt-5 flex gap-3">
            <button
              onClick={save}
              disabled={saving}
              className="h-10 px-5 bg-primary text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save banner"}
            </button>
            <button
              onClick={() => setEditing(null)}
              className="h-10 px-5 border border-gray-200 text-sm font-medium text-gray-600 hover:text-gray-900 hover:border-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {PAGE_IDS.map((id) => {
          const hero = heroes[id];
          return (
            <div
              key={id}
              className="flex items-center gap-4 border border-gray-200 bg-white p-4"
            >
              {hero?.image && (
                <div className="h-16 w-28 shrink-0 overflow-hidden bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={hero.image} alt="" className="h-full w-full object-cover" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  {PAGE_LABELS[id] || id}
                </p>
                <p className="truncate text-sm font-medium text-gray-900 mt-0.5">
                  {hero?.title || "(not set)"}
                </p>
                {hero?.kicker && (
                  <p className="truncate text-xs text-gray-500 mt-0.5">{hero.kicker}</p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(id)}
                  className="h-8 px-3 border border-gray-200 text-xs font-medium text-gray-600 hover:text-gray-900 hover:border-gray-400"
                >
                  Edit
                </button>
                {hero && (
                  <button
                    onClick={() => remove(id)}
                    className="h-8 px-3 text-xs font-medium text-red-400/60 hover:text-red-400"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
