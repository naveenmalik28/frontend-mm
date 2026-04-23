import React from "react"
import { Link } from "react-router-dom"
import SeoHead from "../../components/seo/SeoHead.jsx"

const RefreshIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10"></polyline>
    <polyline points="1 20 1 14 7 14"></polyline>
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
  </svg>
)

export default function CancellationRefundPolicy() {
  return (
    <div className="space-y-12 pb-16">
      <SeoHead
        title="Cancellation & Refund Policy"
        description="Understand Magnivel International Media's cancellation and refund policy. Learn about subscription cancellation, refund eligibility, and the refund request process."
        path="/cancellation-refund-policy"
      />
      {/* Hero */}
      <section className="relative overflow-hidden rounded-[32px] border border-white/40 bg-gradient-to-br from-slate-50 via-white to-slate-50/50 p-8 sm:p-16 shadow-lg shadow-ink/5 text-center">
        <div className="absolute top-0 right-1/3 h-64 w-64 rounded-full bg-coral/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 h-48 w-48 rounded-full bg-orange-100 blur-3xl"></div>
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/60 px-4 py-2 border border-slate-200 shadow-sm mb-6">
            <RefreshIcon className="h-4 w-4 text-ink" />
            <span className="text-sm font-semibold text-ink uppercase tracking-wider">Policy Information</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-ink mb-4">
            Cancellation & Refund Policy
          </h1>
          <p className="text-ink/60 font-medium">Effective Date: April 2026</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-12 md:p-16 shadow-xl shadow-ink/5 border border-white">
          <div className="prose prose-slate prose-lg max-w-none text-ink/80 prose-headings:font-display prose-headings:text-ink prose-a:text-coral hover:prose-a:text-coral/80 prose-li:marker:text-coral">
            <p className="lead text-xl text-ink/90 font-medium mb-8">
              At <strong>Magnivel International Media</strong>, we strive to ensure that every user has a transparent and fair experience. The website <strong>magnivel.com</strong> is owned and operated by <strong>Magnivel International</strong> (<a href="https://magnivelinternational.com" target="_blank" rel="noopener noreferrer">magnivelinternational.com</a>). This Cancellation & Refund Policy outlines your rights and the procedures for cancelling subscriptions and requesting refunds.
            </p>

            <h2 className="text-2xl mt-10 mb-4 border-b border-slate-200 pb-2">1. Subscription Cancellation</h2>
            <p>
              You may cancel your writer subscription plan at any time through your account dashboard. Here's how the cancellation process works:
            </p>
            <ul className="space-y-2">
              <li><strong>Self-Service Cancellation:</strong> Navigate to your <strong>Dashboard → Settings → Subscription</strong> section and click "Cancel Subscription." Your access to premium writer features will remain active until the end of the current billing cycle.</li>
              <li><strong>No Future Charges:</strong> Once cancelled, your subscription will not auto-renew, and no further charges will be applied to your payment method.</li>
              <li><strong>Content Retention:</strong> All articles and content you have published will remain live on the platform even after cancellation. Your author profile and published work are preserved.</li>
            </ul>

            <h2 className="text-2xl mt-10 mb-4 border-b border-slate-200 pb-2">2. Refund Policy</h2>
            <p>
              We offer refunds under the following conditions:
            </p>
            <ul className="space-y-2">
              <li><strong>Within 7 Days of Purchase:</strong> If you request a refund within 7 days of your initial subscription purchase and have not extensively used the premium features, a full refund will be issued.</li>
              <li><strong>Billing Errors:</strong> If you were charged incorrectly due to a technical error, duplicate payment, or unauthorized transaction, we will issue a full refund upon verification.</li>
              <li><strong>Service Unavailability:</strong> If our platform experiences prolonged downtime (exceeding 72 consecutive hours) that prevents you from accessing paid features during your billing cycle, you are eligible for a prorated refund or an extension of your subscription period.</li>
            </ul>

            <h2 className="text-2xl mt-10 mb-4 border-b border-slate-200 pb-2">3. Non-Refundable Circumstances</h2>
            <p>
              Refunds will <strong>not</strong> be issued in the following cases:
            </p>
            <ul className="space-y-2">
              <li>After 7 days from the date of purchase, unless covered by the exceptions above.</li>
              <li>If your account is terminated due to a violation of our <Link to="/terms">Terms of Service</Link> (e.g., plagiarism, spam, abuse, or publishing prohibited content).</li>
              <li>For partial billing periods after voluntary cancellation mid-cycle — your access remains active through the end of your paid period.</li>
              <li>If premium features have been substantially used (e.g., articles published, analytics accessed, etc.).</li>
            </ul>

            <h2 className="text-2xl mt-10 mb-4 border-b border-slate-200 pb-2">4. How to Request a Refund</h2>
            <p>
              To initiate a refund request, please follow these steps:
            </p>
            <ol className="space-y-2">
              <li>Send an email to <a href="mailto:contact@magnivel.com" className="font-bold">contact@magnivel.com</a> with the subject line: <strong>"Refund Request – [Your Account Email]"</strong></li>
              <li>Include your full name, registered email address, subscription plan details, and the reason for your refund request.</li>
              <li>Our billing support team will review your request and respond within <strong>3–5 business days</strong>.</li>
              <li>If approved, the refund will be processed to your original payment method within <strong>7–10 business days</strong>, depending on your bank or payment provider.</li>
            </ol>

            <h2 className="text-2xl mt-10 mb-4 border-b border-slate-200 pb-2">5. Plan Downgrades</h2>
            <p>
              If you wish to switch from a higher-tier plan to a lower-tier plan, the change will take effect at the beginning of your next billing cycle. No partial refunds are issued for downgrades during an active billing period. You will continue to enjoy the higher-tier benefits until the cycle ends.
            </p>

            <h2 className="text-2xl mt-10 mb-4 border-b border-slate-200 pb-2">6. Free Accounts</h2>
            <p>
              Reading and browsing content on Magnivel International Media is free and does not require a subscription. Free accounts are not subject to any cancellation or refund terms as no payment is involved.
            </p>

            <h2 className="text-2xl mt-10 mb-4 border-b border-slate-200 pb-2">7. Changes to This Policy</h2>
            <p>
              Magnivel International Media reserves the right to update or modify this Cancellation & Refund Policy at any time. Any material changes will be communicated to active subscribers via email and posted on this page with an updated effective date.
            </p>

            <div className="mt-12 bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <h2 className="text-xl m-0 mb-2 font-display text-ink">8. Need Help?</h2>
              <p className="m-0">
                For any questions regarding cancellations, refunds, or billing, please reach out to our support team at <a href="mailto:contact@magnivel.com" className="font-bold">contact@magnivel.com</a> or visit our <Link to="/contact" className="font-bold">Contact Us</Link> page. We're here to help.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
