import React from "react"
import { Link } from "react-router-dom"
import SeoHead from "../../components/seo/SeoHead.jsx"

const CheckCircleIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
)

const GlobeIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
)

const EditIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9"></path>
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
  </svg>
)

const MessageIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
)

const TrendingIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
)

const ArrowRightIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
)

export default function About() {
  return (
    <div className="space-y-16 pb-16">
      <SeoHead
        title="About Us"
        description="Magnivel International Media is a modern platform for thought-provoking ideas, innovative insights, and diverse perspectives from voices around the world."
        path="/about"
      />
      {/* Intro Section / Hero */}
      <section className="relative overflow-hidden rounded-[32px] border border-white/40 bg-gradient-to-br from-slate-50 via-white to-slate-50/50 p-8 sm:p-16 shadow-lg shadow-ink/5 text-center">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-coral/10 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-teal/10 blur-3xl"></div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/60 px-4 py-2 mb-6 border border-slate-200 shadow-sm">
            <GlobeIcon className="text-ink h-4 w-4" />
            <span className="text-sm font-semibold text-ink uppercase tracking-wider">About Us</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-ink md:text-6xl mb-6">
            Empowering Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral to-teal">Perspectives</span>
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-ink/70 leading-relaxed font-light">
            <strong>Magnivel International Media</strong> is a modern platform for thought-provoking ideas, innovative insights, and diverse perspectives from voices around the world. We bring together thinkers, creators, and professionals to share knowledge that inspires, informs, and drives meaningful conversations.
          </p>
          <p className="mt-4 mx-auto max-w-3xl text-lg text-ink/60 font-medium">
            Magnivel.com is a property of MAGNIVEL INTERNATIONAL.
          </p>
        </div>
      </section>

      <div className="space-y-16 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Mission & What We Cover - Grid Layout */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Mission */}
          <div className="glass-panel p-10 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-coral to-coral/50"></div>
            <h2 className="font-display text-3xl font-bold text-ink mb-6 flex items-center">
              Our Mission
            </h2>
            <div className="space-y-4 text-ink/80 leading-relaxed text-lg">
              <p>In a world flooded with information, our mission is simple:</p>
              <p className="font-medium text-coral bg-coral/5 p-4 rounded-xl border border-coral/10">
                👉 Deliver high-quality, insightful, and impactful content that truly matters.
              </p>
              <p>We aim to cut through the noise by publishing content that is:</p>
              <ul className="space-y-2 mt-4 ml-2">
                <li className="flex items-center"><CheckCircleIcon className="text-coral mr-3 h-5 w-5 shrink-0" /> Deeply researched</li>
                <li className="flex items-center"><CheckCircleIcon className="text-coral mr-3 h-5 w-5 shrink-0" /> Intellectually engaging</li>
                <li className="flex items-center"><CheckCircleIcon className="text-coral mr-3 h-5 w-5 shrink-0" /> Globally relevant</li>
              </ul>
              <p className="pt-4 font-medium text-ink">
                We believe that ideas shape the future — and we are building a space where powerful ideas can grow and reach the world.
              </p>
            </div>
          </div>

          {/* What We Cover */}
          <div className="bg-ink rounded-[24px] p-10 shadow-xl shadow-ink/20 text-white relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-teal rounded-full blur-3xl opacity-20"></div>
            <h2 className="font-display text-3xl font-bold text-white mb-6">
              What We Cover
            </h2>
            <p className="text-white/80 text-lg mb-6 leading-relaxed">
              We explore a wide range of topics that define the modern world:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {['Technology & Innovation', 'Artificial Intelligence', 'Science & Research', 'Biomedical & Health', 'Business & Startups', 'Education & Careers', 'Society & Culture'].map((topic) => (
                <div key={topic} className="flex items-center bg-white/10 rounded-lg px-4 py-3 border border-white/5 backdrop-blur-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal mr-3"></div>
                  <span className="text-sm font-medium">{topic}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 pt-6">
              <p className="text-white/90 font-medium mb-3">Our goal is to help readers:</p>
              <ul className="space-y-2 font-medium text-white/90">
                <li className="flex items-center"><CheckCircleIcon className="text-teal mr-3 h-5 w-5" /> Understand global trends</li>
                <li className="flex items-center"><CheckCircleIcon className="text-teal mr-3 h-5 w-5" /> Discover new perspectives</li>
                <li className="flex items-center"><CheckCircleIcon className="text-teal mr-3 h-5 w-5" /> Stay informed and inspired</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Community & Why Join */}
        <div className="glass-panel p-10 md:p-16 border-white/60">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-ink mb-6">
                Our Community
              </h2>
              <p className="text-ink/70 text-lg mb-6 leading-relaxed">
                Magnivel International Media is more than just a platform — it’s a growing global community. We empower:
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                {['Students', 'Professionals', 'Researchers', 'Independent thinkers'].map((item) => (
                  <span key={item} className="bg-white/60 px-4 py-2 rounded-full text-ink font-semibold border border-slate-200 shadow-sm text-sm">
                    {item}
                  </span>
                ))}
              </div>
              <p className="text-ink/70 text-lg mb-8">
                To share their ideas with a worldwide audience. <strong className="text-coral">Here, every voice matters.</strong>
              </p>
            </div>

            <div>
              <h3 className="font-display text-2xl font-bold text-ink mb-6 border-b border-slate-200 pb-4">
                🔥 Why Join Us
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start bg-white/50 p-4 rounded-xl border border-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-teal/10 text-teal p-2 rounded-lg mr-4"><GlobeIcon className="h-6 w-6" /></div>
                  <div>
                    <h4 className="font-bold text-ink">Reach a global audience</h4>
                    <p className="text-sm text-ink/60 mt-1">Amplify your voice beyond borders.</p>
                  </div>
                </li>
                <li className="flex items-start bg-white/50 p-4 rounded-xl border border-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-coral/10 text-coral p-2 rounded-lg mr-4"><EditIcon className="h-6 w-6" /></div>
                  <div>
                    <h4 className="font-bold text-ink">Share your ideas freely</h4>
                    <p className="text-sm text-ink/60 mt-1">Publish content unconditionally.</p>
                  </div>
                </li>
                <li className="flex items-start bg-white/50 p-4 rounded-xl border border-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-blue-100 text-blue-600 p-2 rounded-lg mr-4"><MessageIcon className="h-6 w-6" /></div>
                  <div>
                    <h4 className="font-bold text-ink">Engage in discussions</h4>
                    <p className="text-sm text-ink/60 mt-1">Connect and debate ideas.</p>
                  </div>
                </li>
                <li className="flex items-start bg-white/50 p-4 rounded-xl border border-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-orange-100 text-orange-600 p-2 rounded-lg mr-4"><TrendingIcon className="h-6 w-6" /></div>
                  <div>
                    <h4 className="font-bold text-ink">Build your personal brand</h4>
                    <p className="text-sm text-ink/60 mt-1">Establish authority in your field.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-ink rounded-[28px] p-12 md:p-16 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-coral to-coral/50 rounded-full blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-teal to-teal/50 rounded-full blur-3xl opacity-20 transform -translate-x-1/2 translate-y-1/2"></div>

          <div className="relative z-10">
            <h2 className="font-display text-4xl font-extrabold mb-4 text-white">
              Join a community of thinkers shaping the future.
            </h2>
            <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto font-light">
              Whether you want to write, read, or engage, there's a place for you here.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
              <Link to="/explore" className="w-full sm:w-auto flex items-center justify-center px-8 py-4 rounded-full bg-white/10 text-white font-bold hover:bg-white/20 transition-colors border border-white/20">
                <GlobeIcon className="mr-2 h-5 w-5" /> Explore Ideas
              </Link>
              <Link to="/register" className="w-full sm:w-auto flex items-center justify-center px-8 py-4 rounded-full bg-coral text-white font-bold hover:bg-coral/90 transition-colors shadow-lg shadow-coral/30">
                Become a Contributor <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </div>

            <p className="text-sm font-medium text-white/50 tracking-wider uppercase mt-8 border-t border-white/10 pt-8 inline-block">
              Support independent thinking. Share knowledge. Inspire the world.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
