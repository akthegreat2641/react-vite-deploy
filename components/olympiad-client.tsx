"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { AdSenseBanner } from "@/components/adsense-banner"

interface OlympiadPage {
    id: string
    title: string
    headerTitle?: string | null
    slug: string
    cardImage?: string | null
    author?: {
        name: string
    } | null
}

interface OlympiadClientProps {
    olympiads: OlympiadPage[]
}

export function OlympiadClient({ olympiads }: OlympiadClientProps) {
    return (
        <div className="w-[60%] mx-auto px-4 py-8">
            <AdSenseBanner />
            <h1 className="text-3xl font-bold mb-8">Olympiad</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {olympiads.length === 0 ? (
                    <div className="col-span-full text-center py-12 text-gray-500">
                        No olympiad pages found
                    </div>
                ) : (
                    olympiads.map((olympiad) => (
                        <Link key={olympiad.id} href={`/${olympiad.slug}`}>
                            <Card className="hover:shadow-lg transition-shadow h-full">
                                {/* Image */}
                                <div className="aspect-video bg-gray-200 relative overflow-hidden rounded-t-lg">
                                    {olympiad.cardImage ? (
                                        <img
                                            src={olympiad.cardImage}
                                            alt={olympiad.headerTitle || olympiad.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <svg
                                                className="w-12 h-12 text-gray-400"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                />
                                            </svg>
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <CardContent className="p-4">
                                    <h3 className="text-lg font-semibold text-blue-600 hover:underline mb-2 line-clamp-2">
                                        {olympiad.headerTitle || olympiad.title}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {olympiad.author?.name || "Unknown Author"}
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))
                )}
            </div>
            <AdSenseBanner />
        </div>
    )
}
