import axios from "axios"
import { useAuthStore } from "../store/authStore.js"

const productionApiUrl = "https://api.magnivel.com"

const baseURL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV ? "http://localhost:8000" : productionApiUrl)

const api = axios.create({
  baseURL: `${baseURL}/api`,
})

// Refresh control
let isRefreshing = false
let refreshSubscribers = []

const subscribeTokenRefresh = (callback) => {
  refreshSubscribers.push(callback)
}

const onRefreshed = (newToken) => {
  refreshSubscribers.forEach((cb) => cb(newToken))
  refreshSubscribers = []
}

// Request Interceptor
api.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState()

  config.headers = config.headers || {}

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      const { refreshToken, user, login, logout } =
        useAuthStore.getState()

      if (!refreshToken) {
        logout()
        return Promise.reject(error)
      }

      // If already refreshing → queue requests
      if (isRefreshing) {
        return new Promise((resolve) => {
          subscribeTokenRefresh((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            resolve(api(originalRequest))
          })
        })
      }

      isRefreshing = true

      try {
        const response = await axios.post(
          `${baseURL}/api/auth/token/refresh/`,
          { refresh: refreshToken }
        )

        const newAccessToken = response.data.access

        login(user, newAccessToken, refreshToken)

        onRefreshed(newAccessToken)
        isRefreshing = false

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

        return api(originalRequest)
      } catch (refreshError) {
        isRefreshing = false
        logout()

        // Let UI handle redirect
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default api