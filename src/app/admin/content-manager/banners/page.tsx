"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { toast } from "sonner";
import { CloudinaryImageUpload } from "@/components/admin/cloudinary-image-upload";
import { IoAdd, IoArrowDown, IoArrowUp, IoTrash } from "react-icons/io5";

type HeroData = {
  kicker: string;
  title: string;
  subtitle: string;
  image: string;
};

type Slide = {
  id: string;
  kicker: string;
  title: string;
  subtitle: string;
  cta: string;
  href: string;
  image: string;
};

const PAGE_IDS = [
  "about",
  "activities",
  "blog",
  "gallery",
  "contact",
  "donate",
  "get-involved",
] as const;

const PAGE_LABELS: Record<string, string> = {
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
  const [slides, setSlides] = useState<Slide[]>([]);
  const [saving, setSaving] = useState(false);
  const [savingSlides, setSavingSlides] = useState(false);
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

        const slideSnap = await getDoc(doc(db, "homeSlides", "main"));
        if (slideSnap.exists()) {
          const d = slideSnap.data() as { slides?: Slide[] };
          const loaded = (d.slides ?? []).map((s, i) => ({
            ...s,
            id: s.id && s.id !== "" ? s.id : `slide-${Date.now()}-${i}`,
          }));
          setSlides(loaded);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load banners");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  function addSlide() {
    setSlides((prev) => [
      ...prev,
      { id: `slide-${Date.now()}-${prev.length}`, kicker: "", title: "", subtitle: "", cta: "Donate now", href: "/donate", image: "" },
    ]);
  }

  function updateSlide(id: string, patch: Partial<Slide>) {
    setSlides((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  }

  function removeSlide(id: string) {
    setSlides((prev) => prev.filter((s) => s.id !== id));
  }

  function moveSlide(id: string, dir: -1 | 1) {
    setSlides((prev) => {
      const i = prev.findIndex((s) => s.id === id);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= prev.length) return prev;
      const next = [...prev];
      const [moved] = next.splice(i, 1);
      next.splice(j, 0, moved);
      return next;
    });
  }

  async function saveSlides() {
    setSavingSlides(true);
    try {
      const payload = slides.map((s) => ({
        id: s.id,
        kicker: s.kicker,
        title: s.title,
        subtitle: s.subtitle,
        cta: s.cta,
        href: s.href,
        image: s.image,
      }));
      await setDoc(doc(db, "homeSlides", "main"), {
        slides: payload,
        updatedAt: new Date().toISOString(),
      });
      toast.success("Home slides saved");
    } catch {
      toast.error("Failed to save home slides");
    } finally {
      setSavingSlides(false);
    }
  }

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
            <CloudinaryImageUpload
              onUploaded={(url) => setForm({ ...form, image: url })}
              label="Upload image"
            />
            {form.image ? (
              <div className="mt-3 relative aspect-[16/7] w-full max-w-md overflow-hidden border border-gray-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={form.image} alt="" className="h-full w-full object-cover" />
              </div>
            ) : (
              <p className="mt-2 text-xs text-gray-400">
                No image set. Upload one above.
              </p>
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

      {/* ===== Home Hero Slider ===== */}
      <div className="mt-10 border-t border-gray-200 pt-8">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900">Home Hero Slider</h2>
          <p className="mt-2 max-w-lg text-sm text-gray-500">
            Manage the multi-slide hero on the home page. Each slide shows the
            kicker, title, subtitle, button and background image in rotation.
          </p>
        </div>

        <div className="space-y-4">
          {slides.length === 0 && (
            <p className="border border-dashed border-gray-300 bg-white p-6 text-sm text-gray-400">
              No slides yet. Add one to get started.
            </p>
          )}

          {slides.map((slide, index) => (
            <div key={slide.id} className="border border-gray-200 bg-white p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Slide {index + 1}
                </p>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => moveSlide(slide.id, -1)}
                    disabled={index === 0}
                    className="h-8 w-8 border border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-900 disabled:opacity-30"
                    aria-label="Move slide up"
                  >
                    <IoArrowUp className="mx-auto h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => moveSlide(slide.id, 1)}
                    disabled={index === slides.length - 1}
                    className="h-8 w-8 border border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-900 disabled:opacity-30"
                    aria-label="Move slide down"
                  >
                    <IoArrowDown className="mx-auto h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => removeSlide(slide.id)}
                    className="h-8 w-8 border border-gray-200 text-red-400/60 hover:border-red-300 hover:text-red-400"
                    aria-label="Remove slide"
                  >
                    <IoTrash className="mx-auto h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-gray-600">
                    Kicker
                  </label>
                  <input
                    value={slide.kicker}
                    onChange={(e) => updateSlide(slide.id, { kicker: e.target.value })}
                    placeholder="e.g. Emergency relief"
                    className="h-10 w-full border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-gray-600">
                    Title
                  </label>
                  <input
                    value={slide.title}
                    onChange={(e) => updateSlide(slide.id, { title: e.target.value })}
                    placeholder="Slide headline"
                    className="h-10 w-full border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="mb-1.5 block text-xs font-semibold text-gray-600">
                  Subtitle
                </label>
                <textarea
                  rows={2}
                  value={slide.subtitle}
                  onChange={(e) => updateSlide(slide.id, { subtitle: e.target.value })}
                  placeholder="Supporting line for this slide"
                  className="w-full resize-y border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-primary"
                />
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-gray-600">
                    Button label
                  </label>
                  <input
                    value={slide.cta}
                    onChange={(e) => updateSlide(slide.id, { cta: e.target.value })}
                    placeholder="e.g. Donate now"
                    className="h-10 w-full border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-gray-600">
                    Button link
                  </label>
                  <input
                    value={slide.href}
                    onChange={(e) => updateSlide(slide.id, { href: e.target.value })}
                    placeholder="/donate"
                    className="h-10 w-full border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="mb-1.5 block text-xs font-semibold text-gray-600">
                  Background image
                </label>
                <CloudinaryImageUpload
                  onUploaded={(url) => updateSlide(slide.id, { image: url })}
                  label="Upload image"
                />
                {slide.image ? (
                  <div className="mt-3 relative aspect-[16/7] w-full max-w-md overflow-hidden border border-gray-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={slide.image} alt="" className="h-full w-full object-cover" />
                  </div>
                ) : (
                  <p className="mt-2 text-xs text-gray-400">No image set.</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            onClick={addSlide}
            className="h-10 inline-flex items-center gap-2 px-5 border border-dashed border-gray-300 text-sm font-medium text-gray-600 hover:border-primary hover:text-primary"
          >
            <IoAdd className="h-4 w-4" />
            Add slide
          </button>
          <button
            onClick={saveSlides}
            disabled={savingSlides}
            className="h-10 px-6 bg-primary text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-50"
          >
            {savingSlides ? "Saving..." : "Save slides"}
          </button>
        </div>
      </div>
    </div>
  );
}
