"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"

interface News {
  id: string
  title: string
  content?: string | null
  author: string
  image?: string | null
  featured: boolean
  published: boolean
}

interface NewsFormProps {
  news?: News | null
  onSave: () => void
  onCancel: () => void
}

export function NewsForm({ news, onSave, onCancel }: NewsFormProps) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [author, setAuthor] = useState("")
  const [image, setImage] = useState("")
  const [featured, setFeatured] = useState(false)
  const [published, setPublished] = useState(true)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (news) {
      setTitle(news.title)
      setContent(news.content || "")
      setAuthor(news.author)
      setImage(news.image || "")
      setFeatured(news.featured)
      setPublished(news.published)
    }
  }, [news])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = news ? `/api/news/${news.id}` : "/api/news"
      const method = news ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          author,
          image,
          featured,
          published,
        }),
      })

      if (!res.ok) throw new Error("Failed to save news")

      toast.success(`News ${news ? "updated" : "created"} successfully`)
      onSave()
    } catch (error) {
      toast.error("Failed to save news")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="author">Author</Label>
        <Input
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
        />
      </div>
      <div>
        <Label htmlFor="image">Image URL</Label>
        <Input
          id="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Switch
            id="featured"
            checked={featured}
            onCheckedChange={setFeatured}
          />
          <Label htmlFor="featured">Featured</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            id="published"
            checked={published}
            onCheckedChange={setPublished}
          />
          <Label htmlFor="published">Published</Label>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  )
}





