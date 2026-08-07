import { BackupsPanel } from "@/components/admin/BackupsPanel";

export default function AdminBackupsPage() {
  return (
    <div>
      <h1 className="font-display text-3xl uppercase text-paper">Copii de siguranță</h1>
      <p className="mt-2 text-muted">
        La fiecare salvare din admin, starea anterioară e păstrată automat aici. Dacă un
        conținut a fost șters sau modificat din greșeală, îl poți aduce înapoi.
      </p>
      <div className="mt-8">
        <BackupsPanel />
      </div>
    </div>
  );
}
