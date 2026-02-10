"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { SidebarAd } from "@/components/sidebar-ad"

interface CollegePage {
    id: string
    title: string
    headerTitle?: string | null
    slug: string
}

export function CollegeSidebar() {
    const [colleges, setColleges] = useState<CollegePage[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Fetch both College and Colleges categories
        Promise.all([
            fetch("/api/pages?category=College").then(res => res.json()),
            fetch("/api/pages?category=Colleges").then(res => res.json())
        ])
            .then(([collegeData, collegesData]) => {
                const allColleges = [
                    ...(Array.isArray(collegeData) ? collegeData : []),
                    ...(Array.isArray(collegesData) ? collegesData : [])
                ]
                setColleges(allColleges)
                setLoading(false)
            })
            .catch(err => {
                console.error("Failed to fetch colleges:", err)
                setLoading(false)
            })
    }, [])

    return (
        <div className="w-[320px] flex-shrink-0 space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                {/* Header */}
                <div className="px-4 py-3 border-b border-gray-200">
                    <h2 className="text-lg font-bold text-gray-900">Popular Colleges</h2>
                </div>

                {/* Colleges list */}
                <div className="divide-y divide-gray-200">
                    {loading ? (
                        <div className="px-4 py-3 text-sm text-gray-500">Loading...</div>
                    ) : colleges.length === 0 ? (
                        <div className="px-4 py-3 text-sm text-gray-500">No colleges found</div>
                    ) : (
                        colleges.map((college) => (
                            <Link
                                key={college.id}
                                href={`/${college.slug}`}
                                className="block px-4 py-3 hover:bg-gray-50 transition-colors"
                            >
                                <span className="text-sm text-blue-600 hover:underline">
                                    {college.headerTitle || college.title}
                                </span>
                            </Link>
                        ))
                    )}
                </div>
            </div>

            <SidebarAd />
        </div>
    )
}
