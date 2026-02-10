import { prisma } from "@/lib/prisma"
import { CategoryHeader } from "@/components/category-header"
import Link from "next/link"
import {
    Settings,
    Briefcase,
    FlaskConical,
    Pill,
    Gavel,
    Palette,
    Stethoscope,
    GraduationCap,
    BookOpen,
    Cpu
} from "lucide-react"
import { AdSenseBanner } from "@/components/adsense-banner"

export default async function CoursesPage() {
    // 1. Fetch all Course pages
    const courses = await prisma.page.findMany({
        where: {
            category: {
                in: ["Course", "Courses"]
            },
            published: true,
        },
        orderBy: {
            title: 'asc',
        },
        select: {
            id: true,
            title: true,
            slug: true,
            branch: true,
        }
    })

    // 2. Group by Branch
    const groupedCourses: Record<string, typeof courses> = {}

    courses.forEach(course => {
        const branch = course.branch || "General"
        if (!groupedCourses[branch]) {
            groupedCourses[branch] = []
        }
        groupedCourses[branch].push(course)
    })

    // 3. Define Branch Order/Icons
    const branchConfig: Record<string, { icon: any, color: string }> = {
        "Engineering": { icon: Settings, color: "text-blue-600" },
        "Management": { icon: Briefcase, color: "text-blue-800" },
        "Science": { icon: FlaskConical, color: "text-blue-500" },
        "Medical": { icon: Stethoscope, color: "text-cyan-500" },
        "Pharmacy": { icon: Pill, color: "text-blue-700" },
        "Law": { icon: Gavel, color: "text-blue-900" },
        "Design": { icon: Palette, color: "text-blue-400" },
        "Arts": { icon: BookOpen, color: "text-pink-500" },
        "Computer Applications": { icon: Cpu, color: "text-indigo-600" },
        "Commerce": { icon: GraduationCap, color: "text-orange-500" },
        "General": { icon: BookOpen, color: "text-gray-500" }
    }

    const branches = Object.keys(groupedCourses).sort()

    return (
        <div className="bg-gray-50 min-h-screen pb-12">
            {/* Breadcrumb */}
            <div className="w-full lg:w-[60%] mx-auto px-4 py-4 text-xs text-gray-500">
                <Link href="/" className="hover:underline">Home</Link> &gt; <span className="text-gray-800">Courses</span>
            </div>

            <div className="w-full lg:w-[60%] mx-auto px-4">
                <AdSenseBanner />
                <CategoryHeader category="Course" slug="courses" />

                {branches.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                        No courses found.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {branches.map(branch => {
                            const Icon = branchConfig[branch]?.icon || BookOpen
                            const iconColor = branchConfig[branch]?.color || "text-blue-600"
                            const branchCourses = groupedCourses[branch].slice(0, 4) // Show top 4 like in design

                            return (
                                <div key={branch} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col">
                                    {/* Header */}
                                    <div className="p-6 pb-4 flex items-center gap-4">
                                        <div className={`p-2 rounded-full bg-blue-50 ${iconColor}`}>
                                            <Icon size={32} strokeWidth={1.5} />
                                        </div>
                                        <h2 className="text-lg font-semibold text-gray-800">
                                            {branch}
                                        </h2>
                                    </div>

                                    {/* Course Buttons Grid */}
                                    <div className="px-6 py-2 flex-1">
                                        <div className="grid grid-cols-2 gap-3">
                                            {branchCourses.map(course => (
                                                <Link
                                                    key={course.id}
                                                    href={`/${course.slug}`}
                                                    className="border border-gray-200 rounded px-3 py-2 text-sm text-blue-600 font-medium text-center hover:bg-blue-50 hover:border-blue-200 transition-colors truncate"
                                                    title={course.slug}
                                                >
                                                    {course.slug}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Footer */}
                                    <div className="mt-4 border-t border-gray-100 p-4 text-center">
                                        <Link
                                            href={`/courses/${branch.toLowerCase().replace(/\s+/g, '-')}`}
                                            className="text-[#FF5555] text-sm font-medium hover:underline"
                                        >
                                            View All {branch} Courses
                                        </Link>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}

                <AdSenseBanner />
            </div>
        </div>
    )
}
