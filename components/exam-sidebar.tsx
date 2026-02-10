"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { SidebarAd } from "@/components/sidebar-ad"

interface ExamPage {
    id: string
    title: string
    headerTitle?: string | null
    slug: string
}

export function ExamSidebar() {
    const [exams, setExams] = useState<ExamPage[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Fetch both Exam and Exams categories
        Promise.all([
            fetch("/api/pages?category=Exam").then(res => res.json()),
            fetch("/api/pages?category=Exams").then(res => res.json())
        ])
            .then(([examData, examsData]) => {
                const allExams = [
                    ...(Array.isArray(examData) ? examData : []),
                    ...(Array.isArray(examsData) ? examsData : [])
                ]
                setExams(allExams)
                setLoading(false)
            })
            .catch(err => {
                console.error("Failed to fetch exams:", err)
                setLoading(false)
            })
    }, [])

    return (
        <div className="w-[320px] flex-shrink-0 space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                {/* Header */}
                <div className="px-4 py-3 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Quick Links</h2>
                </div>

                {/* Exams list */}
                <div className="divide-y divide-gray-200">
                    {loading ? (
                        <div className="px-4 py-3 text-sm text-gray-500">Loading...</div>
                    ) : exams.length === 0 ? (
                        <div className="px-4 py-3 text-sm text-gray-500">No exams found</div>
                    ) : (
                        exams.map((exam) => (
                            <Link
                                key={exam.id}
                                href={`/${exam.slug}`}
                                className="block px-4 py-3 hover:bg-gray-50 transition-colors"
                            >
                                <span className="text-sm text-blue-600 hover:underline">
                                    {exam.headerTitle || exam.title}
                                </span>
                            </Link>
                        ))
                    )}
                </div>
            </div>

            <SidebarAd />
        </div>
    )
}
