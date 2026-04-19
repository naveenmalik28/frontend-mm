import { useCallback, useMemo } from "react"
import { useNavigate, useParams } from "react-router-dom"

import ArticleList from "../components/articles/ArticleList.jsx"
import CategoryFilter from "../components/articles/CategoryFilter.jsx"
import SeoHead from "../components/seo/SeoHead.jsx"
import Spinner from "../components/ui/Spinner.jsx"
import { SITE_NAME } from "../config/site.js"
import { useArticles } from "../hooks/useArticles.js"
import { getCategoryDescription } from "../utils/categoryOrder.js"

export default function Explore() {
  const { slug } = useParams()
  const navigate = useNavigate()

  const category = slug || ""
  const params = useMemo(() => (category ? { category } : {}), [category])
  const { articles, categories, loading, meta } = useArticles(params)

  const handleCategoryChange = useCallback(
    (newCategorySlug) => {
      if (newCategorySlug) {
        navigate(`/category/${newCategorySlug}`)
        return
      }

      navigate("/explore")
    },
    [navigate],
  )

  const currentCatName = useMemo(
    () => categories.find((currentCategory) => currentCategory.slug === category)?.name || "All categories",
    [categories, category],
  )
  const currentCategory = useMemo(
    () => categories.find((currentCategory) => currentCategory.slug === category) || null,
    [categories, category],
  )

  return (
    <div className="space-y-8">
      <SeoHead
        title={category ? `${currentCatName} Articles` : `Explore Topics on ${SITE_NAME}`}
        description={
          category
            ? `Browse ${currentCatName.toLowerCase()} articles, analysis, and commentary on Magnivel Media.`
            : "Explore every Magnivel Media category, from AI and software development to science, business, education, and society."
        }
        path={category ? `/category/${category}` : "/explore"}
        schema={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: category ? `${currentCatName} Articles` : "Explore Magnivel Media",
          url: category ? `https://magnivel.com/category/${category}` : "https://magnivel.com/explore",
        }}
      />
      <div className="glass-panel p-8 sm:p-10">
        <span className="eyebrow">{category ? "Category Archive" : "Explore"}</span>
        <h1 className="section-title mt-3">Browse {category ? currentCatName : "the publishing catalog"}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink/70">
          {category
            ? getCategoryDescription(currentCategory)
            : "Search-friendly topic pages make it easier to discover deeper coverage, stronger internal linking, and the full Magnivel editorial archive."}
        </p>
        <div className="mt-6 text-xs font-bold uppercase tracking-[0.24em] text-ink/45">
          {meta.count || articles.length} articles indexed
        </div>
      </div>

      <CategoryFilter categories={categories} activeCategory={category} onChange={handleCategoryChange} />

      {loading ? <Spinner /> : <ArticleList articles={articles} />}
    </div>
  )
}
