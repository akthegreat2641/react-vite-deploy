"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

interface Section {
    title: string
    content: string
}

interface CategoryHeaderProps {
    category: string
    slug?: string
    fallbackTitle?: string
}

export function CategoryHeader({ category, slug: propSlug, fallbackTitle = "BROWSE BY CATEGORY" }: CategoryHeaderProps) {
    const [expanded, setExpanded] = useState(false)
    const [sections, setSections] = useState<Section[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const endpoint = propSlug
                    ? `/api/slug-content?slug=${encodeURIComponent(propSlug)}`
                    : `/api/sub-content?category=${encodeURIComponent(category)}`
                const res = await fetch(endpoint)
                if (res.ok) {
                    const data = await res.json()
                    setSections(data)
                }
            } catch (error) {
                console.error(`Failed to fetch ${category} header content`)
            } finally {
                setLoading(false)
            }
        }
        fetchContent()
    }, [category])

    if (loading) return <div className="animate-pulse h-40 bg-gray-100 rounded-lg mb-6"></div>

    if (sections.length === 0) return null

    const hasMoreContent = sections.length > 1

    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6 overflow-hidden">
            {sections.map((section, index) => {
                if (index > 0 && !expanded) return null

                return (
                    <div key={index} className={index > 0 ? "border-t border-gray-200" : ""}>
                        <div className="bg-gray-100 px-6 py-4 border-b border-gray-200">
                            <h2 className="text-base font-bold text-gray-900">
                                {section.title || (index === 0 ? fallbackTitle : `Section ${index + 1}`)}
                            </h2>
                        </div>

                        <div className="p-6">
                            <div
                                dangerouslySetInnerHTML={{ __html: section.content }}
                                className="prose prose-sm max-w-none text-gray-700 [&>p]:mb-2 [&>strong]:text-gray-900 [&>a]:text-blue-600 [&>a]:hover:underline"
                            />
                        </div>
                    </div>
                )
            })}

            {hasMoreContent && (
                <div className="bg-white p-4 flex justify-center border-t border-gray-200">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 font-medium h-auto py-1"
                        onClick={() => setExpanded(!expanded)}
                    >
                        {expanded ? "Show Less" : "Show More"}
                    </Button>
                </div>
            )}
        </div>
    )
}
