"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Wheat,
  Film,
  Building2,
  Palette,
  Plane,
  ShoppingCart,
  Monitor,
  Stethoscope,
  PenTool,
  GraduationCap,
  Cog,
  Hotel,
  Scale,
  Users,
  Radio,
  Heart,
  Cross,
  Pill,
} from "lucide-react"
import Link from "next/link"

export default function FindSection() {
  const [activeTab, setActiveTab] = useState("Colleges")
  const [branchCounts, setBranchCounts] = useState<Record<string, number>>({})

  const getTargetHref = (label: string) => {
    const baseUrl = activeTab === "Exams" ? "/exams" : activeTab === "Courses" ? "/courses" : "/colleges"
    if (activeTab === "Colleges") {
      return `${baseUrl}?branch=${encodeURIComponent(label)}`
    }
    return baseUrl
  }

  useEffect(() => {
    async function fetchCounts() {
      try {
        const categoryMap: Record<string, string> = {
          "Colleges": "College",
          "Exams": "Exam",
          "Courses": "Course"
        }
        const apiCat = categoryMap[activeTab] || "College"
        const res = await fetch(`/api/stats/branch-counts?category=${apiCat}`)
        if (res.ok) {
          const data = await res.json()
          setBranchCounts(data)
        }
      } catch (error) {
        console.error("Failed to fetch branch counts:", error)
      }
    }
    fetchCounts()
  }, [activeTab])

  const tabs = ["Colleges", "Exams", "Courses"]

  const getCountLabel = (count: number) => {
    const entity = activeTab === "Colleges" ? "College" : activeTab === "Exams" ? "Exam" : "Course"
    return `${count} ${entity}${count !== 1 ? "s" : ""}`
  }

  const collegeCategories = [
    { icon: Wheat, label: "Agriculture", count: getCountLabel(branchCounts["Agriculture"] || 0) },
    { icon: Film, label: "Animation", count: getCountLabel(branchCounts["Animation"] || 0) },
    { icon: Building2, label: "Architecture", count: getCountLabel(branchCounts["Architecture"] || 0) },
    { icon: Palette, label: "Arts", count: getCountLabel(branchCounts["Arts"] || 0) },
    { icon: Plane, label: "Aviation", count: getCountLabel(branchCounts["Aviation"] || 0) },
    { icon: ShoppingCart, label: "Commerce", count: getCountLabel(branchCounts["Commerce"] || 0) },
    { icon: Monitor, label: "Computer", count: getCountLabel(branchCounts["Computer"] || 0) },
    { icon: Stethoscope, label: "Dental", count: getCountLabel(branchCounts["Dental"] || 0) },
    { icon: PenTool, label: "Design", count: getCountLabel(branchCounts["Design"] || 0) },
    { icon: GraduationCap, label: "Education", count: getCountLabel(branchCounts["Education"] || 0) },
    { icon: Cog, label: "Engineering", count: getCountLabel(branchCounts["Engineering"] || 0) },
    { icon: Hotel, label: "Hotel Management", count: getCountLabel(branchCounts["Hotel Management"] || 0) },
    { icon: Scale, label: "Law", count: getCountLabel(branchCounts["Law"] || 0) },
    { icon: Users, label: "Management", count: getCountLabel(branchCounts["Management"] || 0) },
    { icon: Radio, label: "Mass Communication", count: getCountLabel(branchCounts["Mass Communication"] || 0) },
    { icon: Heart, label: "Medical", count: getCountLabel(branchCounts["Medical"] || 0) },
    { icon: Cross, label: "Paramedical", count: getCountLabel(branchCounts["Paramedical"] || 0) },
    { icon: Pill, label: "Pharmacy", count: getCountLabel(branchCounts["Pharmacy"] || 0) },
  ]

  return (
    <section className="py-10 md:py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Find the Perfect Exam, College, & Course</h2>
          <p className="text-gray-500">That Matches Your Career Goals</p>
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center mb-8 md:mb-10">
          <div className="inline-flex flex-wrap justify-center border border-gray-200 rounded-full p-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 md:px-6 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === tab ? "bg-[#1e3a5f] text-white" : "text-gray-600 hover:text-gray-900"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-10">
          {collegeCategories.map((category, index) => (
            <Link
              href={getTargetHref(category.label)}
              key={index}
              className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-md transition-shadow cursor-pointer block"
            >
              <div className="flex justify-center mb-3">
                <category.icon className="w-8 h-8 text-gray-800" strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">{category.label}</h3>
              <p className="text-xs text-gray-500">{category.count}</p>
            </Link>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center">
          <Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-10 py-2 rounded-md">View More</Button>
        </div>
      </div>
    </section>
  )
}
