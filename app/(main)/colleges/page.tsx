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

    // Build Prisma Filters
    const where: any = {
        category: { in: ["College", "Colleges"] },
    }

    if (resolvedParams.branch) {
        where.branch = { contains: resolvedParams.branch as string }
    }
    if (resolvedParams.state) where.state = resolvedParams.state as string
    if (resolvedParams.degree) {
        where.degree = { contains: resolvedParams.degree as string }
    }
    if (resolvedParams.collegeType) where.collegeType = resolvedParams.collegeType as string
    if (resolvedParams.instituteType) where.instituteType = resolvedParams.instituteType as string

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

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Filter Bar (Client Component) */}
            <FilterBar />

            <div className="container mx-auto px-4 py-6">
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

