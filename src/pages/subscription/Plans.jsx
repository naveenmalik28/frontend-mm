import PlanCard from "../../components/subscription/PlanCard.jsx"
import Spinner from "../../components/ui/Spinner.jsx"
import { useSubscriptionData } from "../../hooks/useSubscription.js"

export default function Plans() {
  const { plans, loading } = useSubscriptionData()

  return (
    <div className="space-y-8">
      <section className="glass-panel p-8">
        <span className="eyebrow">Subscription plans</span>
        <h1 className="mt-4 font-display text-5xl">Choose the publishing lane that fits your ambition.</h1>
        <p className="mt-4 max-w-2xl text-sm text-ink/70">Monthly for momentum, six months for consistency, or annual for the best long-term value.</p>
      </section>
      {loading ? <Spinner /> : <div className="grid gap-6 md:grid-cols-3">{plans.map((plan, index) => <PlanCard key={plan.id} plan={plan} highlighted={index === 1} />)}</div>}
    </div>
  )
}

