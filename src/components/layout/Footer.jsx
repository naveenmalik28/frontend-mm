import { Link } from "react-router-dom"

import {
  BRAND_COPY,
  BUSINESS_CONFERENCES_URL,
  BUSINESS_NAME,
  BUSINESS_SERVICES_URL,
  BUSINESS_URL,
  CATEGORY_ORDER,
  CATEGORY_LABELS,
} from "../../config/site.js"
import BrandLockup from "../brand/BrandLockup.jsx"

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-ink/10 bg-white/50 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="space-y-4">
            <BrandLockup compact />
            <p className="max-w-xs text-sm leading-relaxed text-ink/70">
              Search-first reporting and analysis for readers discovering the future through technology, business,
              science, and society.
            </p>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-coral">{BRAND_COPY}</p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-ink/50">Topics</h4>
            <ul className="space-y-3 text-sm text-ink/80">
              {CATEGORY_ORDER.map((slug) => (
                <li key={slug}>
                  <Link to={`/category/${slug}`} className="transition-colors hover:text-coral">
                    {CATEGORY_LABELS[slug]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-ink/50">The Platform</h4>
            <ul className="space-y-3 text-sm text-ink/80">
              <li><Link to="/explore" className="transition-colors hover:text-coral">Latest Stories</Link></li>
              <li><Link to="/plans" className="transition-colors hover:text-coral">Writer Plans</Link></li>
              <li><Link to="/about" className="transition-colors hover:text-coral">About Us</Link></li>
              <li><Link to="/contact" className="transition-colors hover:text-coral">Contact & Support</Link></li>
              <li><a href={BUSINESS_URL} target="_blank" rel="noreferrer" className="transition-colors hover:text-coral">{BUSINESS_NAME}</a></li>
              <li><a href={BUSINESS_SERVICES_URL} target="_blank" rel="noreferrer" className="transition-colors hover:text-coral">Business Services</a></li>
              <li><a href={BUSINESS_CONFERENCES_URL} target="_blank" rel="noreferrer" className="transition-colors hover:text-coral">Conferences</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-ink/50">Newsletter</h4>
            <p className="mb-4 text-sm text-ink/70">Subscribe to our weekly digest of the best ideas.</p>
            <form className="flex rounded-md border border-ink/20 bg-white p-1 focus-within:border-coral focus-within:ring-1 focus-within:ring-coral">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-transparent px-3 py-2 text-sm text-ink placeholder:text-ink/40 outline-none"
              />
              <button
                type="button"
                className="shrink-0 rounded bg-coral px-4 py-2 text-sm font-semibold text-white transition hover:bg-coral/90"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-ink/10 pt-8 text-xs text-ink/50 md:flex-row">
          <p>&copy; {new Date().getFullYear()} Magnivel Media. {BRAND_COPY}.</p>
          <div className="flex flex-wrap gap-4">
            <Link to="/privacy" className="transition-colors hover:text-ink">Privacy Policy</Link>
            <Link to="/terms" className="transition-colors hover:text-ink">Terms of Service</Link>
            <Link to="/shipping-policy" className="transition-colors hover:text-ink">Shipping Policy</Link>
            <Link to="/cancellation-refund-policy" className="transition-colors hover:text-ink">Cancellation & Refund</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
