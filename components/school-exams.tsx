"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

interface ExamPage {
  id: string
  title: string
  headerTitle?: string | null
  slug: string
  careerType?: string | null
  featured: boolean
}

export default function SchoolExams() {
  const [exams, setExams] = useState<ExamPage[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("")

  useEffect(() => {
    async function fetchExams() {
      try {
        const res = await fetch("/api/pages?category=Exam,Exams&featured=true")
        const data = await res.json()
        setExams(data)
        // Set first careerType as active tab
        if (data.length > 0 && !activeTab) {
          const categories = [...new Set(data.map((e: ExamPage) => e.careerType).filter(Boolean))] as string[]
          setActiveTab(categories[0] || "")
        }
      } catch (error) {
        console.error("Failed to fetch exams:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchExams()
  }, [])

  const categories = [...new Set(exams.map(e => e.careerType).filter(Boolean))] as string[]
  const filteredExams = activeTab
    ? exams.filter(e => e.careerType === activeTab)
    : exams

  return (
    <section className="py-10 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 text-center mb-6">Top School Exams in India</h2>

        {categories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${activeTab === category
                  ? "bg-emerald-500 text-white border-emerald-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        <div className="relative">
          {/* Left Arrow */}
          <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 z-10">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>

          {/* Right Arrow */}
          <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 z-10">
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>

          {loading ? (
            <div className="bg-emerald-50/50 rounded-xl p-6 text-center text-gray-600">Loading exams...</div>
          ) : filteredExams.length > 0 ? (
            <div className="bg-emerald-50/50 rounded-xl p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {filteredExams.slice(0, 18).map((exam) => (
                  <Link
                    href={`/${exam.slug}`}
                    key={exam.id}
                    className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-center gap-4 min-h-[120px]"
                  >
                    <h3 className="text-sm font-semibold text-gray-900 text-center leading-tight">{exam.headerTitle || exam.title}</h3>
                    <div>
                      <div className="w-12 h-1 bg-emerald-400 rounded-full mx-auto"></div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-emerald-50/50 rounded-xl p-6 text-center text-gray-600">No exams found</div>
          )}
        </div>
      </div>
    </section>
  )
}
