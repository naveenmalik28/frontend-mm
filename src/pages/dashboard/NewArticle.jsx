import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import {
  createArticle,
  createTag,
  fetchCategories,
  fetchMyArticles,
  fetchTags,
  publishArticle,
  updateArticle,
  uploadImage,
} from "../../api/articles.api.js"
import ArticleEditor from "../../components/articles/ArticleEditor.jsx"
import Sidebar from "../../components/layout/Sidebar.jsx"
import Button from "../../components/ui/Button.jsx"

const EMPTY_FORM = {
  title: "",
  excerpt: "",
  content: "",
  category_id: "",
  tag_ids: [],
  cover_image: "",
  status: "draft",
}

export default function NewArticle() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [categories, setCategories] = useState([])
  const [tags, setTags] = useState([])
  const [form, setForm] = useState(EMPTY_FORM)
  const [newTagName, setNewTagName] = useState("")
  const [saving, setSaving] = useState(false)
  const [creatingTag, setCreatingTag] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    let mounted = true

    Promise.all([fetchCategories(), fetchTags()])
      .then(([categoryData, tagData]) => {
        if (!mounted) return
        setCategories(categoryData)
        setTags(tagData)
      })
      .catch(() => {
        if (mounted) setError("Failed to load categories or tags.")
      })

    if (id) {
      fetchMyArticles()
        .then((data) => {
          if (!mounted) return
          const article = (data.results || data).find((item) => item.id === id)
          if (!article) {
            setError("Article not found.")
            return
          }
          setForm({
            title: article.title || "",
            excerpt: article.excerpt || "",
            content: article.content || "",
            category_id: article.category?.id ?? "",
            tag_ids: (article.tags || []).map((tag) => tag.id),
            cover_image: article.cover_image || "",
            status: article.status || "draft",
          })
        })
        .catch(() => {
          if (mounted) setError("Failed to load article.")
        })
    }

    return () => {
      mounted = false
    }
  }, [id])

  const saveArticle = async (publish = false) => {
    setSaving(true)
    setError("")
    try {
      const payload = {
        ...form,
        category_id: form.category_id ? Number(form.category_id) : null,
        tag_ids: form.tag_ids,
        status: publish ? "published" : "draft",
      }
      const article = id ? await updateArticle(id, payload) : await createArticle(payload)
      if (publish && article.status !== "published") {
        await publishArticle(article.id)
      }
      navigate("/dashboard/my-articles")
    } catch (err) {
      const detail = err.response?.data
      if (typeof detail === "object") {
        setError(Object.entries(detail).map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(", ") : value}`).join(" | "))
      } else {
        setError("Failed to save article.")
      }
    } finally {
      setSaving(false)
    }
  }

  const handleCreateTag = async () => {
    const name = newTagName.trim()
    if (!name) return

    setCreatingTag(true)
    setError("")
    try {
      const tag = await createTag({ name })
      setTags((prev) => [...prev, tag].sort((a, b) => a.name.localeCompare(b.name)))
      setForm((prev) => ({ ...prev, tag_ids: [...prev.tag_ids, tag.id] }))
      setNewTagName("")
    } catch (err) {
      const detail = err.response?.data
      if (typeof detail === "object") {
        setError(Object.entries(detail).map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(", ") : value}`).join(" | "))
      } else {
        setError("Failed to create tag.")
      }
    } finally {
      setCreatingTag(false)
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="space-y-6">
        <section className="glass-panel p-8">
          <span className="eyebrow">{id ? "Edit article" : "New article"}</span>
          <h1 className="mt-4 font-display text-4xl">Craft the next story</h1>
        </section>

        {error && (
          <div className="rounded-3xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="grid gap-6 xl:grid-cols-[0.7fr_1.3fr]">
          <div className="glass-panel space-y-4 p-6">
            <input className="input" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <textarea className="textarea" placeholder="Excerpt" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                className="w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm text-ink outline-none file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-coral/10 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-coral hover:file:bg-coral/20"
                onChange={async (e) => {
                  if (e.target.files?.[0]) {
                    try {
                      const { url } = await uploadImage(e.target.files[0])
                      setForm((prev) => ({ ...prev, cover_image: url }))
                    } catch {
                      setError("Failed to upload image.")
                    }
                  }
                }}
              />
              <div className="mt-2 flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-wide text-ink/40">Or paste URL</span>
                <input
                  className="w-full rounded border-b border-ink/10 bg-transparent py-1 text-xs text-ink placeholder-ink/30 outline-none focus:border-coral"
                  placeholder="https://..."
                  value={form.cover_image}
                  onChange={(e) => setForm({ ...form, cover_image: e.target.value })}
                />
              </div>
              {form.cover_image && (
                <img
                  src={form.cover_image}
                  alt="Preview"
                  className="mt-3 max-h-40 w-full rounded-xl object-cover shadow-sm"
                  onError={(e) => (e.target.style.display = "none")}
                />
              )}
            </div>
            <select className="input" value={form.category_id} onChange={(e) => setForm({ ...form, category_id: e.target.value ? Number(e.target.value) : "" })}>
              <option value="">Select category</option>
              {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
            </select>
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  className="input"
                  placeholder="Create a new tag"
                  value={newTagName}
                  onChange={(e) => setNewTagName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      handleCreateTag()
                    }
                  }}
                />
                <Button onClick={handleCreateTag} type="button" disabled={creatingTag}>
                  {creatingTag ? "Adding..." : "Add tag"}
                </Button>
              </div>
              <p className="text-xs text-ink/50">Select existing tags below or create one instantly for this article.</p>
            </div>
            <select
              multiple
              className="input min-h-[140px]"
              value={form.tag_ids}
              onChange={(e) => setForm({ ...form, tag_ids: Array.from(e.target.selectedOptions, (option) => Number(option.value)) })}
            >
              {tags.map((tag) => <option key={tag.id} value={tag.id}>{tag.name}</option>)}
            </select>
            <div className="flex gap-3">
              <Button onClick={() => saveArticle(false)} type="button" disabled={saving}>{saving ? "Saving..." : "Save draft"}</Button>
              <Button onClick={() => saveArticle(true)} type="button" variant="secondary" disabled={saving}>{saving ? "Saving..." : "Publish"}</Button>
            </div>
          </div>
          <ArticleEditor value={form.content} onChange={(content) => setForm({ ...form, content })} />
        </div>
      </div>
    </div>
  )
}
