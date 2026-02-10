"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Stat {
  id: string
  label: string
  value: string
  items?: { title: string; slug: string }[]
  featured: boolean
}

import Link from "next/link"

export default function StatsBar() {
  const [stats, setStats] = useState<Stat[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/stats")
        const data = await res.json()
        const featured = data.filter((s: Stat) => s.featured)
        setStats(featured.length > 0 ? featured : data)
      } catch (error) {
        console.error("Failed to fetch stats:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  return (
    <div className="bg-white border-t border-gray-200 py-2 md:py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center">
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex-1 flex items-center overflow-x-auto gap-4 px-4 scrollbar-hide">
            {loading ? (
              <div className="text-gray-500">Loading...</div>
            ) : stats.length > 0 ? (
              stats.flatMap((stat) =>
                stat.items && stat.items.length > 0
                  ? stat.items.map((item, idx) => (
                    <Link
                      key={`${stat.id}-${idx}`}
                      href={`/${item.slug}`}
                      className="flex-shrink-0 px-6 py-2 rounded-full border border-gray-300 bg-white text-gray-800 font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors shadow-sm whitespace-nowrap uppercase"
                    >
                      {item.title}
                    </Link>
                  ))
                  : stat.value.split(", ").map((text, idx) => (
                    <span
                      key={`${stat.id}-${idx}`}
                      className="flex-shrink-0 px-6 py-2 rounded-full border border-gray-300 bg-white text-gray-800 font-medium whitespace-nowrap uppercase"
                    >
                      {text}
                    </span>
                  ))
              )
            ) : (
              <div className="text-gray-500">No stats available</div>
            )}
          </div>

          <button className="p-2 text-gray-400 hover:text-gray-600">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
