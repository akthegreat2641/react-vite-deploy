import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { CollegeHeader } from "@/components/college-header"
import { AuthorBar } from "@/iit-madras-website/components/author-bar"
import { CollegePageClient } from "@/components/college-page-client"
import { CollegeSidebar } from "@/components/college-sidebar"
import { Metadata } from "next"

// Force dynamic rendering
export const dynamic = "force-dynamic"

interface Props {
    params: Promise<{
        slug: string
    }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const decodedSlug = decodeURIComponent(slug)

    // 1. Try to find CollegePage
    const collegePage = await prisma.collegePage.findFirst({
        where: { slug: decodedSlug },
        include: { college: true },
    })

    if (collegePage) {
        return {
            title: `${collegePage.college.name} - College Referral Website`,
            description: `${collegePage.college.name}: Admission, Courses, Fees, Cutoff, Placement, Ranking`,
        }
    }

    // 2. Try to find generic Page
    const page = await prisma.page.findFirst({
        where: {
            slug: decodedSlug,
            OR: [
                { category: "College" },
                { category: "Colleges" }
            ]
        }
    })

    if (page) {
        return {
            title: page.seoMetaTitle || page.title,
            description: page.metaDescription || page.description || page.title,
        }
    }

    return {
        title: "College Details",
        description: "College details and information"
    }
}

export default async function CollegeDetailsPage({ params }: Props) {
    const { slug } = await params
    const decodedSlug = decodeURIComponent(slug)

    // 1. Try to find a CollegePage first
    let collegePage = await prisma.collegePage.findFirst({
        where: { slug: decodedSlug },
        include: {
            college: true,
            sections: { orderBy: { order: "asc" } },
            faqs: { orderBy: { order: "asc" } },
            author: true
        },
    })

    // 2. If no CollegePage, try generic Page
    let genericPage = null
    if (!collegePage) {
        genericPage = await prisma.page.findFirst({
            where: {
                slug: decodedSlug,
                OR: [
                    { category: "College" },
                    { category: "Colleges" }
                ]
            },
            include: {
                sections: { orderBy: { order: "asc" } },
                faqs: { orderBy: { order: "asc" } },
                author: true
            }
        })
    }

    if (!collegePage && !genericPage) {
        notFound()
    }

    // Normalized Data for View
    const displayData = collegePage ? {
        name: collegePage.college.name,
        location: collegePage.location || collegePage.college.location,
        logo: collegePage.headerLogo,
        bgImage: collegePage.headerBgImage,
        author: collegePage.author,
        updatedAt: collegePage.updatedAt,
        sections: collegePage.sections.map(s => ({ ...s, type: s.type || "INFO" })),
        faqs: collegePage.faqs
    } : {
        name: genericPage!.headerTitle || genericPage!.title,
        location: genericPage!.locationLabel || "Online",
        logo: genericPage!.headerLogo,
        bgImage: genericPage!.headerBgImage,
        author: genericPage!.author,
        updatedAt: genericPage!.updatedAt,
        sections: genericPage!.sections,
        faqs: genericPage!.faqs
    }

    // Mock Objects
    const collegeMock = {
        name: displayData.name,
        location: displayData.location || "Online"
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
                showHeaderLogo={genericPage?.showHeaderLogo ?? collegePage?.headerLogo ? true : false}
                courseDuration={genericPage?.courseDuration}
                avgFees={genericPage?.avgFees}
            />

            <AuthorBar
                author={displayData.author}
                date={displayData.updatedAt}
                btn1Text={genericPage?.headerBtn1Text}
                btn1Link={genericPage?.headerBtn1Link}
                btn2Text={genericPage?.headerBtn2Text}
                btn2Link={genericPage?.headerBtn2Link}
                showBtn1={genericPage?.showBtn1}
                showBtn2={genericPage?.showBtn2}
            />

            <CollegePageClient
                college={collegeMock}
                slug={slug}
                sections={displayData.sections}
                faqs={displayData.faqs}
                category="College"
            />
        </div>
    )
}
