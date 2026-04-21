/**
 * Cloudinary Image Optimization Utility
 *
 * Automatically injects Cloudinary transformation parameters to reduce
 * image sizes from ~2 MB originals down to ~30–100 KB responsive versions.
 *
 * Supports:
 *  - Automatic format negotiation  (f_auto)
 *  - Quality compression            (q_auto)
 *  - Width-based resizing            (w_<n>)
 *  - Aspect ratio cropping           (ar_<x:y>, c_fill, g_auto)
 *  - Responsive srcSet generation    (400w / 800w / 1200w)
 */

const CLOUDINARY_UPLOAD_RE = /\/upload\/(?:v\d+\/)?/

/** Standard responsive breakpoints (px) */
export const IMG_WIDTHS = [400, 800, 1200]

/**
 * Inject Cloudinary transformation params into a URL.
 *
 * @param {string} url          – Original Cloudinary URL (or any URL)
 * @param {number} [width]      – Desired width in px (omit for original)
 * @param {string} [quality]    – Cloudinary quality preset (default "auto")
 * @param {string} [aspectRatio] – Desired aspect ratio (e.g., "16:9", "3:2")
 * @returns {string}            – Transformed URL (passthrough for non-Cloudinary)
 */
export function getOptimizedImageUrl(url, width, quality = "auto", aspectRatio = undefined) {
  if (!url || typeof url !== "string") return url || ""

  // Don't touch blob / data / non-Cloudinary URLs
  if (!CLOUDINARY_UPLOAD_RE.test(url)) return url

  const transforms = [`f_auto`, `q_${quality}`]
  if (width) transforms.push(`w_${width}`)
  if (aspectRatio) transforms.push(`c_fill,g_auto,ar_${aspectRatio}`)

  const transformString = transforms.join(",")

  // Insert transforms right after /upload/ (before the optional version folder)
  return url.replace(CLOUDINARY_UPLOAD_RE, (match) => {
    // Keep the original trailing version path if present
    return `/upload/${transformString}/${match.replace("/upload/", "")}`
  })
}

/**
 * Build a `srcSet` string for responsive images.
 *
 * @param {string} url          – Original Cloudinary URL
 * @param {number[]} widths     – Array of widths (default IMG_WIDTHS)
 * @param {string} [quality]    – Desired quality preset
 * @param {string} [aspectRatio] – Aspect ratio to crop to
 * @returns {string}            – Ready-to-use srcSet value
 */
export function getImageSrcSet(url, widths = IMG_WIDTHS, quality = "auto", aspectRatio = undefined) {
  if (!url || !CLOUDINARY_UPLOAD_RE.test(url)) return undefined

  return widths.map((w) => `${getOptimizedImageUrl(url, w, quality, aspectRatio)} ${w}w`).join(", ")
}

/**
 * Default `sizes` attribute for common layouts.
 *
 * Mobile-first: 100 vw → 50 vw on md → fixed cap on lg.
 */
export const CARD_IMAGE_SIZES = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
export const HERO_IMAGE_SIZES = "(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
export const ARTICLE_COVER_SIZES = "(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 900px"
