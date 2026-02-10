"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

interface Article {
    id: string
    title: string
    category: string
    content?: string
    image?: string | null
    featured: boolean
    popular: boolean
}

interface ArticleFormProps {
    article?: Article | null
    onSave: (article: Article) => void
    onCancel: () => void
}

export function ArticleForm({ article, onSave, onCancel }: ArticleFormProps) {
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [content, setContent] = useState("")
    const [image, setImage] = useState("")
    const [featured, setFeatured] = useState(false)
    const [popular, setPopular] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (article) {
            setTitle(article.title)
            setCategory(article.category)
            setContent(article.content || "")
            setImage(article.image || "")
            setFeatured(article.featured)
            setPopular(article.popular)
        }
    }, [article])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const url = article ? `/api/articles/${article.id}` : "/api/articles"
            // Change to POST if creating, PUT if updating (though API might use POST for both or have specific PUT logic, assuming PUT for update based on college-form but standard REST usually separates)
            // Actually checking college-form: const method = college ? "PUT" : "POST"
            // But let's check basic API practices. Usually PUT for update. 
            // Wait, I didn't check /api/articles/[id] route. I only checked /api/articles/route.ts.
            // If I want to update, I'll need a dynamic route too. 
            // For now, I'm implementing "Add Article" which uses POST to /api/articles.
            // Update logic might need `app/api/articles/[id]/route.ts`.
            // I will assume for now I am only doing "Add" as per user request "add article option".
            // But if I want to support editing later, I should be aware.
            // For "Add", it is POST.

            const method = article ? "PUT" : "POST"
            // NOTE: I am not creating the [id] route in this turn so Edit might fail if I try it, but the task is "Add Article option". 
            // I will implement assuming standard REST.

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    category,
                    content,
                    image,
                    featured,
                    popular
                }),
            })

            if (!res.ok) {
                const data = await res.json()
                throw new Error(data.error || "Failed to save article")
            }

            const savedArticle: Article = await res.json()

            toast.success(`Article ${article ? "updated" : "created"} successfully`)
            onSave(savedArticle)
        } catch (error) {
            console.error(error)
            toast.error("Failed to save article")
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Input
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-[200px]"
                />
            </div>

            <div className="grid gap-2">
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
                        id="popular"
                        checked={popular}
                        onCheckedChange={setPopular}
                    />
                    <Label htmlFor="popular">Popular</Label>
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
