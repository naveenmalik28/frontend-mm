import { useMemo } from "react"
import { Link } from "react-router-dom"

import PlanCard from "../../components/subscription/PlanCard.jsx"
import Spinner from "../../components/ui/Spinner.jsx"
import { useSubscriptionData } from "../../hooks/useSubscription.js"

const CheckIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
)

const PencilIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 20h9"></path>
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
  </svg>
)

const GlobeIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
)

const SparkIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
)

export default function Plans() {
  const { plans, loading } = useSubscriptionData()

  const sortedPlans = useMemo(
    () =>
      [...plans].sort((left, right) => {
        const leftSort = Number(left.sort_order ?? 0)
        const rightSort = Number(right.sort_order ?? 0)
        if (leftSort !== rightSort) return leftSort - rightSort
        return Number(left.price ?? 0) - Number(right.price ?? 0)
      }),
    [plans],
  )

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[36px] border border-white/60 bg-[radial-gradient(circle_at_top_left,_rgba(242,117,84,0.18),_transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.96),rgba(255,244,236,0.94))] p-8 shadow-xl shadow-ink/5 sm:p-10">
        <div className="absolute -right-16 top-0 h-44 w-44 rounded-full bg-coral/10 blur-3xl" />
        <div className="absolute bottom-0 left-12 h-28 w-28 rounded-full bg-teal/10 blur-2xl" />
        <div className="relative max-w-3xl">
          <span className="eyebrow">Subscription plans</span>
          <h1 className="mt-4 font-display text-5xl leading-tight text-ink sm:text-6xl">
            Start Publishing Today
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-ink/70">
            Choose a plan that fits your publishing rhythm. All plans include full access to our premium publishing tools, analytics, and a global audience of readers.
          </p>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-4">Every Subscription Includes</h2>
          <p className="text-ink/70 text-lg">All plans unlock the same powerful publishing features. Choose based on your writing frequency.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div className="flex items-start gap-4 bg-white rounded-2xl p-6 border border-ink/5 shadow-sm">
              <div className="p-2 rounded-lg bg-coral/10 text-coral shrink-0 mt-1">
                <PencilIcon />
              </div>
              <div>
                <h3 className="font-bold text-ink text-lg">Unlimited Publishing</h3>
                <p className="text-sm text-ink/60 mt-1">Write and publish as many articles as you want without limits</p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-white rounded-2xl p-6 border border-ink/5 shadow-sm">
              <div className="p-2 rounded-lg bg-teal/10 text-teal shrink-0 mt-1">
                <GlobeIcon />
              </div>
              <div>
                <h3 className="font-bold text-ink text-lg">Global Reach</h3>
                <p className="text-sm text-ink/60 mt-1">Share your insights with thousands of international readers</p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-white rounded-2xl p-6 border border-ink/5 shadow-sm">
              <div className="p-2 rounded-lg bg-blue-100 text-blue-600 shrink-0 mt-1">
                <SparkIcon />
              </div>
              <div>
                <h3 className="font-bold text-ink text-lg">Rich Editor</h3>
                <p className="text-sm text-ink/60 mt-1">Professional writing tools with formatting, images, and embeds</p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div className="flex items-start gap-3 text-ink">
              <CheckIcon className="w-5 h-5 text-coral shrink-0 mt-1" />
              <span className="font-medium">Performance Analytics - track views, engagement, and reader demographics</span>
            </div>
            <div className="flex items-start gap-3 text-ink">
              <CheckIcon className="w-5 h-5 text-coral shrink-0 mt-1" />
              <span className="font-medium">SEO Optimization - auto-generated meta tags and social sharing</span>
            </div>
            <div className="flex items-start gap-3 text-ink">
              <CheckIcon className="w-5 h-5 text-coral shrink-0 mt-1" />
              <span className="font-medium">Reader Engagement - comments, highlights, and direct messaging</span>
            </div>
            <div className="flex items-start gap-3 text-ink">
              <CheckIcon className="w-5 h-5 text-coral shrink-0 mt-1" />
              <span className="font-medium">Author Profile - showcase your work and build your personal brand</span>
            </div>
            <div className="flex items-start gap-3 text-ink">
              <CheckIcon className="w-5 h-5 text-coral shrink-0 mt-1" />
              <span className="font-medium">Content Management - organize and schedule articles in advance</span>
            </div>
            <div className="flex items-start gap-3 text-ink">
              <CheckIcon className="w-5 h-5 text-coral shrink-0 mt-1" />
              <span className="font-medium">Premium Support - dedicated help from our publishing team</span>
            </div>
          </div>
        </div>
      </section>

      {/* Plans Grid */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-2">Choose Your Plan</h2>
          <p className="text-ink/70">All plans renew monthly. Cancel anytime with no penalties.</p>
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            {sortedPlans.map((plan) => (
              <div key={plan.id} className="animate-fade-in-up">
                <PlanCard plan={plan} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* FAQ Section */}
      <section className="bg-slate-50 rounded-3xl p-10 md:p-16 border border-slate-200/60 space-y-6">
        <h2 className="font-display text-3xl font-bold text-ink mb-8">Frequently Asked Questions</h2>
        
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6">
            <h3 className="font-bold text-lg text-ink mb-2">Can I upgrade or downgrade anytime?</h3>
            <p className="text-ink/70">Yes! You can change your plan at any time. Changes take effect on your next billing cycle.</p>
          </div>

          <div className="bg-white rounded-2xl p-6">
            <h3 className="font-bold text-lg text-ink mb-2">What payment methods do you accept?</h3>
            <p className="text-ink/70">We accept all major credit cards and digital payment methods. Your payment is secure and processed through Razorpay.</p>
          </div>

          <div className="bg-white rounded-2xl p-6">
            <h3 className="font-bold text-lg text-ink mb-2">Do I own my articles?</h3>
            <p className="text-ink/70">Absolutely! You retain full ownership of all your content. You can edit, delete, or export your articles anytime.</p>
          </div>

          <div className="bg-white rounded-2xl p-6">
            <h3 className="font-bold text-lg text-ink mb-2">Can I contact support?</h3>
            <p className="text-ink/70">Of course! Our support team is available via email and chat. <Link to="/contact" className="font-medium text-coral hover:text-coral/80">Get in touch →</Link></p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden rounded-[28px] bg-ink p-10 text-center text-white shadow-card sm:p-16">
        <div className="absolute -left-10 -top-24 h-64 w-64 rounded-full bg-coral/30 blur-[100px]"></div>
        <div className="absolute -bottom-24 -right-10 h-64 w-64 rounded-full bg-teal/30 blur-[100px]"></div>

        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">Ready to start publishing?</h2>
          <p className="text-lg text-white/80 mb-8">Join thousands of contributors sharing their ideas with a global audience.</p>
        </div>
      </section>
    </div>
  )
}
