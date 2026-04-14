import { create } from "zustand"

export const useArticleStore = create((set) => ({
  articles: [],
  featuredArticles: [],
  setArticles: (articles) =>
    set({
      articles,
      featuredArticles: articles.filter((article) => article.is_featured).slice(0, 3),
    }),
}))

