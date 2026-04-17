import { Helmet } from "react-helmet-async"
import { Link, useNavigate } from "react-router-dom"

import { useArticles } from "../hooks/useArticles.js"
import ArticleList from "../components/articles/ArticleList.jsx"
import CategoryFilter from "../components/articles/CategoryFilter.jsx"
import Spinner from "../components/ui/Spinner.jsx"
import Button from "../components/ui/Button.jsx"

export default function Home() {
  const navigate = useNavigate()
  const { articles, categories, loading } = useArticles({ ordering: "-published_at" })

  const featuredArticle = articles.find((a) => a.is_featured) || articles[0]
  const trendingArticles = articles.filter((a) => a.id !== featuredArticle?.id).slice(0, 3)
  const feedArticles = articles.filter((a) => a.id !== featuredArticle?.id).slice(3, 9)

  return (
    <div className="space-y-16">
      <Helmet>
        <title>Magnivel Media | Ideas That Shape the Future</title>
        <meta name="description" content="Discover profound insights on technology, business, and society from leading thinkers around the globe." />
        <meta property="og:title" content="Magnivel Media" />
        <meta property="og:description" content="Discover profound insights on technology, business, and society from leading thinkers around the globe." />
      </Helmet>

      {/* Hero / Featured Section */}
      <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="glass-panel overflow-hidden">
          {loading || !featuredArticle ? (
            <div className="flex h-[500px] items-center justify-center p-8">
              <Spinner label="Loading featured insight…" />
            </div>
          ) : (
            <div className="group relative flex h-full flex-col justify-end p-8 md:min-h-[500px] md:p-12">
              {featuredArticle.cover_image && (
                <div className="absolute inset-0 -z-10">
                  <img src={featuredArticle.cover_image} alt={featuredArticle.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent"></div>
                </div>
              )}
              <div className="relative z-10 text-white">
                <div className="mb-4 inline-block rounded bg-coral px-3 py-1 text-xs font-bold uppercase tracking-wider">
                  {featuredArticle.category?.name || "Featured Insight"}
                </div>
                <h1 className="font-display text-4xl leading-tight sm:text-5xl">
                  <Link to={`/article/${featuredArticle.slug}`} className="hover:text-coral/90 transition-colors">
                    {featuredArticle.title}
                  </Link>
                </h1>
                <p className="mt-4 max-w-2xl text-lg text-white/80 line-clamp-2">
                  {featuredArticle.excerpt}
                </p>
                <div className="mt-6 flex items-center gap-4 text-sm font-medium text-white/70">
                  <span>{featuredArticle.author?.full_name || featuredArticle.author?.username || "Magnivel Media"}</span>
                  <span className="h-1 w-1 rounded-full bg-white/50"></span>
                  <span>{featuredArticle.read_time} min read</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="glass-panel flex flex-col p-8">
          <div className="mb-6">
            <span className="eyebrow">Trending</span>
            <p className="mt-2 font-display text-xl leading-tight">Must-read perspectives</p>
          </div>
          <div className="flex flex-1 flex-col gap-6">
            {loading ? (
               <Spinner />
            ) : (
              trendingArticles.map((article, index) => (
                <div key={article.id} className="group flex items-start gap-4 border-b border-ink/5 pb-6 last:border-0 last:pb-0">
                  <span className="font-display text-3xl font-bold text-ink/10 group-hover:text-coral/30 transition-colors">0{index + 1}</span>
                  <div>
                    <h3 className="font-display text-lg font-semibold leading-snug text-ink group-hover:text-coral transition-colors">
                      <Link to={`/article/${article.slug}`}>{article.title}</Link>
                    </h3>
                    <div className="mt-2 text-xs font-semibold uppercase tracking-wider text-ink/40">
                      {article.category?.name || "Insight"}
                    </div>
                  </div>
                </div>
              ))
            )}
            {!loading && trendingArticles.length === 0 && (
              <p className="text-sm text-ink/50">No trending articles available yet.</p>
            )}
          </div>
        </div>
      </section>

      {/* Writer CTA Banner (Short About Section) */}
      <section className="relative overflow-hidden rounded-[28px] bg-ink p-10 text-center text-white shadow-card sm:p-16">
        <div className="absolute -left-10 -top-24 h-64 w-64 rounded-full bg-coral/30 blur-[100px]"></div>
        <div className="absolute -bottom-24 -right-10 h-64 w-64 rounded-full bg-teal/30 blur-[100px]"></div>
        
        <div className="relative z-10 mx-auto max-w-3xl">
          <span className="mb-4 inline-block rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm font-semibold tracking-wider text-white">Empowering Global Perspectives</span>
          <h2 className="font-display text-3xl font-bold sm:text-4xl mt-3 mb-6">Join a community of thinkers shaping the future.</h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-white/80 leading-relaxed font-light">
            Magnivel International Media is a modern platform for thought-provoking ideas, innovative insights, and diverse perspectives from voices around the world. We bring together thinkers and creators to share knowledge that inspires.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link to="/register">
               <Button variant="primary" className="bg-coral text-white hover:bg-coral/90 border-0 px-8 py-4 text-base shadow-lg shadow-coral/20">Become a Contributor</Button>
            </Link>
            <Link to="/explore">
               <Button variant="ghost" className="border border-white/20 px-8 py-4 text-base hover:bg-white/10">Explore Ideas</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Feed */}
      <section className="space-y-6">
        <CategoryFilter 
          categories={categories} 
          activeCategory="" 
          onChange={(slug) => {
            if (slug) navigate(`/category/${slug}`)
            else navigate("/explore")
          }} 
        />
        {loading ? <Spinner /> : <ArticleList articles={feedArticles} />}
        {!loading && feedArticles.length > 0 && (
          <div className="mt-8 text-center border-t border-ink/5 pt-8">
            <Link to="/explore">
              <Button variant="ghost">View Complete Archive</Button>
            </Link>
          </div>
        )}
      </section>
    </div>
  )
}
