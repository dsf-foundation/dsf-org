"use client";

import { useEffect, useState, useRef } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { toast } from "sonner";
import { activities } from "@/data/activities";

type Photo = { src: string; caption: string };
type Album = { id: string; label: string; photos: Photo[] };
type Batch = {
  id: string;
  title: string;
  activitySlug: string;
  description: string;
  date: string;
  photos: Photo[];
};

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "thy4ada6";

const activityOptions = activities
  .map((a) => ({ slug: a.slug, title: a.title }))
  .sort((a, b) => a.title.localeCompare(b.title));

function slugify(input: string): string {
  return (
    input
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "untitled"
  );
}

function slugifyId() {
  return (
    "batch-" +
    Date.now().toString(36) +
    Math.random().toString(36).slice(2, 7)
  );
}

export default function GalleryPage() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [view, setView] = useState<"albums" | "batches">("batches");
  const [editingAlbum, setEditingAlbum] = useState<Album | null>(null);
  const [isNewAlbum, setIsNewAlbum] = useState(false);
  const [editingBatch, setEditingBatch] = useState<Batch | null>(null);
  const [isNewBatch, setIsNewBatch] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const [albumSnap, batchSnap] = await Promise.all([
          getDocs(collection(db, "galleryAlbums")),
          getDocs(collection(db, "galleryBatches")),
        ]);
        setAlbums(albumSnap.docs.map((d) => ({ id: d.id, ...d.data() } as Album)));
        setBatches(
          batchSnap.docs.map((d) => ({ id: d.id, ...d.data() }) as Batch)
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load gallery");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // ---------- Albums ----------

  function startNewAlbum() {
    setEditingAlbum({ id: "", label: "", photos: [] });
    setIsNewAlbum(true);
  }

  function startEditAlbum(album: Album) {
    setEditingAlbum({ ...album, photos: [...album.photos] });
    setIsNewAlbum(false);
  }

  async function uploadImage(
    file: File,
    signature: { apiKey: string; timestamp: string; signature: string }
  ): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", signature.apiKey);
    formData.append("timestamp", signature.timestamp);
    formData.append("signature", signature.signature);
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      { method: "POST", body: formData }
    );
    if (!res.ok) {
      const errData = await res.json().catch(() => null);
      const message =
        (errData && errData.error && errData.error.message) ||
        `Upload failed (HTTP ${res.status})`;
      throw new Error(message);
    }
    const data = await res.json();
    return data.secure_url;
  }

  async function getUploadSignature() {
    const res = await fetch("/api/cloudinary/sign");
    if (!res.ok) throw new Error("Could not get upload signature");
    return res.json();
  }

  async function deleteImage(url: string): Promise<void> {
    try {
      await fetch("/api/cloudinary/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
    } catch {
      // non-fatal: image deletion from Cloudinary is best-effort
    }
  }

  async function uploadMultiple(files: File[]): Promise<string[]> {
    const CONCURRENCY = 4;
    const results: string[] = [];
    const signature = await getUploadSignature();
    let index = 0;
    let done = 0;
    const worker = async () => {
      while (index < files.length) {
        const current = index++;
        if (!files[current]) continue;
        const url = await uploadImage(files[current], signature);
        results[current] = url;
        done++;
        setUploadProgress(Math.round((done / files.length) * 100));
      }
    };
    await Promise.all(
      Array.from({ length: Math.min(CONCURRENCY, files.length) }, worker)
    );
    return results;
  }

  function onAlbumFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
      ? Array.from(e.target.files).filter((f) => f.type.startsWith("image/"))
      : [];
    if (files.length === 0 || !editingAlbum) return;
    setUploading(true);
    setUploadProgress(0);
    uploadMultiple(files)
      .then((urls) => {
        const newPhotos = urls.filter(Boolean).map((url, i) => ({
          src: url,
          caption: `${editingAlbum.label || "Photo"} ${editingAlbum.photos.length + i + 1}`,
        }));
        setEditingAlbum({
          ...editingAlbum,
          photos: [...editingAlbum.photos, ...newPhotos],
        });
        toast.success(
          `${newPhotos.length} image${newPhotos.length === 1 ? "" : "s"} uploaded`
        );
      })
      .catch((err: unknown) => {
        const message =
          err instanceof Error ? err.message : "Upload failed";
        toast.error(message);
      })
      .finally(() => {
        setUploading(false);
        if (fileRef.current) fileRef.current.value = "";
      });
  }

  function onBatchFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
      ? Array.from(e.target.files).filter((f) => f.type.startsWith("image/"))
      : [];
    if (files.length === 0 || !editingBatch) return;
    setUploading(true);
    setUploadProgress(0);
    uploadMultiple(files)
      .then((urls) => {
        const newPhotos = urls.filter(Boolean).map((url, i) => ({
          src: url,
          caption: `${editingBatch.title || "Update"} ${editingBatch.photos.length + i + 1}`,
        }));
        setEditingBatch({
          ...editingBatch,
          photos: [...editingBatch.photos, ...newPhotos],
        });
        toast.success(
          `${newPhotos.length} image${newPhotos.length === 1 ? "" : "s"} uploaded`
        );
      })
      .catch((err: unknown) => {
        const message =
          err instanceof Error ? err.message : "Upload failed";
        toast.error(message);
      })
      .finally(() => {
        setUploading(false);
        if (fileRef.current) fileRef.current.value = "";
      });
  }

  function updateAlbumCaption(index: number, caption: string) {
    if (!editingAlbum) return;
    const photos = [...editingAlbum.photos];
    photos[index] = { ...photos[index], caption };
    setEditingAlbum({ ...editingAlbum, photos });
  }

  function updateBatchCaption(index: number, caption: string) {
    if (!editingBatch) return;
    const photos = [...editingBatch.photos];
    photos[index] = { ...photos[index], caption };
    setEditingBatch({ ...editingBatch, photos });
  }

  async function removeAlbumPhoto(index: number) {
    if (!editingAlbum) return;
    const photo = editingAlbum.photos[index];
    await deleteImage(photo.src);
    setEditingAlbum({
      ...editingAlbum,
      photos: editingAlbum.photos.filter((_, i) => i !== index),
    });
  }

  async function removeBatchPhoto(index: number) {
    if (!editingBatch) return;
    const photo = editingBatch.photos[index];
    await deleteImage(photo.src);
    setEditingBatch({
      ...editingBatch,
      photos: editingBatch.photos.filter((_, i) => i !== index),
    });
  }

  async function saveAlbum() {
    if (!editingAlbum || !editingAlbum.id || !editingAlbum.label) {
      toast.error("Album ID and label are required");
      return;
    }
    if (editingAlbum.photos.some((p) => !p.caption.trim())) {
      toast.error("Every photo needs a caption. Please fill in the missing captions.");
      return;
    }
    setSaving(true);
    try {
      const album: Album = {
        id: slugify(editingAlbum.id),
        label: editingAlbum.label,
        photos: editingAlbum.photos,
      };
      await setDoc(doc(db, "galleryAlbums", album.id), album);
      if (isNewAlbum) {
        setAlbums((prev) => [...prev, album]);
      } else {
        setAlbums((prev) => prev.map((a) => (a.id === album.id ? album : a)));
      }
      setEditingAlbum(null);
      setIsNewAlbum(false);
      toast.success("Album saved");
    } catch {
      toast.error("Failed to save album");
    } finally {
      setSaving(false);
    }
  }

  async function removeAlbum(id: string) {
    if (!confirm("Delete this album? Its photos will also be deleted from Cloudinary.")) return;
    try {
      const album = albums.find((a) => a.id === id);
      if (album) {
        await Promise.all(album.photos.map((p) => deleteImage(p.src)));
      }
      await deleteDoc(doc(db, "galleryAlbums", id));
      setAlbums((prev) => prev.filter((a) => a.id !== id));
      toast.success("Album deleted");
    } catch {
      toast.error("Failed to delete album");
    }
  }

  // ---------- Batches ----------

  function startNewBatch() {
    setEditingBatch({
      id: slugifyId(),
      title: "",
      activitySlug: activityOptions[0]?.slug ?? "",
      description: "",
      date: "",
      photos: [],
    });
    setIsNewBatch(true);
  }

  function startEditBatch(batch: Batch) {
    setEditingBatch({ ...batch, photos: [...batch.photos] });
    setIsNewBatch(false);
  }

  async function saveBatch() {
    if (!editingBatch || !editingBatch.title) {
      toast.error("Batch title is required");
      return;
    }
    if (editingBatch.photos.some((p) => !p.caption.trim())) {
      toast.error("Every photo needs a caption. Please fill in the missing captions.");
      return;
    }
    setSaving(true);
    try {
      const batch: Batch = {
        id: editingBatch.id,
        title: editingBatch.title,
        activitySlug: editingBatch.activitySlug,
        description: editingBatch.description,
        date: editingBatch.date,
        photos: editingBatch.photos,
      };
      await setDoc(doc(db, "galleryBatches", batch.id), batch);
      if (isNewBatch) {
        setBatches((prev) => [batch, ...prev]);
      } else {
        setBatches((prev) =>
          prev.map((b) => (b.id === batch.id ? batch : b))
        );
      }
      setEditingBatch(null);
      setIsNewBatch(false);
      toast.success("Batch saved");
    } catch {
      toast.error("Failed to save batch");
    } finally {
      setSaving(false);
    }
  }

  async function removeBatch(id: string) {
    if (!confirm("Delete this batch? Its photos will also be deleted from Cloudinary.")) return;
    try {
      const batch = batches.find((b) => b.id === id);
      if (batch) {
        await Promise.all(batch.photos.map((p) => deleteImage(p.src)));
      }
      await deleteDoc(doc(db, "galleryBatches", id));
      setBatches((prev) => prev.filter((b) => b.id !== id));
      toast.success("Batch deleted");
    } catch {
      toast.error("Failed to delete batch");
    }
  }

  // ---------- Render ----------

  if (loading) return <p className="text-gray-500 text-sm">Loading gallery...</p>;

  if (error) {
    return (
      <div className="border border-red-200 bg-red-50 p-4">
        <p className="text-sm font-semibold text-red-700">Failed to load gallery</p>
        <p className="mt-1 text-xs text-red-600">
          {error}. Check that the signed-in user can read the{" "}
          <code className="font-mono">galleryAlbums</code> and{" "}
          <code className="font-mono">galleryBatches</code> collections in Firestore rules, then refresh.
        </p>
      </div>
    );
  }

  if (editingAlbum) {
    return (
      <div>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
              Album Editor
            </p>
            <h1 className="mt-1 text-xl font-bold text-gray-900">
              {isNewAlbum ? "New Album" : `Edit: ${editingAlbum.label}`}
            </h1>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => { setEditingAlbum(null); setIsNewAlbum(false); }}
              className="h-9 px-4 border border-gray-200 text-xs font-medium text-gray-600 hover:text-gray-900 hover:border-gray-400"
            >
              Back
            </button>
            <button
              onClick={saveAlbum}
              disabled={saving}
              className="h-9 px-5 bg-primary text-xs font-semibold text-white hover:bg-primary-dark disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>

        <div className="space-y-5 border border-gray-200 bg-white p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-600">
                Album ID
              </label>
              <input
                value={editingAlbum.id}
                onChange={(e) => setEditingAlbum({ ...editingAlbum, id: e.target.value })}
                placeholder="e.g. education-aid"
                disabled={!isNewAlbum}
                className="h-10 w-full border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none focus:border-primary disabled:opacity-50"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-600">
                Label
              </label>
              <input
                value={editingAlbum.label}
                onChange={(e) => setEditingAlbum({ ...editingAlbum, label: e.target.value })}
                placeholder="e.g. Education Aid"
                className="h-10 w-full border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold text-gray-600">
              Photos ({editingAlbum.photos.length})
            </label>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              multiple
              onChange={onAlbumFileChange}
              className="hidden"
            />
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className="h-10 px-5 border border-dashed border-gray-300 text-sm font-medium text-gray-600 hover:text-gray-900 hover:border-gray-500 disabled:opacity-50"
              >
                {uploading ? `Uploading... ${uploadProgress}%` : "+ Upload Images (multiple)"}
              </button>
              {uploading && (
                <div className="h-2 w-full max-w-[240px] overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              )}
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {editingAlbum.photos.map((photo, i) => (
                <div key={i} className="group relative border border-gray-200 bg-gray-50 p-2">
                  <div className="aspect-[4/3] overflow-hidden bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={photo.src} alt="" className="h-full w-full object-cover" />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeAlbumPhoto(i)}
                    title="Delete image (also removes from Cloudinary)"
                    className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-ink/70 text-sm text-white opacity-0 transition hover:bg-red-600 group-hover:opacity-100"
                  >
                    ×
                  </button>
                  <input
                    value={photo.caption}
                    onChange={(e) => updateAlbumCaption(i, e.target.value)}
                    placeholder="Caption"
                    className="mt-2 h-8 w-full border border-gray-200 bg-white px-2 text-xs text-gray-900 outline-none focus:border-primary"
                  />
                  <div className="mt-2 flex justify-between">
                    <span className="truncate text-[10px] text-gray-400">{photo.src}</span>
                    <button
                      onClick={() => removeAlbumPhoto(i)}
                      className="text-[10px] font-semibold text-red-400/60 hover:text-red-400"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (editingBatch) {
    return (
      <div>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
              Batch Editor
            </p>
            <h1 className="mt-1 text-xl font-bold text-gray-900">
              {isNewBatch ? "New Donation Batch" : `Edit: ${editingBatch.title}`}
            </h1>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => { setEditingBatch(null); setIsNewBatch(false); }}
              className="h-9 px-4 border border-gray-200 text-xs font-medium text-gray-600 hover:text-gray-900 hover:border-gray-400"
            >
              Back
            </button>
            <button
              onClick={saveBatch}
              disabled={saving}
              className="h-9 px-5 bg-primary text-xs font-semibold text-white hover:bg-primary-dark disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>

        <div className="space-y-5 border border-gray-200 bg-white p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-600">
                Title
              </label>
              <input
                value={editingBatch.title}
                onChange={(e) => setEditingBatch({ ...editingBatch, title: e.target.value })}
                placeholder="e.g. Donation to Karim — new home"
                className="h-10 w-full border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-600">
                Program / Activity
              </label>
              <select
                value={editingBatch.activitySlug}
                onChange={(e) => setEditingBatch({ ...editingBatch, activitySlug: e.target.value })}
                className="h-10 w-full border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none focus:border-primary"
              >
                {activityOptions.map((a) => (
                  <option key={a.slug} value={a.slug}>
                    {a.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-600">
                Date (optional)
              </label>
              <input
                type="date"
                value={editingBatch.date}
                onChange={(e) => setEditingBatch({ ...editingBatch, date: e.target.value })}
                className="h-10 w-full border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-600">
                Description (optional)
              </label>
              <input
                value={editingBatch.description}
                onChange={(e) => setEditingBatch({ ...editingBatch, description: e.target.value })}
                placeholder="e.g. We provided materials to build Korim's new home"
                className="h-10 w-full border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold text-gray-600">
              Photos ({editingBatch.photos.length})
            </label>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              multiple
              onChange={onBatchFileChange}
              className="hidden"
            />
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className="h-10 px-5 border border-dashed border-gray-300 text-sm font-medium text-gray-600 hover:text-gray-900 hover:border-gray-500 disabled:opacity-50"
              >
                {uploading ? `Uploading... ${uploadProgress}%` : "+ Upload Images (multiple)"}
              </button>
              {uploading && (
                <div className="h-2 w-full max-w-[240px] overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              )}
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {editingBatch.photos.map((photo, i) => (
                <div key={i} className="group relative border border-gray-200 bg-gray-50 p-2">
                  <div className="aspect-[4/3] overflow-hidden bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={photo.src} alt="" className="h-full w-full object-cover" />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeBatchPhoto(i)}
                    title="Delete image (also removes from Cloudinary)"
                    className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-ink/70 text-sm text-white opacity-0 transition hover:bg-red-600 group-hover:opacity-100"
                  >
                    ×
                  </button>
                  <input
                    value={photo.caption}
                    onChange={(e) => updateBatchCaption(i, e.target.value)}
                    placeholder="Caption"
                    className="mt-2 h-8 w-full border border-gray-200 bg-white px-2 text-xs text-gray-900 outline-none focus:border-primary"
                  />
                  <div className="mt-2 flex justify-between">
                    <span className="truncate text-[10px] text-gray-400">{photo.src}</span>
                    <button
                      onClick={() => removeBatchPhoto(i)}
                      className="text-[10px] font-semibold text-red-400/60 hover:text-red-400"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
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
          <h1 className="mt-1 text-2xl font-bold text-gray-900">Gallery Management</h1>
          <p className="mt-2 max-w-lg text-sm text-gray-500">
            Manage donation batches and photo albums. Batches are groups of photos
            with a title (e.g. &quot;Donation to Korim — new home&quot;).
          </p>
        </div>
        <div className="flex gap-3">
          {view === "batches" ? (
            <button
              onClick={startNewBatch}
              className="h-10 px-5 bg-primary text-sm font-semibold text-white hover:bg-primary-dark"
            >
              + New Donation Batch
            </button>
          ) : (
            <button
              onClick={startNewAlbum}
              className="h-10 px-5 bg-primary text-sm font-semibold text-white hover:bg-primary-dark"
            >
              + New Album
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setView("batches")}
          className={`-mb-px border-b-2 px-4 py-2 text-sm font-semibold ${
            view === "batches"
              ? "border-primary text-primary"
              : "border-transparent text-gray-500 hover:text-gray-900"
          }`}
        >
          Donation Batches ({batches.length})
        </button>
        <button
          onClick={() => setView("albums")}
          className={`-mb-px border-b-2 px-4 py-2 text-sm font-semibold ${
            view === "albums"
              ? "border-primary text-primary"
              : "border-transparent text-gray-500 hover:text-gray-900"
          }`}
        >
          Photo Albums ({albums.length})
        </button>
      </div>

      {view === "batches" ? (
        <div className="space-y-3">
          {batches.length === 0 ? (
            <p className="border border-gray-200 bg-white py-16 text-center text-sm text-gray-400">
              No donation batches yet. Click &quot;+ New Donation Batch&quot; to create one —
              e.g. a batch titled &quot;Donation to Korim — new home&quot; with its photos.
            </p>
          ) : (
            batches.map((batch) => {
              const activityName =
                activities.find((a) => a.slug === batch.activitySlug)?.title ??
                batch.activitySlug;
              return (
                <div
                  key={batch.id}
                  className="flex items-center gap-4 border border-gray-200 bg-white p-4"
                >
                  {batch.photos[0] && (
                    <div className="h-16 w-28 shrink-0 overflow-hidden bg-white">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={batch.photos[0].src} alt="" className="h-full w-full object-cover" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {batch.title || "(untitled)"}
                    </p>
                    <p className="mt-0.5 text-xs text-gray-500">
                      {activityName} · {batch.photos.length}{" "}
                      {batch.photos.length === 1 ? "photo" : "photos"}
                      {batch.date ? ` · ${batch.date}` : ""}
                    </p>
                    {batch.description && (
                      <p className="mt-0.5 truncate text-xs italic text-gray-400">
                        {batch.description}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEditBatch(batch)}
                      className="h-8 px-3 border border-gray-200 text-xs font-medium text-gray-600 hover:text-gray-900 hover:border-gray-400"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => removeBatch(batch.id)}
                      className="h-8 px-3 text-xs font-medium text-red-400/60 hover:text-red-400"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {albums.length === 0 ? (
            <p className="border border-gray-200 bg-white py-16 text-center text-sm text-gray-400">
              No gallery albums yet. Click &quot;+ New Album&quot; to create one.
            </p>
          ) : (
            albums.map((album) => (
              <div
                key={album.id}
                className="flex items-center gap-4 border border-gray-200 bg-white p-4"
              >
                {album.photos[0] && (
                  <div className="h-16 w-28 shrink-0 overflow-hidden bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={album.photos[0].src} alt="" className="h-full w-full object-cover" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">{album.label || "(untitled)"}</p>
                  <p className="mt-0.5 text-xs text-gray-500">
                    {album.photos.length} {album.photos.length === 1 ? "photo" : "photos"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEditAlbum(album)}
                    className="h-8 px-3 border border-gray-200 text-xs font-medium text-gray-600 hover:text-gray-900 hover:border-gray-400"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => removeAlbum(album.id)}
                    className="h-8 px-3 text-xs font-medium text-red-400/60 hover:text-red-400"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
