import api from "./axios.js"

const unwrapList = (response) => response.data?.results ?? response.data

export const fetchArticles = async (params = {}) => {
  const { data } = await api.get("/articles/", { params })
  return data
}

export const fetchArticleBySlug = async (slug) => {
  const { data } = await api.get(`/articles/${slug}/`)
  return data
}

export const fetchMyArticles = async (params = {}) => {
  const { data } = await api.get("/articles/my/", { params })
  return data
}

export const createArticle = async (payload) => {
  const { data } = await api.post("/articles/", payload)
  return data
}

export const updateArticle = async (id, payload) => {
  const { data } = await api.patch(`/articles/${id}/`, payload)
  return data
}

export const publishArticle = async (id) => {
  const { data } = await api.post(`/articles/${id}/publish/`)
  return data
}

export const incrementArticleView = async (id) => {
  const { data } = await api.post(`/articles/${id}/increment_view/`)
  return data
}

export const fetchCategories = async () => {
  return unwrapList(await api.get("/categories/"))
}

export const fetchTags = async () => {
  return unwrapList(await api.get("/tags/"))
}

export const createTag = async (payload) => {
  const { data } = await api.post("/tags/", payload)
  return data
}

export const uploadImage = async (file) => {
  const formData = new FormData()
  formData.append("image", file)
  const { data } = await api.post("/articles/upload-image/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
  return data
}
