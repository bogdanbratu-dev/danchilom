import { NextResponse } from "next/server";
import { uploadImage } from "@/lib/content-store";

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

const ALLOWED_FOLDERS = new Set(["gallery", "staff", "brand"]);

export async function POST(request: Request) {
  const form = await request.formData();
  const file = form.get("file");
  const folderRaw = form.get("folder");
  const folder = typeof folderRaw === "string" && ALLOWED_FOLDERS.has(folderRaw)
    ? (folderRaw as "gallery" | "staff" | "brand")
    : "gallery";

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Niciun fișier trimis." }, { status: 400 });
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json(
      { error: "Format neacceptat. Folosește JPG, PNG sau WebP." },
      { status: 400 },
    );
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "Poza e prea mare (limită 10MB)." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const url = await uploadImage(buffer, file.name, file.type, folder);

  return NextResponse.json({ url });
}
