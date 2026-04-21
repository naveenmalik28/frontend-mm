import { memo } from "react"

import {
  CARD_IMAGE_SIZES,
  getImageSrcSet,
  getOptimizedImageUrl,
} from "../../utils/cloudinaryImage.js"

/**
 * Performance-optimized image component for Cloudinary-hosted images.
 *
 * Automatically:
 *  - Converts to WebP/AVIF via f_auto
 *  - Compresses quality via q_auto
 *  - Generates responsive srcSet (400w / 800w / 1200w)
 *  - Applies correct loading strategy (eager for LCP, lazy otherwise)
 *
 * @param {object}  props
 * @param {string}  props.src           – Original image URL
 * @param {string}  props.alt           – Alt text
 * @param {string}  [props.className]   – CSS classes
 * @param {number}  [props.width]       – Fallback src width (default 800)
 * @param {string}  [props.sizes]       – Responsive sizes attribute
 * @param {string}  [props.aspectRatio] – Aspect ratio (e.g. "16:9", "3:2")
 * @param {boolean} [props.priority]    – True for above-the-fold / LCP images
 * @param {function} [props.onError]    – Error handler
 */
function OptimizedImage({
  src,
  alt,
  className = "",
  width = 800,
  sizes = CARD_IMAGE_SIZES,
  aspectRatio,
  priority = false,
  onError,
  ...rest
}) {
  const optimizedSrc = getOptimizedImageUrl(src, width, "auto:eco", aspectRatio)
  const srcSet = getImageSrcSet(src, undefined, "auto:eco", aspectRatio)

  return (
    <img
      src={optimizedSrc}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      className={className}
      decoding={priority ? "sync" : "async"}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      onError={onError}
      {...rest}
    />
  )
}

export default memo(OptimizedImage)
