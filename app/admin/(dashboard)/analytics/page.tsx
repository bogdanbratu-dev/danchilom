import { AnalyticsDashboard } from "@/components/admin/AnalyticsDashboard";

export default function AdminAnalyticsPage() {
  const configured = Boolean(process.env.GA_SERVICE_ACCOUNT_JSON && process.env.GA_PROPERTY_ID);

  return (
    <div>
      <h1 className="font-display text-3xl uppercase text-paper">Trafic site</h1>
      <p className="mt-2 text-muted">
        Cine intră pe site, de unde și în ce zile — datele vin direct din Google Analytics.
      </p>

      {configured ? (
        <div className="mt-8">
          <AnalyticsDashboard />
        </div>
      ) : (
        <p className="mt-8 rounded-xl border border-line bg-surface p-6 text-muted">
          Raportul nu e conectat încă — lipsesc variabilele{" "}
          <code className="text-paper">GA_SERVICE_ACCOUNT_JSON</code> și{" "}
          <code className="text-paper">GA_PROPERTY_ID</code> din Vercel.
        </p>
      )}
    </div>
  );
}
