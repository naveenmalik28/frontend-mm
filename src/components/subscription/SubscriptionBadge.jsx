import { detectPreferredCurrency, formatPlanPrice } from "../../utils/subscriptionPricing.js"

export default function SubscriptionBadge({ subscription }) {
  if (!subscription) {
    return <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-ink/60">No active subscription</span>
  }

  const preferredCurrency = detectPreferredCurrency()
  const priceLabel = subscription.plan ? formatPlanPrice(subscription.plan, preferredCurrency) : null

  return (
    <span className="rounded-full bg-teal px-3 py-1 text-xs font-semibold text-white">
      {subscription.plan?.name || "Active plan"} | {subscription.status}{priceLabel ? ` | ${priceLabel}` : ""}
    </span>
  )
}
