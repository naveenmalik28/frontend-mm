import { useEffect, useState } from "react"

import { fetchArticles, fetchCategories } from "../api/articles.api.js"

export function useArticles(initialParams = {}) {
  const [articles, setArticles] = useState([])
  const [categories, setCategories] = useState([])
  const [meta, setMeta] = useState({ count: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    Promise.all([fetchArticles(initialParams), fetchCategories()])
      .then(([articleData, categoryData]) => {
        if (!mounted) return
        setArticles(articleData.results || articleData)
        setMeta(articleData)
        setCategories(categoryData)
      })
      .catch(() => {
        if (!mounted) return
        setArticles([])
        setCategories([])
        setMeta({ count: 0 })
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [JSON.stringify(initialParams)])

  return { articles, categories, meta, loading }
}
