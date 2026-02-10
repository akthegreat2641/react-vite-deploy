"use client"

import { useState } from "react"
import { CourseInfoCard } from "./course-info-card"
import { cn } from "@/lib/utils"

interface Course {
    id: string
    title: string
    slug: string
    avgFees?: string | null
    courseDuration?: string | null
    level?: string | null
    headerBtn1Link?: string | null
}

interface CourseListClientProps {
    branchName: string
    initialCourses: Course[]
}

const TABS = [
    { id: "ALL", label: "ALL" },
    { id: "DIPLOMA", label: "DIPLOMA" },
    { id: "BACHELORS", label: "BACHELORS" },
    { id: "MASTERS", label: "MASTERS" },
    { id: "DOCTORATE", label: "DOCTORATE" },
    { id: "CERTIFICATE", label: "CERTIFICATE" },
    { id: "INTEGRATED DEGREE", label: "INTEGRATED DEGREE" },
]

export function CourseListClient({ branchName, initialCourses }: CourseListClientProps) {
    const [activeTab, setActiveTab] = useState("ALL")

    const filteredCourses = initialCourses.filter(course => {
        if (activeTab === "ALL") return true

        const courseLevel = course.level?.toUpperCase() || ""
        // Map some variations if needed, but for now exact match or contains
        return courseLevel.includes(activeTab)
    })

    return (
        <div className="space-y-6">

            {/* Tabs */}
            <div className="bg-white rounded-lg border border-gray-200 p-1 flex flex-wrap gap-1 shadow-sm overflow-x-auto no-scrollbar">
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                            "px-4 py-2 text-xs font-bold rounded-md transition-all whitespace-nowrap uppercase tracking-wider",
                            activeTab === tab.id
                                ? "bg-red-50 text-red-500 border-b-2 border-red-500 rounded-none h-full"
                                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                        )}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* List */}
            <div className="grid grid-cols-1 gap-6">
                {filteredCourses.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-lg border border-dashed border-gray-300">
                        <p className="text-gray-500">No courses found in this category.</p>
                    </div>
                ) : (
                    filteredCourses.map((course) => (
                        <CourseInfoCard key={course.id} course={course} />
                    ))
                )}
            </div>
        </div>
    )
}
