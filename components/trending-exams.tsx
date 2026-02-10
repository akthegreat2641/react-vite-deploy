"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Exam {
  id: string
  title: string
  slug: string
  headerTitle?: string | null
  careerType?: string | null
  featured: boolean
}

export default function TrendingExams() {
  const [exams, setExams] = useState<Exam[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("")

  useEffect(() => {
    async function fetchExams() {
      try {
        // Fetch pages with category 'Exam' or 'Exams'
        const res = await fetch("/api/pages?category=Exam,Exams")
        const data = await res.json()
        setExams(data)
        // Set first unique careerType as active tab
        if (data.length > 0 && !activeTab) {
          const categories = [...new Set(data.map((e: Exam) => e.careerType).filter(Boolean))] as string[]
          setActiveTab(categories[0] || "")
        }
      } catch (error) {
        console.error("Failed to fetch exams:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchExams()
  }, []) // Remove activeTab dependency to prevent infinite loop/reset

  // Filter unique career types for tabs
  const categories = [...new Set(exams.map(e => e.careerType).filter(Boolean))] as string[]

  // Filter exams by active tab (careerType) if activeTab is set, otherwise show all
  const filteredExams = activeTab
    ? exams.filter(e => e.careerType === activeTab)
    : exams

  return (
    <section className="py-10 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Trending Exams</h2>
        </div>

        {/* Tabs */}
        {categories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`px-4 md:px-5 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === category
                  ? "bg-emerald-400 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Cards Grid with Navigation */}
        <div className="relative">
          {/* Left Arrow */}
          <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600">
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow */}
          <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600">
            <ChevronRight className="w-6 h-6" />
          </button>

          {loading ? (
            <div className="bg-gray-100/70 rounded-3xl p-6 text-center text-gray-600">Loading exams...</div>
          ) : filteredExams.length > 0 ? (
            <div className="bg-gray-100/70 rounded-3xl p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {filteredExams.slice(0, 18).map((exam) => (
                  <a
                    href={`/${exam.slug}`}
                    key={exam.id}
                    className="bg-white rounded-xl p-5 hover:shadow-lg transition-shadow cursor-pointer border border-gray-100 flex flex-col items-center justify-center min-h-[120px]"
                  >
                    <h3 className="text-sm font-semibold text-gray-800 leading-tight text-center mb-4">{exam.headerTitle || exam.title}</h3>
                    <div className="w-12 h-1 bg-emerald-400 rounded-full"></div>
                  </a>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-gray-100/70 rounded-3xl p-6 text-center text-gray-600">No exams found</div>
          )}
        </div>
      </div>
    </section>
  )
}
