import { Navigate, Outlet } from "react-router-dom"

import { useAuthStore } from "../store/authStore.js"

export default function SubscriberRoutes() {
  const user = useAuthStore((state) => state.user)

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (!user.has_active_subscription) {
    return <Navigate to="/plans" replace />
  }

  return <Outlet />
}

