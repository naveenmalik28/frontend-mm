import { useCallback, useMemo } from "react"
import { Helmet } from "react-helmet-async"
import { useNavigate, useParams } from "react-router-dom"

import ArticleList from "../components/articles/ArticleList.jsx"
import CategoryFilter from "../components/articles/CategoryFilter.jsx"
import Spinner from "../components/ui/Spinner.jsx"
import { useArticles } from "../hooks/useArticles.js"

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

  return (
    <div className="space-y-6">
      <Helmet>
        <title>{category ? `${currentCatName} Articles` : "Explore All Articles"} | Magnivel Media</title>
        <meta name="description" content={`Browse ${currentCatName.toLowerCase()} articles on Magnivel Media.`} />
      </Helmet>
      <div className="glass-panel p-8">
        <span className="eyebrow">Explore</span>
        <h1 className="section-title mt-3">Browse {category ? currentCatName : "the publishing catalog"}</h1>
        <p className="mt-3 max-w-2xl text-sm text-ink/70">Filter by category, then dive into published stories and the public reading experience.</p>
      </div>

      <CategoryFilter categories={categories} activeCategory={category} onChange={handleCategoryChange} />

      <div className="text-sm text-ink/60">{meta.count || articles.length} articles available</div>
      {loading ? <Spinner /> : <ArticleList articles={articles} />}
    </div>
  )
}
