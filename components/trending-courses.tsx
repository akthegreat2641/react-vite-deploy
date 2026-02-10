"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

interface CoursePage {
  id: string
  title: string
  headerTitle?: string | null
  slug: string
  careerType?: string | null
  featured: boolean
}

export default function TrendingCourses() {
  const [courses, setCourses] = useState<CoursePage[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("")

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch("/api/pages?category=Course,Courses&featured=true")
        const data = await res.json()
        setCourses(data)
        // Set first category as active tab
        if (data.length > 0 && !activeTab) {
          const categories = [...new Set(data.map((c: CoursePage) => c.careerType).filter(Boolean))] as string[]
          setActiveTab(categories[0] || "")
        }
      } catch (error) {
        console.error("Failed to fetch courses:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [])

  const categories = [...new Set(courses.map(c => c.careerType).filter(Boolean))] as string[]
  const filteredCourses = activeTab
    ? courses.filter(c => c.careerType === activeTab)
    : courses

  return (
    <section className="py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Trending Courses</h2>
        </div>

        {/* Tabs */}
        {categories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`px-4 md:px-5 py-2 rounded-full text-sm font-medium transition-colors border ${activeTab === category
                  ? "bg-amber-400 text-white border-amber-400"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
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
          <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center bg-white hover:bg-gray-50 z-10">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>

          {/* Grid Container with orange background */}
          {loading ? (
            <div className="bg-amber-50 rounded-2xl p-8 text-center text-gray-600">Loading courses...</div>
          ) : filteredCourses.length > 0 ? (
            <div className="bg-amber-50 rounded-2xl p-8">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {filteredCourses.slice(0, 18).map((course) => (
                  <Link
                    href={`/${course.slug}`}
                    key={course.id}
                    className="bg-white rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer flex flex-col items-center justify-center min-h-[120px]"
                  >
                    <h3 className="text-sm font-semibold text-gray-900 text-center mb-6">{course.headerTitle || course.title}</h3>
                    {/* Orange progress bar */}
                    <div className="w-12 h-1.5 bg-amber-400 rounded-full"></div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-amber-50 rounded-2xl p-8 text-center text-gray-600">No courses found</div>
          )}

          {/* Right Arrow */}
          <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center bg-white hover:bg-gray-50 z-10">
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </section>
  )
}
