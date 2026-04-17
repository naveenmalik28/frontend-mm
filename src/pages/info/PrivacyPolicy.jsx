import React from "react"
import { Link } from "react-router-dom"

export default function PrivacyPolicy() {
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
          Privacy Policy
        </h1>
        <p className="text-ink/60">Last updated: April 2026</p>
      </div>

      <div className="prose prose-slate prose-lg max-w-none text-ink/80 prose-headings:font-display prose-headings:text-ink prose-a:text-coral hover:prose-a:text-coral/80">
        <p>
          At <strong>Magnivel International Media</strong>, we are committed to protecting your privacy and ensuring you have a positive experience on our website. This Privacy Policy outlines how we handle your personal data when you visit our platform, read articles, or publish content.
        </p>

        <h2>1. Information We Collect</h2>
        <p>We collect information to provide better services to all our users. The types of personal information we may collect include:</p>
        <ul>
          <li><strong>Account Information:</strong> Name, email address, password, and profile details when you register as a reader or writer.</li>
          <li><strong>Content and Usage Data:</strong> Articles you publish, comments, claps, reading history, and preferences.</li>
          <li><strong>Technical Data:</strong> IP address, browser type, device information, and cookies to ensure the website functions correctly and securely.</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>We use the information we collect for the following purposes:</p>
        <ul>
          <li>To provide, maintain, and improve our services.</li>
          <li>To personalize your experience, recommending articles tailored to your interests.</li>
          <li>To process transactions if you are subscribed to a premium writer plan.</li>
          <li>To communicate with you regarding updates, security alerts, and support messages.</li>
        </ul>

        <h2>3. Information Sharing and Disclosure</h2>
        <p>We do not sell your personal information to third parties. We may share your data only in the following circumstances:</p>
        <ul>
          <li><strong>With Service Providers:</strong> Trusted third-party vendors who assist us in operating our platform (e.g., payment processors, hosting services).</li>
          <li><strong>For Legal Reasons:</strong> If required by law, regulation, or legal process to protect the rights, property, or safety of Magnivel International Media or others.</li>
        </ul>

        <h2>4. Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, no internet transmission is completely secure, and we cannot guarantee absolute security.
        </p>

        <h2>5. Your Rights and Choices</h2>
        <p>
          Depending on your location, you may have rights regarding your personal information, including the right to access, correct, delete, or restrict the use of your data. You can manage your profile settings directly through the Dashboard or contact our support team to exercise these rights.
        </p>

        <h2>6. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time to reflect changes in our practices or for legal reasons. We will notify you of any significant changes by posting the new policy on this page with an updated date.
        </p>

        <h2>7. Contact Us</h2>
        <p>
          If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at <a href="mailto:privacy@magnivel.com">privacy@magnivel.com</a>.
        </p>
      </div>
    </div>
  )
}
