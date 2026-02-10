"use client"

import { useEffect, useState } from "react"
import { Calendar } from "lucide-react"
import Link from "next/link"

interface NewsPage {
  id: string
  title: string
  headerTitle?: string | null
  slug: string
  headerBgImage?: string | null
  cardImage?: string | null
  featured: boolean
  published: boolean
  createdAt: string
  author?: {
    name: string
  } | null
}

export default function LatestNews() {
  const [news, setNews] = useState<NewsPage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch("/api/pages?category=News&featured=true")
        const data = await res.json()
        // Filter only published news
        const published = data.filter((n: NewsPage) => n.published)
        setNews(published)
      } catch (error) {
        console.error("Failed to fetch news:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchNews()
  }, [])

  const featuredNews = news.find(n => n.featured) || news[0]
  const sideNews = news.filter(n => !n.featured || n.id !== featuredNews?.id).slice(0, 4)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  return (
    <section className="py-10 md:py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 text-center mb-8">Latest News</h2>

        {loading ? (
          <div className="bg-gray-100 rounded-2xl p-6 text-center text-gray-600">Loading news...</div>
        ) : news.length > 0 ? (
          <div className="bg-gray-100 rounded-2xl p-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {featuredNews && (
                <Link href={`/${featuredNews.slug}`} className="bg-white rounded-xl overflow-hidden shadow-sm block hover:shadow-md transition-shadow">
                  <img
                    src={featuredNews.cardImage || featuredNews.headerBgImage || "/placeholder.svg"}
                    alt={featuredNews.title}
                    className="w-full h-72 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 text-lg mb-3">{featuredNews.headerTitle || featuredNews.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <span className="font-medium text-gray-700">{featuredNews.author?.name || "Unknown Author"}</span>
                      <span>{formatDate(featuredNews.createdAt)}</span>
                    </div>
                  </div>
                </Link>
              )}

              <div className="space-y-3">
                {sideNews.map((item) => (
                  <Link
                    href={`/${item.slug}`}
                    key={item.id}
                    className="bg-white rounded-xl overflow-hidden shadow-sm flex hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <img
                      src={item.cardImage || item.headerBgImage || "/placeholder.svg"}
                      alt={item.title}
                      className="w-36 h-24 object-cover flex-shrink-0"
                    />
                    <div className="p-3 flex-1 flex flex-col justify-center">
                      <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2">{item.headerTitle || item.title}</h3>
                      <p className="text-sm text-gray-600 mb-1">{item.author?.name || "Unknown Author"}</p>
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        {formatDate(item.createdAt)}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-100 rounded-2xl p-6 text-center text-gray-600">No news found</div>
        )}
      </div>
    </section>
  )
}
