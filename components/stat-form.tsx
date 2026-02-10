"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"

interface Stat {
  id: string
  label: string
  value: string
  icon?: string | null
  featured: boolean
}

interface StatFormProps {
  stat?: Stat | null
  onSave: () => void
  onCancel: () => void
}

export function StatForm({ stat, onSave, onCancel }: StatFormProps) {
  const [label, setLabel] = useState("")
  const [value, setValue] = useState("")
  const [icon, setIcon] = useState("")
  const [featured, setFeatured] = useState(true)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (stat) {
      setLabel(stat.label)
      setValue(stat.value)
      setIcon(stat.icon || "")
      setFeatured(stat.featured)
    }
  }, [stat])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = stat ? `/api/stats/${stat.id}` : "/api/stats"
      const method = stat ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label, value, icon, featured }),
      })

      if (!res.ok) throw new Error("Failed to save stat")

      toast.success(`Stat ${stat ? "updated" : "created"} successfully`)
      onSave()
    } catch (error) {
      toast.error("Failed to save stat")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="label">Label</Label>
        <Input
          id="label"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="value">Value</Label>
        <Input
          id="value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="icon">Icon (optional)</Label>
        <Input
          id="icon"
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
          placeholder="Icon name or URL"
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





