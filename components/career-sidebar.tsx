"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { SidebarAd } from "@/components/sidebar-ad"

interface CareerPage {
    id: string
    title: string
    headerTitle?: string | null
    slug: string
}

export function CareerSidebar() {
    const [careers, setCareers] = useState<CareerPage[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Fetch both Career and Careers categories
        Promise.all([
            fetch("/api/pages?category=Career").then(res => res.json()),
            fetch("/api/pages?category=Careers").then(res => res.json())
        ])
            .then(([careerData, careersData]) => {
                const allCareers = [
                    ...(Array.isArray(careerData) ? careerData : []),
                    ...(Array.isArray(careersData) ? careersData : [])
                ]
                setCareers(allCareers)
                setLoading(false)
            })
            .catch(err => {
                console.error("Failed to fetch careers:", err)
                setLoading(false)
            })
    }, [])

    return (
        <div className="w-[320px] flex-shrink-0 space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                {/* Header */}
                <div className="px-4 py-3 border-b border-gray-200">
                    <h2 className="text-lg font-bold text-gray-900">QUICK READ</h2>
                </div>

                {/* Careers list */}
                <div className="divide-y divide-gray-200">
                    {loading ? (
                        <div className="px-4 py-3 text-sm text-gray-500">Loading...</div>
                    ) : careers.length === 0 ? (
                        <div className="px-4 py-3 text-sm text-gray-500">No careers found</div>
                    ) : (
                        careers.map((career) => (
                            <Link
                                key={career.id}
                                href={`/${career.slug}`}
                                className="block px-4 py-3 hover:bg-gray-50 transition-colors"
                            >
                                <span className="text-sm text-blue-600 hover:underline">
                                    {career.headerTitle || career.title}
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
