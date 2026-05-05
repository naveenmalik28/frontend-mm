import { writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const SITE_URL = "https://magnivel.com"
const PUBLIC_DIR = path.resolve(__dirname, "../public")
const OUTPUT_FILE = path.join(PUBLIC_DIR, "sitemap.xml")
const API_BASE_URL = process.env.VITE_API_BASE_URL || "https://api.magnivel.com"

const ROUTES = [
  "/",
  "/explore",
  "/plans",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/shipping-policy",
  "/cancellation-refund-policy",
]

const STATIC_ROUTE_META = {
  "/": { changefreq: "daily", priority: "1.0" },
  "/explore": { changefreq: "daily", priority: "0.8" },
  "/plans": { changefreq: "weekly", priority: "0.8" },
}

const fetchJson = async (url) => {
  const response = await fetch(url, {
    headers: { Accept: "application/json" },
  })

  if (!response.ok) {
    throw new Error(`Failed request (${response.status}) for ${url}`)
  }

  return response.json()
}

const normalizeDate = (value) => {
  if (!value) return null
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return null
  return parsed.toISOString().split("T")[0]
}

const fetchPublishedArticleUrls = async () => {
  const articleEntries = []
  let nextUrl = `${API_BASE_URL}/api/articles/?is_published=true&page_size=100&ordering=-published_at`

  while (nextUrl) {
    const payload = await fetchJson(nextUrl)
    const items = Array.isArray(payload?.results) ? payload.results : Array.isArray(payload) ? payload : []

    items.forEach((article) => {
      if (article?.slug) {
        articleEntries.push({
          route: `/article/${article.slug}`,
          lastmod: normalizeDate(article.updated_at) || normalizeDate(article.published_at),
          changefreq: "weekly",
          priority: "0.7",
        })
      }
    })

    nextUrl = payload?.next || null
  }

  const deduped = new Map()
  articleEntries.forEach((entry) => {
    if (!deduped.has(entry.route)) {
      deduped.set(entry.route, entry)
    }
  })

  return [...deduped.values()]
}

const date = new Date().toISOString().split("T")[0]

let articleEntries = []
try {
  articleEntries = await fetchPublishedArticleUrls()
  console.log(`Fetched ${articleEntries.length} published articles for sitemap`)
} catch (error) {
  console.warn(`Could not fetch article URLs for sitemap: ${error.message}`)
}

const staticEntries = ROUTES.map((route) => ({
  route,
  lastmod: date,
  changefreq: STATIC_ROUTE_META[route]?.changefreq || "weekly",
  priority: STATIC_ROUTE_META[route]?.priority || "0.6",
}))

const allEntries = [...staticEntries, ...articleEntries]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allEntries.map(
  (entry) => `  <url>
    <loc>${SITE_URL}${entry.route}</loc>
    <lastmod>${entry.lastmod || date}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`,
).join("\n")}
</urlset>
`

await writeFile(OUTPUT_FILE, xml, "utf8")
console.log(`Sitemap generated at ${OUTPUT_FILE}`)
