import React from "react"
import { Link } from "react-router-dom"
import SeoHead from "../../components/seo/SeoHead.jsx"

const TruckIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13"></rect>
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
    <circle cx="5.5" cy="18.5" r="2.5"></circle>
    <circle cx="18.5" cy="18.5" r="2.5"></circle>
  </svg>
)

export default function ShippingPolicy() {
  return (
    <div className="space-y-12 pb-16">
      <SeoHead
        title="Shipping Policy"
        description="Magnivel International Media is a digital-only platform. All products, services, and content are delivered electronically. Learn about our digital delivery policy."
        path="/shipping-policy"
      />
      {/* Hero */}
      <section className="relative overflow-hidden rounded-[32px] border border-white/40 bg-gradient-to-br from-slate-50 via-white to-slate-50/50 p-8 sm:p-16 shadow-lg shadow-ink/5 text-center">
        <div className="absolute top-0 left-1/3 h-64 w-64 rounded-full bg-blue-100 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 h-48 w-48 rounded-full bg-teal/10 blur-3xl"></div>
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/60 px-4 py-2 border border-slate-200 shadow-sm mb-6">
            <TruckIcon className="h-4 w-4 text-ink" />
            <span className="text-sm font-semibold text-ink uppercase tracking-wider">Policy Information</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-ink mb-4">
            Shipping Policy
          </h1>
          <p className="text-ink/60 font-medium">Effective Date: April 2026</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-12 md:p-16 shadow-xl shadow-ink/5 border border-white">
          <div className="prose prose-slate prose-lg max-w-none text-ink/80 prose-headings:font-display prose-headings:text-ink prose-a:text-coral hover:prose-a:text-coral/80 prose-li:marker:text-coral">
            <p className="lead text-xl text-ink/90 font-medium mb-8">
              <strong>Magnivel International Media</strong> is a digital-only platform. All products, services, and content offered through our website are delivered electronically. There are no physical goods shipped as part of our standard offerings.
            </p>

            <h2 className="text-2xl mt-10 mb-4 border-b border-slate-200 pb-2">1. Digital Delivery</h2>
            <p>
              Since Magnivel International Media operates as a fully digital media and publishing platform, all our services — including article access, writer subscriptions, and premium content — are delivered instantly online. There is no physical shipping involved.
            </p>
            <p className="font-semibold text-ink my-4">
              Access to premium content is granted immediately upon successful payment confirmation.
            </p>
            <ul className="space-y-2">
              <li><strong>Content Access:</strong> Articles, stories, and editorial content are accessible immediately upon publication or purchase tracking.</li>
              <li><strong>Subscription Activation:</strong> Once your writer or reader subscription plan is confirmed and payment is processed, the premium features are activated within your account instantly — no waiting period.</li>
              <li><strong>Digital Resources:</strong> Any additional resources, templates, or premium downloads associated with your subscription are available for immediate download from your Dashboard.</li>
            </ul>

            <h2 className="text-2xl mt-10 mb-4 border-b border-slate-200 pb-2">2. Service Availability</h2>
            <p>
              Our platform is available 24/7 across all regions globally. You can access your subscription and published content from any internet-enabled device at any time. We strive for 99.9% uptime, though occasional maintenance windows may occur with advance notice to users.
            </p>

            <h2 className="text-2xl mt-10 mb-4 border-b border-slate-200 pb-2">3. Email Communications</h2>
            <p>
              Upon completing a subscription or registration on Magnivel International Media, you will receive the following communications via email:
            </p>
            <ul className="space-y-2">
              <li>Confirmation of account registration and subscription activation.</li>
              <li>Receipts and invoices for payment transactions.</li>
              <li>Periodic updates regarding new features, content recommendations, and platform changes.</li>
              <li>Important account-related notifications, including password resets and security alerts.</li>
            </ul>

            <h2 className="text-2xl mt-10 mb-4 border-b border-slate-200 pb-2">4. No Physical Shipments</h2>
            <p>
              As a digital-first platform, Magnivel International Media does not sell, ship, or deliver physical goods of any kind. All transactions on our platform pertain exclusively to digital services, subscriptions, and content access. No courier, postal, or logistics services are engaged as part of our business operations.
            </p>

            <h2 className="text-2xl mt-10 mb-4 border-b border-slate-200 pb-2">5. Third-Party Partnerships</h2>
            <p>
              If Magnivel International Media introduces any future collaborations or partnerships that may involve physical merchandise or printed publications, a separate and updated shipping policy will be shared at that time. This current policy applies solely to our existing digital offerings.
            </p>

            <div className="mt-12 bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <h2 className="text-xl m-0 mb-2 font-display text-ink">6. Questions?</h2>
              <p className="m-0">
                If you have any questions about our shipping (digital delivery) policy, feel free to reach out to us at <a href="mailto:support@magnivel.com" className="font-bold">support@magnivel.com</a> or visit our <Link to="/contact" className="font-bold">Contact Us</Link> page.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
