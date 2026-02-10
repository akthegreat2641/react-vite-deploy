import { prisma } from "@/lib/prisma"
import { CollegeCard } from "@/components/college-card"
import { Button } from "@/components/ui/button"
import { FilterBar } from "@/components/colleges/filter-bar"
import { Grid, List } from "lucide-react"

import { SortOptions } from "@/components/colleges/sort-options"

export const dynamic = "force-dynamic"

export default async function CollegesPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const resolvedParams = await searchParams

    // 1. Fetch Master Page Data (Sub College)
    const masterPageId = "cmlava9ft000g7ktcv18rj4hw"
    const masterPage = await prisma.page.findUnique({
        where: { id: masterPageId },
        include: { sections: { orderBy: { order: 'asc' } } }
    })

    // Build Prisma Filters
    const where: any = {
        category: { in: ["College", "Colleges"] },
    }

    // Use Master Page metadata as default if not provided in searchParams
    const activeStream = (resolvedParams.branch as string) || masterPage?.branch
    const activeState = (resolvedParams.state as string) || masterPage?.state
    const activeDegree = (resolvedParams.degree as string) || masterPage?.degree
    const activeCollegeType = (resolvedParams.collegeType as string) || masterPage?.collegeType
    const activeInstituteType = (resolvedParams.instituteType as string) || masterPage?.instituteType

    if (activeStream) {
        where.branch = { contains: activeStream }
    }
    if (activeState) where.state = activeState
    if (activeDegree) {
        where.degree = { contains: activeDegree }
    }
    if (activeCollegeType) where.collegeType = activeCollegeType
    if (activeInstituteType) where.instituteType = activeInstituteType

    // Partial matches
    if (resolvedParams.totalFees) {
        where.totalFees = { contains: resolvedParams.totalFees as string }
    }
    if (resolvedParams.examAccepted) {
        where.examAccepted = { contains: resolvedParams.examAccepted as string }
    }

    if (resolvedParams.courseType) {
        where.courseType = { contains: resolvedParams.courseType as string }
    }
    if (resolvedParams.courseDuration) where.courseDuration = resolvedParams.courseDuration as string
    if (resolvedParams.genderAccepted) where.genderAccepted = resolvedParams.genderAccepted as string

    // Sorting Logic
    let orderBy: any = [{ cdRank: 'asc' }, { createdAt: 'desc' }] // Default (Popularity/Rank mixed)
    const sort = resolvedParams.sort as string

    if (sort === "ranking") {
        orderBy = [{ cdRank: 'asc' }]
    } else if (sort === "fees_high") {
        orderBy = [{ totalFeesVal: 'desc' }]
    } else if (sort === "fees_low") {
        orderBy = [{ totalFeesVal: 'asc' }]
    }

    const colleges = await prisma.page.findMany({
        where,
        orderBy
    })

    const totalCount = colleges.length
    const masterContent = masterPage?.sections?.[0]?.content || "No overview content available."
    const masterTitle = masterPage?.title || "Colleges"

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Filter Bar (Client Component) */}
            <FilterBar />

            <div className="container mx-auto px-4 py-6">
                {/* Master Page Header Card */}
                <div className="bg-white border rounded-xl shadow-sm overflow-hidden mb-6">
                    <div className="bg-[#F8F9FA] px-4 py-3 border-b">
                        <h2 className="font-bold text-gray-900">{masterTitle}</h2>
                    </div>
                    <div className="p-4 prose prose-sm max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: masterContent }} />
                    </div>
                </div>

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <h1 className="text-xl font-bold text-gray-800">Found {totalCount} Colleges</h1>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span className="font-semibold">Sort By:</span>
                            <SortOptions />
                        </div>
                    </div>
                </div>
            </div>

            {/* Table Header (Desktop Only) */}
            <div className="hidden md:grid grid-cols-[60px_1fr_180px_180px] bg-[#88BDBF] text-white rounded-t-md text-sm font-semibold">
                <div className="p-3 text-center border-r border-[#9FD4D6]">CD Rank</div>
                <div className="p-3 border-r border-[#9FD4D6]">Colleges</div>
                <div className="p-3 border-r border-[#9FD4D6]">Course Fees</div>
                <div className="p-3">Placement</div>
            </div>

            {/* List */}
            <div className="space-y-4 md:space-y-0">
                {colleges.map((college, index) => (
                    <CollegeCard key={college.id} page={college} rank={index + 1} />
                ))}

                {totalCount === 0 && (
                    <div className="text-center py-20 text-gray-500">
                        No colleges found matching your criteria.
                    </div>
                )}
            </div>
        </div>
    )
}
