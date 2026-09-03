import { createHash } from "crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "thy4ada6";
  const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || "";
  const apiSecret = process.env.CLOUDINARY_API_SECRET || "";

  if (!apiKey || !apiSecret) {
    return NextResponse.json(
      { error: "Cloudinary credentials missing on server" },
      { status: 500 }
    );
  }

  const timestamp = Math.round(Date.now() / 1000).toString();
  const paramsToSign = `timestamp=${timestamp}`;
  const signature = createHash("sha1")
    .update(`${paramsToSign}${apiSecret}`)
    .digest("hex");

  return NextResponse.json({
    cloudName,
    apiKey,
    timestamp,
    signature,
  });
}