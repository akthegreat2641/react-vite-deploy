"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { SidebarAd } from "@/components/sidebar-ad"

interface ScholarshipPage {
    id: string
    title: string
    headerTitle?: string | null
    slug: string
    cardImage?: string | null
}

export function ScholarshipSidebar() {
    const [scholarships, setScholarships] = useState<ScholarshipPage[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Fetch both Scholarship and Scholarships categories
        Promise.all([
            fetch("/api/pages?category=Scholarship").then(res => res.json()),
            fetch("/api/pages?category=Scholarships").then(res => res.json())
        ])
            .then(([scholarshipData, scholarshipsData]) => {
                const allScholarships = [
                    ...(Array.isArray(scholarshipData) ? scholarshipData : []),
                    ...(Array.isArray(scholarshipsData) ? scholarshipsData : [])
                ]
                setScholarships(allScholarships)
                setLoading(false)
            })
            .catch(err => {
                console.error("Failed to fetch scholarships:", err)
                setLoading(false)
            })
    }, [])

    return (
        <div className="w-[320px] flex-shrink-0 space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                {/* Header */}
                <div className="px-4 py-3 border-b border-gray-200">
                    <h2 className="text-sm font-bold text-gray-700 uppercase">Explore Other Scholarships</h2>
                </div>

                {/* Scholarships list */}
                <div className="divide-y divide-gray-200">
                    {loading ? (
                        <div className="px-4 py-3 text-sm text-gray-500">Loading...</div>
                    ) : scholarships.length === 0 ? (
                        <div className="px-4 py-3 text-sm text-gray-500">No scholarships found</div>
                    ) : (
                        scholarships.map((scholarship) => (
                            <Link
                                key={scholarship.id}
                                href={`/${scholarship.slug}`}
                                className="flex gap-3 px-4 py-3 hover:bg-gray-50 transition-colors group"
                            >
                                {/* Thumbnail */}
                                <div className="w-20 h-14 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                                    {scholarship.cardImage ? (
                                        <img
                                            src={scholarship.cardImage}
                                            alt={scholarship.headerTitle || scholarship.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-50">
                                            <svg className="w-6 h-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                            </svg>
                                        </div>
                                    )}
                                </div>

                                {/* Title */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-sm text-gray-900 group-hover:text-blue-600 line-clamp-2 leading-snug">
                                        {scholarship.headerTitle || scholarship.title}
                                    </h3>
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
