import { Link } from "react-router-dom"

import TagBadge from "./TagBadge.jsx"

export default function ArticleCard({ article }) {
  return (
    <article className="glass-panel group flex h-full flex-col p-5 transition-shadow hover:shadow-card">
      {article.cover_image && (
        <div className="relative mb-5 -mx-5 -mt-5 h-48 shrink-0 overflow-hidden rounded-t-[28px]">
          <img src={article.cover_image} alt={article.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
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
      
      <h3 className="font-display text-2xl font-semibold leading-tight text-ink group-hover:text-coral transition-colors">
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
        {article.cover_image && (
          <span className="text-xs text-ink/40">{article.read_time} min read</span>
        )}
      </div>
    </article>
  )
}

