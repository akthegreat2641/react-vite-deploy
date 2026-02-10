"use client"

import Link from "next/link"
import { SidebarAd } from "@/components/sidebar-ad"

interface BoardSidebarProps {
    boardPages: {
        title: string
        slug: string
    }[]
}

export function BoardSidebar({ boardPages }: BoardSidebarProps) {
    return (
        <div className="space-y-6">
            <SidebarAd />
            <div className="bg-white border rounded shadow-sm">
                <h3 className="font-bold text-gray-800 p-4 border-b text-sm uppercase">QUICK READ</h3>
                <div className="divide-y">
                    {boardPages.length === 0 ? (
                        <div className="p-4 text-sm text-gray-500">No related pages found.</div>
                    ) : (
                        boardPages.map((page, i) => (
                            <Link
                                key={i}
                                href={`/${page.slug}`}
                                className="block p-4 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                            >
                                {page.title}
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
