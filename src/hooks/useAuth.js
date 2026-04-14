import { useEffect, useState } from "react"

import { fetchCurrentUser } from "../api/auth.api.js"
import { useAuthStore } from "../store/authStore.js"

export function useAuthBootstrap() {
  const accessToken = useAuthStore((state) => state.accessToken)
  const updateUser = useAuthStore((state) => state.updateUser)
  const logout = useAuthStore((state) => state.logout)
  const [loading, setLoading] = useState(Boolean(accessToken))

  useEffect(() => {
    let active = true
    if (!accessToken) {
      setLoading(false)
      return undefined
    }

    fetchCurrentUser()
      .then((user) => {
        if (active) {
          updateUser(user)
        }
      })
      .catch(() => {
        if (active) {
          logout()
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false)
        }
      })

    return () => {
      active = false
    }
  }, [accessToken, logout, updateUser])

  return { loading }
}

