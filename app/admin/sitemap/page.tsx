"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trash2, ExternalLink, Plus, RefreshCw } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

interface SitemapUrl {
    id: string
    url: string
    lastModified: string | null
    createdAt: string
}

export default function SitemapPage() {
    const [urls, setUrls] = useState<SitemapUrl[]>([])
    const [loading, setLoading] = useState(true)
    const [newUrl, setNewUrl] = useState("")
    const [adding, setAdding] = useState(false)

    const fetchUrls = async () => {
        setLoading(true)
        try {
            const res = await fetch("/api/sitemap-urls")
            if (res.ok) {
                const data = await res.json()
                setUrls(data)
            }
        } catch (error) {
            toast.error("Failed to load sitemap URLs")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUrls()
    }, [])

    const handleAddUrl = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newUrl) return

        setAdding(true)
        try {
            const res = await fetch("/api/sitemap-urls", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url: newUrl }),
            })

            if (res.ok) {
                toast.success("URL added successfully")
                setNewUrl("")
                fetchUrls()
            } else {
                toast.error("Failed to add URL")
            }
        } catch (error) {
            toast.error("Error adding URL")
        } finally {
            setAdding(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to remove this URL?")) return
        try {
            const res = await fetch(`/api/sitemap-urls?id=${id}`, {
                method: "DELETE",
            })
            if (res.ok) {
                toast.success("URL removed")
                fetchUrls()
            } else {
                toast.error("Failed to remove URL")
            }
        } catch (error) {
            toast.error("Error removing URL")
        }
    }

    return (
        <div className="p-6 space-y-8 max-w-5xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Sitemap Management</h1>
                    <p className="text-muted-foreground mt-2">
                        Manage your website's sitemap structure.
                    </p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" asChild>
                        <Link href="/sitemap.xml" target="_blank" className="flex items-center gap-2">
                            <ExternalLink className="w-4 h-4" />
                            View Live Sitemap
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Automatic Generation</CardTitle>
                        <CardDescription>
                            Your sitemap is automatically generated based on your published content.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="bg-blue-50 text-blue-800 p-4 rounded-md text-sm">
                            <p className="font-medium mb-1">Included Automatically:</p>
                            <ul className="list-disc list-inside space-y-1">
                                <li>All Published Pages (Colleges, Courses, Exams, Articles)</li>
                                <li>Career Type Landing Pages</li>
                                <li>Static Routes (Home, About, etc.)</li>
                            </ul>
                        </div>
                        <p className="text-sm text-gray-500">
                            The sitemap is dynamically built correctly whenever search engines crawl your site. No manual action is needed for database content.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Add Manual Entry</CardTitle>
                        <CardDescription>
                            Add custom URLs that are not in your database.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleAddUrl} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="url">Full URL Path</Label>
                                <Input
                                    id="url"
                                    placeholder="https://collegewebcu.com/custom-page"
                                    value={newUrl}
                                    onChange={(e) => setNewUrl(e.target.value)}
                                />
                                <p className="text-xs text-gray-500">
                                    Enter the full absolute URL including https://
                                </p>
                            </div>
                            <Button type="submit" disabled={adding} className="w-full">
                                {adding ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                                Add to Sitemap
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Manual Entries</CardTitle>
                    <CardDescription>
                        List of manually added URLs included in the sitemap.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>URL</TableHead>
                                <TableHead>Last Modified</TableHead>
                                <TableHead className="w-[100px] text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center py-8">Loading...</TableCell>
                                </TableRow>
                            ) : urls.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                                        No manual entries found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                urls.map((entry) => (
                                    <TableRow key={entry.id}>
                                        <TableCell className="font-medium break-all">{entry.url}</TableCell>
                                        <TableCell>
                                            {entry.lastModified ? new Date(entry.lastModified).toLocaleDateString() : "-"}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                                onClick={() => handleDelete(entry.id)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
