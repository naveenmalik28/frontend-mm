import React from "react"
import { Link } from "react-router-dom"
import SeoHead from "../../components/seo/SeoHead.jsx"

const DocumentIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
)

export default function TermsOfService() {
  return (
    <div className="space-y-12 pb-16">
      <SeoHead
        title="Terms of Service"
        description="Review Magnivel International Media's Terms of Service. Understand your rights, responsibilities, and the rules governing use of our publishing platform."
        path="/terms"
      />
      {/* Hero */}
      <section className="relative overflow-hidden rounded-[32px] border border-white/40 bg-gradient-to-br from-slate-50 via-white to-slate-50/50 p-8 sm:p-16 shadow-lg shadow-ink/5 text-center">
        <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-coral/10 blur-3xl"></div>
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/60 px-4 py-2 border border-slate-200 shadow-sm mb-6">
            <DocumentIcon className="h-4 w-4 text-ink" />
            <span className="text-sm font-semibold text-ink uppercase tracking-wider">Legal Documentation</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-ink mb-4">
            Terms of Service
          </h1>
          <p className="text-ink/60 font-medium">Effective Date: April 2026</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-12 md:p-16 shadow-xl shadow-ink/5 border border-white">
          <div className="prose prose-slate prose-lg max-w-none text-ink/80 prose-headings:font-display prose-headings:text-ink prose-a:text-coral hover:prose-a:text-coral/80 prose-li:marker:text-coral">
            <p className="lead text-xl text-ink/90 font-medium mb-8">
              Welcome to <strong>Magnivel International Media</strong>. By accessing or using our website, services, or platform, you agree to comply with and be bound by these Terms of Service. Please read them carefully.
            </p>

            <h2 className="text-2xl mt-10 mb-4 border-b border-slate-200 pb-2">1. Acceptance of Terms</h2>
            <p>
              By creating an account, publishing content, or simply browsing Magnivel International Media, you enter into a legally binding agreement to abide by these terms. If you do not agree with any part of these terms, you must not use our platform.
            </p>

            <h2 className="text-2xl mt-10 mb-4 border-b border-slate-200 pb-2">2. User Accounts</h2>
            <ul className="space-y-2">
              <li>You must be at least 13 years old to use our services.</li>
              <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
              <li>You agree to provide accurate, current, and complete information during registration.</li>
              <li>Magnivel International Media reserves the right to suspend or terminate accounts that violate these terms.</li>
            </ul>

            <h2 className="text-2xl mt-10 mb-4 border-b border-slate-200 pb-2">3. Content Ownership and Responsibility</h2>
            <p>
              We believe in empowering authors. You retain all ownership rights to the content you publish on Magnivel International Media. However, by publishing on our platform, you grant us a worldwide, non-exclusive, royalty-free license to distribute, display, and promote your content across our network.
            </p>
            <p>
              You are solely responsible for the content you post. You must not publish content that:
            </p>
            <ul className="space-y-2">
              <li>Infringes on the intellectual property rights of others (plagiarism).</li>
              <li>Is defamatory, obscene, abusive, or promotes hate speech.</li>
              <li>Violates the privacy rights of third parties.</li>
            </ul>

            <h2 className="text-2xl mt-10 mb-4 border-b border-slate-200 pb-2">4. Platform Conduct</h2>
            <p>
              Users are expected to engage respectfully. Any form of harassment, spamming, or attempting to compromise the security of the platform or other user accounts is strictly prohibited and will result in immediate termination.
            </p>

            <h2 className="text-2xl mt-10 mb-4 border-b border-slate-200 pb-2">5. Writer Subscriptions and Payments</h2>
            <p>
              If you opt for a premium writer plan, you agree to the pricing and billing policies presented at the time of purchase. Subscriptions auto-renew unless canceled prior to the billing cycle. Payments are processed securely via our third-party payment gateways.
            </p>

            <h2 className="text-2xl mt-10 mb-4 border-b border-slate-200 pb-2">6. Disclaimer of Warranties</h2>
            <p>
              Magnivel International Media is provided on an "as is" and "as available" basis. We do not warrant that the platform will be uninterrupted, totally secure, or error-free. The views expressed in articles are those of the authors and do not necessarily reflect the official policy or position of Magnivel International Media.
            </p>

            <h2 className="text-2xl mt-10 mb-4 border-b border-slate-200 pb-2">7. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Magnivel International Media shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of the platform.
            </p>

            <div className="mt-12 bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <h2 className="text-xl m-0 mb-2 font-display text-ink">8. Contact Information</h2>
              <p className="m-0">
                If you have any questions about these Terms of Service, please contact our legal team at <a href="mailto:legal@magnivel.com" className="font-bold">legal@magnivel.com</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
