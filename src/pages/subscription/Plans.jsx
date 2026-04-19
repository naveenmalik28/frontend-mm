import { useMemo } from "react"

import PlanCard from "../../components/subscription/PlanCard.jsx"
import Spinner from "../../components/ui/Spinner.jsx"
import { useSubscriptionData } from "../../hooks/useSubscription.js"

export default function Plans() {
  const { plans, loading } = useSubscriptionData()

  const sortedPlans = useMemo(
    () =>
      [...plans].sort((left, right) => {
        const leftSort = Number(left.sort_order ?? 0)
        const rightSort = Number(right.sort_order ?? 0)
        if (leftSort !== rightSort) return leftSort - rightSort
        return Number(left.price ?? 0) - Number(right.price ?? 0)
      }),
    [plans],
  )

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[36px] border border-white/60 bg-[radial-gradient(circle_at_top_left,_rgba(242,117,84,0.18),_transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.96),rgba(255,244,236,0.94))] p-8 shadow-xl shadow-ink/5 sm:p-10">
        <div className="absolute -right-16 top-0 h-44 w-44 rounded-full bg-coral/10 blur-3xl" />
        <div className="absolute bottom-0 left-12 h-28 w-28 rounded-full bg-teal/10 blur-2xl" />
        <div className="relative max-w-3xl">
          <span className="eyebrow">Subscription plans</span>
          <h1 className="mt-4 font-display text-5xl leading-tight text-ink sm:text-6xl">
            Pick the lane that matches your writing rhythm.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-ink/70">
            Get unlimited access to all our content. Each plan includes the same premium publishing experience, providing dual pricing for global accessibility.
          </p>
        </div>
      </section>

      {loading ? (
        <Spinner />
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          {sortedPlans.map((plan) => (
            <div key={plan.id} className="animate-fade-in-up">
              <PlanCard plan={plan} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
