import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { fetchMyArticles } from "../../api/articles.api.js"
import Sidebar from "../../components/layout/Sidebar.jsx"
import Spinner from "../../components/ui/Spinner.jsx"

export default function MyArticles() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMyArticles()
      .then((data) => setArticles(data.results || data))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="glass-panel p-8">
        <span className="eyebrow">My articles</span>
        <h1 className="mt-4 font-display text-4xl">Manage your content</h1>
        {loading ? (
          <div className="mt-6"><Spinner /></div>
        ) : (
          <div className="mt-6 space-y-4">
            {articles.map((article) => (
              <div key={article.id} className="rounded-3xl border border-ink/10 bg-white/70 p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="font-display text-2xl">{article.title}</h3>
                    <p className="text-sm text-ink/60">{article.status} • {article.read_time} min read</p>
                  </div>
                  <Link className="font-semibold text-coral" to={`/dashboard/edit/${article.id}`}>Edit</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

