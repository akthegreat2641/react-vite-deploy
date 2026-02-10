"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { format } from "date-fns"
import { AdSenseBanner } from "@/components/adsense-banner"

interface ScholarshipPage {
    id: string
    title: string
    headerTitle?: string | null
    slug: string
    description?: string | null
    cardImage?: string | null
    author?: {
        name: string
    } | null
    updatedAt: Date
}

interface ScholarshipClientProps {
    scholarships: ScholarshipPage[]
    categoryName?: string
}

export function ScholarshipClient({ scholarships, categoryName = "Undergraduate Scholarships" }: ScholarshipClientProps) {
    return (
        <div className="w-[50%] mx-auto px-4 py-8">
            <AdSenseBanner />
            {/* Breadcrumb */}
            <nav className="text-sm mb-6 text-gray-600">
                <Link href="/" className="hover:underline">Home</Link>
                <span className="mx-2">›</span>
                <Link href="/scholarships" className="hover:underline">Scholarships</Link>
                <span className="mx-2">›</span>
                <span className="text-gray-400">{categoryName}</span>
            </nav>

            {/* Page Title */}
            <h1 className="text-3xl font-bold mb-8">{categoryName} for Students</h1>

            {/* Scholarship List */}
            <div className="space-y-6">
                {scholarships.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                        No scholarships found
                    </div>
                ) : (
                    scholarships.map((scholarship) => (
                        <Card key={scholarship.id} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-0">
                                <Link href={`/${scholarship.slug}`} className="flex gap-6 p-6">
                                    {/* Thumbnail */}
                                    <div className="w-64 h-40 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                                        {scholarship.cardImage ? (
                                            <img
                                                src={scholarship.cardImage}
                                                alt={scholarship.headerTitle || scholarship.title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <svg
                                                    className="w-12 h-12 text-gray-300"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                    />
                                                </svg>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <h2 className="text-xl font-semibold text-gray-900 mb-3 hover:text-blue-600">
                                            {scholarship.headerTitle || scholarship.title}
                                        </h2>

                                        {scholarship.description && (
                                            <p className="text-gray-600 mb-4 line-clamp-3">
                                                {scholarship.description}
                                            </p>
                                        )}

                                        {/* Author and Date */}
                                        <div className="flex items-center gap-3 text-sm text-gray-500">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <span>{scholarship.author?.name || "Getmyuni Content Team"}</span>
                                            </div>
                                            <span>{format(new Date(scholarship.updatedAt), "MMM dd, yyyy")}</span>
                                        </div>
                                    </div>
                                </Link>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>

            <AdSenseBanner />
        </div>
    )
}
