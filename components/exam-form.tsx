"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"

interface Exam {
  id: string
  name: string
  category?: string | null
  image?: string | null
  featured: boolean
}

interface ExamFormProps {
  exam?: Exam | null
  onSave: () => void
  onCancel: () => void
}

export function ExamForm({ exam, onSave, onCancel }: ExamFormProps) {
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [image, setImage] = useState("")
  const [featured, setFeatured] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (exam) {
      setName(exam.name)
      setCategory(exam.category || "")
      setImage(exam.image || "")
      setFeatured(exam.featured)
    }
  }, [exam])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = exam ? `/api/exams/${exam.id}` : "/api/exams"
      const method = exam ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, category, image, featured }),
      })

      if (!res.ok) throw new Error("Failed to save exam")

      toast.success(`Exam ${exam ? "updated" : "created"} successfully`)
      onSave()
    } catch (error) {
      toast.error("Failed to save exam")
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
        <Label htmlFor="category">Category</Label>
        <Input
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
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





