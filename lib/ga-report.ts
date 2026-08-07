import { BetaAnalyticsDataClient } from "@google-analytics/data";

export type TrafficReport = {
  totals: { users: number; sessions: number; pageViews: number };
  byDay: { date: string; users: number; sessions: number }[];
  byCountry: { name: string; users: number }[];
  byCity: { name: string; users: number }[];
};

function getClient() {
  const raw = process.env.GA_SERVICE_ACCOUNT_JSON;
  if (!raw) return null;
  const credentials = JSON.parse(raw);
  return new BetaAnalyticsDataClient({ credentials });
}

/** Formatează "20260807" (formatul GA) în "07.08" pentru afișare. */
function formatDayLabel(gaDate: string) {
  return `${gaDate.slice(6, 8)}.${gaDate.slice(4, 6)}`;
}

export async function getTrafficReport(days: number): Promise<TrafficReport | null> {
  const propertyId = process.env.GA_PROPERTY_ID;
  const client = getClient();
  if (!client || !propertyId) return null;

  const property = `properties/${propertyId}`;
  const dateRanges = [{ startDate: `${days}daysAgo`, endDate: "today" }];

  const [totalsRes, byDayRes, byCountryRes, byCityRes] = await Promise.all([
    client.runReport({
      property,
      dateRanges,
      metrics: [{ name: "activeUsers" }, { name: "sessions" }, { name: "screenPageViews" }],
    }),
    client.runReport({
      property,
      dateRanges,
      dimensions: [{ name: "date" }],
      metrics: [{ name: "activeUsers" }, { name: "sessions" }],
      orderBys: [{ dimension: { dimensionName: "date" } }],
    }),
    client.runReport({
      property,
      dateRanges,
      dimensions: [{ name: "country" }],
      metrics: [{ name: "activeUsers" }],
      orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }],
      limit: 8,
    }),
    client.runReport({
      property,
      dateRanges,
      dimensions: [{ name: "city" }],
      metrics: [{ name: "activeUsers" }],
      orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }],
      limit: 8,
    }),
  ]);

  const totalsRow = totalsRes[0].rows?.[0];

  return {
    totals: {
      users: Number(totalsRow?.metricValues?.[0]?.value ?? 0),
      sessions: Number(totalsRow?.metricValues?.[1]?.value ?? 0),
      pageViews: Number(totalsRow?.metricValues?.[2]?.value ?? 0),
    },
    byDay: (byDayRes[0].rows ?? []).map((r) => ({
      date: formatDayLabel(r.dimensionValues![0].value!),
      users: Number(r.metricValues![0].value),
      sessions: Number(r.metricValues![1].value),
    })),
    byCountry: (byCountryRes[0].rows ?? []).map((r) => ({
      name: r.dimensionValues![0].value || "Necunoscut",
      users: Number(r.metricValues![0].value),
    })),
    byCity: (byCityRes[0].rows ?? []).map((r) => ({
      name: r.dimensionValues![0].value || "Necunoscut",
      users: Number(r.metricValues![0].value),
    })),
  };
}
