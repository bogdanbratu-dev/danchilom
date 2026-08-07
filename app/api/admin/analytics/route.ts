import { NextResponse, type NextRequest } from "next/server";
import { getTrafficReport } from "@/lib/ga-report";

export async function GET(request: NextRequest) {
  const days = Number(request.nextUrl.searchParams.get("days") ?? "28");
  const safeDays = [7, 28, 90].includes(days) ? days : 28;

  try {
    const report = await getTrafficReport(safeDays);
    if (!report) {
      return NextResponse.json({ error: "Raportul de trafic nu e configurat încă." }, { status: 501 });
    }
    return NextResponse.json(report);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Eroare necunoscută.";
    return NextResponse.json({ error: `Nu am putut încărca datele din Analytics: ${message}` }, { status: 502 });
  }
}
