import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { ScholarshipsClient } from "@/components/scholarships-client"
import { AdSenseBanner } from "@/components/adsense-banner"

export default async function ScholarshipsPage() {
    // 1. Fetch all Scholarship pages
    const scholarships = await prisma.page.findMany({
        where: {
            category: {
                in: ["Scholarship", "Scholarships"]
            },
            published: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
        select: {
            id: true,
            title: true,
            slug: true,
            program: true,
            cardImage: true,
            author: {
                select: {
                    name: true,
                }
            }
        }
    })

    return (
        <div className="bg-white min-h-screen pb-12">
            {/* Breadcrumb */}
            <div className="w-full lg:w-[60%] mx-auto px-4 py-4 text-xs text-gray-500 border-b border-gray-100 mb-6">
                <Link href="/" className="hover:underline">Home</Link> &gt; <span className="text-gray-800">Scholarships</span>
            </div>

            <div className="w-full lg:w-[60%] mx-auto px-4">
                <AdSenseBanner />
                <ScholarshipsClient scholarships={scholarships} />
                <AdSenseBanner />
            </div>
        </div>
    )
}
