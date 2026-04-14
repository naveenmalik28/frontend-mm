export default function Spinner({ label = "Loading" }) {
  return (
    <div className="flex items-center gap-3 text-sm text-ink/70">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-coral/20 border-t-coral" />
      <span>{label}</span>
    </div>
  )
}

