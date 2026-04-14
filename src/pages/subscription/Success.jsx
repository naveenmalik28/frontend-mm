import { Link } from "react-router-dom"

import Button from "../../components/ui/Button.jsx"

export default function Success() {
  return (
    <div className="mx-auto max-w-2xl glass-panel p-8 text-center">
      <span className="eyebrow">Success</span>
      <h1 className="mt-4 font-display text-5xl">Subscription activated</h1>
      <p className="mt-4 text-sm text-ink/70">You can now publish articles and access subscriber-only workspace routes.</p>
      <Link className="mt-8 inline-flex" to="/dashboard/new-article">
        <Button>Write your next article</Button>
      </Link>
    </div>
  )
}

