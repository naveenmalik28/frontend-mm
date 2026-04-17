import { useEffect, useState } from "react"
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom"

import { createCheckout, verifyPayment } from "../../api/subscriptions.api.js"
import Button from "../../components/ui/Button.jsx"
import { useSubscriptionData } from "../../hooks/useSubscription.js"
import {
  detectPreferredCurrency,
  formatCurrencyAmount,
  formatPlanPrice,
  getDisplayCurrency,
  normalizeCurrency,
} from "../../utils/subscriptionPricing.js"

export default function Checkout() {
  const { planId } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { plans } = useSubscriptionData()
  const [checkoutData, setCheckoutData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const requestedCurrency = normalizeCurrency(searchParams.get("currency") || detectPreferredCurrency())
  const selectedPlan = plans.find((plan) => String(plan.id) === String(planId))
  const displayCurrency = selectedPlan ? getDisplayCurrency(selectedPlan, requestedCurrency) : requestedCurrency
  const displayPrice = checkoutData
    ? formatCurrencyAmount(Number(checkoutData.amount || 0) / 100, checkoutData.currency)
    : formatPlanPrice(selectedPlan, displayCurrency)

  useEffect(() => {
    let cancelled = false

    setLoading(true)
    setError("")

    createCheckout({ planId, currency: requestedCurrency })
      .then((data) => {
        if (!cancelled) {
          setCheckoutData(data)
        }
      })
      .catch((requestError) => {
        if (!cancelled) {
          setError(requestError.response?.data?.currency?.[0] || requestError.response?.data?.detail || "Unable to prepare checkout.")
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [planId, requestedCurrency])

  const handlePay = async () => {
    if (!checkoutData) return

    await verifyPayment({
      subscription_id: checkoutData.subscription_id,
      razorpay_order_id: checkoutData.order_id,
      razorpay_payment_id: `demo_payment_${Date.now()}`,
      razorpay_signature: "demo",
      currency: checkoutData.currency,
    }).catch(() => null)

    navigate("/subscription/success")
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="glass-panel overflow-hidden p-8">
          <span className="eyebrow">Checkout</span>
          <h1 className="mt-4 font-display text-4xl text-ink">Finish your subscription</h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-ink/70">
            Your order is prepared in the correct currency before Razorpay takes over. The demo button below still simulates a successful payment for local testing.
          </p>

          <div className="mt-8 rounded-[28px] border border-ink/10 bg-white/70 p-6">
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-ink/45">Selected plan</div>
            <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="font-display text-3xl text-ink">{selectedPlan?.name || checkoutData?.plan?.name || "Subscription plan"}</h2>
                <p className="mt-2 text-sm text-ink/60">{selectedPlan?.description || checkoutData?.plan?.description || "Your publishing access starts as soon as payment is verified."}</p>
              </div>
              <div className="text-right">
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-ink/40">{displayCurrency}</div>
                <div className="mt-2 font-display text-4xl text-ink">{displayPrice}</div>
              </div>
            </div>
            <div className="mt-6 grid gap-4 border-t border-ink/10 pt-6 sm:grid-cols-3">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-ink/40">Duration</div>
                <div className="mt-2 text-sm font-semibold text-ink">{selectedPlan?.duration_days || checkoutData?.plan?.duration_days || "-"} days</div>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-ink/40">Order status</div>
                <div className="mt-2 text-sm font-semibold text-ink">{loading ? "Preparing order" : error ? "Needs attention" : "Order created"}</div>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-ink/40">Plan id</div>
                <div className="mt-2 break-all text-sm font-semibold text-ink">{planId}</div>
              </div>
            </div>
          </div>

          {error && (
            <div className="mt-6 rounded-[24px] border border-red-200 bg-red-50 p-5 text-sm font-medium text-red-700">
              {error}
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <Button className="shadow-lg shadow-coral/20" disabled={loading || Boolean(error)} onClick={handlePay}>
              Simulate payment success
            </Button>
            <Link to="/plans">
              <Button variant="ghost">Back to plans</Button>
            </Link>
          </div>
        </section>

        <aside className="glass-panel p-8">
          <div className="text-xs font-semibold uppercase tracking-[0.28em] text-teal">Payment summary</div>
          <div className="mt-6 space-y-5">
            <div className="flex items-center justify-between gap-4 text-sm text-ink/65">
              <span>Currency</span>
              <span className="font-semibold text-ink">{checkoutData?.currency || displayCurrency}</span>
            </div>
            <div className="flex items-center justify-between gap-4 text-sm text-ink/65">
              <span>Amount</span>
              <span className="font-semibold text-ink">{displayPrice}</span>
            </div>
            <div className="flex items-center justify-between gap-4 text-sm text-ink/65">
              <span>Gateway</span>
              <span className="font-semibold text-ink">Razorpay</span>
            </div>
            <div className="flex items-center justify-between gap-4 text-sm text-ink/65">
              <span>Order id</span>
              <span className="max-w-[180px] truncate font-semibold text-ink">{checkoutData?.order_id || "-"}</span>
            </div>
          </div>

          <div className="mt-8 rounded-[24px] bg-ink px-5 py-4 text-sm leading-6 text-white/80">
            INR is used for India. USD is used everywhere else when the plan has a USD price configured in admin.
          </div>
        </aside>
      </div>
    </div>
  )
}
