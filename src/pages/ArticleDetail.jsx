import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { useParams } from "react-router-dom"

import { fetchArticleBySlug } from "../api/articles.api.js"
import ArticleCard from "../components/articles/ArticleCard.jsx"
import Spinner from "../components/ui/Spinner.jsx"

export default function ArticleDetail() {
  const { slug } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchArticleBySlug(slug)
      .then(setArticle)
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return <Spinner label="Loading article" />
  if (!article) return <div className="glass-panel p-8">Article not found.</div>

  return (
    <article className="glass-panel mx-auto max-w-4xl p-8 sm:p-10">
      <Helmet>
        <title>{article.title} | Magnivel Media</title>
        <meta name="description" content={article.excerpt || "Read this full article on Magnivel Media."} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt || "Read this full article on Magnivel Media."} />
        {article.cover_image && <meta property="og:image" content={article.cover_image} />}
        <meta property="og:type" content="article" />
      </Helmet>
      <div className="eyebrow">{article.category?.name || "Feature"}</div>
      <h1 className="mt-4 font-display text-5xl leading-tight">{article.title}</h1>
      <div className="mt-5 flex flex-wrap gap-4 text-sm text-ink/60">
        <span>{article.author?.full_name || article.author?.username}</span>
        <span>{article.read_time} min read</span>
        <span>{article.published_at ? new Date(article.published_at).toLocaleDateString() : "Draft"}</span>
      </div>
      {article.cover_image && (
        <div className="mt-8 overflow-hidden rounded-[28px] shadow-sm md:h-[480px]">
          <img src={article.cover_image} alt={article.title} className="h-full w-full object-cover" />
        </div>
      )}
      <div
        className="prose prose-lg prose-headings:font-display prose-p:font-display prose-li:font-display prose-a:text-coral mx-auto mt-12 max-w-[65ch] text-ink/80 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
      {article.related_articles && article.related_articles.length > 0 && (
        <div className="mt-16 border-t border-ink/10 pt-16">
          <h2 className="mb-8 text-center font-display text-3xl font-semibold">Read next</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {article.related_articles.map((related) => (
              <ArticleCard key={related.id} article={related} />
            ))}
          </div>
        </div>
      )}
    </article>
  )
}

