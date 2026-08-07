import { NextResponse } from "next/server";
import { createContentBackup, listContentBackups } from "@/lib/content-store";

export async function GET() {
  const backups = await listContentBackups();
  return NextResponse.json({ backups });
}

export async function POST() {
  try {
    await createContentBackup();
  } catch (err) {
    const message = err instanceof Error ? err.message : "Eroare necunoscută.";
    return NextResponse.json({ error: `Copia de siguranță a eșuat: ${message}` }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
