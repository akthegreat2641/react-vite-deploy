"use client"

import { SidebarAd } from "@/components/sidebar-ad"

interface CourseSidebarProps {
    branchName?: string
    topColleges?: any[]
    topExams?: any[]
    recentNews?: any[]
    featuredNews?: any[]
    recentArticles?: any[]
    popularArticles?: any[]
}

export function CourseSidebar({
    branchName,
    topColleges = [],
    topExams = [],
    recentNews = [],
    featuredNews = [],
    recentArticles = [],
    popularArticles = []
}: CourseSidebarProps) {
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                {/* Header */}
                <div className="px-4 py-3 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Top Trending {branchName} Courses</h2>
                </div>

                {/* Courses list */}
                <div className="divide-y divide-gray-200">
                    {/* Placeholder for trending courses list if available in props, 
                         currently reusing the fetch logic or assuming this list is static for now. 
                         Since the original component fetched 'Course' category pages, we might want to keep that 
                         or use 'recentArticles' if they represent courses? 
                         For now, preserving the structure but simplifying. 
                     */}
                    {/* Re-implementing the fetch or using props? 
                        The user passed 'topColleges', 'topExams', etc. but NOT 'trendingCourses'.
                        However, the original component fetched 'api/pages?category=Course'.
                        I will assume for this task I should just add the ad and fix the signature.
                        I'll re-add the client-side fetch for courses for now to maintain feature parity
                        while accepting other props to avoid errors.
                     */}
                    <div className="p-4 text-sm text-gray-500">
                        {/* 
                           Ideally we would use passed data. 
                           Restoring the fetch logic is complex in a full replace.
                           I will just render a placeholder or existing logic if I could.
                           But I'm replacing the whole component.
                           
                           Actually, I'll bring back the fetch logic but wrapped in this new signature.
                        */}
                        <CourseListFetcher />
                    </div>
                </div>
            </div>

            <SidebarAd />
        </div>
    )
}

import { useEffect, useState } from "react"
import Link from "next/link"

function CourseListFetcher() {
    const [courses, setCourses] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("/api/pages?category=Course")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setCourses(data)
                setLoading(false)
            })
            .catch(err => setLoading(false))
    }, [])

    if (loading) return <div>Loading...</div>
    if (courses.length === 0) return <div>No courses found</div>

    return (
        <>
            {courses.slice(0, 5).map((course: any) => (
                <Link
                    key={course.id}
                    href={`/${course.slug}`}
                    className="block px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                    <span className="text-blue-600 hover:underline">{course.headerTitle || course.title}</span>
                </Link>
            ))}
        </>
    )
}
