"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"

interface College {
  id: string
  name: string
  location: string
  image?: string | null
  logo?: string | null
  featured: boolean
}

interface CollegeFormProps {
  college?: College | null
  onSave: (college: College) => void
  onCancel: () => void
}

export function CollegeForm({ college, onSave, onCancel }: CollegeFormProps) {
  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const [image, setImage] = useState("")
  const [logo, setLogo] = useState("")
  const [featured, setFeatured] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (college) {
      setName(college.name)
      setLocation(college.location)
      setImage(college.image || "")
      setLogo(college.logo || "")
      setFeatured(college.featured)
    }
  }, [college])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = college ? `/api/colleges/${college.id}` : "/api/colleges"
      const method = college ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, location, image, logo, featured }),
      })

      if (!res.ok) throw new Error("Failed to save college")

      const savedCollege: College = await res.json()

      toast.success(`College ${college ? "updated" : "created"} successfully`)
      onSave(savedCollege)
    } catch (error) {
      toast.error("Failed to save college")
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
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
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
        <Label htmlFor="logo">Logo URL</Label>
        <Input
          id="logo"
          value={logo}
          onChange={(e) => setLogo(e.target.value)}
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



