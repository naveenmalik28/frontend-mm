import { memo } from "react"

import ArticleCard from "./ArticleCard.jsx"

function ArticleList({ articles = [] }) {
  return <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{articles.map((article) => <ArticleCard key={article.id} article={article} />)}</div>
}

export default memo(ArticleList)
