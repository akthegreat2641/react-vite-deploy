"use client"

import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronRight } from "lucide-react"
import { SidebarAd } from "./sidebar-ad"

interface Article {
    id: string
    title: string
    slug?: string | null
    image?: string | null
    popular?: boolean
    createdAt?: Date | string
}

interface ArticleSidebarProps {
    featuredArticles: Article[]
    popularArticles?: Article[]
    trendingNews?: { title: string; slug: string }[]
}

export function ArticleSidebar({ featuredArticles, popularArticles = [], trendingNews = [] }: ArticleSidebarProps) {

    return (
        <div className="space-y-6">
            <div className="bg-white border rounded shadow-sm sticky top-4">
                <Tabs defaultValue="featured" className="w-full">
                    <TabsList className="w-full grid grid-cols-2 bg-transparent border-b p-0 h-auto rounded-none">
                        <TabsTrigger
                            value="featured"
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-red-500 data-[state=active]:text-red-500 py-3 text-gray-600 font-medium bg-transparent shadow-none"
                        >
                            Featured Articles
                        </TabsTrigger>
                        <TabsTrigger
                            value="popular"
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-red-500 data-[state=active]:text-red-500 py-3 text-gray-600 font-medium bg-transparent shadow-none"
                        >
                            Popular Articles
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="featured" className="p-0">
                        <div className="divide-y">
                            {featuredArticles.length === 0 ? (
                                <div className="p-4 text-sm text-gray-500">No featured articles.</div>
                            ) : (
                                featuredArticles.slice(0, 5).map((item, i) => (
                                    <Link href={`/article/${item.slug || item.id}`} key={i} className="flex gap-4 p-4 hover:bg-gray-50 transition-colors cursor-pointer group">
                                        <div className="w-20 h-14 flex-shrink-0 overflow-hidden rounded bg-gray-200">
                                            {item.image ? (
                                                <img src={item.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No Img</div>
                                            )}
                                        </div>
                                        <h3 className="text-xs font-medium text-gray-700 group-hover:text-blue-600 leading-snug line-clamp-3">
                                            {item.title}
                                        </h3>
                                    </Link>
                                ))
                            )}
                        </div>
                    </TabsContent>
                    <TabsContent value="popular" className="p-0">
                        <div className="divide-y">
                            {popularArticles.length === 0 ? (
                                <div className="p-4 text-center text-gray-500 text-sm">No popular articles yet.</div>
                            ) : (
                                popularArticles.slice(0, 5).map((item, i) => (
                                    <Link href={`/article/${item.slug || item.id}`} key={i} className="flex gap-4 p-4 hover:bg-gray-50 transition-colors cursor-pointer group">
                                        <div className="w-20 h-14 flex-shrink-0 overflow-hidden rounded bg-gray-200">
                                            {item.image ? (
                                                <img src={item.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No Img</div>
                                            )}
                                        </div>
                                        <h3 className="text-xs font-medium text-gray-700 group-hover:text-blue-600 leading-snug line-clamp-3">
                                            {item.title}
                                        </h3>
                                    </Link>
                                ))
                            )}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>

            <SidebarAd />

            {/* Trending News */}
            <div className="bg-white border rounded shadow-sm p-4 sticky top-[400px]">
                <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase border-b pb-2">Trending News</h3>
                <ul className="space-y-3">
                    {trendingNews.length === 0 ? (
                        <li className="text-sm text-gray-500">No recent news.</li>
                    ) : (
                        trendingNews.map((news, i) => (
                            <Link href={`/${news.slug}`} key={i} className="flex items-start gap-2 text-sm text-gray-600 hover:text-blue-600 cursor-pointer block">
                                <ChevronRight className="w-4 h-4 mt-0.5 text-gray-400 flex-shrink-0" />
                                <span className="line-clamp-2">{news.title}</span>
                            </Link>
                        ))
                    )}
                </ul>
            </div>
        </div>
    )
}
