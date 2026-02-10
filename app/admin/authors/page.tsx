"use client"

import { useState, useEffect } from "react"
import { Plus, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import AdminTable from "@/components/admin-table"
import { AuthorDialog } from "@/components/author-dialog"

interface Author {
    id: string
    name: string
    image?: string | null
    designation?: string | null
    createdAt: string
}

export default function AuthorsPage() {
    const [authors, setAuthors] = useState<Author[]>([])
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)
    const [editingAuthor, setEditingAuthor] = useState<Author | null>(null)

    const fetchAuthors = async () => {
        try {
            const res = await fetch("/api/authors", { cache: "no-store" })
            if (!res.ok) throw new Error("Failed to fetch authors")
            const data = await res.json()
            setAuthors(Array.isArray(data) ? data : [])
        } catch (error) {
            console.error("Failed to fetch authors:", error)
            setAuthors([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAuthors()
    }, [])

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this author?")) return

        try {
            const res = await fetch(`/api/authors/${id}`, { method: "DELETE" })
            if (res.ok) {
                setAuthors((prev) => prev.filter((a) => a.id !== id))
            }
        } catch (error) {
            console.error("Failed to delete author:", error)
        }
    }

    const handleEdit = (author: Author) => {
        setEditingAuthor(author)
        setOpen(true)
    }

    const handleAdd = () => {
        setEditingAuthor(null)
        setOpen(true)
    }

    if (loading) return <div className="p-8">Loading...</div>

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Authors</h1>
            </div>

            <AdminTable
                data={authors}
                columns={[
                    {
                        key: "image",
                        label: "Avatar",
                        render: (item) => item.image ? (
                            <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded-full border" />
                        ) : (
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                                <UserPlus className="w-6 h-6" />
                            </div>
                        )
                    },
                    { key: "name", label: "Name" },
                    { key: "designation", label: "Designation" },
                    {
                        key: "createdAt",
                        label: "Joined",
                        render: (item) => new Date(item.createdAt).toLocaleDateString(),
                    },
                ]}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onAdd={handleAdd}
                addLabel="Add Author"
                getId={(item) => item.id}
            />

            <AuthorDialog
                open={open}
                onOpenChange={setOpen}
                onSuccess={fetchAuthors}
                author={editingAuthor}
            />
        </div>
    )
}
