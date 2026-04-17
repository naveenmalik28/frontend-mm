import { Link } from "react-router-dom"

import Sidebar from "../../components/layout/Sidebar.jsx"
import SubscriptionBadge from "../../components/subscription/SubscriptionBadge.jsx"
import { useAuthStore } from "../../store/authStore.js"
import { useSubscriptionData } from "../../hooks/useSubscription.js"

export default function Dashboard() {
  const user = useAuthStore((state) => state.user)
  const { subscription } = useSubscriptionData(true)

  const stats = [
    { 
      label: "Published views", 
      value: "12.4k",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-coral" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )
    },
    { 
      label: "Articles", 
      value: "18",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-coral" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-.586-1.414l-4.5-4.5A2 2 0 0012.586 3H12" />
        </svg>
      )
    },
    { 
      label: "Conversion rate", 
      value: "7.3%",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-coral" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
  ]

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="space-y-8">
        {/* Welcome Banner */}
        <section className="glass-panel p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <span className="eyebrow flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Writer dashboard
              </span>
              <h1 className="mt-4 font-display text-4xl">Hello {user?.full_name || user?.username}</h1>
              <p className="mt-3 text-sm text-ink/70">Track your publishing momentum, plan status, and content performance.</p>
            </div>
            <SubscriptionBadge subscription={subscription} />
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <div className="mb-4 text-sm font-semibold text-ink">Quick Actions</div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link 
              to="/dashboard/new-article" 
              className="group flex flex-col justify-center rounded-3xl border border-ink/10 bg-white/70 p-6 transition-all hover:border-coral/50 hover:bg-white hover:shadow-sm"
            >
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-coral/10 text-coral group-hover:bg-coral group-hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 className="font-display text-xl">Draft New Article</h3>
              <p className="mt-1 text-sm text-ink/60">Start writing your next big story.</p>
            </Link>
            <Link 
              to="/dashboard/analytics" 
              className="group flex flex-col justify-center rounded-3xl border border-ink/10 bg-white/70 p-6 transition-all hover:border-coral/50 hover:bg-white hover:shadow-sm"
            >
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-ink/5 text-ink group-hover:bg-ink group-hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-display text-xl">View Analytics</h3>
              <p className="mt-1 text-sm text-ink/60">Dive deeper into your audience metrics.</p>
            </Link>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="grid gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="glass-panel relative overflow-hidden p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-coral/10">
                  {stat.icon}
                </div>
                <div className="text-sm font-medium text-ink/70">{stat.label}</div>
              </div>
              <div className="mt-4 font-display text-4xl">{stat.value}</div>
              
              {/* Subtle visual decoration */}
              <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-coral/5 blur-2xl flex-shrink-0" />
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}

