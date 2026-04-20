import { memo } from "react"
import { Link } from "react-router-dom"

import { detectPreferredCurrency, getDisplayCurrency, formatPlanPrice } from "../../utils/subscriptionPricing.js"
import Button from "../ui/Button.jsx"

function PlanCard({ plan }) {
  return (
    <article
      className={`group relative overflow-hidden rounded-[32px] border p-7 transition duration-300 hover:-translate-y-2 hover:shadow-2xl ${
        plan.is_popular
          ? "border-coral/40 bg-gradient-to-br from-coral/10 via-white/90 to-amber-50 shadow-xl shadow-coral/10"
          : "border-ink/10 bg-white/80 shadow-lg shadow-ink/5"
      }`}
    >
      <div className="absolute -right-10 top-10 h-28 w-28 rounded-full bg-coral/10 blur-2xl transition duration-300 group-hover:scale-125" />
      <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-ink/[0.03] to-transparent" />

      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="eyebrow">{plan.duration_days} day access</div>
            <h3 className="mt-4 font-display text-3xl text-ink">{plan.name}</h3>
            <p className="mt-3 text-sm leading-6 text-ink/65">
              {plan.description || "Built for consistent publishing momentum and a smoother writing workflow."}
            </p>
          </div>
          {plan.is_popular && (
            <span className="rounded-full bg-coral px-3 py-1 text-[11px] font-bold uppercase tracking-[0.24em] text-white shadow-lg shadow-coral/25">
              Popular
            </span>
          )}
        </div>

        <div className="relative mt-8 rounded-[26px] border border-white/60 bg-white/70 p-5 backdrop-blur backdrop-saturate-150">
          <div className="text-[10px] font-bold uppercase tracking-[0.28em] text-ink/40">Plan Price</div>
          <div className="mt-4 flex flex-col gap-3">
            <div className="flex items-end gap-2">
              <p className="font-display text-4xl leading-none text-ink">
                {formatPlanPrice(plan, detectPreferredCurrency())}
              </p>
              <span className="pb-1 text-xs font-bold uppercase tracking-wider text-ink/40">
                {getDisplayCurrency(plan, detectPreferredCurrency())}
              </span>
            </div>
          </div>
        </div>

        <ul className="mt-7 space-y-3 text-sm text-ink/75">
          {(plan.features || []).map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-coral/80" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <Link className="relative mt-8 inline-flex" to={`/checkout/${plan.id}`}>
          <Button className="w-full shadow-lg shadow-coral/20">Subscribe now</Button>
        </Link>
      </div>
    </article>
  )
}

export default memo(PlanCard)
