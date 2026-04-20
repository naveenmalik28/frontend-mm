import React from "react"
import { Link } from "react-router-dom"
import SeoHead from "../../components/seo/SeoHead.jsx"

const ShieldIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
)

export default function PrivacyPolicy() {
  return (
    <div className="space-y-12 pb-16">
      <SeoHead
        title="Privacy Policy"
        description="Read Magnivel International Media's Privacy Policy. Learn how we collect, use, and protect your personal information when you use our platform."
        path="/privacy"
      />
      {/* Hero */}
      <section className="relative overflow-hidden rounded-[32px] border border-white/40 bg-gradient-to-br from-slate-50 via-white to-slate-50/50 p-8 sm:p-16 shadow-lg shadow-ink/5 text-center">
        <div className="absolute top-0 right-1/4 h-64 w-64 rounded-full bg-teal/10 blur-3xl"></div>
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/60 px-4 py-2 border border-slate-200 shadow-sm mb-6">
            <ShieldIcon className="h-4 w-4 text-ink" />
            <span className="text-sm font-semibold text-ink uppercase tracking-wider">Legal Documentation</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-ink mb-4">
            Privacy Policy
          </h1>
          <p className="text-ink/60 font-medium">Last updated: April 2026</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-12 md:p-16 shadow-xl shadow-ink/5 border border-white">
          <div className="prose prose-slate prose-lg max-w-none text-ink/80 prose-headings:font-display prose-headings:text-ink prose-a:text-coral hover:prose-a:text-coral/80 prose-li:marker:text-coral">
            <p className="lead text-xl text-ink/90 font-medium mb-8">
              At <strong>Magnivel International Media</strong>, we are committed to protecting your privacy and ensuring you have a positive experience on our website. This Privacy Policy outlines how we handle your personal data when you visit our platform, read articles, or publish content.
            </p>

            <h2 className="text-2xl mt-10 mb-4 border-b border-slate-200 pb-2">1. Information We Collect</h2>
            <p>We collect information to provide better services to all our users. The types of personal information we may collect include:</p>
            <ul className="space-y-2">
              <li><strong>Account Information:</strong> Name, email address, password, and profile details when you register as a reader or writer.</li>
              <li><strong>Content and Usage Data:</strong> Articles you publish, comments, claps, reading history, and preferences.</li>
              <li><strong>Technical Data:</strong> IP address, browser type, device information, and cookies to ensure the website functions correctly and securely.</li>
            </ul>

            <h2 className="text-2xl mt-10 mb-4 border-b border-slate-200 pb-2">2. How We Use Your Information</h2>
            <p>We use the information we collect for the following purposes:</p>
            <ul className="space-y-2">
              <li>To provide, maintain, and improve our services.</li>
              <li>To personalize your experience, recommending articles tailored to your interests.</li>
              <li>To process transactions if you are subscribed to a premium writer plan.</li>
              <li>To communicate with you regarding updates, security alerts, and support messages.</li>
            </ul>

            <h2 className="text-2xl mt-10 mb-4 border-b border-slate-200 pb-2">3. Information Sharing and Disclosure</h2>
            <p>We do not sell your personal information to third parties. We may share your data only in the following circumstances:</p>
            <ul className="space-y-2">
              <li><strong>With Service Providers:</strong> Trusted third-party vendors who assist us in operating our platform (e.g., payment processors, hosting services).</li>
              <li><strong>For Legal Reasons:</strong> If required by law, regulation, or legal process to protect the rights, property, or safety of Magnivel International Media or others.</li>
            </ul>

            <h2 className="text-2xl mt-10 mb-4 border-b border-slate-200 pb-2">4. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, no internet transmission is completely secure, and we cannot guarantee absolute security.
            </p>

            <h2 className="text-2xl mt-10 mb-4 border-b border-slate-200 pb-2">5. Your Rights and Choices</h2>
            <p>
              Depending on your location, you may have rights regarding your personal information, including the right to access, correct, delete, or restrict the use of your data. You can manage your profile settings directly through the Dashboard or contact our support team to exercise these rights.
            </p>

            <h2 className="text-2xl mt-10 mb-4 border-b border-slate-200 pb-2">6. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices or for legal reasons. We will notify you of any significant changes by posting the new policy on this page with an updated date.
            </p>

            <div className="mt-12 bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <h2 className="text-xl m-0 mb-2 font-display text-ink">7. Contact Us</h2>
              <p className="m-0">
                If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at <a href="mailto:privacy@magnivel.com" className="font-bold">privacy@magnivel.com</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
