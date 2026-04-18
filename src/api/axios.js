import axios from "axios"

import { useAuthStore } from "../store/authStore.js"

const productionApiUrl = "https://api.magnivel.com"
const baseURL = import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? "http://localhost:8000" : productionApiUrl)

const api = axios.create({
  baseURL: `${baseURL}/api`,
})

api.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState()
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    if (error.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true
      const { refreshToken, user, login, logout } = useAuthStore.getState()
      if (!refreshToken) {
        logout()
        return Promise.reject(error)
      }
      try {
        const response = await axios.post(`${baseURL}/api/auth/token/refresh/`, { refresh: refreshToken })
        login(user, response.data.access, refreshToken)
        originalRequest.headers.Authorization = `Bearer ${response.data.access}`
        return api(originalRequest)
      } catch (refreshError) {
        logout()
        window.location.href = "/login"
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  },
)

export default api
