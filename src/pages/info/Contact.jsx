import React, { useState } from "react"
import SeoHead from "../../components/seo/SeoHead.jsx"
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
      <SeoHead
        title="Contact Us"
        description="Get in touch with Magnivel International Media. Reach out for editorial inquiries, technical support, press and partnerships, or general questions."
        path="/contact"
      />
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
          <p className="mt-4 mx-auto text-sm text-ink/60 font-medium">
            Magnivel.com is a property of MAGNIVEL INTERNATIONAL.
          </p>
        </div>
      </section>

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 xl:gap-16 items-start pb-16">
        {/* Contact Information */}
        <div className="space-y-6">
          <div className="glass-panel p-8 sm:p-10 relative overflow-hidden group transition-all hover:shadow-xl hover:shadow-coral/5">
            <div className="absolute -top-10 -right-10 text-coral/5 group-hover:text-coral/10 transition-colors duration-500">
              <MailIcon className="w-64 h-64 rotate-12" />
            </div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-coral/10 px-3 py-1 mb-6">
                <span className="text-xs font-bold text-coral uppercase tracking-wider">Primary Contact</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-4">Email Us Directly</h2>
              <p className="text-ink/70 mb-8 leading-relaxed text-lg max-w-md">
                For all communications including <span className="font-semibold text-ink">Editorial Inquiries</span>, <span className="font-semibold text-ink">Technical Support</span>, and <span className="font-semibold text-ink">Press & Partnerships</span>. Our team will ensure your message reaches the right department.
              </p>
              
              <a href="mailto:contact@magnivel.com" className="inline-flex items-center gap-4 group/link">
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-ink text-white group-hover/link:bg-coral group-hover/link:-translate-y-1 group-hover/link:shadow-lg group-hover/link:shadow-coral/20 transition-all duration-300">
                  <MailIcon className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-ink/60 mb-0.5">Drop us a line at</div>
                  <div className="font-display text-2xl font-bold text-ink group-hover/link:text-coral transition-colors">
                    contact@magnivel.com
                  </div>
                </div>
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
             <div className="glass-panel p-6 transition-transform hover:-translate-y-1 hover:shadow-xl hover:shadow-teal/5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-lg bg-teal/10 text-teal">
                    <SupportIcon className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-ink text-lg">Fast Response</h4>
                </div>
                <p className="text-sm text-ink/70 leading-relaxed">We aim to review and respond to all inquiries within 24-48 hours during regular business days.</p>
             </div>
             
             <div className="glass-panel p-6 transition-transform hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-lg bg-blue-100 text-blue-600">
                    <BusinessIcon className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-ink text-lg">Global Reach</h4>
                </div>
                <p className="text-sm text-ink/70 leading-relaxed">Our dedicated international team is available to assist you, no matter where you are located.</p>
             </div>
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
