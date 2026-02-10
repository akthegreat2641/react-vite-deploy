"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { SidebarAd } from "@/components/sidebar-ad"

interface OlympiadPage {
    id: string
    title: string
    headerTitle?: string | null
    slug: string
    cardImage?: string | null
}

export function OlympiadSidebar() {
    const [olympiads, setOlympiads] = useState<OlympiadPage[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("/api/pages?category=Olympiad")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setOlympiads(data)
                }
                setLoading(false)
            })
            .catch(err => {
                console.error("Failed to fetch olympiads:", err)
                setLoading(false)
            })
    }, [])

    return (
        <div className="w-[320px] flex-shrink-0 space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                {/* Header */}
                <div className="px-4 py-3 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Quick Links</h2>
                </div>

                {/* Olympiads list */}
                <div className="divide-y divide-gray-200">
                    {loading ? (
                        <div className="px-4 py-3 text-sm text-gray-500">Loading...</div>
                    ) : olympiads.length === 0 ? (
                        <div className="px-4 py-3 text-sm text-gray-500">No olympiads found</div>
                    ) : (
                        olympiads.map((olympiad) => (
                            <Link
                                key={olympiad.id}
                                href={`/${olympiad.slug}`}
                                className="flex items-start gap-3 p-4 hover:bg-gray-50 transition-colors"
                            >
                                {/* Thumbnail */}
                                <div className="w-20 h-16 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                                    {olympiad.cardImage ? (
                                        <img
                                            src={olympiad.cardImage}
                                            alt={olympiad.headerTitle || olympiad.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200" />
                                    )}
                                </div>
                                {/* Title */}
                                <div className="flex-1 min-w-0">
                                    <span className="text-sm text-blue-600 hover:underline line-clamp-3">
                                        {olympiad.headerTitle || olympiad.title}
                                    </span>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>

            <SidebarAd />
        </div>
    )
}
