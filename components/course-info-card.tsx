"use client"

import { Button } from "@/components/ui/button"
import { IndianRupee, Clock, ExternalLink } from "lucide-react"
import Link from "next/link"

interface CourseInfoCardProps {
    course: {
        id: string
        title: string
        slug: string
        avgFees?: string | null
        courseDuration?: string | null
        headerBtn1Link?: string | null
    }
}

export function CourseInfoCard({ course }: CourseInfoCardProps) {
    const applyLink = course.headerBtn1Link || "#"

    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-shadow">
            <div className="space-y-4 flex-1">
                <h3 className="text-xl font-semibold text-gray-800">
                    <Link href={`/${course.slug}`} className="hover:text-red-500 transition-colors">
                        {course.title}
                    </Link>
                </h3>

                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-2 py-1 rounded-md">
                        <IndianRupee className="w-4 h-4" />
                        <span>Average fee <span className="font-semibold">{course.avgFees || "N/A"}</span></span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-2 py-1 rounded-md">
                        <Clock className="w-4 h-4" />
                        <span>Duration <span className="font-semibold">{course.courseDuration || "N/A"}</span></span>
                    </div>
                </div>
            </div>

            <div className="flex-shrink-0">
                <Link href={applyLink}>
                    <Button className="bg-[#FF5555] hover:bg-[#EE4444] text-white px-8 py-6 h-auto text-base font-bold shadow-lg shadow-red-100">
                        Apply Now
                    </Button>
                </Link>
            </div>
        </div>
    )
}
