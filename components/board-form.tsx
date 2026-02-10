"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"

interface Board {
    id: string
    name: string
    category: string
    featured: boolean
}

interface BoardFormProps {
    board?: Board | null
    onSave: () => void
    onCancel: () => void
}

export function BoardForm({ board, onSave, onCancel }: BoardFormProps) {
    const [name, setName] = useState("")
    const [category, setCategory] = useState("")
    const [featured, setFeatured] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (board) {
            setName(board.name)
            setCategory(board.category)
            setFeatured(board.featured)
        }
    }, [board])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const url = board ? `/api/boards/${board.id}` : "/api/boards"
            const method = board ? "PUT" : "POST"

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, category, featured }),
            })

            if (!res.ok) throw new Error("Failed to save board")

            toast.success(`Board ${board ? "updated" : "created"} successfully`)
            onSave()
        } catch (error) {
            toast.error("Failed to save board")
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
