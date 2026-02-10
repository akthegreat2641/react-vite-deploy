"use client"

import Link from "next/link"
import { useState } from "react"
import { ArticleCard } from "./article-card"
import { AdSenseBanner } from "./adsense-banner"
import { ChevronRight } from "lucide-react"
import { BRANCHES_LIST } from "@/lib/constants"

interface Article {
    id: string
    title: string
    category: string
    image?: string | null
    author?: {
        name: string
        image?: string | null
    } | null
    slug?: string | null
    createdAt: Date
    branch?: string | null
    snippet?: string | null // Keep optional props if passed from pages
    isPage?: boolean
    popular?: boolean
}

interface ArticleBrowserProps {
    articles: Article[]
}

export function ArticleBrowser({ articles }: ArticleBrowserProps) {
    // Use the full list of branches from constants
    const uniqueBranches = BRANCHES_LIST

    // Default to "General" or the first available branch
    const [activeTab, setActiveTab] = useState("General")

    const filteredArticles = activeTab === "General"
        ? articles
        : articles.filter((a) => a.branch === activeTab)

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-gray-800 uppercase tracking-wide mb-4">
                    BROWSE ARTICLES
                </h2>

                <div className="relative">
                    <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-none">
                        {uniqueBranches.length > 0 ? (
                            uniqueBranches.map((branch) => (
                                <button
                                    key={branch}
                                    onClick={() => setActiveTab(branch)}
                                    className={`
                  px-4 py-2 text-xs font-bold uppercase whitespace-nowrap border transition-colors inline-block
                  ${activeTab === branch
                                            ? "bg-[#FF5555] text-white border-[#FF5555]"
                                            : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                                        }
                `}
                                >
                                    {branch}
                                </button>
                            ))
                        ) : (
                            <div className="text-sm text-gray-400 italic">No categories found</div>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredArticles.map((article) => (
                    <div key={article.id} className="h-full">
                        <ArticleCard article={article} />
                    </div>
                ))}

                {filteredArticles.length === 0 && articles.length > 0 && uniqueBranches.length > 0 && (
                    <div className="col-span-full py-12 text-center text-gray-500">
                        No articles found in {activeTab}.
                    </div>
                )}

                {articles.length === 0 && (
                    <div className="col-span-full py-12 text-center text-gray-500">
                        No articles available.
                    </div>
                )}
            </div>

            <div className="mt-10 text-center">
                <Link
                    href={`/articles/${activeTab.toLowerCase()}`}
                    className="inline-block px-8 py-3 bg-[#FF5555] text-white font-bold text-sm rounded-md shadow-sm hover:bg-red-600 transition-colors uppercase"
                >
                    view all {activeTab} articles
                </Link>
            </div>

            <AdSenseBanner />
        </div>
    )
}
