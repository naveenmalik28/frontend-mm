import { memo } from "react"
import { Link } from "react-router-dom"

import OptimizedImage from "../ui/OptimizedImage.jsx"
import TagBadge from "./TagBadge.jsx"

function ArticleCard({ article }) {
  return (
    <article className="glass-panel group relative flex h-full flex-col p-5 transition-shadow hover:shadow-card">
      {article.cover_image && (
        <div className="relative mb-5 -mx-5 -mt-5 aspect-video w-auto shrink-0 overflow-hidden rounded-t-[28px]">
          <OptimizedImage
            src={article.cover_image}
            alt={article.title}
            width={400}
            aspectRatio="16:9"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-ink/60 to-transparent p-5">
            <span className="inline-block rounded bg-coral px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
              {article.category?.name || "General"}
            </span>
          </div>
        </div>
      )}
      {!article.cover_image && (
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="eyebrow">{article.category?.name || "General"}</span>
          <span className="text-xs text-ink/60">{article.read_time} min read</span>
        </div>
      )}

      <h3 className="font-display text-2xl font-semibold leading-tight text-ink transition-colors group-hover:text-coral">
        <Link to={`/article/${article.slug}`} className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true" />
          {article.title}
        </Link>
      </h3>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/70 line-clamp-3">
        {article.excerpt || "A thoughtful take for curious readers."}
      </p>

      <div className="relative z-10 mt-4 flex flex-wrap gap-2">
        {(article.tags || []).slice(0, 3).map((tag) => <TagBadge key={tag.id} tag={tag} />)}
      </div>

      <div className="relative z-10 mt-6 flex items-center justify-between text-sm font-medium">
        <span className="text-ink/60">{article.author?.full_name || article.author?.username || "Magnivel Media"}</span>
        <div className="flex items-center gap-3 text-xs text-ink/40">
          {article.cover_image ? <span>{article.read_time} min read</span> : null}
          {article.category?.slug ? (
            <Link to={`/category/${article.category.slug}`} className="relative z-10 font-semibold text-coral hover:text-coral/80">
              {article.category.name}
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  )
}

export default memo(ArticleCard)
