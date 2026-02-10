import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { CollegeHeader } from "@/components/college-header"
import { AuthorBar } from "@/iit-madras-website/components/author-bar"
import { CollegePageClient } from "@/components/college-page-client"
import { NewsSidebar } from "@/components/news-sidebar"
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

    const page = await prisma.page.findFirst({
        where: {
            slug: decodedSlug,
            category: "News"
        }
    })

    if (page) {
        return {
            title: page.seoMetaTitle || page.title,
            description: page.metaDescription || page.description || page.title,
        }
    }

    return {
        title: "News Details",
        description: "Latest educational news and updates"
    }
}

export default async function NewsPage({ params }: Props) {
    const { slug } = await params
    const decodedSlug = decodeURIComponent(slug)

    const page = await prisma.page.findFirst({
        where: {
            slug: decodedSlug,
            category: "News"
        },
        include: {
            sections: { orderBy: { order: "asc" } },
            faqs: { orderBy: { order: "asc" } },
            author: true
        }
    })

    if (!page) {
        notFound()
    }

    // Prepare Data for View
    const displayData = {
        name: page.headerTitle || page.title,
        location: page.locationLabel || "India",
        logo: page.headerLogo,
        bgImage: page.headerBgImage,
        author: page.author,
        updatedAt: page.updatedAt,
        sections: page.sections,
        faqs: page.faqs
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
                isNews={true} // Assuming CollegeHeader might want to know (though interface didn't mention it, good for consistency)
                showHeaderLogo={page.showHeaderLogo}
                courseDuration={page.courseDuration}
                avgFees={page.avgFees}
            />

            <AuthorBar
                author={displayData.author}
                date={displayData.updatedAt}
                btn1Text={page.headerBtn1Text}
                btn1Link={page.headerBtn1Link}
                btn2Text={page.headerBtn2Text}
                btn2Link={page.headerBtn2Link}
                showBtn1={page.showBtn1}
                showBtn2={page.showBtn2}
            // isNews={true}
            />

            <CollegePageClient
                college={collegeMock}
                slug={slug}
                sections={displayData.sections}
                faqs={displayData.faqs}
                category="News"
            />
        </div>
    )
}
