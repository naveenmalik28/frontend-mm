import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { fetchMyArticles } from "../../api/articles.api.js"
import Sidebar from "../../components/layout/Sidebar.jsx"
import Spinner from "../../components/ui/Spinner.jsx"

export default function MyArticles() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    let mounted = true
    fetchMyArticles()
      .then((data) => {
        if (mounted) setArticles(data.results || data)
      })
      .catch(() => {
        if (mounted) setError("Failed to load your articles. Please try again.")
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })
    return () => { mounted = false }
  }, [])

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="space-y-6">
        <section className="glass-panel p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="eyebrow flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-.586-1.414l-4.5-4.5A2 2 0 0012.586 3H12" />
                </svg>
                My articles
              </span>
              <h1 className="mt-4 font-display text-4xl">Manage your content</h1>
            </div>
            <Link 
              to="/dashboard/new-article" 
              className="inline-flex items-center gap-2 rounded-full bg-coral px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-coral/90"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              New Article
            </Link>
          </div>
        </section>

        {loading ? (
          <div className="flex justify-center p-12">
            <Spinner />
          </div>
        ) : error ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-center text-sm text-red-700">
            {error}
          </div>
        ) : articles.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-ink/20 bg-white/40 px-6 py-20 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-coral/10 text-coral">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h3 className="font-display text-2xl text-ink">No articles yet</h3>
            <p className="mt-2 mb-6 max-w-sm text-ink/60">
              You haven't published or drafted any articles. Start sharing your knowledge with the world today.
            </p>
            <Link 
              to="/dashboard/new-article" 
              className="inline-flex items-center rounded-full bg-ink px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ink/90"
            >
              Start writing
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {articles.map((article) => (
              <div key={article.id} className="group flex flex-col justify-between gap-4 rounded-3xl border border-ink/10 bg-white/70 p-6 transition-all hover:border-coral/30 hover:shadow-sm sm:flex-row sm:items-center">
                <div className="flex items-center gap-4">
                  {/* Status Badge */}
                  <div className="hidden sm:block">
                    {article.status === 'published' ? (
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-xl text-ink transition-colors group-hover:text-coral line-clamp-1">{article.title || "Untitled Article"}</h3>
                      {/* Mobile minimal status badge */}
                      <span className={`sm:hidden inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${article.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                        {article.status}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center gap-4 text-sm text-ink/60">
                      <span className="hidden sm:inline-flex items-center capitalize">
                        {article.status}
                      </span>
                      <span className="hidden sm:inline-block h-1 w-1 rounded-full bg-ink/20"></span>
                      <span className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {article.read_time || 0} min read
                      </span>
                      {article.created_at && (
                         <>
                          <span className="h-1 w-1 rounded-full bg-ink/20"></span>
                          <span>{new Date(article.created_at).toLocaleDateString()}</span>
                         </>
                      )}
                    </div>
                  </div>
                </div>
                
                <Link 
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/10 bg-white px-5 py-2 text-sm font-semibold text-ink transition-colors group-hover:border-coral/50 group-hover:text-coral sm:w-auto"
                  to={`/dashboard/edit/${article.id}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  Edit
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

