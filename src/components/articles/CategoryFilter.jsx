export default function CategoryFilter({ categories = [], activeCategory, onChange }) {
  return (
    <div className="relative border-b border-ink/10 bg-transparent">
      <div className="no-scrollbar flex items-center overflow-x-auto whitespace-nowrap font-display text-sm tracking-wide">
        <button
          className={`shrink-0 px-5 py-3 transition-colors ${!activeCategory ? "border-b border-ink font-semibold text-ink" : "text-ink/60 hover:text-ink"}`}
          onClick={() => onChange("")}
        >
          Latest Stories
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            className={`shrink-0 px-5 py-3 transition-colors ${activeCategory === category.slug ? "border-b border-ink font-semibold text-ink" : "text-ink/60 hover:text-ink"}`}
            onClick={() => onChange(category.slug)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  )
}

