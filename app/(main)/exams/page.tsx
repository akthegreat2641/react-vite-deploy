import { prisma } from "@/lib/prisma"
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
    Cpu,
    Landmark,
    Activity
} from "lucide-react"
import { AdSenseBanner } from "@/components/adsense-banner"

export default async function ExamsPage() {
    // 1. Fetch all Exam pages
    const exams = await prisma.page.findMany({
        where: {
            category: {
                in: ["Exam", "Exams"]
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
    const groupedExams: Record<string, typeof exams> = {}

    exams.forEach(exam => {
        const branch = exam.branch || "General"
        if (!groupedExams[branch]) {
            groupedExams[branch] = []
        }
        groupedExams[branch].push(exam)
    })

    // 3. Define Branch Order/Icons
    const branchConfig: Record<string, { icon: any, color: string }> = {
        "Engineering": { icon: Settings, color: "text-blue-600" },
        "Management": { icon: Briefcase, color: "text-blue-800" },
        "Science": { icon: FlaskConical, color: "text-blue-500" },
        "Medical": { icon: Stethoscope, color: "text-blue-500" },
        "Pharmacy": { icon: Pill, color: "text-blue-700" },
        "Law": { icon: Gavel, color: "text-blue-900" },
        "Design": { icon: Palette, color: "text-blue-400" },
        "Arts": { icon: BookOpen, color: "text-pink-500" },
        "Computer Applications": { icon: Cpu, color: "text-indigo-600" },
        "Commerce": { icon: Landmark, color: "text-blue-900" },
        "Dental": { icon: Activity, color: "text-blue-600" }, // Using Activity as placeholder for Dental
        "General": { icon: BookOpen, color: "text-gray-500" }
    }

    const branches = Object.keys(groupedExams).sort()

    // 4. Fetch Header Content (Sub Content)
    const headerPage = await prisma.page.findUnique({
        where: { slug: "exams-header" },
        include: {
            sections: {
                orderBy: { order: "asc" }
            }
        }
    })

    return (
        <div className="bg-gray-50 min-h-screen pb-12">
            {/* Breadcrumb */}
            <div className="w-full lg:w-[60%] mx-auto px-4 py-4 text-xs text-gray-500">
                <Link href="/" className="hover:underline">Home</Link> &gt; <span className="text-gray-800">Exams</span>
            </div>

            <div className="w-full lg:w-[60%] mx-auto px-4">
                <AdSenseBanner />
                <h1 className="text-2xl font-semibold text-gray-800 mb-8">All Exams</h1>

                {/* Dynamic Header Content */}
                {headerPage?.sections.map((section) => (
                    <div key={section.id} className="bg-white border rounded shadow-sm mb-8 overflow-hidden">
                        <div className="bg-gray-100 px-6 py-4 border-b">
                            <h3 className="font-bold text-gray-800">{section.title}</h3>
                        </div>
                        <div className="p-6 text-gray-600 border-l border-r border-b prose prose-blue max-w-none" dangerouslySetInnerHTML={{ __html: section.content }} />
                    </div>
                ))}

                {branches.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                        No exams found.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {branches.map(branch => {
                            const Icon = branchConfig[branch]?.icon || BookOpen
                            const iconColor = branchConfig[branch]?.color || "text-blue-600"
                            const branchExams = groupedExams[branch].slice(0, 5) // Show top 5

                            return (
                                <div key={branch} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
                                    {/* Header */}
                                    <div className="p-6 pb-2 flex items-center gap-4">
                                        <div className={`p-2 rounded-full ${iconColor} bg-opacity-10`}>
                                            <Icon size={40} strokeWidth={1.5} className={iconColor} />
                                        </div>
                                        <h2 className="text-lg font-medium text-gray-800 lowercase">
                                            {branch}
                                        </h2>
                                    </div>

                                    {/* Divider */}
                                    <div className="border-b border-gray-100 mx-6 mb-4"></div>

                                    {/* Exam Links List */}
                                    <div className="px-6 flex-1 mb-4">
                                        <div className="flex flex-col gap-3">
                                            {branchExams.map(exam => (
                                                <Link
                                                    key={exam.id}
                                                    href={`/${exam.slug}`}
                                                    className="group flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors"
                                                >
                                                    <span className="text-[#FF5555] font-bold text-xs group-hover:translate-x-1 transition-transform">&gt;</span>
                                                    {exam.slug}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Footer */}
                                    <div className="border-t border-gray-100 p-4 text-center mt-auto">
                                        <Link
                                            href={`/articles?branch=${encodeURIComponent(branch)}`}
                                            className="text-[#FF5555] text-xs font-bold uppercase hover:underline tracking-wide"
                                        >
                                            View All
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
