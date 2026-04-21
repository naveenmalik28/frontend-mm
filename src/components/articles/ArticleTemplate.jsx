import { Link } from "react-router-dom"

import OptimizedImage from "../ui/OptimizedImage.jsx"
import { ARTICLE_COVER_SIZES } from "../../utils/cloudinaryImage.js"

import {
  BRAND_COPY,
  BUSINESS_CONFERENCES_URL,
  BUSINESS_NAME,
  BUSINESS_SERVICES_URL,
} from "../../config/site.js"

const formatPublishedDate = (value) =>
  value
    ? new Date(value).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Draft"

function TableOfContents({ toc }) {
  if (!toc?.length) return null

  return (
    <aside className="rounded-[28px] border border-ink/10 bg-white p-6 shadow-sm">
      <div className="text-xs font-bold uppercase tracking-[0.28em] text-coral">On This Page</div>
      <nav className="mt-4 space-y-3">
        {toc.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`block text-sm text-ink/70 transition hover:text-ink ${item.level === "h3" ? "pl-4" : ""}`}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  )
}

function MagnivelCta({ categoryName }) {
  return (
    <aside className="rounded-[28px] border border-ink/10 bg-ink p-6 text-white shadow-card">
      <div className="text-xs font-bold uppercase tracking-[0.28em] text-coral">{BRAND_COPY}</div>
      <h2 className="mt-3 font-display text-2xl leading-tight">
        Turn {categoryName?.toLowerCase() || "industry"} insight into partnerships, events, and business growth.
      </h2>
      <p className="mt-4 text-sm leading-relaxed text-white/78">
        Explore how {BUSINESS_NAME} supports conferences, publishing initiatives, research visibility, and strategic
        industry programs.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={BUSINESS_SERVICES_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-coral px-5 py-3 text-sm font-semibold text-white transition hover:bg-coral/90"
        >
          Explore Services
        </a>
        <a
          href={BUSINESS_CONFERENCES_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          View Conferences
        </a>
      </div>
    </aside>
  )
}

export default function ArticleTemplate({ article, contentHtml, toc, relatedArticles = [] }) {
  return (
    <article className="space-y-12">
      <header className="relative overflow-hidden rounded-[32px] border border-white/70 bg-white/88 p-8 shadow-card sm:p-10 lg:p-14">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-coral via-teal to-ink" />
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-[0.26em] text-ink/48">
            {article.category ? (
              <Link
                to={`/category/${article.category.slug}`}
                className="rounded-full bg-coral/10 px-3 py-1.5 text-coral transition hover:bg-coral/15"
              >
                {article.category.name}
              </Link>
            ) : null}
            <span>{BRAND_COPY}</span>
          </div>
          <h1 className="mt-6 font-display text-4xl leading-tight text-ink sm:text-5xl lg:text-6xl">{article.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink/70">
            {article.excerpt || "Forward-looking reporting and analysis from Magnivel Media."}
          </p>
          <div className="mt-8 flex flex-wrap gap-5 text-sm text-ink/55">
            <span>{article.author?.full_name || article.author?.username || "Magnivel Media"}</span>
            <span>{formatPublishedDate(article.published_at)}</span>
            <span>{article.read_time} min read</span>
            <span>{article.view_count || 0} views</span>
          </div>
        </div>
      </header>

      {article.cover_image ? (
        <div className="overflow-hidden rounded-[32px] border border-ink/10 bg-white shadow-sm">
          <OptimizedImage
            src={article.cover_image}
            alt={article.title}
            width={1200}
            sizes={ARTICLE_COVER_SIZES}
            aspectRatio="3:2"
            priority
            className="h-full max-h-[620px] w-full object-cover"
          />
        </div>
      ) : null}

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
        <div className="min-w-0 rounded-[32px] border border-ink/10 bg-white px-6 py-8 shadow-sm sm:px-8 lg:px-10">
          <div
            className="prose prose-lg max-w-none text-ink/80 prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:text-ink prose-h2:mt-12 prose-h2:border-t prose-h2:border-ink/8 prose-h2:pt-8 prose-h3:mt-8 prose-a:text-coral prose-img:rounded-[24px] prose-strong:text-ink"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </div>

        <div className="space-y-6 lg:sticky lg:top-24">
          <TableOfContents toc={toc} />
          <MagnivelCta categoryName={article.category?.name} />
          {article.category ? (
            <div className="rounded-[28px] border border-ink/10 bg-white p-6 shadow-sm">
              <div className="text-xs font-bold uppercase tracking-[0.28em] text-teal">Explore More</div>
              <p className="mt-3 text-sm leading-relaxed text-ink/68">
                Continue reading more {article.category.name.toLowerCase()} coverage from the Magnivel Media archive.
              </p>
              <Link
                to={`/category/${article.category.slug}`}
                className="mt-5 inline-flex items-center text-sm font-semibold text-coral transition hover:text-coral/80"
              >
                Browse {article.category.name}
              </Link>
            </div>
          ) : null}
        </div>
      </div>

      {relatedArticles.length ? (
        <section className="rounded-[32px] border border-ink/10 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.28em] text-teal">Internal Linking</div>
              <h2 className="mt-2 font-display text-3xl text-ink">Related Articles</h2>
            </div>
            {article.category ? (
              <Link to={`/category/${article.category.slug}`} className="text-sm font-semibold text-coral">
                View all in {article.category.name}
              </Link>
            ) : null}
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {relatedArticles.map((related) => (
              <div key={related.id} className="rounded-[24px] border border-ink/8 p-5 transition hover:border-coral/30">
                <div className="text-[11px] font-bold uppercase tracking-[0.24em] text-ink/40">
                  {related.category?.name || "Article"}
                </div>
                <h3 className="mt-3 font-display text-2xl leading-snug text-ink">
                  <Link to={`/article/${related.slug}`} className="transition hover:text-coral">
                    {related.title}
                  </Link>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/66 line-clamp-3">
                  {related.excerpt || "Continue exploring with another Magnivel Media perspective."}
                </p>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </article>
  )
}
