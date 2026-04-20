import { Helmet } from "react-helmet-async"

import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "../../config/site.js"
import { getOptimizedImageUrl } from "../../utils/cloudinaryImage.js"

const absoluteUrl = (value = "") => {
  if (!value) return SITE_URL
  if (value.startsWith("http://") || value.startsWith("https://")) return value
  return `${SITE_URL}${value.startsWith("/") ? value : `/${value}`}`
}

export default function SeoHead({
  title,
  description,
  path = "/",
  image,
  type = "website",
  schema,
  keywords,
}) {
  const canonicalUrl = absoluteUrl(path)
  const rawImage = absoluteUrl(image || DEFAULT_OG_IMAGE)
  const resolvedImage = getOptimizedImageUrl(rawImage, 1200)
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME

  return (
    <Helmet prioritizeSeoTags>
      <html lang="en" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={resolvedImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={resolvedImage} />
      {schema ? <script type="application/ld+json">{JSON.stringify(schema)}</script> : null}
    </Helmet>
  )
}
