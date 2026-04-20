import { Link } from "react-router-dom"

import Button from "../../components/ui/Button.jsx"

const CheckCircleIcon = () => (
  <svg className="h-16 w-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
)

export default function Success() {
  return (
    <div className="mx-auto max-w-2xl glass-panel p-10 sm:p-16 text-center relative overflow-hidden">
      <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-teal/10 blur-3xl"></div>
      <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-coral/10 blur-3xl"></div>

      <div className="relative z-10">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-teal/10 text-teal mb-6">
          <CheckCircleIcon />
        </div>

        <span className="eyebrow text-teal">Payment Successful</span>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl text-ink">Subscription Activated!</h1>
        <p className="mt-4 text-ink/70 max-w-md mx-auto leading-relaxed">
          Your account has been upgraded. You now have full access to our publishing tools, analytics, and all premium writer features.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/dashboard/new-article">
            <Button className="shadow-lg shadow-coral/20">Write your first article</Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="ghost">Go to Dashboard</Button>
          </Link>
        </div>

        <p className="mt-8 text-xs text-ink/40">
          A confirmation email has been sent to your registered email address. You can manage your subscription from your dashboard settings at any time.
        </p>
      </div>
    </div>
  )
}
