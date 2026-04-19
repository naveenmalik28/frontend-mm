import { useEffect, useMemo, useState } from "react"
import { useParams } from "react-router-dom"

import ArticleTemplate from "../components/articles/ArticleTemplate.jsx"
import SeoHead from "../components/seo/SeoHead.jsx"
import { BUSINESS_NAME, SITE_NAME, SITE_URL } from "../config/site.js"
import { fetchArticleBySlug, incrementArticleView } from "../api/articles.api.js"
import Spinner from "../components/ui/Spinner.jsx"
import { parseArticleContent } from "../utils/articleContent.js"

export default function ArticleDetail() {
  const { slug } = useParams()
  const [article, setArticle] = useState(null)
  const [resolvedSlug, setResolvedSlug] = useState(null)
  const loading = resolvedSlug !== slug
  const { contentHtml, toc } = useMemo(() => parseArticleContent(article?.content), [article?.content])

  useEffect(() => {
    let mounted = true

    fetchArticleBySlug(slug)
      .then((data) => {
        if (mounted) {
          setArticle(data)
        }
      })
      .catch(() => {
        if (mounted) {
          setArticle(null)
        }
      })
      .finally(() => {
        if (mounted) {
          setResolvedSlug(slug)
        }
      })

    return () => {
      mounted = false
    }
  }, [slug])

  useEffect(() => {
    if (!article?.id) return

    const viewKey = `article-view:${article.id}`
    if (window.sessionStorage.getItem(viewKey)) return
    window.sessionStorage.setItem(viewKey, "1")

    incrementArticleView(article.id)
      .catch(() => {
        window.sessionStorage.removeItem(viewKey)
      })
  }, [article?.id])

  if (loading) return <Spinner label="Loading article" />
  if (!article) return <div className="glass-panel p-8">Article not found.</div>

  const description = article.excerpt || `Read "${article.title}" on ${SITE_NAME}.`
  const articleUrl = `/article/${article.slug}`
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description,
    image: article.cover_image ? [article.cover_image] : undefined,
    datePublished: article.published_at || undefined,
    dateModified: article.updated_at || article.published_at || undefined,
    author: {
      "@type": "Person",
      name: article.author?.full_name || article.author?.username || SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: `${SITE_URL}${articleUrl}`,
    articleSection: article.category?.name || undefined,
    keywords: (article.tags || []).map((tag) => tag.name).join(", ") || undefined,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
    about: {
      "@type": "Organization",
      name: BUSINESS_NAME,
    },
  }

  return (
    <>
      <SeoHead
        title={article.title}
        description={description}
        path={articleUrl}
        image={article.cover_image}
        type="article"
        keywords={(article.tags || []).map((tag) => tag.name).join(", ")}
        schema={schema}
      />
      <ArticleTemplate
        article={article}
        contentHtml={contentHtml}
        toc={toc}
        relatedArticles={article.related_articles || []}
      />
    </>
  )
}
