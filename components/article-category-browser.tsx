"use client"

import { useState } from "react"
import { ArticleListItem } from "./article-list-item"
import { SidebarArticleItem } from "./sidebar-article-item"
import { SidebarAd } from "./sidebar-ad"
import { AdSenseBanner } from "./adsense-banner"
import { cn } from "@/lib/utils"

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
    snippet?: string | null
    isPage?: boolean
    popular?: boolean
}

interface ArticleCategoryBrowserProps {
    articles: Article[]
    categoryName: string
    recentArticles?: Article[]
    popularArticles?: Article[]
}

export function ArticleCategoryBrowser({ articles, categoryName, recentArticles: propRecent, popularArticles: propPopular }: ArticleCategoryBrowserProps) {
    // Sidebar Tabs
    const [sidebarTab, setSidebarTab] = useState<"Recent" | "Popular">("Recent")

    const displayRecent = propRecent || articles.slice(0, 5)
    const displayPopular = propPopular || articles.filter(a => a.popular).slice(0, 5)
    const sidebarArticles = sidebarTab === "Recent" ? displayRecent : (displayPopular.length > 0 ? displayPopular : displayRecent)

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content - Left Column */}
            <div className="lg:col-span-8 space-y-4">
                <AdSenseBanner />
                <h2 className="text-2xl font-bold text-gray-900 mb-6 capitalize">{categoryName} Articles</h2>

                <div className="space-y-4">
                    {articles.map((article) => (
                        <ArticleListItem key={article.id} article={article} />
                    ))}

                    {articles.length === 0 && (
                        <div className="py-12 text-center text-gray-500 bg-white rounded-lg border border-dashed">
                            No articles found in this category.
                        </div>
                    )}
                </div>

                {/* Bottom Banner Ad */}
                <AdSenseBanner />
            </div>

            {/* Sidebar - Right Column */}
            <div className="lg:col-span-4 space-y-6">
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm sticky top-4">
                    {/* Tabs */}
                    <div className="flex border-b border-gray-200 mb-6">
                        <button
                            onClick={() => setSidebarTab("Recent")}
                            className={cn(
                                "flex-1 pb-3 text-sm font-medium transition-colors relative",
                                sidebarTab === "Recent"
                                    ? "text-red-500"
                                    : "text-gray-500 hover:text-gray-700"
                            )}
                        >
                            Recent Articles
                            {sidebarTab === "Recent" && (
                                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-red-500" />
                            )}
                        </button>
                        <button
                            onClick={() => setSidebarTab("Popular")}
                            className={cn(
                                "flex-1 pb-3 text-sm font-medium transition-colors relative",
                                sidebarTab === "Popular"
                                    ? "text-red-500"
                                    : "text-gray-500 hover:text-gray-700"
                            )}
                        >
                            Popular Articles
                            {sidebarTab === "Popular" && (
                                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-red-500" />
                            )}
                        </button>
                    </div>

                    {/* Sidebar List */}
                    <div className="space-y-6">
                        {sidebarArticles.map((article) => (
                            <SidebarArticleItem key={article.id} article={article} />
                        ))}
                        {sidebarArticles.length === 0 && (
                            <div className="text-sm text-gray-400 italic text-center py-4">
                                No articles found
                            </div>
                        )}
                    </div>
                </div>
                <SidebarAd />
            </div>
        </div>
    )
}
