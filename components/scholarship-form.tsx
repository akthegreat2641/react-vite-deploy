"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"

interface Scholarship {
  id: string
  name: string
  featured: boolean
}

interface ScholarshipFormProps {
  scholarship?: Scholarship | null
  onSave: () => void
  onCancel: () => void
}

export function ScholarshipForm({ scholarship, onSave, onCancel }: ScholarshipFormProps) {
  const [name, setName] = useState("")
  const [featured, setFeatured] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (scholarship) {
      setName(scholarship.name)
      setFeatured(scholarship.featured)
    }
  }, [scholarship])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = scholarship ? `/api/scholarships/${scholarship.id}` : "/api/scholarships"
      const method = scholarship ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, featured }),
      })

      if (!res.ok) throw new Error("Failed to save scholarship")

      toast.success(`Scholarship ${scholarship ? "updated" : "created"} successfully`)
      onSave()
    } catch (error) {
      toast.error("Failed to save scholarship")
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





