"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Testimonial {
  id: string
  name: string
  content: string
  image?: string | null
  rating: number
  featured: boolean
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const res = await fetch("/api/testimonials")
        const data = await res.json()
        // Show only featured testimonials, or all if none are featured
        const featured = data.filter((t: Testimonial) => t.featured)
        setTestimonials(featured.length > 0 ? featured : data)
        setActiveIndex(0)
      } catch (error) {
        console.error("Failed to fetch testimonials:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchTestimonials()
  }, [])

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const getVisibleAvatars = () => {
    if (testimonials.length === 0) return []
    const indices = []
    for (let i = -2; i <= 2; i++) {
      let index = activeIndex + i
      if (index < 0) index = testimonials.length + index
      if (index >= testimonials.length) index = index - testimonials.length
      indices.push(index)
    }
    return indices
  }

  return (
    <section className="py-10 md:py-16 bg-gray-100">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-sm py-8 md:py-12 px-6 md:px-8">
          {/* Quote Icon */}
          <div className="flex justify-center mb-6 md:mb-8">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-emerald-400 rounded-full flex items-center justify-center">
              <span className="text-white text-3xl md:text-4xl font-serif leading-none">"</span>
            </div>
          </div>

          {/* Testimonial Text */}
          {loading ? (
            <div className="text-center text-gray-500 py-8">Loading testimonials...</div>
          ) : testimonials.length > 0 ? (
            <p className="text-center text-gray-700 text-sm md:text-base leading-relaxed max-w-3xl mx-auto mb-8 md:mb-12">
              {testimonials[activeIndex]?.content}
            </p>
          ) : (
            <div className="text-center text-gray-500 py-8">No testimonials found</div>
          )}

          {/* Avatar Carousel */}
          <div className="flex items-center justify-center gap-4">
            {/* Left Arrow */}
            <button
              onClick={handlePrev}
              className="text-gray-300 hover:text-gray-400 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            {/* Avatars */}
            {testimonials.length > 0 && (
              <div className="flex items-center gap-2 md:gap-4">
                {getVisibleAvatars().map((index, i) => {
                  const isCenter = i === 2
                  const isEdge = i === 0 || i === 4
                  const testimonial = testimonials[index]
                  if (!testimonial) return null
                  return (
                    <button
                      key={testimonial.id}
                      onClick={() => setActiveIndex(index)}
                      className={`rounded-full overflow-hidden border-2 transition-all ${isEdge ? "hidden md:block" : ""} ${isCenter
                        ? "w-16 h-16 md:w-20 md:h-20 border-gray-300"
                        : "w-10 h-10 md:w-14 md:h-14 border-transparent opacity-70 hover:opacity-100"
                        }`}
                    >
                      <img
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  )
                })}
              </div>
            )}

            {/* Right Arrow */}
            <button
              onClick={handleNext}
              className="text-gray-800 hover:text-gray-600 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
            </button>
          </div>

          {/* Name and Rating */}
          {testimonials.length > 0 && testimonials[activeIndex] && (
            <div className="text-center mt-6">
              <h4 className="font-semibold text-gray-900 text-base">{testimonials[activeIndex].name}</h4>
              <p className="text-gray-500 text-sm mt-1">Rating: {testimonials[activeIndex].rating}/5</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
