import { NextResponse } from "next/server";
import { getContent } from "@/lib/content";

/**
 * Primește formularul de înscriere și trimite un email prin Resend.
 *
 * Dacă RESEND_API_KEY nu e configurat (situația de dinainte de cumpărarea
 * domeniului), ruta răspunde cu 503 și codul `email-neconfigurat`, iar
 * formularul afișează varianta de rezervă: telefon și WhatsApp. Site-ul e
 * deci complet funcțional încă din prima zi, fără nicio configurare.
 */

type Payload = {
  childName?: unknown;
  birthYear?: unknown;
  parentName?: unknown;
  phone?: unknown;
  email?: unknown;
  base?: unknown;
  message?: unknown;
  gdpr?: unknown;
  /** Câmp-capcană: e ascuns în pagină, deci doar boții îl completează. */
  website?: unknown;
};

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Cerere invalidă." }, { status: 400 });
  }

  // Honeypot: răspundem 200 ca botul să creadă că a reușit, dar nu trimitem nimic.
  if (str(body.website)) {
    return NextResponse.json({ ok: true });
  }

  const childName = str(body.childName);
  const birthYear = str(body.birthYear);
  const parentName = str(body.parentName);
  const phone = str(body.phone);
  const email = str(body.email);
  const base = str(body.base);
  const message = str(body.message);
  const gdpr = body.gdpr === true;

  const errors: string[] = [];
  if (childName.length < 2) errors.push("Numele copilului este obligatoriu.");
  if (!/^\d{4}$/.test(birthYear)) errors.push("Anul nașterii este obligatoriu.");
  if (parentName.length < 2) errors.push("Numele părintelui este obligatoriu.");
  if (phone.replace(/\D/g, "").length < 9) errors.push("Numărul de telefon nu pare corect.");
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("Adresa de email nu pare corectă.");
  if (!gdpr) errors.push("Este necesar acordul pentru prelucrarea datelor.");

  if (errors.length > 0) {
    return NextResponse.json({ error: errors.join(" ") }, { status: 400 });
  }

  const { bases, contact, site } = await getContent();

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || contact.email;
  const from = process.env.CONTACT_FROM_EMAIL || "AS Dan Chilom <onboarding@resend.dev>";

  if (!apiKey) {
    return NextResponse.json(
      {
        error: "Trimiterea prin email nu este încă activată.",
        code: "email-neconfigurat",
      },
      { status: 503 },
    );
  }

  const baseLabel = bases.find((b) => b.slug === base)?.name ?? "Fără preferință";

  const rows: [string, string][] = [
    ["Copil", childName],
    ["Anul nașterii", birthYear],
    ["Părinte", parentName],
    ["Telefon", phone],
    ["Email", email || "—"],
    ["Bază preferată", baseLabel],
    ["Mesaj", message || "—"],
  ];

  const html = `
    <h2>Cerere nouă de înscriere — ${escapeHtml(site.name)}</h2>
    <table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
      ${rows
        .map(
          ([label, value]) =>
            `<tr><td style="border:1px solid #ddd"><strong>${escapeHtml(label)}</strong></td><td style="border:1px solid #ddd">${escapeHtml(value)}</td></tr>`,
        )
        .join("")}
    </table>
  `;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `Înscriere: ${childName} (${birthYear}) — ${parentName}`,
        html,
        ...(email ? { reply_to: email } : {}),
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("Resend a răspuns cu eroare:", res.status, detail);
      return NextResponse.json(
        { error: "Nu am putut trimite mesajul.", code: "trimitere-esuata" },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("Eroare la apelul către Resend:", err);
    return NextResponse.json(
      { error: "Nu am putut trimite mesajul.", code: "trimitere-esuata" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
