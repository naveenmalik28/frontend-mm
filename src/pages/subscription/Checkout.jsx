import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { createCheckout, verifyPayment } from "../../api/subscriptions.api.js"
import Button from "../../components/ui/Button.jsx"

export default function Checkout() {
  const { planId } = useParams()
  const navigate = useNavigate()
  const [checkoutData, setCheckoutData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    createCheckout(planId)
      .then(setCheckoutData)
      .finally(() => setLoading(false))
  }, [planId])

  const handlePay = async () => {
    if (!checkoutData) return
    await verifyPayment({
      subscription_id: checkoutData.subscription_id,
      razorpay_order_id: checkoutData.order_id,
      razorpay_payment_id: `demo_payment_${Date.now()}`,
      razorpay_signature: "demo",
    }).catch(() => null)
    navigate("/subscription/success")
  }

  return (
    <div className="mx-auto max-w-2xl glass-panel p-8">
      <span className="eyebrow">Checkout</span>
      <h1 className="mt-4 font-display text-4xl">Finish your subscription</h1>
      <p className="mt-4 text-sm text-ink/70">This starter creates the backend order flow and leaves the final gateway wiring ready for your Razorpay keys.</p>
      <div className="mt-8 rounded-3xl bg-white/70 p-6">
        <p className="text-sm text-ink/60">Plan ID</p>
        <p className="mt-2 font-display text-3xl">{planId}</p>
        <p className="mt-4 text-sm text-ink/60">Status: {loading ? "Preparing order..." : "Order created"}</p>
      </div>
      <Button className="mt-8" disabled={loading} onClick={handlePay}>Simulate payment success</Button>
    </div>
  )
}

