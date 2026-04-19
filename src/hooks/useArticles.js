import { useEffect, useMemo, useRef, useState } from "react"

import { fetchArticles, fetchCategories } from "../api/articles.api.js"
import { sortCategories } from "../utils/categoryOrder.js"
import { serializeCacheKey } from "../utils/requestCache.js"

export function useArticles(initialParams = {}) {
  const [articles, setArticles] = useState([])
  const [categories, setCategories] = useState([])
  const [meta, setMeta] = useState({ count: 0 })
  const [resolvedKey, setResolvedKey] = useState(null)
  const requestKey = useMemo(() => serializeCacheKey(initialParams), [initialParams])
  const paramsRef = useRef(initialParams)
  const loading = resolvedKey !== requestKey

  useEffect(() => {
    paramsRef.current = initialParams
  }, [initialParams])

  useEffect(() => {
    let mounted = true
    Promise.all([fetchArticles(paramsRef.current), fetchCategories()])
      .then(([articleData, categoryData]) => {
        if (!mounted) return
        setArticles(articleData.results || articleData)
        setMeta(articleData)
        setCategories(sortCategories(categoryData))
      })
      .catch(() => {
        if (!mounted) return
        setArticles([])
        setCategories([])
        setMeta({ count: 0 })
      })
      .finally(() => {
        if (mounted) setResolvedKey(requestKey)
      })

    return () => {
      mounted = false
    }
  }, [requestKey])

  return { articles, categories, meta, loading }
}
