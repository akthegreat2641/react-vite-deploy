"use client"

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import AdminTable from "@/components/admin-table"
import { Button } from "@/components/ui/button"
import { useSearchParams } from "next/navigation"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import SubContentDialog from "@/components/sub-content-dialog"
import SlugContentDialog from "@/components/slug-content-dialog"
import { Input } from "@/components/ui/input"

interface Page {
    id: string
    title: string
    slug: string
    published: boolean
    updatedAt: string
}

function PagesContent() {
    const [pages, setPages] = useState<Page[]>([])
    const [loading, setLoading] = useState(true)
    const searchParams = useSearchParams()
    const category = searchParams.get("category")
    const [isSubContentOpen, setIsSubContentOpen] = useState(false)
    const [isSlugContentOpen, setIsSlugContentOpen] = useState(false)

    const [searchQuery, setSearchQuery] = useState("")

    const fetchPages = async () => {
        setLoading(true)
        try {
            const query = category ? `?category=${encodeURIComponent(category)}` : ""
            const res = await fetch(`/api/pages${query}`, { cache: "no-store" })
            const data = await res.json()
            setPages(data)
        } catch (error) {
            console.error("Failed to fetch pages:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchPages()
    }, [category])

    const handleAdd = () => {
        const query = category ? `?category=${encodeURIComponent(category)}` : ""
        window.location.href = `/admin/pages/new${query}`
    }

    const handleEdit = (page: Page) => {
        window.location.href = `/admin/pages/${page.id}`
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this page?")) return

        try {
            const res = await fetch(`/api/pages/${id}`, { method: "DELETE" })
            if (res.ok) {
                setPages((prev) => prev.filter((p) => p.id !== id))
                toast.success("Page deleted")
            } else {
                toast.error("Failed to delete page")
            }
        } catch (error) {
            console.error("Error deleting page:", error)
            toast.error("Error deleting page")
        }
    }

    const handleTogglePublish = async (page: Page, checked: boolean) => {
        // Optimistic update
        setPages(prev => prev.map(p => p.id === page.id ? { ...p, published: checked } : p))

        try {
            const res = await fetch(`/api/pages/${page.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ published: checked })
            })

            if (!res.ok) {
                throw new Error("Failed to update status")
                // Revert on failure
                setPages(prev => prev.map(p => p.id === page.id ? { ...p, published: !checked } : p))
            } else {
                toast.success(`Page ${checked ? "published" : "unpublished"}`)
            }
        } catch (error) {
            console.error(error)
            toast.error("Failed to update status")
            // Revert on failure
            setPages(prev => prev.map(p => p.id === page.id ? { ...p, published: !checked } : p))
        }
    }

    const filteredPages = pages.filter(page =>
        page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        page.slug.toLowerCase().includes(searchQuery.toLowerCase())
    )

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <div className="flex items-center space-x-2 mb-4">
                <Input
                    placeholder="Search by title or slug..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="max-w-sm"
                />
            </div>
            <AdminTable
                data={filteredPages}
                columns={[
                    { key: "title", label: "Title" },
                    { key: "slug", label: "Slug" },
                    {
                        key: "published",
                        label: "Status",
                        render: (item) => (
                            <div className="flex items-center gap-2">
                                <Switch
                                    checked={item.published}
                                    onCheckedChange={(checked) => handleTogglePublish(item, checked)}
                                />
                                <span className={`text-xs ${item.published ? 'text-green-600' : 'text-gray-500'}`}>
                                    {item.published ? "Published" : "Draft"}
                                </span>
                            </div>
                        ),
                    },
                    {
                        key: "actions",
                        label: "Actions",
                        render: (item) => (
                            <div className="flex gap-2">
                                <Link href={`/admin/pages/${item.id}`}>
                                    <Button variant="outline" size="sm">Edit</Button>
                                </Link>
                                <a href={`/${item.slug}`} target="_blank" rel="noopener noreferrer">
                                    <Button variant="ghost" size="sm">View</Button>
                                </a>
                            </div>
                        ),
                    },
                ]}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onAdd={handleAdd}
                addLabel={(category === "Sub College" || category === "Sub Exam") ? "Add Content" : "Add Page"}
                getId={(item: any) => item.id}
                customActions={
                    <div className="flex gap-2">
                        {category !== "Sub College" && category !== "Sub Exam" && (
                            <Button variant="outline" onClick={() => setIsSubContentOpen(true)}>
                                Sub Content
                            </Button>
                        )}
                        {category === "Course" && (
                            <Button variant="outline" onClick={() => setIsSlugContentOpen(true)}>
                                Slug Content
                            </Button>
                        )}
                    </div>
                }
            />
            <SubContentDialog
                open={isSubContentOpen}
                onOpenChange={setIsSubContentOpen}
                category={category}
            />
            <SlugContentDialog
                open={isSlugContentOpen}
                onOpenChange={setIsSlugContentOpen}
                slug="courses"
                title="Courses Landing Page Content"
            />
        </div>
    )
}

export default function PagesPage() {
    return (
        <Suspense fallback={<div>Loading page...</div>}>
            <PagesContent />
        </Suspense>
    )
}
