import { memo } from "react"

function CategoryFilter({ categories = [], activeCategory, onChange }) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-ink/10 bg-white/70 shadow-sm">
      <div className="no-scrollbar flex items-center overflow-x-auto whitespace-nowrap px-3 py-2 font-display text-sm tracking-wide">
        <button
          type="button"
          className={`shrink-0 rounded-full px-4 py-3 transition-colors ${!activeCategory ? "bg-ink text-white" : "text-ink/60 hover:bg-sand hover:text-ink"}`}
          onClick={() => onChange("")}
        >
          All Topics
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            className={`shrink-0 rounded-full px-4 py-3 transition-colors ${activeCategory === category.slug ? "bg-coral text-white" : "text-ink/60 hover:bg-sand hover:text-ink"}`}
            onClick={() => onChange(category.slug)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default memo(CategoryFilter)
