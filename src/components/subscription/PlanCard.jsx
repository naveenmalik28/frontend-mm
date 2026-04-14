import { Link } from "react-router-dom"

import Button from "../ui/Button.jsx"

export default function PlanCard({ plan, highlighted = false }) {
  return (
    <article className={`glass-panel p-6 ${highlighted ? "ring-2 ring-coral/40" : ""}`}>
      <div className="eyebrow">{plan.duration_days} days</div>
      <h3 className="mt-4 font-display text-3xl">{plan.name}</h3>
      <p className="mt-2 text-4xl font-semibold text-ink">Rs. {plan.price}</p>
      <ul className="mt-6 space-y-3 text-sm text-ink/75">
        {(plan.features || []).map((feature) => <li key={feature}>• {feature}</li>)}
      </ul>
      <Link className="mt-8 inline-flex" to={`/checkout/${plan.id}`}>
        <Button className="w-full">Subscribe now</Button>
      </Link>
    </article>
  )
}

