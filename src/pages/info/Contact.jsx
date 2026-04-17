import React, { useState } from "react"
import Button from "../../components/ui/Button.jsx"

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulated submission
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <div className="mx-auto max-w-5xl py-12">
      <div className="text-center mb-16">
        <span className="eyebrow inline-block mb-3">Contact & Support</span>
        <h1 className="font-display text-5xl font-bold tracking-tight text-ink md:text-6xl">
          Get in touch with us.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-ink/70 leading-relaxed">
          Whether you're a reader with a question, a writer looking to get published, or a press inquiry, we are here to help.
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 xl:gap-16">
        {/* Contact Information */}
        <div className="space-y-8">
          <div className="glass-panel p-8">
            <h3 className="font-display text-2xl font-bold text-ink mb-2">Editorial Inquiries</h3>
            <p className="text-ink/70 mb-4">Are you a writer looking to pitch a story or join our platform? Reach out to our editorial board.</p>
            <a href="mailto:editorial@magnivel.com" className="font-semibold text-coral hover:underline">editorial@magnivel.com</a>
          </div>

          <div className="glass-panel p-8">
            <h3 className="font-display text-2xl font-bold text-ink mb-2">Technical Support</h3>
            <p className="text-ink/70 mb-4">Experiencing issues with your account, publishing tools, or a subscription? Our technical team is on standby.</p>
            <a href="mailto:support@magnivel.com" className="font-semibold text-coral hover:underline">support@magnivel.com</a>
          </div>

          <div className="glass-panel p-8">
            <h3 className="font-display text-2xl font-bold text-ink mb-2">Press & Partnerships</h3>
            <p className="text-ink/70 mb-4">For media inquiries, brand partnerships, and advertising opportunities.</p>
            <a href="mailto:press@magnivel.com" className="font-semibold text-coral hover:underline">press@magnivel.com</a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="glass-panel p-8 md:p-10">
          <h2 className="font-display text-3xl font-bold text-ink mb-6">Send a message</h2>
          
          {submitted ? (
            <div className="rounded-2xl bg-green-50 p-8 border border-green-200 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-green-900 mb-2">Message Sent!</h3>
              <p className="text-green-800/80 text-sm">Thank you for reaching out. A member of our team will get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="first_name" className="mb-2 block text-sm font-semibold text-ink">First Name</label>
                  <input required id="first_name" type="text" className="input" placeholder="Jane" />
                </div>
                <div>
                  <label htmlFor="last_name" className="mb-2 block text-sm font-semibold text-ink">Last Name</label>
                  <input required id="last_name" type="text" className="input" placeholder="Doe" />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-ink">Email Address</label>
                <input required id="email" type="email" className="input" placeholder="jane@example.com" />
              </div>

              <div>
                <label htmlFor="department" className="mb-2 block text-sm font-semibold text-ink">Department</label>
                <select id="department" className="input text-sm">
                  <option>General Inquiry</option>
                  <option>Editorial & Submissions</option>
                  <option>Technical Support</option>
                  <option>Billing & Subscription</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-semibold text-ink">Message</label>
                <textarea required id="message" rows={5} className="textarea" placeholder="How can we help you today?"></textarea>
              </div>

              <Button type="submit" className="w-full justify-center">
                Send Message
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
