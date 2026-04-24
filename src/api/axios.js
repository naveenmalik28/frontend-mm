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

const subscribeTokenRefresh = (resolve, reject) => {
  refreshSubscribers.push({ resolve, reject })
}

const onRefreshed = (newToken) => {
  refreshSubscribers.forEach(({ resolve }) => resolve(newToken))
  refreshSubscribers = []
}

const onRefreshFailed = (refreshError) => {
  refreshSubscribers.forEach(({ reject }) => reject(refreshError))
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
    const { refreshToken, user, login, logout } = useAuthStore.getState()

    if (!originalRequest || originalRequest.url?.includes("/auth/token/refresh/")) {
      return Promise.reject(error)
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      if (!refreshToken) {
        logout()
        return Promise.reject(error)
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          subscribeTokenRefresh(
            (token) => {
              originalRequest.headers = originalRequest.headers || {}
              originalRequest.headers.Authorization = `Bearer ${token}`
              resolve(api(originalRequest))
            },
            (refreshError) => reject(refreshError),
          )
        })
      }

      isRefreshing = true

      try {
        const response = await axios.post(
          `${baseURL}/api/auth/token/refresh/`,
          { refresh: refreshToken },
        )

        const newAccessToken = response.data.access

        login(user, newAccessToken, refreshToken)
        onRefreshed(newAccessToken)

        originalRequest.headers = originalRequest.headers || {}
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

        return api(originalRequest)
      } catch (refreshError) {
        onRefreshFailed(refreshError)
        logout()
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  },
)

export default api
