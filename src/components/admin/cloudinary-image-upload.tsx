"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";
import { IoImageOutline } from "react-icons/io5";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "thy4ada6";

type Signature = { apiKey: string; timestamp: string; signature: string };

async function getUploadSignature(): Promise<Signature> {
  const res = await fetch("/api/cloudinary/sign");
  if (!res.ok) throw new Error("Could not get upload signature");
  return res.json();
}

async function uploadOne(file: File, sig: Signature): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", sig.apiKey);
  formData.append("timestamp", sig.timestamp);
  formData.append("signature", sig.signature);
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: "POST", body: formData }
  );
  if (!res.ok) {
    const errData = await res.json().catch(() => null);
    throw new Error(
      (errData && errData.error && errData.error.message) ||
        `Upload failed (HTTP ${res.status})`
    );
  }
  const data = await res.json();
  return data.secure_url;
}

export function CloudinaryImageUpload({
  onUploaded,
  variant = "block",
  label = "Upload image",
  uploadingLabel = "Uploading",
  onError,
}: {
  onUploaded: (url: string) => void;
  variant?: "block" | "toolbar";
  label?: string;
  uploadingLabel?: string;
  onError?: (message: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
      ? Array.from(e.target.files).filter((f) => f.type.startsWith("image/"))
      : [];
    if (files.length === 0) return;
    if (files.length > 1) {
      const msg = "Select only one image at a time here.";
      if (onError) onError(msg);
      else toast.error(msg);
      if (fileRef.current) fileRef.current.value = "";
      return;
    }
    setUploading(true);
    setProgress(0);
    try {
      const signature = await getUploadSignature();
      const url = await uploadOne(files[0], signature);
      setProgress(100);
      onUploaded(url);
      toast.success("Image uploaded");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Upload failed";
      if (onError) onError(message);
      else toast.error(message);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  if (variant === "toolbar") {
    return (
      <>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          title={uploading ? `${uploadingLabel} ${progress}%` : "Upload image"}
          aria-label={uploading ? `${uploadingLabel} ${progress}%` : "Upload image"}
          className={`flex h-8 w-8 items-center justify-center text-sm transition disabled:opacity-30 ${
            uploading ? "bg-white/10 text-white" : "text-white/40 hover:text-white/70"
          }`}
        >
          {uploading ? (
            <span className="text-[9px] font-bold">{progress}%</span>
          ) : (
            <IoImageOutline className="h-4 w-4" />
          )}
        </button>
      </>
    );
  }

  return (
    <div>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="h-10 px-5 border border-dashed border-gray-300 text-sm font-medium text-gray-600 hover:text-gray-900 hover:border-gray-500 disabled:opacity-50"
        >
          {uploading ? `${uploadingLabel} ${progress}%` : label}
        </button>
        {uploading && (
          <div className="h-2 w-full max-w-[200px] overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}