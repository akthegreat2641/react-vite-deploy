
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { BoardsSearch } from "@/components/boards-search"
import { BoardCard } from "@/components/board-card"
import { AdSenseBanner } from "@/components/adsense-banner"

export default async function BoardsPage({
    searchParams,
}: {
    searchParams: Promise<{
        query?: string
    }>
}) {
    const resolvedParams = await searchParams
    const query = resolvedParams?.query || ""

    const pages = await prisma.page.findMany({
        where: {
            category: {
                in: ["Board", "Boards"]
            },
            published: true,
            OR: [
                { title: { contains: query } },
                { boardType: { contains: query } },
            ]
        },
        orderBy: {
            title: 'asc',
        },
        select: {
            id: true,
            title: true,
            slug: true,
            headerLogo: true,
            cardImage: true,
            level: true,
            boardType: true,
        }
    })

    const nationalBoards = pages.filter(p => p.level === "National Boards")
    const stateBoards = pages.filter(p => p.level === "State Boards")

    return (
        <div className="bg-gray-50 min-h-screen pb-12">
            {/* Breadcrumb */}
            <div className="w-full lg:w-[60%] mx-auto px-4 py-4 text-xs text-gray-500">
                <Link href="/" className="hover:underline">Home</Link> &gt; <span className="text-gray-800">Boards</span>
            </div>

            <div className="w-full lg:w-[60%] mx-auto px-4">
                <AdSenseBanner />
                {/* Search Section */}
                <div className="bg-[#FFFDF5] border border-gray-100 rounded-lg p-4 md:p-8 mb-8 shadow-sm">
                    <h1 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">Search for Boards in India</h1>
                    <div className="flex flex-col md:flex-row gap-4">
                        <BoardsSearch />
                    </div>
                </div>

                {/* National Boards Section */}
                {nationalBoards.length > 0 && (
                    <div className="mb-10">
                        <div className="bg-gray-100 px-4 py-2 rounded-sm mb-6">
                            <h2 className="text-sm font-bold text-gray-700 uppercase">National Boards</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {nationalBoards.map(board => (
                                <BoardCard key={board.id} board={board} />
                            ))}
                        </div>
                    </div>
                )}

                {/* State Boards Section */}
                {stateBoards.length > 0 && (
                    <div className="mb-10">
                        <div className="bg-gray-100 px-4 py-2 rounded-sm mb-6">
                            <h2 className="text-sm font-bold text-gray-700 uppercase">State Boards</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {stateBoards.map(board => (
                                <BoardCard key={board.id} board={board} />
                            ))}
                        </div>
                    </div>
                )}

                {pages.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        No board information found{query ? ` for "${query}"` : ""}.
                    </div>
                )}
                <AdSenseBanner />
            </div>
        </div>
    )
}
