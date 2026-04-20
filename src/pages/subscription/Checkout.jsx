import { useCallback, useEffect, useState } from "react"
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom"

import { createCheckout, verifyPayment } from "../../api/subscriptions.api.js"
import Button from "../../components/ui/Button.jsx"
import Spinner from "../../components/ui/Spinner.jsx"
import { useSubscriptionData } from "../../hooks/useSubscription.js"
import { useAuthStore } from "../../store/authStore.js"
import { useSubscriptionStore } from "../../store/subscriptionStore.js"
import {
  detectPreferredCurrency,
  formatCurrencyAmount,
  formatPlanPrice,
  getDisplayCurrency,
  normalizeCurrency,
} from "../../utils/subscriptionPricing.js"
import { loadRazorpayScript, openRazorpayCheckout } from "../../utils/razorpay.js"

const RAZORPAY_KEY_ID_FALLBACK = import.meta.env.VITE_RAZORPAY_KEY_ID || ""

const LockIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
)

const ShieldIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
)

export default function Checkout() {
  const { planId } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { plans } = useSubscriptionData()
  const user = useAuthStore((state) => state.user)
  const clearSubscription = useSubscriptionStore((state) => state.clearSubscription)

  const requestedCurrency = normalizeCurrency(searchParams.get("currency") || detectPreferredCurrency())
  const requestKey = `${planId}:${requestedCurrency}`

  const [checkoutState, setCheckoutState] = useState({ requestKey: null, data: null, error: "" })
  const [paying, setPaying] = useState(false)
  const [payError, setPayError] = useState("")

  const checkoutData = checkoutState.requestKey === requestKey ? checkoutState.data : null
  const error = checkoutState.requestKey === requestKey ? checkoutState.error : ""
  const loading = checkoutState.requestKey !== requestKey

  const selectedPlan = plans.find((plan) => String(plan.id) === String(planId))
  const displayCurrency = selectedPlan ? getDisplayCurrency(selectedPlan, requestedCurrency) : requestedCurrency
  const displayPrice = checkoutData
    ? formatCurrencyAmount(Number(checkoutData.amount || 0) / 100, checkoutData.currency)
    : formatPlanPrice(selectedPlan, displayCurrency)

  // Create checkout order on the backend
  useEffect(() => {
    let cancelled = false

    createCheckout({ planId, currency: requestedCurrency })
      .then((data) => {
        if (!cancelled) {
          setCheckoutState({ requestKey, data, error: "" })
        }
      })
      .catch((requestError) => {
        if (!cancelled) {
          setCheckoutState({
            requestKey,
            data: null,
            error:
              requestError.response?.data?.currency?.[0] ||
              requestError.response?.data?.detail ||
              "Unable to prepare checkout. Please try again.",
          })
        }
      })

    return () => {
      cancelled = true
    }
  }, [planId, requestKey, requestedCurrency])

  // Preload Razorpay SDK while the user views the checkout
  useEffect(() => {
    loadRazorpayScript()
  }, [])

  const handlePay = useCallback(async () => {
    if (!checkoutData) return

    setPayError("")
    setPaying(true)

    try {
      // Ensure Razorpay SDK is loaded
      const sdkLoaded = await loadRazorpayScript()
      if (!sdkLoaded) {
        throw new Error("Failed to load payment gateway. Please check your internet connection and try again.")
      }

      // Determine the Razorpay key — prefer backend-provided key, fallback to env variable
      const razorpayKey = checkoutData.razorpay_key || RAZORPAY_KEY_ID_FALLBACK
      if (!razorpayKey) {
        throw new Error("Payment gateway is not configured. Please contact support.")
      }

      // Open Razorpay checkout modal
      const paymentResponse = await openRazorpayCheckout({
        keyId: razorpayKey,
        orderId: checkoutData.order_id,
        amount: checkoutData.amount,
        currency: checkoutData.currency,
        planName: selectedPlan?.name || checkoutData?.plan?.name || "Subscription",
        description: `${selectedPlan?.name || "Subscription"} — ${selectedPlan?.duration_days || checkoutData?.plan?.duration_days || ""} day access`,
        prefill: {
          name: user?.full_name || user?.username || "",
          email: user?.email || "",
        },
      })

      // Verify payment on the backend
      await verifyPayment({
        subscription_id: checkoutData.subscription_id,
        razorpay_order_id: paymentResponse.razorpay_order_id,
        razorpay_payment_id: paymentResponse.razorpay_payment_id,
        razorpay_signature: paymentResponse.razorpay_signature,
        currency: checkoutData.currency,
      })

      clearSubscription()
      navigate("/subscription/success")
    } catch (paymentError) {
      const message = paymentError?.message || "Payment could not be completed. Please try again."
      // Don't show error for user-cancelled payments
      if (message !== "Payment cancelled by user.") {
        setPayError(message)
      }
    } finally {
      setPaying(false)
    }
  }, [checkoutData, selectedPlan, user, clearSubscription, navigate])

  return (
    <div className="mx-auto max-w-4xl">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="glass-panel overflow-hidden p-8">
          <span className="eyebrow">Checkout</span>
          <h1 className="mt-4 font-display text-4xl text-ink">Complete your subscription</h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-ink/70">
            Review your plan details below. Once you proceed, Razorpay's secure checkout will handle your payment.
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
                <div className="mt-2 text-sm font-semibold text-ink">
                  {loading ? "Preparing order…" : error ? "Needs attention" : "Ready to pay"}
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-ink/40">Order ID</div>
                <div className="mt-2 break-all text-sm font-semibold text-ink">{checkoutData?.order_id || "-"}</div>
              </div>
            </div>
          </div>

          {(error || payError) && (
            <div className="mt-6 rounded-[24px] border border-red-200 bg-red-50 p-5 text-sm font-medium text-red-700">
              {error || payError}
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              className="shadow-lg shadow-coral/20 gap-2"
              disabled={loading || Boolean(error) || paying}
              onClick={handlePay}
            >
              {paying ? (
                <>
                  <Spinner className="h-4 w-4" /> Processing…
                </>
              ) : (
                <>
                  <LockIcon /> Pay {displayPrice}
                </>
              )}
            </Button>
            <Link to="/plans">
              <Button variant="ghost">Back to plans</Button>
            </Link>
          </div>

          {/* Trust signals */}
          <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-ink/10 pt-6 text-xs text-ink/50">
            <span className="flex items-center gap-1.5">
              <ShieldIcon /> 256-bit SSL Encryption
            </span>
            <span className="flex items-center gap-1.5">
              <LockIcon /> Secure Razorpay Gateway
            </span>
            <span>PCI DSS Compliant</span>
          </div>
        </section>

        <aside className="glass-panel p-8 h-fit lg:sticky lg:top-24">
          <div className="text-xs font-semibold uppercase tracking-[0.28em] text-teal">Payment summary</div>
          <div className="mt-6 space-y-5">
            <div className="flex items-center justify-between gap-4 text-sm text-ink/65">
              <span>Plan</span>
              <span className="font-semibold text-ink">{selectedPlan?.name || checkoutData?.plan?.name || "-"}</span>
            </div>
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
              <span>Order ID</span>
              <span className="max-w-[180px] truncate font-semibold text-ink">{checkoutData?.order_id || "-"}</span>
            </div>
            <div className="border-t border-ink/10 pt-5 flex items-center justify-between gap-4 text-sm">
              <span className="font-bold text-ink">Total</span>
              <span className="font-display text-2xl text-ink">{displayPrice}</span>
            </div>
          </div>

          <div className="mt-8 rounded-xl bg-teal/5 border border-teal/15 p-4">
            <p className="text-xs text-teal font-semibold mb-1">🔒 Safe & Secure</p>
            <p className="text-xs text-ink/60 leading-relaxed">
              Your payment is processed securely by Razorpay. We never store your card details. Cancel your subscription anytime from your dashboard.
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}
