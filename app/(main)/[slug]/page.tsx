import { notFound, redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { CollegeHeader } from "@/components/college-header"
import { AuthorBar } from "@/iit-madras-website/components/author-bar"
import { CollegePageClient } from "@/components/college-page-client"
import { FilterBar } from "@/components/colleges/filter-bar"
import { SortOptions } from "@/components/colleges/sort-options"
import { CollegeCard } from "@/components/college-card"

// Force dynamic rendering since we're fetching data based on slug
export const dynamic = "force-dynamic"

interface PageProps {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params

    const collegePage = await prisma.collegePage.findFirst({
        where: { slug },
        include: { college: true },
    })

    if (collegePage) {
        return {
            title: `${collegePage.college.name} - College Referral Website`,
            description: `${collegePage.college.name}: Admission, Courses, Fees, Cutoff, Placement, Ranking`,
        }
    }

    const genericPage = await prisma.page.findUnique({
        where: { slug },
    })

    if (genericPage) {
        return {
            title: genericPage.seoMetaTitle || `${genericPage.title} - College Referral Website`,
            description: genericPage.metaDescription || genericPage.description || `${genericPage.title} - College Referral Website`,
        }
    }

    return {}
}

export default async function CollegePage({ params, searchParams }: PageProps) {
    const { slug } = await params
    const resolvedSearchParams = await searchParams

    // 1. Try to find a CollegePage first
    let collegePage = await prisma.collegePage.findFirst({
        where: { slug },
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
        genericPage = await prisma.page.findUnique({
            where: { slug },
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

    // Ensure generic pages are published
    if (genericPage && !genericPage.published) {
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
        sections: collegePage.sections.map(s => ({ ...s, type: s.type || "INFO" })), // Ensure type string
        faqs: collegePage.faqs
    } : {
        // Mapping generic page to expected structure
        name: genericPage!.headerTitle || genericPage!.title,
        location: genericPage!.locationLabel || "Online",
        logo: genericPage!.headerLogo,
        bgImage: genericPage!.headerBgImage,
        author: genericPage!.author,
        updatedAt: genericPage!.updatedAt,
        sections: genericPage!.sections,
        faqs: genericPage!.faqs
    }

    // Mock Objects for Components
    const collegeMock = {
        name: displayData.name,
        location: displayData.location || "Online"
    }

    const pageMock = {
        headerLogo: displayData.logo,
        headerBgImage: displayData.bgImage,
        location: displayData.location
    }

    // Header Button Logic (Generic Page has explicit fields, CollegePage might fallback)
    const btn1Text = genericPage?.headerBtn1Text || null
    const btn1Link = genericPage?.headerBtn1Link || null
    const btn2Text = genericPage?.headerBtn2Text || null
    const btn2Link = genericPage?.headerBtn2Link || null

    // Check if this is an article page
    const isArticle = genericPage?.category === "Article"
    const isBoard = genericPage?.category === "Board"
    const isExam = genericPage?.category === "Exam" || genericPage?.category === "Exams"
    const isOlympiad = genericPage?.category === "Olympiad" || genericPage?.category === "Olympiads"
    const isScholarship = genericPage?.category === "Scholarship" || genericPage?.category === "Scholarships"
    const isCareer = genericPage?.category === "Career" || genericPage?.category === "Careers"
    const isNews = genericPage?.category === "News"
    const isSubCollege = genericPage?.category === "Sub College"

    // Redirect Articles to /articles/[slug]
    if (isArticle && genericPage) {
        redirect(`/articles/${slug}`)
    }

    // Redirect News to /news/[slug]
    if (isNews && genericPage) {
        redirect(`/news/${slug}`)
    }

    // Redirect Olympiads to /olympiad/[slug]
    if (isOlympiad && genericPage) {
        redirect(`/olympiad/${slug}`)
    }

    // Redirect Boards to /boards/[slug]
    if (isBoard && genericPage) {
        redirect(`/boards/${slug}`)
    }

    // Redirect Exams to /exams/[slug]
    if (isExam && genericPage) {
        redirect(`/exams/${slug}`)
    }

    // Redirect Careers to /careers/[slug]
    if (isCareer && genericPage) {
        redirect(`/careers/${slug}`)
    }

    // Check for College pages (either Generic Page with category='College' OR existing CollegePage model)
    const isCollege = genericPage?.category === "College" || genericPage?.category === "Colleges" || !!collegePage

    // Redirect Colleges to /colleges/[slug]
    if (isCollege) {
        redirect(`/colleges/${slug}`)
    }

    // If it's a Sub College page, we show the list view (like testcolleges)
    if (isSubCollege && genericPage) {
        // Build Prisma Filters for Colleges
        const where: any = {
            category: { in: ["College", "Colleges"] },
        }

        // Use Page metadata as default if not provided in searchParams
        const activeStream = (resolvedSearchParams.branch as string) || genericPage.branch
        const activeState = (resolvedSearchParams.state as string) || genericPage.state
        const activeDegree = (resolvedSearchParams.degree as string) || genericPage.degree
        const activeCollegeType = (resolvedSearchParams.collegeType as string) || genericPage.collegeType
        const activeInstituteType = (resolvedSearchParams.instituteType as string) || genericPage.instituteType

        if (activeStream) {
            where.branch = { contains: activeStream }
        }
        if (activeState) where.state = activeState
        if (activeDegree) {
            where.degree = { contains: activeDegree }
        }
        if (activeCollegeType) where.collegeType = activeCollegeType
        if (activeInstituteType) where.instituteType = activeInstituteType

        // Other filters
        if (resolvedSearchParams.totalFees) {
            where.totalFees = { contains: resolvedSearchParams.totalFees as string }
        }
        if (resolvedSearchParams.examAccepted) {
            where.examAccepted = { contains: resolvedSearchParams.examAccepted as string }
        }
        if (resolvedSearchParams.courseType) {
            where.courseType = { contains: resolvedSearchParams.courseType as string }
        }
        if (resolvedSearchParams.courseDuration) where.courseDuration = resolvedSearchParams.courseDuration as string
        if (resolvedSearchParams.genderAccepted) where.genderAccepted = resolvedSearchParams.genderAccepted as string

        // Sorting Logic
        let orderBy: any = [{ cdRank: 'asc' }, { createdAt: 'desc' }]
        const sort = resolvedSearchParams.sort as string

        if (sort === "ranking") {
            orderBy = [{ cdRank: 'asc' }]
        } else if (sort === "fees_high") {
            orderBy = [{ totalFeesVal: 'desc' }]
        } else if (sort === "fees_low") {
            orderBy = [{ totalFeesVal: 'asc' }]
        }

        const colleges = await prisma.page.findMany({
            where,
            orderBy
        })

        const totalCount = colleges.length
        const headerContent = genericPage.sections?.[0]?.content || "No overview content available."

        // Metadata for FilterBar UI sync
        const initialFilters = {
            branch: genericPage.branch,
            state: genericPage.state,
            degree: genericPage.degree,
            collegeType: genericPage.collegeType,
            instituteType: genericPage.instituteType
        }

        return (
            <div className="bg-gray-50 min-h-screen">
                <FilterBar initialFilters={initialFilters} />

                <div className="container mx-auto px-4 py-6">
                    {/* Header Sections (Dynamic) */}
                    {genericPage.sections.map((section, idx) => (
                        <div key={section.id || idx} className="bg-white border rounded-xl shadow-sm overflow-hidden mb-6">
                            <div className="bg-[#F8F9FA] px-4 py-3 border-b">
                                <h2 className="font-bold text-gray-900">{section.title || genericPage.title}</h2>
                            </div>
                            <div className="p-4 prose prose-sm max-w-none">
                                <div dangerouslySetInnerHTML={{ __html: section.content }} />
                            </div>
                        </div>
                    ))}

                    {genericPage.sections.length === 0 && (
                        <div className="bg-white border rounded-xl shadow-sm overflow-hidden mb-6">
                            <div className="bg-[#F8F9FA] px-4 py-3 border-b">
                                <h2 className="font-bold text-gray-900">{genericPage.title}</h2>
                            </div>
                            <div className="p-4 text-gray-500">
                                No content sections available.
                            </div>
                        </div>
                    )}

                    {/* Controls */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                        <h1 className="text-xl font-bold text-gray-800">Found {totalCount} Colleges</h1>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <span className="font-semibold">Sort By:</span>
                                <SortOptions />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table Header */}
                <div className="hidden md:grid grid-cols-[60px_1fr_180px_180px] bg-[#88BDBF] text-white rounded-t-md text-sm font-semibold">
                    <div className="p-3 text-center border-r border-[#9FD4D6]">CD Rank</div>
                    <div className="p-3 border-r border-[#9FD4D6]">Colleges</div>
                    <div className="p-3 border-r border-[#9FD4D6]">Course Fees</div>
                    <div className="p-3">Placement</div>
                </div>

                {/* List */}
                <div className="space-y-4 md:space-y-0">
                    {colleges.map((college, index) => (
                        <CollegeCard key={college.id} page={college} rank={index + 1} />
                    ))}

                    {totalCount === 0 && (
                        <div className="text-center py-20 text-gray-500">
                            No colleges found matching your criteria.
                        </div>
                    )}
                </div>
            </div>
        )
    }

    // Fetch Sidebar Content for Articles (from Page model)
    let featuredArticles: any[] = []
    let popularArticles: any[] = []

    if (isArticle) {
        // Fetch Featured Articles (from Page model where category=Article and featured=true)
        featuredArticles = await prisma.page.findMany({
            where: {
                category: "Article",
                featured: true,
                published: true,
            },
            orderBy: { createdAt: "desc" },
            take: 5,
            select: {
                id: true,
                title: true,
                cardImage: true, // will map to image
                slug: true,
                createdAt: true
            }
        })

        // Fetch Popular Articles (from Page model where category=Article and popular=true)
        popularArticles = await prisma.page.findMany({
            where: {
                category: "Article",
                popular: true,
                published: true,
            },
            orderBy: { createdAt: "desc" },
            take: 5,
            select: {
                id: true,
                title: true,
                cardImage: true, // will map to image
                slug: true,
                createdAt: true
            }
        })
    }

    // Fetch Trending News (Page Model where category='News')
    // We fetch this for articles to show in sidebar.
    // Assuming 'News' are Pages with category='News' as per user instruction.
    let trendingNews: any[] = []
    if (isArticle) {
        trendingNews = await prisma.page.findMany({
            where: {
                category: "News",
                published: true
            },
            orderBy: { createdAt: "desc" },
            take: 5,
            select: {
                title: true,
                slug: true
            }
        })
    }

    // Fetch Board Pages (for Sidebar)
    let boardPages: any[] = []
    if (isBoard) {
        boardPages = await prisma.page.findMany({
            where: {
                category: "Board",
                published: true
            },
            orderBy: { createdAt: "desc" },
            select: {
                title: true,
                slug: true
            }
        })
    }

    // Map cardImage to image for consistency
    const mappedFeatured = featuredArticles.map(a => ({ ...a, image: a.cardImage }))
    const mappedPopular = popularArticles.map(a => ({ ...a, image: a.cardImage }))

    return (
        <div className="min-h-screen bg-[#f5f5f5]">
            <CollegeHeader
                college={collegeMock}
                page={pageMock}
                isArticle={isArticle}
                isBoard={isBoard}
                isExam={isExam}
                isOlympiad={isOlympiad}
                isScholarship={isScholarship}
                isCareer={isCareer}
                isNews={isNews}
                showHeaderLogo={genericPage?.showHeaderLogo}
                courseDuration={genericPage?.courseDuration}
                avgFees={genericPage?.avgFees}
            />

            <AuthorBar
                author={displayData.author}
                brochureUrl={collegePage?.brochureUrl}
                date={displayData.updatedAt}
                btn1Text={btn1Text}
                btn1Link={btn1Link}
                btn2Text={btn2Text}
                btn2Link={btn2Link}
                showBtn1={genericPage?.showBtn1}
                showBtn2={genericPage?.showBtn2}
                isArticle={isArticle}
            />

            <CollegePageClient
                college={collegeMock}
                slug={slug}
                sections={displayData.sections}
                faqs={displayData.faqs}
                category={genericPage?.category || "College"}
                featuredArticles={mappedFeatured}
                popularArticles={mappedPopular}
                trendingNews={trendingNews}
                boardPages={boardPages}
            />
        </div>
    )
}
