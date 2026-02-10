"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Facebook, Download, X, Search, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Header from "@/components/header"
import { ArticleSidebar } from "@/components/article-sidebar"
import { format } from "date-fns"

interface ArticleClientPageProps {
    article: any
    recentArticles: any[]
    popularArticles?: any[]
    trendingNews?: any[]
}

export function ArticleClientPage({ article, recentArticles, popularArticles = [], trendingNews = [] }: ArticleClientPageProps) {
    // Fallback values
    const title = article.title || "Untitled Article"
    const authorName = article.author?.name || "Admin"
    const authorImage = article.author?.image
    const publishDate = article.postDate || article.createdAt
    const formattedDate = publishDate ? format(new Date(publishDate), "MMM dd, yyyy | hh:mm a") : ""

    // Sections sorting
    const sortedSections = article.sections?.sort((a: any, b: any) => a.order - b.order) || []

    return (
        <div className="min-h-screen bg-[#f8f8f8] font-sans">
            <Header />
            {/* Breadcrumb */}
            <div className="w-full bg-[#f8f8f8] py-4">
                <div className="w-[90%] md:w-[60%] mx-auto text-xs text-gray-500 font-medium">
                    <Link href="/" className="hover:text-black">Home</Link>
                    <span className="mx-1">&gt;</span>
                    <Link href="/articles" className="hover:text-black">Articles</Link>
                    <span className="mx-1">&gt;</span>
                    <span className="text-gray-400 max-w-[200px] truncate inline-block align-bottom">{title}</span>
                </div>
            </div>

            <main className="w-[90%] md:w-[60%] mx-auto pb-12">
                {/* Header Card */}
                <div className="bg-[#fffdf9] rounded-sm p-8 shadow-sm border border-gray-100 mb-8">
                    <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-8">
                        {title}
                    </h1>

                    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">

                        <div className="flex flex-wrap items-center gap-6 text-xs text-gray-600">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0 border border-gray-100">
                                    {authorImage ? (
                                        <img src={authorImage} alt={authorName} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            <Search className="w-5 h-5" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-blue-600 font-semibold text-sm">{authorName}</span>
                                    {article.author?.designation && (
                                        <span className="text-gray-500 text-[10px]">{article.author.designation}</span>
                                    )}
                                </div>
                            </div>

                            <div className="h-8 border-l border-gray-300 hidden sm:block"></div>

                            <div className="flex flex-col text-gray-500">
                                <span>{formattedDate}</span>
                                <span>IST</span>
                            </div>

                            <div className="h-8 border-l border-gray-300 hidden sm:block"></div>

                            <div className="flex items-center gap-2">
                                <span className="text-gray-500 font-medium">Share it on:</span>
                                <div className="flex gap-2">
                                    <button className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-white hover:bg-gray-500">
                                        <Facebook className="w-3 h-3 fill-current" />
                                    </button>
                                    <button className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-white hover:bg-gray-500">
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 mt-4 xl:mt-0">
                            {article.cutOffButtonText && (
                                <Button asChild className="bg-[#0056b3] hover:bg-[#004494] text-white rounded font-medium px-6 py-5 h-auto text-sm shadow-sm flex items-center gap-2">
                                    <Link href={article.cutOffButtonLink || "#"}>
                                        {article.cutOffButtonText} <Download className="w-4 h-4 ml-1" />
                                    </Link>
                                </Button>
                            )}
                            {article.predictButtonText && (
                                <Button asChild className="bg-[#ff4d4d] hover:bg-[#ff3333] text-white rounded font-medium px-6 py-5 h-auto text-sm shadow-sm">
                                    <Link href={article.predictButtonLink || "#"}>{article.predictButtonText}</Link>
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
                    {/* Main Content Body */}
                    <div className="space-y-8 text-gray-800 leading-relaxed text-[15px]">
                        <div className="bg-white p-6 rounded shadow-sm border border-gray-100">

                            {/* Excerpt / Intro */}
                            {article.excerpt && (
                                <div className="mb-6 border-l-4 border-red-500 pl-4 py-2 bg-gray-50 text-gray-700 italic">
                                    {article.excerpt}
                                </div>
                            )}

                            {/* Introductory Text */}
                            {article.introductoryText && (
                                <div className="prose prose-blue max-w-none mb-6" dangerouslySetInnerHTML={{ __html: article.introductoryText }} />
                            )}

                            {/* Main Content */}
                            {article.content && (
                                <div className="prose prose-blue max-w-none mb-8" dangerouslySetInnerHTML={{ __html: article.content }} />
                            )}

                            {/* Dynamic Sections */}
                            {sortedSections.map((section: any) => (
                                <div key={section.id} className="mt-8">
                                    <h2 className="text-xl font-bold text-gray-900 mb-4">{section.title}</h2>
                                    <div className="prose prose-blue max-w-none" dangerouslySetInnerHTML={{ __html: section.content }} />
                                </div>
                            ))}

                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="space-y-6">
                        <ArticleSidebar featuredArticles={recentArticles} popularArticles={popularArticles} trendingNews={trendingNews} />
                    </div>
                </div>
            </main>
        </div>
    )
}
