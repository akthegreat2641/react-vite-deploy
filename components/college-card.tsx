"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MapPin, Download, ArrowRight, User, Star, Trophy, BookOpen } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

interface CollegeCardProps {
    page: any
    rank: number
}

export function CollegeCard({ page, rank }: CollegeCardProps) {
    const formatCurrency = (amount: string | null) => {
        if (!amount) return "₹ --"
        // Check if amount is a range "0-25k"
        if (amount.includes("-")) return `₹ ${amount}`
        // Check if it's a number
        const num = parseInt(amount.replace(/[^0-9]/g, ""))
        if (isNaN(num)) return amount
        return `₹ ${num.toLocaleString('en-IN')}`
    }

    // Mock Data for missing fields
    const rating = "4.2"
    const reviewCount = "124"
    const rankText = `#${rank}`

    return (
        <Card className="mb-4 overflow-hidden border border-gray-200">
            <div className="flex flex-col md:grid md:grid-cols-[60px_1fr_180px_180px]">
                {/* CD Rank Column */}
                <div className="hidden md:flex flex-col items-center justify-center bg-teal-50 border-r border-gray-100 p-2 text-center h-full">
                    <span className="text-gray-500 text-xs font-semibold">CD Rank</span>
                    <span className="text-xl font-bold text-gray-700">#{page.cdRank || rank}</span>
                </div>

                {/* College Info Column */}
                <div className="p-4 border-r border-gray-100 md:min-w-0 flex flex-col justify-center">
                    <div className="flex gap-3">
                        <div className="w-12 h-12 relative flex-shrink-0 bg-white rounded-full border overflow-hidden self-start mt-1">
                            {page.headerLogo ? (
                                <Image
                                    src={page.headerLogo}
                                    alt={page.title}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                                    <BookOpen size={20} />
                                </div>
                            )}
                        </div>
                        <div className="min-w-0 flex-1">
                            <Link href={`/${page.slug}`} className="text-[#3F7E9B] font-bold text-[16px] hover:underline line-clamp-2 leading-tight">
                                {page.title}
                            </Link>
                            <div className="flex items-center text-gray-500 text-xs mt-1">
                                <span className="mr-2">{page.locationLabel || page.state}</span>
                                <span className="text-gray-300">|</span>
                                <span className="ml-2">{page.collegeType}</span>
                            </div>

                            <div className="flex flex-wrap gap-3 mt-3 text-[11px] font-bold text-orange-500">
                                <Link
                                    href={page.headerBtn1Link || `/${page.slug}`}
                                    className="flex items-center hover:text-orange-600"
                                    target={page.headerBtn1Link ? "_blank" : undefined}
                                >
                                    <ArrowRight className="w-3 h-3 mr-1" /> {page.headerBtn1Text || "Apply Now"}
                                </Link>
                                <span className="text-gray-300 hidden sm:inline">|</span>
                                <Link
                                    href={page.headerBtn2Link || `/${page.slug}`}
                                    className="flex items-center text-teal-600 hover:text-teal-700"
                                    target={page.headerBtn2Link ? "_blank" : undefined}
                                >
                                    <Download className="w-3 h-3 mr-1" /> {page.headerBtn2Text || "Download Brochure"}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Fees Column */}
                <div className="p-4 border-r border-gray-100 bg-gray-50 md:bg-transparent flex flex-col justify-center">
                    <div className="text-teal-600 font-bold text-lg">{formatCurrency(page.totalFees || page.avgFees)}</div>
                    <div className="text-[11px] text-gray-500 mt-1">Total Fees</div>
                    <div className="text-[11px] text-gray-400">{page.courseType || "Degree"}</div>
                </div>

                {/* Placement Column */}
                <div className="p-4 flex flex-col justify-center">
                    <div className="text-teal-600 font-bold text-lg">{page.placementAverage ? formatCurrency(page.placementAverage.toString()) : "₹ --"}</div>
                    <div className="text-[11px] text-gray-500 mt-1">Average Package</div>
                    <div className="text-teal-600 font-bold mt-2 text-sm">{page.placementHighest ? formatCurrency(page.placementHighest.toString()) : "₹ --"}</div>
                    <div className="text-[11px] text-gray-500">Highest Package</div>
                </div>
            </div>
        </Card>
    )
}
