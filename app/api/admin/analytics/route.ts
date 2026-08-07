import { NextResponse, type NextRequest } from "next/server";
import { getTrafficReport } from "@/lib/ga-report";

const DATE_PATTERN = /^(today|yesterday|\d+daysAgo|\d{4}-\d{2}-\d{2})$/;

export async function GET(request: NextRequest) {
  const start = request.nextUrl.searchParams.get("start") ?? "28daysAgo";
  const end = request.nextUrl.searchParams.get("end") ?? "today";

  if (!DATE_PATTERN.test(start) || !DATE_PATTERN.test(end)) {
    return NextResponse.json({ error: "Interval de date invalid." }, { status: 400 });
  }

  try {
    const report = await getTrafficReport(start, end);
    if (!report) {
      return NextResponse.json({ error: "Raportul de trafic nu e configurat încă." }, { status: 501 });
    }
    return NextResponse.json(report);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Eroare necunoscută.";
    return NextResponse.json({ error: `Nu am putut încărca datele din Analytics: ${message}` }, { status: 502 });
  }
}
