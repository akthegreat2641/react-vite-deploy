import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { ExamListingClient } from "@/components/exam-listing-client"

import { CollegeHeader } from "@/components/college-header"
import { AuthorBar } from "@/iit-madras-website/components/author-bar"
import { CollegePageClient } from "@/components/college-page-client"
import { ExamSidebar } from "@/components/exam-sidebar"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const decodedSlug = decodeURIComponent(slug)

    // 1. Try to find Exam Page
    const examPage = await prisma.page.findFirst({
        where: {
            slug: decodedSlug,
            OR: [
                { category: "Exam" },
                { category: "Exams" }
            ]
        }
    })

    if (examPage) {
        return {
            title: examPage.seoMetaTitle || examPage.title,
            description: examPage.metaDescription || examPage.description || examPage.title,
        }
    }

    const title = slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " ")
    return {
        title: `${title} Exams | CollegeWebCu`,
    }
}

export default async function ExamCategoryPage({
    params,
    searchParams
}: {
    params: Promise<{ slug: string }>,
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const { slug } = await params
    const decodedSlug = decodeURIComponent(slug)
    const resolvedParams = await searchParams

    // ---------------------------------------------------------
    // 1. Check for SINGLE EXAM PAGE
    // ---------------------------------------------------------
    const examPage = await prisma.page.findFirst({
        where: {
            slug: decodedSlug,
            OR: [
                { category: "Exam" },
                { category: "Exams" }
            ]
        },
        include: {
            sections: { orderBy: { order: "asc" } },
            faqs: { orderBy: { order: "asc" } },
            author: true
        }
    })

    if (examPage) {
        // Prepare Data for View
        const displayData = {
            name: examPage.headerTitle || examPage.title,
            location: examPage.locationLabel || "India",
            logo: examPage.headerLogo,
            bgImage: examPage.headerBgImage,
            author: examPage.author,
            updatedAt: examPage.updatedAt,
            sections: examPage.sections,
            faqs: examPage.faqs
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
                    isExam={true}
                    showHeaderLogo={examPage.showHeaderLogo}
                    courseDuration={examPage.courseDuration}
                    avgFees={examPage.avgFees}
                />

                <AuthorBar
                    author={displayData.author}
                    date={displayData.updatedAt}
                    btn1Text={examPage.headerBtn1Text}
                    btn1Link={examPage.headerBtn1Link}
                    btn2Text={examPage.headerBtn2Text}
                    btn2Link={examPage.headerBtn2Link}
                    showBtn1={examPage.showBtn1}
                    showBtn2={examPage.showBtn2}
                // isExam={true}
                />

                <CollegePageClient
                    college={collegeMock}
                    slug={slug}
                    sections={displayData.sections}
                    faqs={displayData.faqs}
                    category={examPage.category || "Exam"}
                />
            </div>
        )
    }

    // ---------------------------------------------------------
    // 2. Fallback to EXAM CATEGORY LISTING (Existing Logic)
    // ---------------------------------------------------------

    // Formatting title from slug (e.g., "engineering-exams" -> "Engineering Exams")
    const title = slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")

    // Sorting Logic
    let orderBy: any = [{ createdAt: 'desc' }] // Default (Popularity)
    const sort = resolvedParams.sort as string

    if (sort === "ranking") {
        orderBy = [{ cdRank: 'asc' }]
    } else if (sort === "exam_date") {
        orderBy = [{ examDate: 'asc' }]
    } else if (sort === "alpha") {
        orderBy = [{ title: 'asc' }]
    }

    // Filter Logic
    const examLevel = (resolvedParams.examLevel as string)?.split(",").filter(Boolean)
    const courseType = (resolvedParams.courseType as string)?.split(",").filter(Boolean)
    const level = (resolvedParams.level as string)?.split(",").filter(Boolean)
    const examMode = (resolvedParams.examMode as string)?.split(",").filter(Boolean)

    const where: any = {
        category: { in: ["Exam", "Exams"] },
        published: true,
    }

    if (examLevel?.length) {
        where.examLevel = { in: examLevel }
    }
    if (courseType?.length) {
        where.OR = courseType.map(type => ({
            courseType: { contains: type }
        }))
    }
    if (level?.length) {
        where.level = { in: level }
    }
    if (examMode?.length) {
        where.examMode = { in: examMode }
    }

    // Fetch exams
    const exams = await prisma.page.findMany({
        where,
        orderBy,
        select: {
            id: true,
            title: true,
            slug: true,
            cardImage: true,
            createdAt: true,
            headerBtn1Link: true,
            applicationDate: true,
            examDate: true,
            resultDate: true,
        }
    })

    // Map database fields to UI component props
    const mappedExams = exams.map(exam => ({
        id: exam.id,
        title: exam.title,
        slug: exam.slug,
        image: exam.cardImage || undefined,
        applicationDate: exam.applicationDate || "N/A",
        examDate: exam.examDate || "N/A",
        resultDate: exam.resultDate || "N/A",
        description: "Standard engineering entrance exam...",
        applyLink: exam.headerBtn1Link || "#" // Map Admin Header Button 1 Link
    }))

    // Description text (Placeholder matching the image)
    const description = `In India, ${title.toLowerCase()} has traditionally been the most in-demand academic field. Candidates must take an entrance exam after completing their 12th education to be admitted. Each year, India hosts a variety of entrance exams at the national, state, and university levels.`

    return (
        <ExamListingClient
            slug={slug}
            title={`${title} Entrance Exams`}
            description={description}
            exams={mappedExams}
        />
    )
}
