import Sidebar from "../../components/layout/Sidebar.jsx"
import SubscriptionBadge from "../../components/subscription/SubscriptionBadge.jsx"
import { useAuthStore } from "../../store/authStore.js"
import { useSubscriptionData } from "../../hooks/useSubscription.js"

export default function Dashboard() {
  const user = useAuthStore((state) => state.user)
  const { subscription } = useSubscriptionData(true)

  const stats = [
    { label: "Published views", value: "12.4k" },
    { label: "Articles", value: "18" },
    { label: "Conversion rate", value: "7.3%" },
  ]

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="space-y-6">
        <section className="glass-panel p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <span className="eyebrow">Writer dashboard</span>
              <h1 className="mt-4 font-display text-4xl">Hello {user?.full_name || user?.username}</h1>
              <p className="mt-3 text-sm text-ink/70">Track your publishing momentum, plan status, and content performance.</p>
            </div>
            <SubscriptionBadge subscription={subscription} />
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="glass-panel p-6">
              <div className="text-sm text-ink/60">{stat.label}</div>
              <div className="mt-3 font-display text-4xl">{stat.value}</div>
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}

