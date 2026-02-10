"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, Save } from "lucide-react"
import { RichTextEditor } from "@/components/rich-text-editor"
import { toast } from "sonner"

interface Section {
    id?: string
    title: string
    content: string
    order: number
}

interface SubContentDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    category: string | null
}

export default function SubContentDialog({ open, onOpenChange, category }: SubContentDialogProps) {
    const [sections, setSections] = useState<Section[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (open && category) {
            fetchSections()
        } else {
            setSections([])
        }
    }, [open, category])

    const fetchSections = async () => {
        setLoading(true)
        try {
            const res = await fetch(`/api/sub-content?category=${encodeURIComponent(category!)}`)
            if (res.ok) {
                const data = await res.json()
                setSections(data)
            }
        } catch (error) {
            console.error("Failed to fetch sections:", error)
            toast.error("Failed to load content")
        } finally {
            setLoading(false)
        }
    }

    const handleAddSection = () => {
        setSections([
            ...sections,
            {
                title: "",
                content: "",
                order: sections.length,
            },
        ])
    }

    const handleRemoveSection = (index: number) => {
        const newSections = [...sections]
        newSections.splice(index, 1)
        newSections.forEach((s, i) => (s.order = i))
        setSections(newSections)
    }

    const handleSectionChange = (index: number, field: keyof Section, value: string) => {
        const newSections = [...sections]
        newSections[index] = { ...newSections[index], [field]: value }
        setSections(newSections)
    }

    const handleSave = async () => {
        if (!category) return

        setLoading(true)
        try {
            const res = await fetch("/api/sub-content", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ category, sections }),
            })

            if (!res.ok) throw new Error("Failed to save")

            toast.success("Content saved successfully")
            onOpenChange(false)
        } catch (error) {
            console.error("Error saving content:", error)
            toast.error("Failed to save content")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Manage Sub Content: {category}</DialogTitle>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Page Content Sections</CardTitle>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={handleAddSection}
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Add Section
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-6 p-6">
                            {loading && <div className="text-center">Loading...</div>}
                            {!loading && sections.length === 0 && (
                                <div className="text-center py-10 border-2 border-dashed rounded-lg bg-gray-50">
                                    <p className="text-gray-500">No content sections yet for {category}.</p>
                                    <Button variant="link" onClick={handleAddSection}>
                                        Add your first section
                                    </Button>
                                </div>
                            )}
                            {!loading && sections.map((section, index) => (
                                <div
                                    key={index}
                                    className="border rounded-xl p-4 space-y-4 bg-white shadow-sm"
                                >
                                    <div className="flex items-center justify-between">
                                        <Label className="text-base font-semibold">Section {index + 1}</Label>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleRemoveSection(index)}
                                        >
                                            <Trash2 className="w-4 h-4 text-red-500" />
                                        </Button>
                                    </div>
                                    <Input
                                        value={section.title}
                                        onChange={(e) =>
                                            handleSectionChange(index, "title", e.target.value)
                                        }
                                        placeholder="Section Title (e.g. Introduction)"
                                    />
                                    <div>
                                        <Label className="mb-2 block text-sm font-medium text-gray-700">
                                            Content
                                        </Label>
                                        <RichTextEditor
                                            value={section.content}
                                            onChange={(val) =>
                                                handleSectionChange(index, "content", val)
                                            }
                                            height={300}
                                            placeholder="Write your content here..."
                                        />
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={loading || !category}>
                        <Save className="w-4 h-4 mr-2" />
                        {loading ? "Saving..." : "Save Changes"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
