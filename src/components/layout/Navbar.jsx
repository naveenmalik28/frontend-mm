import { Link, NavLink, useNavigate } from "react-router-dom"

import { logoutUser } from "../../api/auth.api.js"
import { useAuthStore } from "../../store/authStore.js"
import Button from "../ui/Button.jsx"

export default function Navbar() {
  const user = useAuthStore((state) => state.user)
  const refreshToken = useAuthStore((state) => state.refreshToken)
  const logout = useAuthStore((state) => state.logout)
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      if (refreshToken) await logoutUser(refreshToken)
    } catch {
      // Ignore logout API issues and clear the client session anyway.
    } finally {
      logout()
      navigate("/")
    }
  }

  return (
    <header className="sticky top-0 z-20 border-b border-white/60 bg-sand/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <span className="rounded-full bg-coral px-3 py-2 font-display text-lg font-semibold text-white">MIM</span>
          <div>
            <div className="text-xs uppercase tracking-[0.28em] text-teal">Magnivel International Media</div>
            <div className="font-display text-xl">Stories with signal</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <NavLink to="/" className="hover:text-coral">Home</NavLink>
          <NavLink to="/explore" className="hover:text-coral">Explore</NavLink>
          <NavLink to="/plans" className="hover:text-coral">Plans</NavLink>
          {user ? <NavLink to="/dashboard" className="hover:text-coral">Dashboard</NavLink> : null}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden text-sm text-ink/70 sm:inline">{user.full_name || user.username}</span>
              <Button variant="ghost" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Link className="hidden text-sm font-semibold text-ink/80 sm:inline" to="/login">Login</Link>
              <Link to="/register"><Button>Join now</Button></Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

