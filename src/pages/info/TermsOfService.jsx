import React from "react"
import { Link } from "react-router-dom"

export default function TermsOfService() {
  return (
    <div className="mx-auto max-w-3xl py-16">
      <div className="mb-12">
        <Link to="/" className="inline-flex items-center text-sm font-semibold text-coral hover:underline mb-8">
          <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
        <span className="eyebrow block mb-3">Legal Documentation</span>
        <h1 className="font-display text-4xl font-bold tracking-tight text-ink md:text-5xl mb-4">
          Terms of Service
        </h1>
        <p className="text-ink/60">Effective Date: April 2026</p>
      </div>

      <div className="prose prose-slate prose-lg max-w-none text-ink/80 prose-headings:font-display prose-headings:text-ink prose-a:text-coral hover:prose-a:text-coral/80">
        <p>
          Welcome to <strong>Magnivel International Media</strong>. By accessing or using our website, services, or platform, you agree to comply with and be bound by these Terms of Service. Please read them carefully.
        </p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By creating an account, publishing content, or simply browsing Magnivel International Media, you enter into a legally binding agreement to abide by these terms. If you do not agree with any part of these terms, you must not use our platform.
        </p>

        <h2>2. User Accounts</h2>
        <ul>
          <li>You must be at least 13 years old to use our services.</li>
          <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
          <li>You agree to provide accurate, current, and complete information during registration.</li>
          <li>Magnivel International Media reserves the right to suspend or terminate accounts that violate these terms.</li>
        </ul>

        <h2>3. Content Ownership and Responsibility</h2>
        <p>
          We believe in empowering authors. You retain all ownership rights to the content you publish on Magnivel International Media. However, by publishing on our platform, you grant us a worldwide, non-exclusive, royalty-free license to distribute, display, and promote your content across our network.
        </p>
        <p>
          You are solely responsible for the content you post. You must not publish content that:
        </p>
        <ul>
          <li>Infringes on the intellectual property rights of others (plagiarism).</li>
          <li>Is defamatory, obscene, abusive, or promotes hate speech.</li>
          <li>Violates the privacy rights of third parties.</li>
        </ul>

        <h2>4. Platform Conduct</h2>
        <p>
          Users are expected to engage respectfully. Any form of harassment, spamming, or attempting to compromise the security of the platform or other user accounts is strictly prohibited and will result in immediate termination.
        </p>

        <h2>5. Writer Subscriptions and Payments</h2>
        <p>
          If you opt for a premium writer plan, you agree to the pricing and billing policies presented at the time of purchase. Subscriptions auto-renew unless canceled prior to the billing cycle. Payments are processed securely via our third-party payment gateways.
        </p>

        <h2>6. Disclaimer of Warranties</h2>
        <p>
          Magnivel International Media is provided on an "as is" and "as available" basis. We do not warrant that the platform will be uninterrupted, totally secure, or error-free. The views expressed in articles are those of the authors and do not necessarily reflect the official policy or position of Magnivel International Media.
        </p>

        <h2>7. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, Magnivel International Media shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of the platform.
        </p>

        <h2>8. Contact Information</h2>
        <p>
          If you have any questions about these Terms of Service, please contact our legal team at <a href="mailto:legal@magnivel.com">legal@magnivel.com</a>.
        </p>
      </div>
    </div>
  )
}
