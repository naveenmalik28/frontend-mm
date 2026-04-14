import Sidebar from "../../components/layout/Sidebar.jsx"

export default function Analytics() {
  const metrics = [
    { label: "Views this month", value: "5,420" },
    { label: "Avg. read time", value: "4m 32s" },
    { label: "Subscriber clicks", value: "182" },
  ]

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="space-y-6">
        <section className="glass-panel p-8">
          <span className="eyebrow">Analytics</span>
          <h1 className="mt-4 font-display text-4xl">Track audience momentum</h1>
        </section>
        <section className="grid gap-4 md:grid-cols-3">
          {metrics.map((metric) => (
            <div key={metric.label} className="glass-panel p-6">
              <div className="text-sm text-ink/60">{metric.label}</div>
              <div className="mt-3 font-display text-4xl">{metric.value}</div>
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}

