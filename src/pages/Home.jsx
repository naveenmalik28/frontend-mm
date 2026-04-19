import { useCallback, useMemo } from "react"
import { Link, useNavigate } from "react-router-dom"

import ArticleList from "../components/articles/ArticleList.jsx"
import CategoryFilter from "../components/articles/CategoryFilter.jsx"
import SeoHead from "../components/seo/SeoHead.jsx"
import Button from "../components/ui/Button.jsx"
import Spinner from "../components/ui/Spinner.jsx"
import {
  BRAND_COPY,
  BUSINESS_NAME,
  BUSINESS_URL,
  CATEGORY_LABELS,
  SITE_NAME,
  SITE_TAGLINE,
} from "../config/site.js"
import { useArticles } from "../hooks/useArticles.js"

export default function Home() {
  const navigate = useNavigate()
  const { articles, categories, loading } = useArticles({ ordering: "-published_at", page_size: 18 })

  const { featuredArticle, trendingArticles, feedArticles } = useMemo(() => {
    const nextFeaturedArticle = articles.find((article) => article.is_featured) || articles[0]
    const remainingArticles = articles.filter((article) => article.id !== nextFeaturedArticle?.id)
    const nextTrendingArticles = [...remainingArticles]
      .sort(
        (left, right) =>
          (right.view_count || 0) - (left.view_count || 0) ||
          (right.published_at || "").localeCompare(left.published_at || ""),
      )
      .slice(0, 4)
    const trendingIds = new Set(nextTrendingArticles.map((article) => article.id))
    const nextFeedArticles = remainingArticles.filter((article) => !trendingIds.has(article.id)).slice(0, 9)

    return {
      featuredArticle: nextFeaturedArticle,
      trendingArticles: nextTrendingArticles,
      feedArticles: nextFeedArticles,
    }
  }, [articles])

  const handleCategoryChange = useCallback(
    (slug) => {
      if (slug) {
        navigate(`/category/${slug}`)
        return
      }

      navigate("/explore")
    },
    [navigate],
  )

  return (
    <div className="space-y-16">
      <SeoHead
        title="AI, Technology, Science, and Business Insights"
        description="Magnivel Media publishes search-first analysis across AI, technology, software development, cybersecurity, data science, health, science, education, society, and business."
        path="/"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: SITE_NAME,
          url: "https://magnivel.com/",
          description: SITE_TAGLINE,
        }}
      />

      <section className="grid gap-6 lg:grid-cols-[1.35fr_0.95fr]">
        <div className="glass-panel overflow-hidden">
          {loading || !featuredArticle ? (
            <div className="flex h-[500px] items-center justify-center p-8">
              <Spinner label="Loading featured insight..." />
            </div>
          ) : (
            <div className="group relative flex h-full flex-col justify-end p-8 md:min-h-[500px] md:p-12">
              {featuredArticle.cover_image && (
                <div className="absolute inset-0 -z-10">
                  <img
                    src={featuredArticle.cover_image}
                    alt={featuredArticle.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    decoding="async"
                    fetchPriority="high"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent"></div>
                </div>
              )}
              <div className="relative z-10 text-white">
                <div className="mb-4 inline-block rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.24em] text-white/90">
                  {featuredArticle.category?.name || "Featured Insight"}
                </div>
                <div className="text-xs font-bold uppercase tracking-[0.28em] text-coral">{BRAND_COPY}</div>
                <h1 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
                  <Link to={`/article/${featuredArticle.slug}`} className="transition-colors hover:text-coral/90">
                    {featuredArticle.title}
                  </Link>
                </h1>
                <p className="mt-4 max-w-2xl text-lg text-white/80 line-clamp-3">{featuredArticle.excerpt}</p>
                <div className="mt-6 flex items-center gap-4 text-sm font-medium text-white/70">
                  <span>{featuredArticle.author?.full_name || featuredArticle.author?.username || "Magnivel Media"}</span>
                  <span className="h-1 w-1 rounded-full bg-white/50"></span>
                  <span>{featuredArticle.read_time} min read</span>
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link to={`/article/${featuredArticle.slug}`}>
                    <Button className="border-0 bg-coral px-7">Read Feature</Button>
                  </Link>
                  <a href={BUSINESS_URL} target="_blank" rel="noreferrer">
                    <Button variant="ghost" className="border border-white/20 bg-white/10 px-7 text-white hover:bg-white/15">
                      Visit {BUSINESS_NAME}
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="glass-panel flex flex-col p-8">
          <div className="mb-6">
            <span className="eyebrow">Trending Articles</span>
            <p className="mt-2 font-display text-xl leading-tight">What readers are discovering now</p>
          </div>
          <div className="flex flex-1 flex-col gap-6">
            {loading ? (
              <Spinner />
            ) : (
              trendingArticles.map((article, index) => (
                <div key={article.id} className="group flex items-start gap-4 border-b border-ink/5 pb-6 last:border-0 last:pb-0">
                  <span className="font-display text-3xl font-bold text-ink/10 transition-colors group-hover:text-coral/30">0{index + 1}</span>
                  <div>
                    <h3 className="font-display text-lg font-semibold leading-snug text-ink transition-colors group-hover:text-coral">
                      <Link to={`/article/${article.slug}`}>{article.title}</Link>
                    </h3>
                    <div className="mt-2 text-xs font-semibold uppercase tracking-wider text-ink/40">
                      {article.category?.name || "Insight"} / {article.view_count || 0} views
                    </div>
                  </div>
                </div>
              ))
            )}
            {!loading && trendingArticles.length === 0 ? (
              <p className="text-sm text-ink/50">No trending articles available yet.</p>
            ) : null}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden rounded-[28px] bg-ink p-10 text-center text-white shadow-card sm:p-16">
        <div className="absolute -left-10 -top-24 h-64 w-64 rounded-full bg-coral/30 blur-[100px]"></div>
        <div className="absolute -bottom-24 -right-10 h-64 w-64 rounded-full bg-teal/30 blur-[100px]"></div>

        <div className="relative z-10 mx-auto max-w-3xl">
          <span className="mb-4 inline-block rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm font-semibold tracking-wider text-white">
            {BRAND_COPY}
          </span>
          <h2 className="mt-3 mb-6 font-display text-3xl font-bold sm:text-4xl">
            Editorial discovery for readers, strategic credibility for the Magnivel brand.
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg font-light leading-relaxed text-white/80">
            {SITE_NAME} is the publishing layer for discoverability: search-led stories that introduce readers to
            ideas, expertise, and initiatives across the wider Magnivel ecosystem.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/register">
              <Button variant="primary" className="border-0 bg-coral px-8 py-4 text-base text-white shadow-lg shadow-coral/20 hover:bg-coral/90">
                Become a Contributor
              </Button>
            </Link>
            <a href={BUSINESS_URL} target="_blank" rel="noreferrer">
              <Button variant="ghost" className="border border-white/20 px-8 py-4 text-base hover:bg-white/10">
                Visit {BUSINESS_NAME}
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {categories.slice(0, 8).map((category) => (
          <Link
            key={category.id}
            to={`/category/${category.slug}`}
            className="rounded-[24px] border border-ink/10 bg-white/80 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-coral/25"
          >
            <div className="text-[11px] font-bold uppercase tracking-[0.24em] text-coral">
              {CATEGORY_LABELS[category.slug] || category.name}
            </div>
            <div className="mt-3 font-display text-2xl text-ink">{category.name}</div>
            <div className="mt-2 text-sm leading-relaxed text-ink/65">{category.description}</div>
            <div className="mt-4 text-xs font-semibold uppercase tracking-[0.24em] text-ink/45">
              {category.article_count || 0} published articles
            </div>
          </Link>
        ))}
      </section>

      <section className="space-y-6">
        <CategoryFilter categories={categories} activeCategory="" onChange={handleCategoryChange} />
        {loading ? <Spinner /> : <ArticleList articles={feedArticles} />}
        {!loading && feedArticles.length > 0 ? (
          <div className="mt-8 border-t border-ink/5 pt-8 text-center">
            <Link to="/explore">
              <Button variant="ghost">View Complete Archive</Button>
            </Link>
          </div>
        ) : null}
      </section>
    </div>
  )
}
