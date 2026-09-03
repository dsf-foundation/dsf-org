import { createHash } from "crypto";
import { NextResponse } from "next/server";
import https from "https";

export const runtime = "nodejs";

function extractPublicId(url: string): string | null {
  const match = url.match(/\/image\/upload\/(?:v\d+\/)?(.+?)(?:\.\w+)?$/);
  if (match && match[1]) {
    return match[1].trim();
  }
  return null;
}

function buildSignature(paramsToSign: string, secret: string): string {
  return createHash("sha1").update(`${paramsToSign}${secret}`).digest("hex");
}

export async function POST(request: Request) {
  const { url } = await request.json().catch(() => ({ url: "" }));

  if (!url) {
    return NextResponse.json({ error: "Missing image URL" }, { status: 400 });
  }

  const publicId = extractPublicId(url);
  if (!publicId) {
    return NextResponse.json({ error: "Could not parse image public id" }, { status: 400 });
  }

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "thy4ada6";
  const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || "";
  const apiSecret = process.env.CLOUDINARY_API_SECRET || "";

  if (!apiKey || !apiSecret) {
    return NextResponse.json({ error: "Cloudinary credentials missing on server" }, { status: 500 });
  }

  const timestamp = Math.round(Date.now() / 1000).toString();
  const paramsToSign = `public_id=${publicId}&timestamp=${timestamp}`;
  const signature = buildSignature(paramsToSign, apiSecret);

  const body = new URLSearchParams({
    public_id: publicId,
    timestamp,
    api_key: apiKey,
    signature,
  });

  const result = await new Promise<{
    ok: boolean;
    status: number;
    data: Record<string, unknown>;
  }>((resolve) => {
      const req = https.request(
        {
          hostname: "api.cloudinary.com",
          path: `/v1_1/${cloudName}/image/destroy`,
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Content-Length": Buffer.byteLength(body.toString()),
          },
        },
        (res) => {
          let data = "";
          res.on("data", (chunk) => (data += chunk));
          res.on("end", () => {
            try {
              resolve({
                ok: res.statusCode === 200,
                status: res.statusCode || 500,
                data: JSON.parse(data),
              });
            } catch {
              resolve({ ok: false, status: 500, data: {} });
            }
          });
        }
      );
      req.on("error", () =>
        resolve({ ok: false, status: 500, data: {} })
      );
      req.write(body.toString());
      req.end();
    }
  );

  if (!result.ok) {
    return NextResponse.json(
      { error: "Cloudinary delete failed", detail: result.data },
      { status: result.status }
    );
  }

  return NextResponse.json({ ok: true, ...result.data });
}
