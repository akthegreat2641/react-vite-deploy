"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"

interface Testimonial {
  id: string
  name: string
  content: string
  image?: string | null
  rating: number
  featured: boolean
}

interface TestimonialFormProps {
  testimonial?: Testimonial | null
  onSave: () => void
  onCancel: () => void
}

export function TestimonialForm({ testimonial, onSave, onCancel }: TestimonialFormProps) {
  const [name, setName] = useState("")
  const [content, setContent] = useState("")
  const [image, setImage] = useState("")
  const [rating, setRating] = useState(5)
  const [featured, setFeatured] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (testimonial) {
      setName(testimonial.name)
      setContent(testimonial.content)
      setImage(testimonial.image || "")
      setRating(testimonial.rating)
      setFeatured(testimonial.featured)
    }
  }, [testimonial])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = testimonial ? `/api/testimonials/${testimonial.id}` : "/api/testimonials"
      const method = testimonial ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          content,
          image,
          rating,
          featured,
        }),
      })

      if (!res.ok) throw new Error("Failed to save testimonial")

      toast.success(`Testimonial ${testimonial ? "updated" : "created"} successfully`)
      onSave()
    } catch (error) {
      toast.error("Failed to save testimonial")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          required
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
      <div>
        <Label htmlFor="rating">Rating (1-5)</Label>
        <Input
          id="rating"
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value) || 5)}
          required
        />
      </div>
      <div className="flex items-center gap-2">
        <Switch
          id="featured"
          checked={featured}
          onCheckedChange={setFeatured}
        />
        <Label htmlFor="featured">Featured</Label>
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





