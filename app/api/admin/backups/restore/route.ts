import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { restoreContentBackup } from "@/lib/content-store";

export async function POST(request: Request) {
  let body: { id?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Cerere invalidă." }, { status: 400 });
  }

  if (typeof body.id !== "string" || !body.id) {
    return NextResponse.json({ error: "Copie de siguranță invalidă." }, { status: 400 });
  }

  try {
    const ok = await restoreContentBackup(body.id);
    if (!ok) {
      return NextResponse.json({ error: "Copia de siguranță nu a fost găsită." }, { status: 404 });
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Eroare necunoscută.";
    return NextResponse.json({ error: `Restaurarea a eșuat: ${message}` }, { status: 500 });
  }

  revalidatePath("/", "layout");

  return NextResponse.json({ ok: true });
}
