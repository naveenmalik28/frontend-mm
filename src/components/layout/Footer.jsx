import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-ink/10 bg-white/50 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <div className="font-display text-2xl font-bold tracking-tight text-ink">Magnivel International Media</div>
            <p className="max-w-xs text-sm text-ink/70 leading-relaxed">
              A global platform for thought-sharing and innovation. Read deep insights, publish your own perspective, and shape the future.
            </p>
          </div>

          {/* Column 2: Topics */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-ink/50 mb-4">Topics</h4>
            <ul className="space-y-3 text-sm text-ink/80">
              <li><Link to="/category/technology-innovation" className="hover:text-coral transition-colors">Technology & Innovation</Link></li>
              <li><Link to="/category/artificial-intelligence" className="hover:text-coral transition-colors">Artificial Intelligence</Link></li>
              <li><Link to="/category/biomedical-health" className="hover:text-coral transition-colors">Biomedical & Health</Link></li>
              <li><Link to="/category/business-startups" className="hover:text-coral transition-colors">Business & Startups</Link></li>
              <li><Link to="/category/education-careers" className="hover:text-coral transition-colors">Education & Careers</Link></li>
              <li><Link to="/category/science-research" className="hover:text-coral transition-colors">Science & Research</Link></li>
              <li><Link to="/category/society-culture" className="hover:text-coral transition-colors">Society & Culture</Link></li>
            </ul>
          </div>

          {/* Column 3: The Platform */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-ink/50 mb-4">The Platform</h4>
            <ul className="space-y-3 text-sm text-ink/80">
              <li><Link to="/explore" className="hover:text-coral transition-colors">Latest Stories</Link></li>
              <li><Link to="/plans" className="hover:text-coral transition-colors">Writer Plans</Link></li>
              <li><Link to="/about" className="hover:text-coral transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-coral transition-colors">Contact & Support</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-ink/50 mb-4">Newsletter</h4>
            <p className="text-sm text-ink/70 mb-4">Subscribe to our weekly digest of the best ideas.</p>
            <form className="flex rounded-md border border-ink/20 p-1 focus-within:border-coral focus-within:ring-1 focus-within:ring-coral bg-white">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full bg-transparent px-3 py-2 text-sm text-ink placeholder:text-ink/40 outline-none"
              />
              <button 
                type="button" 
                className="rounded bg-coral px-4 py-2 text-sm font-semibold text-white transition hover:bg-coral/90 shrink-0"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 border-t border-ink/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-ink/50">
          <p>© {new Date().getFullYear()} Magnivel International Media. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-ink transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-ink transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

