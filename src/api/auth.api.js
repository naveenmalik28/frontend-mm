import api from "./axios.js"

export const registerUser = async (payload) => {
  const { data } = await api.post("/auth/register/", payload)
  return data
}

export const loginUser = async (payload) => {
  try {
    const { data } = await api.post("/auth/login/", payload)
    return data
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message)
    throw error
  }
}

export const fetchCurrentUser = async () => {
  const { data } = await api.get("/auth/me/")
  return data
}

export const updateProfile = async (payload) => {
  const { data } = await api.patch("/auth/me/", payload)
  return data
}

export const changePassword = async (payload) => {
  const { data } = await api.post("/auth/password/change/", payload)
  return data
}

export const logoutUser = async (refreshToken) => {
  try {
    await api.post("/auth/logout/", { refresh: refreshToken })
  } catch (error) {
    console.warn("Logout failed, forcing local logout:", error.response?.data || error.message)
  }
}
