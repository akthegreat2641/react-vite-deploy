"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react"
import Link from "next/link"

interface CollegePage {
  id: string
  title: string
  headerTitle?: string | null
  slug: string
  locationLabel?: string | null
  headerBgImage?: string | null
  cardImage?: string | null
  headerLogo?: string | null
  featured: boolean
}

export default function PopularColleges() {
  const [colleges, setColleges] = useState<CollegePage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchColleges() {
      try {
        // Fetch featuring only the pages where show in home page (featured=true) is enabled
        const res = await fetch("/api/pages?category=College,Colleges&featured=true")
        const data = await res.json()
        setColleges(data)
      } catch (error) {
        console.error("Failed to fetch popular colleges:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchColleges()
  }, [])

  if (loading) {
    return (
      <section className="py-16 bg-[#5DD9A5] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h2 className="text-2xl font-bold text-[#1a365d] text-center mb-10">Popular Colleges</h2>
          <div className="text-center text-white font-medium">Loading...</div>
        </div>
      </section>
    )
  }

  // If no colleges are marked to show in home page, hide the section
  if (colleges.length === 0) {
    return null
  }

  return (
    <section className="py-10 md:py-16 bg-[#5DD9A5] relative overflow-hidden">
      <div className="absolute top-4 left-8 w-16 h-24 bg-[#7AE4B8] rounded-2xl opacity-60"></div>
      <div className="absolute top-8 left-20 w-10 h-16 bg-[#7AE4B8] rounded-xl opacity-40"></div>
      <div className="absolute top-4 right-8 w-16 h-24 bg-[#7AE4B8] rounded-2xl opacity-60"></div>
      <div className="absolute top-24 right-16 w-10 h-16 bg-[#7AE4B8] rounded-xl opacity-40"></div>
      <div className="absolute bottom-8 left-4 w-10 h-16 bg-[#7AE4B8] rounded-xl opacity-40"></div>
      <div className="absolute bottom-4 right-4 w-10 h-16 bg-[#7AE4B8] rounded-xl opacity-40"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <h2 className="text-xl md:text-2xl font-bold text-[#1a365d] text-center mb-6 md:mb-10">Popular Colleges</h2>

        <div className="flex items-center gap-4">
          {/* Left Arrow */}
          <button className="flex-shrink-0 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:shadow-lg transition-shadow">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>

          {/* Cards Grid */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {colleges.slice(0, 4).map((college) => (
              <Link
                href={`/${college.slug}`}
                key={college.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer block h-full flex flex-col"
              >
                <div className="relative">
                  <img
                    src={college.cardImage || college.headerBgImage || "/placeholder.svg"}
                    alt={college.title}
                    className="w-full h-36 object-cover"
                  />
                  {/* Logo positioned at bottom-left of image */}
                  {college.headerLogo && (
                    <div className="absolute -bottom-5 left-3">
                      <div className="w-10 h-10 rounded-full bg-white shadow-md overflow-hidden bg-white flex items-center justify-center p-0.5">
                        <img
                          src={college.headerLogo}
                          alt=""
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-6 pb-4 px-3 flex-1 flex flex-col justify-between">
                  <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">{college.headerTitle || college.title}</h3>
                  <div className="flex items-center gap-1 mt-auto">
                    <MapPin className="w-3 h-3 text-red-500 fill-red-500 shrink-0" />
                    <p className="text-xs text-emerald-500 line-clamp-1">{college.locationLabel || "Online"}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Right Arrow */}
          <button className="flex-shrink-0 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:shadow-lg transition-shadow">
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </section>
  )
}
