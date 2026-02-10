"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface Scholarship {
    id: string
    title: string
    slug: string
    program: string | null
    cardImage: string | null
    author: {
        name: string
    } | null
}

interface ScholarshipsClientProps {
    scholarships: Scholarship[]
}

const TABS = [
    "Undergraduate Scholarships",
    "Ph.D Scholarships",
    "Postgraduate Scholarships",
    "High School Scholarships",
    "Higher Secondary Scholarships"
]

export function ScholarshipsClient({ scholarships }: ScholarshipsClientProps) {
    const [activeTab, setActiveTab] = useState(TABS[0])

    // Filter scholarships based on active tab
    const filteredScholarships = scholarships.filter(
        (s) => s.program === activeTab
    )

    return (
        <div className="w-full">
            {/* Scrollable Tabs Container */}
            <div className="w-full overflow-x-auto pb-4 mb-6 scrollbar-hide">
                <div className="flex space-x-2 min-w-max border-b border-gray-200">
                    {TABS.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`
                                px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-colors border-t-4
                                ${activeTab === tab
                                    ? "bg-[#FF5555] text-white border-[#FF5555]"
                                    : "bg-white text-gray-500 border-transparent hover:text-gray-700 bg-gray-50"
                                }
                            `}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid Content */}
            {filteredScholarships.length === 0 ? (
                <div className="text-center py-12 text-gray-500 bg-white rounded-lg border border-gray-100">
                    <p>No scholarships found for {activeTab}.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {filteredScholarships.map((scholarship) => (
                        <Link key={scholarship.id} href={`/${scholarship.slug}`} className="group block h-full">
                            <Card className="h-full border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col bg-white p-3">
                                {/* Image Placeholder or Image */}
                                <div className="aspect-[4/3] w-full bg-gray-100 relative overflow-hidden rounded-sm mb-3">
                                    {scholarship.cardImage ? (
                                        <img
                                            src={scholarship.cardImage}
                                            alt={scholarship.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-50">
                                            <div className="w-full h-full bg-gray-100"></div>
                                        </div>
                                    )}
                                </div>

                                <CardContent className="p-0 flex-1">
                                    <h3 className="text-[13px] font-semibold text-gray-800 leading-tight mb-2 group-hover:text-blue-600 transition-colors line-clamp-3">
                                        {scholarship.title}
                                    </h3>
                                </CardContent>

                                <CardFooter className="p-0 pt-2 text-[11px] text-gray-400 mt-auto">
                                    {scholarship.author?.name || "Getmyuni Content Team"}
                                </CardFooter>
                            </Card>
                        </Link>
                    ))}
                </div>
            )}

            {/* View All Button */}
            {filteredScholarships.length > 0 && (
                <div className="flex justify-center mt-8">
                    <Link
                        href={`/scholarships/${activeTab === "Undergraduate Scholarships" ? "undergraduate" :
                                activeTab === "Ph.D Scholarships" ? "phd" :
                                    activeTab === "Postgraduate Scholarships" ? "postgraduate" :
                                        activeTab === "High School Scholarships" ? "high-school" :
                                            "higher-secondary"
                            }`}
                        className="bg-[#FF5555] hover:bg-[#ff3333] text-white font-semibold px-8 py-3 rounded uppercase tracking-wide transition-colors"
                    >
                        VIEW ALL {activeTab.toUpperCase()}
                    </Link>
                </div>
            )}
        </div>
    )
}
