import { useCallback, useMemo } from "react"
import { Link, useNavigate } from "react-router-dom"

import ArticleList from "../components/articles/ArticleList.jsx"
import OptimizedImage from "../components/ui/OptimizedImage.jsx"
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
import { HERO_IMAGE_SIZES } from "../utils/cloudinaryImage.js"

// Icons
const SparklesIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
)

const PencilIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 20h9"></path>
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
  </svg>
)

const UsersIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
)

const TrendingIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
)

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
        description="Magnivel Media publishes search-first analysis on AI, technology, software development, cybersecurity, data science, health, science, education, society, and business. Powered by Magnivel International."
        path="/"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: SITE_NAME,
          url: "https://magnivel.com/",
          description: SITE_TAGLINE,
        }}
      />

      {/* Platform Introduction Section */}
      <section className="relative overflow-hidden rounded-[32px] border border-white/40 bg-gradient-to-br from-slate-50 via-white to-slate-50/50 p-8 sm:p-12 shadow-lg shadow-ink/5">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-coral/10 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-teal/10 blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-coral/10 px-4 py-2 mb-6 border border-coral/20">
            <SparklesIcon className="text-coral" />
            <span className="text-sm font-semibold text-coral uppercase tracking-wider">Welcome to Magnivel Media</span>
          </div>
          
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-ink leading-tight mb-4">
            Ideas That <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral to-teal">Shape Tomorrow</span>
          </h1>
          
          <p className="text-lg text-ink/70 leading-relaxed max-w-3xl mb-8">
            A publishing platform for high-quality analysis on <strong>AI, technology, business, science, and innovation</strong>. 
            Powered by <strong>{BUSINESS_NAME}</strong> — where independent thinkers publish insights that matter.
          </p>
          
          {/* Quick Facts */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-start gap-3 bg-white/50 rounded-xl p-4 backdrop-blur-sm border border-white">
              <div className="p-2 rounded-lg bg-coral/10 text-coral shrink-0">
                <PencilIcon />
              </div>
              <div>
                <div className="font-bold text-ink text-sm">Publish</div>
                <p className="text-xs text-ink/60">Share your ideas with a global audience</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 bg-white/50 rounded-xl p-4 backdrop-blur-sm border border-white">
              <div className="p-2 rounded-lg bg-teal/10 text-teal shrink-0">
                <UsersIcon />
              </div>
              <div>
                <div className="font-bold text-ink text-sm">Connect</div>
                <p className="text-xs text-ink/60">Join a community of innovators & thinkers</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 bg-white/50 rounded-xl p-4 backdrop-blur-sm border border-white">
              <div className="p-2 rounded-lg bg-blue-100 text-blue-600 shrink-0">
                <TrendingIcon />
              </div>
              <div>
                <div className="font-bold text-ink text-sm">Grow</div>
                <p className="text-xs text-ink/60">Build authority in your field</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured & Trending Section */}
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
                  <OptimizedImage
                    src={featuredArticle.cover_image}
                    alt={featuredArticle.title}
                    width={1200}
                    sizes={HERO_IMAGE_SIZES}
                    priority
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
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

      {/* How It Works Section */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-4">How Magnivel Media Works</h2>
          <p className="text-ink/70 text-lg">Start reading articles, contribute your ideas, and unlock your potential as a thought leader.</p>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          {/* Step 1 */}
          <div className="relative">
            <div className="glass-panel p-6 h-full flex flex-col">
              <div className="mb-4 inline-flex items-center justify-center h-12 w-12 rounded-full bg-coral/20 text-coral font-bold text-lg">1</div>
              <h3 className="font-display text-lg font-bold text-ink mb-2">Browse & Read</h3>
              <p className="text-sm text-ink/70">Explore insights across AI, technology, business, science, and more.</p>
            </div>
            <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-0.5 bg-coral/30"></div>
          </div>

          {/* Step 2 */}
          <div className="relative">
            <div className="glass-panel p-6 h-full flex flex-col">
              <div className="mb-4 inline-flex items-center justify-center h-12 w-12 rounded-full bg-teal/20 text-teal font-bold text-lg">2</div>
              <h3 className="font-display text-lg font-bold text-ink mb-2">Create Account</h3>
              <p className="text-sm text-ink/70">Sign up to save articles, engage with authors, and more.</p>
            </div>
            <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-0.5 bg-teal/30"></div>
          </div>

          {/* Step 3 */}
          <div className="relative">
            <div className="glass-panel p-6 h-full flex flex-col">
              <div className="mb-4 inline-flex items-center justify-center h-12 w-12 rounded-full bg-blue-200 text-blue-600 font-bold text-lg">3</div>
              <h3 className="font-display text-lg font-bold text-ink mb-2">Subscribe to Publish</h3>
              <p className="text-sm text-ink/70">Choose a plan to unlock publishing and become a contributor.</p>
            </div>
            <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-0.5 bg-blue-300/30"></div>
          </div>

          {/* Step 4 */}
          <div className="relative">
            <div className="glass-panel p-6 h-full flex flex-col">
              <div className="mb-4 inline-flex items-center justify-center h-12 w-12 rounded-full bg-orange-200 text-orange-600 font-bold text-lg">4</div>
              <h3 className="font-display text-lg font-bold text-ink mb-2">Publish & Grow</h3>
              <p className="text-sm text-ink/70">Share your ideas with a global community of innovators.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription & CTA Section */}
      <section className="relative overflow-hidden rounded-[28px] bg-ink p-10 text-center text-white shadow-card sm:p-16">
        <div className="absolute -left-10 -top-24 h-64 w-64 rounded-full bg-coral/30 blur-[100px]"></div>
        <div className="absolute -bottom-24 -right-10 h-64 w-64 rounded-full bg-teal/30 blur-[100px]"></div>

        <div className="relative z-10 mx-auto max-w-3xl">
          <span className="mb-4 inline-block rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm font-semibold tracking-wider text-white">
            {BRAND_COPY}
          </span>
          <h2 className="mt-3 mb-6 font-display text-3xl font-bold sm:text-4xl">
            Publish Your Ideas. Build Your Authority.
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg font-light leading-relaxed text-white/80">
            {SITE_NAME} is the publishing layer for <strong>thought leadership in AI, technology, business, and innovation</strong>. 
            Share your expertise with thousands of readers globally.
          </p>

          {/* Subscription Info Box */}
          <div className="mb-10 rounded-xl bg-white/10 border border-white/20 p-6 backdrop-blur-sm">
            <p className="text-white/90 font-medium mb-2">💡 Publishing requires a subscription</p>
            <p className="text-sm text-white/70">All plans unlock the same premium publishing experience. Choose based on your publishing frequency and budget.</p>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/plans">
              <Button variant="primary" className="border-0 bg-coral px-8 py-4 text-base text-white shadow-lg shadow-coral/20 hover:bg-coral/90">
                View Subscription Plans
              </Button>
            </Link>
            <Link to="/explore">
              <Button variant="ghost" className="border border-white/20 px-8 py-4 text-base">
                Browse Articles First
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
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

      {/* Feed Section */}
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
