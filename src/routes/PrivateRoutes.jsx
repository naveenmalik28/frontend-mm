import { Navigate, Outlet, useLocation } from "react-router-dom"

import { useAuthStore } from "../store/authStore.js"

export default function PrivateRoutes() {
  const location = useLocation()
  const user = useAuthStore((state) => state.user)

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  return <Outlet />
}

