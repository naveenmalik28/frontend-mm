import { useCallback, useEffect, useMemo, useState } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"

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
  const [searchParams] = useSearchParams()
  const [searchInput, setSearchInput] = useState(searchParams.get("q") || "")

  const category = slug || ""
  const query = (searchParams.get("q") || "").trim()
  const params = useMemo(() => {
    const nextParams = {}
    if (category) nextParams.category = category
    if (query) nextParams.search = query
    return nextParams
  }, [category, query])
  const { articles, categories, loading, meta } = useArticles(params)

  useEffect(() => {
    setSearchInput(query)
  }, [query])

  const handleCategoryChange = useCallback(
    (newCategorySlug) => {
      if (newCategorySlug) {
        const basePath = `/category/${newCategorySlug}`
        navigate(query ? `${basePath}?q=${encodeURIComponent(query)}` : basePath)
        return
      }

      navigate(query ? `/explore?q=${encodeURIComponent(query)}` : "/explore")
    },
    [navigate, query],
  )

  const handleSearchSubmit = useCallback(
    (event) => {
      event.preventDefault()
      const nextQuery = searchInput.trim()
      const basePath = category ? `/category/${category}` : "/explore"
      navigate(nextQuery ? `${basePath}?q=${encodeURIComponent(nextQuery)}` : basePath)
    },
    [category, navigate, searchInput],
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
        title={
          query
            ? `Search "${query}"${category ? ` in ${currentCatName}` : ""}`
            : category
              ? `${currentCatName} Articles`
              : `Explore Topics on ${SITE_NAME}`
        }
        description={
          query
            ? `Search results for "${query}" on Magnivel Media${category ? ` in ${currentCatName}` : ""}.`
            : category
            ? `Browse ${currentCatName.toLowerCase()} articles, analysis, and commentary on Magnivel Media.`
            : "Explore every Magnivel Media category, from AI and software development to science, business, education, and society."
        }
        path={`${category ? `/category/${category}` : "/explore"}${query ? `?q=${encodeURIComponent(query)}` : ""}`}
        schema={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: query
            ? `Search results for ${query}`
            : category
              ? `${currentCatName} Articles`
              : "Explore Magnivel Media",
          url: `${category ? `https://magnivel.com/category/${category}` : "https://magnivel.com/explore"}${query ? `?q=${encodeURIComponent(query)}` : ""}`,
        }}
      />
      <div className="glass-panel p-8 sm:p-10">
        <span className="eyebrow">{category ? "Category Archive" : "Explore"}</span>
        <h1 className="section-title mt-3">
          {query ? `Search results for "${query}"` : `Browse ${category ? currentCatName : "the publishing catalog"}`}
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink/70">
          {query
            ? "Use global search to discover relevant articles quickly across Magnivel Media."
            : category
            ? getCategoryDescription(currentCategory)
            : "Search-friendly topic pages make it easier to discover deeper coverage, stronger internal linking, and the full Magnivel editorial archive."}
        </p>
        <form className="mt-6 max-w-xl" onSubmit={handleSearchSubmit}>
          <label htmlFor="explore-search" className="sr-only">
            Search all articles
          </label>
          <input
            id="explore-search"
            type="search"
            className="input"
            placeholder="Search by title, excerpt, or content"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
          />
        </form>
        <div className="mt-6 text-xs font-bold uppercase tracking-[0.24em] text-ink/45">
          {meta.count || articles.length} articles indexed
        </div>
      </div>

      <CategoryFilter categories={categories} activeCategory={category} onChange={handleCategoryChange} />

      {loading ? (
        <Spinner />
      ) : articles.length ? (
        <ArticleList articles={articles} />
      ) : (
        <div className="glass-panel p-8 text-center text-sm text-ink/70">
          No articles found. Try a different search term or browse another category.
        </div>
      )}
    </div>
  )
}
