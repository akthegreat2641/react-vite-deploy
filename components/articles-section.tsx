"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Folder } from "lucide-react"

interface Article {
  id: string
  title: string
  category: string
  colleges: number
  image?: string | null
  featured: boolean
  popular: boolean
  slug?: string
  isPage?: boolean
}

export default function ArticlesSection() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("")

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch("/api/articles")
        const data = await res.json()
        setArticles(data)
        if (data.length > 0 && !activeTab) {
          const categories = Array.from(new Set(data.map((a: Article) => a.category))) as string[]
          if (categories.length > 0) {
            setActiveTab(categories[0])
          }
        }
      } catch (error) {
        console.error("Failed to fetch articles:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchArticles()
  }, [])

  const categories = [...new Set(articles.map(a => a.category))]
  const filteredArticles = activeTab
    ? articles.filter(a => a.category === activeTab)
    : articles

  // Design in image shows Recent Articles (filtered by category) and Popular Articles
  const displayRecent = filteredArticles.slice(0, 3)
  const displayPopular = articles.filter(a => a.popular).slice(0, 1) // In image it shows 1 popular item on right

  const ArticleCard = ({ article }: { article: Article }) => {
    const href = article.isPage ? `/${article.slug}` : `/article/${article.slug}`

    return (
      <Link href={href} className="flex gap-4 py-3 group cursor-pointer">
        <div className="w-[140px] h-[90px] rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
          <img
            src={article.image || "/placeholder.svg"}
            alt={article.title}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <div className="flex flex-col justify-center py-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#00D1A0] text-white">
              {article.category}
            </span>
          </div>
          <h3 className="text-[15px] font-semibold text-[#0F172A] leading-snug line-clamp-2 mb-1.5 group-hover:text-blue-600 transition-colors">
            {article.title}
          </h3>
        </div>
      </Link>
    )
  }

  return (
    <section className="py-10 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E293B] mb-6 md:mb-8">Articles</h2>

          {categories.length > 0 && (
            <div className="flex flex-wrap justify-center items-center gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-5 md:px-6 py-2 md:py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm ${activeTab === cat
                    ? "bg-[#00D1A0] text-white"
                    : "bg-white text-gray-500 hover:bg-gray-50 border border-gray-100"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 relative">
          {/* Recent Articles Column */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-[#1E293B] mb-2 px-2">Recent Articles</h3>
            <div className="divide-y divide-gray-50">
              {loading ? (
                <div className="py-10 text-center text-gray-400">Loading...</div>
              ) : displayRecent.length > 0 ? (
                displayRecent.map((article) => (
                  <ArticleCard key={`recent-${article.id}`} article={article} />
                ))
              ) : (
                <div className="py-10 text-center text-gray-400">No articles found</div>
              )}
            </div>
          </div>

          {/* Vertical Divider for large screens */}
          <div className="hidden lg:block absolute left-1/2 top-4 bottom-4 w-px bg-gray-100 -translate-x-1/2" />

          {/* Popular Articles Column */}
          <div className="space-y-6 lg:pl-10">
            <h3 className="text-xl font-bold text-[#1E293B] mb-2 px-2">Popular Articles</h3>
            <div className="divide-y divide-gray-50">
              {loading ? (
                <div className="py-10 text-center text-gray-400">Loading...</div>
              ) : displayPopular.length > 0 ? (
                displayPopular.map((article) => (
                  <ArticleCard key={`popular-${article.id}`} article={article} />
                ))
              ) : (
                <div className="py-10 text-center text-gray-400">No popular articles found</div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            href={activeTab ? `/articles/${activeTab.toLowerCase()}` : "/articles"}
            className="inline-block px-8 py-3 bg-[#FF5555] text-white font-bold text-sm rounded-md shadow-sm hover:bg-red-600 transition-colors uppercase"
          >
            view all {activeTab || "all"} articles
          </Link>
        </div>
      </div>
    </section>
  )
}
