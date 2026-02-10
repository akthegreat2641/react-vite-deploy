"use client"

import Link from "next/link"

export function BoardCard({ board }: { board: any }) {
    const logo = board.headerLogo || board.cardImage || "/placeholder-logo.jpg"

    return (
        <div className="bg-white border border-gray-200 rounded hover:shadow-md transition-shadow flex flex-col h-full">
            <div className="p-6 flex items-start gap-4 flex-1">
                <h3 className="text-gray-700 font-medium text-base leading-snug">
                    {board.boardType}
                </h3>
            </div>

            <div className="border-t border-gray-100 p-4">
                <Link href={`/${board.slug}`} className="text-[#FF5555] text-sm font-medium hover:underline flex items-center gap-1">
                    <span className="text-xs">&gt;</span> {board.slug}
                </Link>
            </div>
        </div>
    )
}
