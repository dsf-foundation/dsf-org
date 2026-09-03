"use client";

import { useEffect, useState, useRef } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "sonner";

type Photo = { src: string; caption: string };

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "thy4ada6";

export default function HomeGalleryPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function load() {
      try {
        const snap = await getDoc(doc(db, "homeGallery", "main"));
        if (snap.exists()) {
          const data = snap.data() as { photos?: Photo[] };
          setPhotos((data.photos ?? []).map((p) => ({ ...p })));
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load home gallery"
        );
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

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

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
      ? Array.from(e.target.files).filter((f) => f.type.startsWith("image/"))
      : [];
    if (files.length === 0) return;
    setUploading(true);
    setUploadProgress(0);
    uploadMultiple(files)
      .then((urls) => {
        const newPhotos = urls.filter(Boolean).map((url, i) => ({
          src: url,
          caption: `Gallery photo ${photos.length + i + 1}`,
        }));
        setPhotos((prev) => [...prev, ...newPhotos]);
        toast.success(
          `${newPhotos.length} image${newPhotos.length === 1 ? "" : "s"} uploaded`
        );
      })
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : "Upload failed";
        toast.error(message);
      })
      .finally(() => {
        setUploading(false);
        if (fileRef.current) fileRef.current.value = "";
      });
  }

  function updateCaption(index: number, caption: string) {
    setPhotos((prev) =>
      prev.map((p, i) => (i === index ? { ...p, caption } : p))
    );
  }

  async function removePhoto(index: number) {
    const photo = photos[index];
    await deleteImage(photo.src);
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  }

  function movePhoto(index: number, dir: -1 | 1) {
    setPhotos((prev) => {
      const i = index;
      const j = i + dir;
      if (i < 0 || j < 0 || j >= prev.length) return prev;
      const next = [...prev];
      const [moved] = next.splice(i, 1);
      next.splice(j, 0, moved);
      return next;
    });
  }

  async function save() {
    if (photos.some((p) => !p.caption.trim())) {
      toast.error("Every photo needs a caption. Please fill in the missing captions.");
      return;
    }
    setSaving(true);
    try {
      await setDoc(doc(db, "homeGallery", "main"), {
        photos,
        updatedAt: new Date().toISOString(),
      });
      toast.success("Home gallery saved");
    } catch {
      toast.error("Failed to save home gallery");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p className="text-sm text-gray-500">Loading home gallery...</p>;
  }

  if (error) {
    return (
      <div className="border border-red-200 bg-red-50 p-4">
        <p className="text-sm font-semibold text-red-700">Failed to load home gallery</p>
        <p className="mt-1 text-xs text-red-600">
          {error}. Check that the signed-in user can read the{" "}
          <code className="font-mono">homeGallery</code> collection in Firestore rules, then refresh.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
          Home
        </p>
        <h1 className="mt-1 text-2xl font-bold text-gray-900">Home Gallery</h1>
        <p className="mt-2 max-w-lg text-sm text-gray-500">
          Curate the photo grid shown in the &quot;Moments that matter&quot;
          section on the home page. The first photo is displayed as the large
          featured tile. Photos are stored on Cloudinary.
        </p>
      </div>

      <div className="mb-8 border border-gray-200 bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900">
            Photos ({photos.length})
          </h2>
          <span className="text-xs text-gray-400">
            First photo = large featured tile
          </span>
        </div>

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          onChange={onFileChange}
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

        {photos.length === 0 ? (
          <p className="mt-6 border border-dashed border-gray-200 p-8 text-center text-sm text-gray-400">
            No photos yet. Upload images for the home page gallery above.
          </p>
        ) : (
          <div className="mt-6 space-y-4">
            {photos.map((photo, i) => (
              <div key={i} className="border border-gray-200 bg-gray-50 p-3">
                <div className="flex flex-wrap items-start gap-4">
                  <div className="h-24 w-40 shrink-0 overflow-hidden bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photo.src}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                        Photo {i + 1}
                      </span>
                      {i === 0 && (
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => movePhoto(i, -1)}
                        disabled={i === 0}
                        aria-label="Move up"
                        className="h-8 w-8 border border-gray-200 bg-white text-gray-500 hover:border-gray-400 hover:text-gray-900 disabled:opacity-30"
                      >
                        ↑
                      </button>
                      <button
                        onClick={() => movePhoto(i, 1)}
                        disabled={i === photos.length - 1}
                        aria-label="Move down"
                        className="h-8 w-8 border border-gray-200 bg-white text-gray-500 hover:border-gray-400 hover:text-gray-900 disabled:opacity-30"
                      >
                        ↓
                      </button>
                      <button
                        onClick={() => removePhoto(i)}
                        aria-label="Remove photo"
                        className="h-8 px-2 border border-gray-200 bg-white text-xs font-medium text-red-400/60 hover:border-red-300 hover:text-red-400"
                      >
                        Remove
                      </button>
                    </div>
                    <input
                      value={photo.caption}
                      onChange={(e) => updateCaption(i, e.target.value)}
                      placeholder="Caption"
                      className="mt-2 h-8 w-full max-w-xs border border-gray-200 bg-white px-2 text-xs text-gray-900 outline-none focus:border-primary"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <button
          onClick={save}
          disabled={saving}
          className="h-10 px-6 bg-primary text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save home gallery"}
        </button>
      </div>
    </div>
  );
}
