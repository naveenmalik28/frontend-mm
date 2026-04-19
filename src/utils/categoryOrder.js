import { CATEGORY_DESCRIPTIONS, CATEGORY_ORDER } from "../config/site.js"

export const sortCategories = (categories = []) =>
  [...categories].sort((left, right) => {
    const leftIndex = CATEGORY_ORDER.indexOf(left.slug)
    const rightIndex = CATEGORY_ORDER.indexOf(right.slug)

    if (leftIndex === -1 && rightIndex === -1) return left.name.localeCompare(right.name)
    if (leftIndex === -1) return 1
    if (rightIndex === -1) return -1
    return leftIndex - rightIndex
  })

export const getCategoryDescription = (category) =>
  category?.description || CATEGORY_DESCRIPTIONS[category?.slug] || "Explore thoughtful reporting and analysis."
