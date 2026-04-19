import api from "./axios.js"

const unwrapList = (response) => response.data?.results ?? response.data
const isFile = (value) => typeof File !== "undefined" && value instanceof File
const isPreviewUrl = (value) => typeof value === "string" && value.startsWith("blob:")

const toArticleRequestBody = (payload = {}) => {
  if (!isFile(payload.cover_image_file)) {
    const jsonPayload = { ...payload }
    if (isPreviewUrl(jsonPayload.cover_image)) {
      delete jsonPayload.cover_image
    }
    if (!jsonPayload.cover_image_file) {
      delete jsonPayload.cover_image_file
    }
    return jsonPayload
  }

  const formData = new FormData()

  Object.entries(payload).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => formData.append(key, item))
      return
    }

    if (key === "cover_image" && isPreviewUrl(value)) {
      return
    }

    if (value === undefined || value === null) {
      return
    }

    formData.append(key, value)
  })

  return formData
}

const requestConfig = (body) =>
  body instanceof FormData
    ? { headers: { "Content-Type": "multipart/form-data" } }
    : undefined

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
  const body = toArticleRequestBody(payload)
  const { data } = await api.post("/articles/", body, requestConfig(body))
  return data
}

export const updateArticle = async (id, payload) => {
  const body = toArticleRequestBody(payload)
  const { data } = await api.patch(`/articles/${id}/`, body, requestConfig(body))
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
