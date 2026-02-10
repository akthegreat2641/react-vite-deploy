import { prisma } from "@/lib/prisma"
import { ArticleCard } from "@/components/article-card"
import { Metadata } from "next"

import { CollegeHeader } from "@/components/college-header"
import { AuthorBar } from "@/iit-madras-website/components/author-bar"
import { CollegePageClient } from "@/components/college-page-client"
import { CareerSidebar } from "@/components/career-sidebar"
import { notFound } from "next/navigation"
import { AdSenseBanner } from "@/components/adsense-banner"

interface CareerTypePageProps {
    params: Promise<{
        slug: string
    }>
}

export async function generateMetadata({ params }: CareerTypePageProps): Promise<Metadata> {
    const { slug } = await params
    const decodedSlug = decodeURIComponent(slug)

    // 1. Try to find Career Page
    const careerPage = await prisma.page.findFirst({
        where: {
            slug: decodedSlug,
            OR: [
                { category: "Career" },
                { category: "Careers" }
            ]
        }
    })

    if (careerPage) {
        return {
            title: careerPage.seoMetaTitle || careerPage.title,
            description: careerPage.metaDescription || careerPage.description || careerPage.title,
        }
    }

    return {
        title: `${decodedSlug} Careers | College Referral Website`,
        description: `Explore careers in ${decodedSlug}`,
    }
}

export default async function CareerTypePage({ params }: CareerTypePageProps) {
    const { slug } = await params
    const decodedSlug = decodeURIComponent(slug)

    // ---------------------------------------------------------
    // 1. Check for SINGLE CAREER PAGE
    // ---------------------------------------------------------
    const careerPage = await prisma.page.findFirst({
        where: {
            slug: decodedSlug,
            OR: [
                { category: "Career" },
                { category: "Careers" }
            ]
        },
        include: {
            sections: { orderBy: { order: "asc" } },
            faqs: { orderBy: { order: "asc" } },
            author: true
        }
    })

    if (careerPage) {
        // Prepare Data for View
        const displayData = {
            name: careerPage.headerTitle || careerPage.title,
            location: careerPage.locationLabel || "India",
            logo: careerPage.headerLogo,
            bgImage: careerPage.headerBgImage,
            author: careerPage.author,
            updatedAt: careerPage.updatedAt,
            sections: careerPage.sections,
            faqs: careerPage.faqs
        }

        // Mock Objects
        const collegeMock = {
            name: displayData.name,
            location: displayData.location
        }

        const pageMock = {
            headerLogo: displayData.logo,
            headerBgImage: displayData.bgImage,
            location: displayData.location
        }

        return (
            <div className="min-h-screen bg-[#f5f5f5]">
                <CollegeHeader
                    college={collegeMock}
                    page={pageMock}
                    isCareer={true}
                    showHeaderLogo={careerPage.showHeaderLogo}
                    courseDuration={careerPage.courseDuration}
                    avgFees={careerPage.avgFees}
                />

                <AuthorBar
                    author={displayData.author}
                    date={displayData.updatedAt}
                    btn1Text={careerPage.headerBtn1Text}
                    btn1Link={careerPage.headerBtn1Link}
                    btn2Text={careerPage.headerBtn2Text}
                    btn2Link={careerPage.headerBtn2Link}
                    showBtn1={careerPage.showBtn1}
                    showBtn2={careerPage.showBtn2}
                // isCareer={true} // Add this prop to AuthorBar if needed, using generic approach for now
                />

                <CollegePageClient
                    college={collegeMock}
                    slug={slug}
                    sections={displayData.sections}
                    faqs={displayData.faqs}
                    category={careerPage.category || "Career"}
                />
            </div>
        )
    }

    // ---------------------------------------------------------
    // 2. Fallback to CAREER TYPE LIST (Existing Logic)
    // ---------------------------------------------------------

    // Fetch pages that match this career type
    const pages = await prisma.page.findMany({
        where: {
            OR: [
                { category: "Career" },
                { category: "Careers" }
            ],
            careerType: decodedSlug, // Simple exact match
            published: true,
        },
        orderBy: {
            updatedAt: "desc"
        }
    })

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <AdSenseBanner />
                <h1 className="text-3xl font-bold text-blue-950 font-serif mb-8 border-b pb-4">
                    {decodedSlug} Careers
                </h1>

                {pages.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {pages.map((page) => (
                            <div key={page.id} className="h-full">
                                <ArticleCard article={{
                                    id: page.id,
                                    title: page.title,
                                    category: page.category,
                                    slug: page.slug,
                                    image: page.cardImage || page.headerBgImage || "",
                                    author: null, // Or fetch author if needed
                                    isPage: true
                                }} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 text-gray-500 bg-white rounded-lg shadow-sm">
                        <p className="text-lg">No information available for {decodedSlug} yet.</p>
                        <p className="text-sm mt-2">Check back later for updates.</p>
                    </div>
                )}
                <AdSenseBanner />
            </div>
        </div>
    )
}
