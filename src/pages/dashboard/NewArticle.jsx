import { Suspense, lazy, useCallback, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import {
  createArticle,
  createTag,
  fetchCategories,
  fetchMyArticles,
  fetchTags,
  publishArticle,
  updateArticle,
} from "../../api/articles.api.js"
import Sidebar from "../../components/layout/Sidebar.jsx"
import Button from "../../components/ui/Button.jsx"
import Spinner from "../../components/ui/Spinner.jsx"

const ArticleEditor = lazy(() => import("../../components/articles/ArticleEditor.jsx"))

const EMPTY_FORM = {
  title: "",
  excerpt: "",
  content: "",
  category_id: "",
  tag_ids: [],
  cover_image: "",
  cover_image_file: null,
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
  const [showImageURL, setShowImageURL] = useState(false)

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
          const article = (data.results || data).find((item) => String(item.id) === String(id))
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
            cover_image_file: null,
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

  useEffect(() => {
    return () => {
      if (form.cover_image?.startsWith("blob:")) {
        URL.revokeObjectURL(form.cover_image)
      }
    }
  }, [form.cover_image])

  const handleEditorChange = useCallback((content) => {
    setForm((currentForm) => ({ ...currentForm, content }))
  }, [])

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

  const toggleTag = (tagId) => {
    setForm((prev) => {
      const isSelected = prev.tag_ids.includes(tagId)
      return {
        ...prev,
        tag_ids: isSelected ? prev.tag_ids.filter((id) => id !== tagId) : [...prev.tag_ids, tagId],
      }
    })
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

        {/* Change layout: left = editor, right = sticky configuration */}
        <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr] xl:items-start">
          
          {/* Main content area */}
          <div className="order-2 xl:order-1 glass-panel p-6 space-y-6">
            <div>
              <label className="mb-2 block text-sm font-semibold text-ink">Title</label>
              <input className="input" placeholder="Give your article a clear, catchy title..." value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            
            <div>
              <label className="mb-2 block text-sm font-semibold text-ink">Excerpt</label>
              <textarea className="textarea h-24" placeholder="Briefly describe what this article is about..." value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
            </div>
            
            <div>
              <label className="mb-2 block text-sm font-semibold text-ink">Content</label>
              <Suspense
                fallback={
                  <div className="glass-panel p-6">
                    <Spinner label="Loading editor..." />
                  </div>
                }
              >
                <ArticleEditor value={form.content} onChange={handleEditorChange} />
              </Suspense>
            </div>
          </div>

          {/* Configuration sidebar */}
          <div className="order-1 xl:order-2 glass-panel space-y-6 p-6 xl:sticky xl:top-6">
            
            {/* Cover Image */}
            <div>
              <label className="mb-3 flex items-center justify-between text-sm font-semibold text-ink">
                <span>Cover Image</span>
                <button 
                  type="button" 
                  onClick={() => setShowImageURL(!showImageURL)}
                  className="text-xs text-coral hover:underline"
                >
                  {showImageURL ? "Upload file instead" : "Use URL instead"}
                </button>
              </label>
              
              <div className="relative">
                {showImageURL ? (
                  <input
                    className="input text-sm"
                    placeholder="https://example.com/image.jpg"
                    value={form.cover_image}
                    onChange={(e) => setForm({ ...form, cover_image: e.target.value, cover_image_file: null })}
                  />
                ) : (
                  <div className="relative flex items-center justify-center rounded-2xl border-2 border-dashed border-ink/20 bg-ink/5 hover:bg-ink/10 transition-colors p-6 cursor-pointer overflow-hidden">
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 z-10 w-full h-full opacity-0 cursor-pointer"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          const previewUrl = URL.createObjectURL(e.target.files[0])
                          setError("")
                          setForm((prev) => ({
                            ...prev,
                            cover_image: previewUrl,
                            cover_image_file: e.target.files[0],
                          }))
                        }
                      }}
                    />
                    <div className="text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-8 w-8 text-ink/40 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm font-medium text-ink/60">Click or drag image to upload</span>
                      <p className="mt-2 text-xs text-ink/45">The backend uploads it to Cloudinary when you save the article.</p>
                    </div>
                  </div>
                )}

                {form.cover_image && (
                  <div className="mt-4 relative group rounded-xl overflow-hidden shadow-sm">
                    <img
                      src={form.cover_image}
                      alt="Preview"
                      className="max-h-56 w-full object-cover"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                    <button
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, cover_image: "", cover_image_file: null }))}
                      className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/70"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>

            <hr className="border-ink/10" />

            {/* Category */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-ink">Category</label>
              <select className="input" value={form.category_id} onChange={(e) => setForm({ ...form, category_id: e.target.value ? Number(e.target.value) : "" })}>
                <option value="">Select category...</option>
                {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
              </select>
            </div>

            <hr className="border-ink/10" />

            {/* Tags */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-ink">Tags</label>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag) => {
                  const isSelected = form.tag_ids.includes(tag.id)
                  return (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => toggleTag(tag.id)}
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                        isSelected 
                          ? "bg-coral text-white shadow-sm" 
                          : "bg-ink/5 text-ink/70 hover:bg-ink/10 hover:text-ink"
                      }`}
                    >
                      {tag.name}
                      {isSelected && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                    </button>
                  )
                })}
              </div>

              <div className="flex gap-2">
                <input
                  className="input text-sm py-2"
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
                <Button onClick={handleCreateTag} type="button" disabled={creatingTag || !newTagName.trim()} className="py-2 px-4 whitespace-nowrap">
                  {creatingTag ? "Adding..." : "Add"}
                </Button>
              </div>
            </div>

            <hr className="border-ink/10" />

            {/* Actions */}
            <div className="flex flex-col gap-3 pt-2">
              <Button onClick={() => saveArticle(true)} type="button" variant="secondary" disabled={saving}>
                {saving ? "Processing..." : "Publish Article"}
              </Button>
              <Button onClick={() => saveArticle(false)} type="button" disabled={saving}>
                {saving ? "Saving..." : "Save Draft"}
              </Button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}
