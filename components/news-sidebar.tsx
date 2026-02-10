"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

interface NewsPage {
    id: string
    title: string
    headerTitle?: string | null
    slug: string
}

export function NewsSidebar() {
    const [news, setNews] = useState<NewsPage[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("/api/pages?category=News")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setNews(data)
                }
                setLoading(false)
            })
            .catch(err => {
                console.error("Failed to fetch news:", err)
                setLoading(false)
            })
    }, [])

    return (
        <div className="w-[320px] flex-shrink-0">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                {/* Header */}
                <div className="px-4 py-3 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Quick Links</h2>
                </div>

                {/* News list */}
                <div className="divide-y divide-gray-200">
                    {loading ? (
                        <div className="px-4 py-3 text-sm text-gray-500">Loading...</div>
                    ) : news.length === 0 ? (
                        <div className="px-4 py-3 text-sm text-gray-500">No news found</div>
                    ) : (
                        news.map((item) => (
                            <Link
                                key={item.id}
                                href={`/${item.slug}`}
                                className="block px-4 py-3 hover:bg-gray-50 transition-colors"
                            >
                                <span className="text-sm text-blue-600 hover:underline">
                                    {item.headerTitle || item.title}
                                </span>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
