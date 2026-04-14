import { useAuthStore } from "../../store/authStore.js"

export default function Profile() {
  const user = useAuthStore((state) => state.user)

  return (
    <div className="mx-auto max-w-3xl glass-panel p-8">
      <span className="eyebrow">Profile</span>
      <h1 className="mt-4 font-display text-4xl">{user?.full_name || user?.username}</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl bg-white/70 p-5">
          <div className="text-sm text-ink/60">Email</div>
          <div className="mt-2 font-semibold">{user?.email}</div>
        </div>
        <div className="rounded-3xl bg-white/70 p-5">
          <div className="text-sm text-ink/60">Subscription access</div>
          <div className="mt-2 font-semibold">{user?.has_active_subscription ? "Active" : "Inactive"}</div>
        </div>
      </div>
      <p className="mt-6 text-sm text-ink/70">{user?.bio || "No bio added yet."}</p>
    </div>
  )
}

