import api from "./axios.js"

export const registerUser = async (payload) => {
  const { data } = await api.post("/auth/register/", payload)
  return data
}

export const loginUser = async (payload) => {
  const { data } = await api.post("/auth/login/", payload)
  return data
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
  await api.post("/auth/logout/", { refresh: refreshToken })
}

