/**
 * Razorpay SDK loader and checkout utility.
 *
 * Loads the Razorpay checkout.js script on demand (once),
 * and provides a promise-based wrapper around the Razorpay modal.
 */

const RAZORPAY_SCRIPT_URL = "https://checkout.razorpay.com/v1/checkout.js"

let scriptPromise = null

/**
 * Dynamically loads the Razorpay checkout.js SDK.
 * Returns a promise that resolves to `true` when the script is ready,
 * or `false` if loading fails. The script is only loaded once.
 */
export function loadRazorpayScript() {
  if (scriptPromise) return scriptPromise

  scriptPromise = new Promise((resolve) => {
    // Already loaded (e.g. via <script> tag)
    if (typeof window.Razorpay === "function") {
      resolve(true)
      return
    }

    const script = document.createElement("script")
    script.src = RAZORPAY_SCRIPT_URL
    script.async = true
    script.onload = () => resolve(true)
    script.onerror = () => {
      scriptPromise = null // allow retry
      resolve(false)
    }
    document.body.appendChild(script)
  })

  return scriptPromise
}

/**
 * Opens the Razorpay checkout modal.
 *
 * @param {Object} options
 * @param {string} options.keyId           - Razorpay Key ID (public key)
 * @param {string} options.orderId         - Razorpay Order ID from backend
 * @param {number} options.amount          - Amount in paisa/cents
 * @param {string} options.currency        - "INR" or "USD"
 * @param {string} options.planName        - Display name for the plan
 * @param {string} [options.description]   - Payment description
 * @param {Object} [options.prefill]       - { name, email, contact }
 * @param {string} [options.image]         - Logo URL
 * @param {string} [options.theme]         - Theme color hex string
 *
 * @returns {Promise<{ razorpay_payment_id: string, razorpay_order_id: string, razorpay_signature: string }>}
 *          Resolves with payment credentials on success.
 *          Rejects with an error object on failure or modal close.
 */
export function openRazorpayCheckout({
  keyId,
  orderId,
  amount,
  currency,
  planName,
  description = "Magnivel Media Subscription",
  prefill = {},
  image = "/favicon-32x32.png",
  theme = "#132238",
}) {
  return new Promise((resolve, reject) => {
    if (typeof window.Razorpay !== "function") {
      reject(new Error("Razorpay SDK not loaded. Please refresh and try again."))
      return
    }

    const options = {
      key: keyId,
      amount,
      currency,
      name: "Magnivel Media",
      description,
      order_id: orderId,
      image,
      prefill: {
        name: prefill.name || "",
        email: prefill.email || "",
        contact: prefill.contact || "",
      },
      notes: {
        plan_name: planName,
      },
      theme: {
        color: theme,
      },
      handler(response) {
        // Called on successful payment
        resolve({
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
        })
      },
      modal: {
        ondismiss() {
          reject(new Error("Payment cancelled by user."))
        },
        escape: true,
        confirm_close: true,
      },
    }

    const razorpay = new window.Razorpay(options)

    razorpay.on("payment.failed", (response) => {
      reject(new Error(response.error?.description || "Payment failed. Please try again."))
    })

    razorpay.open()
  })
}
