"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

interface ScholarshipPage {
  id: string
  title: string
  headerTitle?: string | null
  slug: string
  featured: boolean
}

export default function ScholarshipsSection() {
  const [scholarships, setScholarships] = useState<ScholarshipPage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchScholarships() {
      try {
        const res = await fetch("/api/pages?category=Scholarship,Scholarships&featured=true")
        const data = await res.json()
        setScholarships(data.slice(0, 8))
      } catch (error) {
        console.error("Failed to fetch scholarships:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchScholarships()
  }, [])

  return (
    <section className="py-10 md:py-16 bg-[#1a2744] relative overflow-hidden">
      {/* Decorative arc on the right side */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-slate-600/30 rounded-full translate-x-1/2" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Top Scholarships</h2>
          <p className="text-slate-400 text-sm">Search among 500+ government, and competitive entrance exams</p>
        </div>

        {loading ? (
          <div className="text-center text-white py-8">Loading scholarships...</div>
        ) : scholarships.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {scholarships.map((scholarship) => (
              <Link
                href={`/${scholarship.slug}`}
                key={scholarship.id}
                className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer flex items-center justify-center min-h-[100px]"
              >
                <h3 className="font-medium text-gray-800 text-center text-sm leading-snug">{scholarship.headerTitle || scholarship.title}</h3>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center text-white py-8">No scholarships found</div>
        )}
      </div>
    </section>
  )
}
