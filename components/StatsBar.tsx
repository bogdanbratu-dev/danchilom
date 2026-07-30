import type { Stat } from "@/content/schema";

export function StatsBar({ stats }: { stats: Stat[] }) {
  return (
    <section className="border-y border-line bg-surface" aria-label="Clubul în cifre">
      <div className="container-site grid grid-cols-2 gap-px lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="py-8 text-center lg:py-10">
            <p className="font-display text-3xl text-brand-soft sm:text-4xl">{stat.value}</p>
            <p className="mx-auto mt-2 max-w-[16ch] text-xs uppercase leading-relaxed tracking-[0.14em] text-muted">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
