import { getOptimizedImageUrl } from "./cloudinaryImage.js"

const slugifyHeading = (value) =>
  String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")

/**
 * Optimize inline images inside article HTML content.
 * Injects Cloudinary transforms and lazy-loading attributes.
 */
function optimizeInlineImages(documentNode) {
  const images = documentNode.body.querySelectorAll("img")
  images.forEach((img) => {
    const src = img.getAttribute("src")
    if (src) {
      img.setAttribute("src", getOptimizedImageUrl(src, 800))
    }
    if (!img.hasAttribute("loading")) {
      img.setAttribute("loading", "lazy")
    }
    if (!img.hasAttribute("decoding")) {
      img.setAttribute("decoding", "async")
    }
  })
}

export function parseArticleContent(html) {
  if (!html || typeof window === "undefined") {
    return { contentHtml: html || "", toc: [] }
  }

  const parser = new DOMParser()
  const documentNode = parser.parseFromString(html, "text/html")
  const headingNodes = [...documentNode.body.querySelectorAll("h2, h3")]
  const seenIds = new Map()

  const toc = headingNodes.map((node) => {
    const rawText = node.textContent?.trim() || "Section"
    const level = node.tagName.toLowerCase()
    const baseId = slugifyHeading(rawText) || `section-${seenIds.size + 1}`
    const nextCount = (seenIds.get(baseId) || 0) + 1
    seenIds.set(baseId, nextCount)
    const id = nextCount === 1 ? baseId : `${baseId}-${nextCount}`
    node.id = id

    return {
      id,
      level,
      label: rawText,
    }
  })

  // Optimize all inline images in article body
  optimizeInlineImages(documentNode)

  return {
    contentHtml: documentNode.body.innerHTML,
    toc,
  }
}
