import React, { useState } from "react"
import Button from "../../components/ui/Button.jsx"

const MailIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
)

const SupportIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
)

const BusinessIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
  </svg>
)

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-[32px] border border-white/40 bg-gradient-to-br from-slate-50 via-white to-slate-50/50 p-8 sm:p-16 shadow-lg shadow-ink/5 text-center">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-100 blur-3xl"></div>
        <div className="absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-coral/10 blur-3xl"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/60 px-4 py-2 border border-slate-200 shadow-sm mb-6">
            <span className="text-sm font-semibold text-ink uppercase tracking-wider">Contact & Support</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-ink mb-6">
            Let's Start a <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral to-teal">Conversation</span>
          </h1>
          <p className="mx-auto text-lg text-ink/70 leading-relaxed max-w-2xl">
            Whether you're a reader with a question, a writer looking to get published, or a press inquiry, our team is ready to assist you.
          </p>
        </div>
      </section>

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 xl:gap-16 items-start pb-16">
        {/* Contact Information */}
        <div className="space-y-6">
          <div className="glass-panel p-8 transition-transform hover:-translate-y-1 hover:shadow-xl hover:shadow-coral/5 group">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-xl bg-coral/10 text-coral group-hover:bg-coral group-hover:text-white transition-colors">
                <MailIcon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-2xl font-bold text-ink">Editorial Inquiries</h3>
            </div>
            <p className="text-ink/70 mb-5 leading-relaxed">Are you a writer looking to pitch a story or join our platform? Reach out to our editorial board to begin your publishing journey.</p>
            <a href="mailto:editorial@magnivel.com" className="inline-flex items-center font-bold text-ink hover:text-coral transition-colors">
              editorial@magnivel.com
              <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
          </div>

          <div className="glass-panel p-8 transition-transform hover:-translate-y-1 hover:shadow-xl hover:shadow-teal/5 group">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-xl bg-teal/10 text-teal group-hover:bg-teal group-hover:text-white transition-colors">
                <SupportIcon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-2xl font-bold text-ink">Technical Support</h3>
            </div>
            <p className="text-ink/70 mb-5 leading-relaxed">Experiencing issues with your account, publishing tools, or a subscription? Our technical team is on standby to help resolve any issues.</p>
            <a href="mailto:support@magnivel.com" className="inline-flex items-center font-bold text-ink hover:text-teal transition-colors">
              support@magnivel.com
              <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
          </div>

          <div className="glass-panel p-8 transition-transform hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5 group">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-xl bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <BusinessIcon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-2xl font-bold text-ink">Press & Partnerships</h3>
            </div>
            <p className="text-ink/70 mb-5 leading-relaxed">Interested in media inquiries, brand partnerships, and advertising opportunities? Let's explore how we can collaborate.</p>
            <a href="mailto:press@magnivel.com" className="inline-flex items-center font-bold text-ink hover:text-blue-600 transition-colors">
              press@magnivel.com
              <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="glass-panel p-8 md:p-10 sticky top-24 shadow-xl shadow-ink/5 border border-white/50">
          <div className="mb-8">
            <h2 className="font-display text-3xl font-bold text-ink mb-2">Send us a message</h2>
            <p className="text-ink/60 text-sm">Fill out the form below and we'll get back to you securely.</p>
          </div>
          
          {submitted ? (
            <div className="rounded-2xl bg-teal/5 p-8 border border-teal/20 text-center animate-in fade-in zoom-in duration-300">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal/20 text-teal mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-ink mb-2">Message Received!</h3>
              <p className="text-ink/70 text-sm">Thank you for reaching out. A member of our team will review your inquiry and get back to you shortly.</p>
            </div>
          ) : (
             <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="first_name" className="mb-2 block text-sm font-semibold text-ink">First Name</label>
                  <input required id="first_name" type="text" className="input bg-white/50 focus:bg-white" placeholder="Jane" />
                </div>
                <div>
                  <label htmlFor="last_name" className="mb-2 block text-sm font-semibold text-ink">Last Name</label>
                  <input required id="last_name" type="text" className="input bg-white/50 focus:bg-white" placeholder="Doe" />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-ink">Email Address</label>
                <input required id="email" type="email" className="input bg-white/50 focus:bg-white" placeholder="jane@example.com" />
              </div>

              <div>
                <label htmlFor="department" className="mb-2 block text-sm font-semibold text-ink">Department</label>
                <select id="department" className="input text-sm bg-white/50 focus:bg-white appearance-none cursor-pointer">
                  <option>General Inquiry</option>
                  <option>Editorial & Submissions</option>
                  <option>Technical Support</option>
                  <option>Billing & Subscription</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-semibold text-ink">Message</label>
                <textarea required id="message" rows={4} className="textarea bg-white/50 focus:bg-white resize-none" placeholder="How can we help you today?"></textarea>
              </div>

              <Button type="submit" className="w-full justify-center bg-ink hover:bg-ink/90 text-white py-3 shadow-lg shadow-ink/20">
                Send Message
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
