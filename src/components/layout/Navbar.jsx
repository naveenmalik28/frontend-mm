import { Link, NavLink, useNavigate } from "react-router-dom"

import { logoutUser } from "../../api/auth.api.js"
import {
  BRAND_COPY,
  BUSINESS_CONTACT_URL,
  BUSINESS_SERVICES_URL,
  BUSINESS_URL,
} from "../../config/site.js"
import { useAuthStore } from "../../store/authStore.js"
import { useSubscriptionStore } from "../../store/subscriptionStore.js"
import BrandLockup from "../brand/BrandLockup.jsx"
import Button from "../ui/Button.jsx"

export default function Navbar() {
  const user = useAuthStore((state) => state.user)
  const refreshToken = useAuthStore((state) => state.refreshToken)
  const logout = useAuthStore((state) => state.logout)
  const clearSubscription = useSubscriptionStore((state) => state.clearSubscription)
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      if (refreshToken) await logoutUser(refreshToken)
    } catch {
      // Ignore logout API issues and clear the client session anyway.
    } finally {
      logout()
      clearSubscription()
      navigate("/")
    }
  }

  return (
    <header className="sticky top-0 z-20 border-b border-white/60 bg-sand/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <BrandLockup />

        <nav className="hidden items-center gap-6 text-sm font-medium lg:flex">
          <NavLink to="/" className="hover:text-coral">Home</NavLink>
          <NavLink to="/explore" className="hover:text-coral">Explore</NavLink>
          <a href={BUSINESS_URL} target="_blank" rel="noreferrer" className="hover:text-coral">Magnivel International</a>
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
