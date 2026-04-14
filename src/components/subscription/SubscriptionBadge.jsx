export default function SubscriptionBadge({ subscription }) {
  if (!subscription) {
    return <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-ink/60">No active subscription</span>
  }

  return (
    <span className="rounded-full bg-teal px-3 py-1 text-xs font-semibold text-white">
      {subscription.plan?.name || "Active plan"} • {subscription.status}
    </span>
  )
}
