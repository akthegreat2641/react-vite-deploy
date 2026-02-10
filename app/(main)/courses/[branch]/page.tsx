import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import Link from "next/link"
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbPage
} from "@/components/ui/breadcrumb"
import { CourseBranchHeader } from "@/components/course-branch-header"
import { CourseListClient } from "@/components/course-list-client"
import { CourseSidebar } from "@/components/course-sidebar"
import { AdSenseBanner } from "@/components/adsense-banner"

interface Props {
    params: Promise<{
        branch: string
    }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { branch } = await params
    const capitalizedBranch = branch.charAt(0).toUpperCase() + branch.slice(1)

    return {
        title: `${capitalizedBranch} Courses: Eligibility, Admission, Syllabus, Placements`,
        description: `Explore top ${branch} courses in India. Find eligibility, admission process, syllabus, jobs, and top colleges.`,
    }
}

export default async function CourseBranchPage({ params }: Props) {
    const { branch } = await params
    const decodedBranch = decodeURIComponent(branch)
    const capitalizedBranch = decodedBranch.charAt(0).toUpperCase() + decodedBranch.slice(1)

    // 1. Fetch the Branch Landing Page info (slug matches branch name)
    // We look for a Page with slug='engineering' and category='Course'
    const branchPage = await prisma.page.findFirst({
        where: {
            slug: {
                equals: decodedBranch,
            },
            published: true
        },
        include: {
            author: true,
            sections: {
                orderBy: { order: 'asc' },
                take: 1
            }
        }
    })

    // 2. Fetch Courses for this branch
    const courses = await prisma.page.findMany({
        where: {
            category: "Course",
            branch: {
                contains: capitalizedBranch
            },
            published: true
        },
        orderBy: {
            title: 'asc'
        },
        select: {
            id: true,
            title: true,
            slug: true,
            avgFees: true,
            courseDuration: true,
            level: true,
            headerBtn1Link: true
        }
    })

    // 3. Fetch Top Colleges for this branch
    const topColleges = await prisma.page.findMany({
        where: {
            category: "College",
            branch: {
                contains: capitalizedBranch
            },
            published: true,
            featured: true
        },
        orderBy: {
            cdRank: 'asc'
        },
        take: 5,
        select: {
            id: true,
            title: true,
            headerTitle: true,
            slug: true,
            headerLogo: true
        }
    })

    // 4. Fetch Top Exams for this branch
    const topExams = await prisma.page.findMany({
        where: {
            category: {
                in: ["Exam", "Exams"]
            },
            branch: {
                contains: capitalizedBranch
            },
            published: true
        },
        select: {
            id: true,
            title: true,
            slug: true,
            headerLogo: true
        }
    })

    // 4. Fetch News & Articles separately
    const [newsItems, newsPages, articleItems, pageArticles] = await Promise.all([
        // News (strict Article model where isNews is true)
        prisma.article.findMany({
            where: { published: true, isNews: true },
            orderBy: { createdAt: 'desc' },
            take: 10,
            select: { id: true, title: true, slug: true, image: true, createdAt: true, popular: true, featured: true }
        }),
        // Pages categorized as News
        prisma.page.findMany({
            where: { category: 'News', published: true },
            orderBy: { createdAt: 'desc' },
            take: 10,
            select: { id: true, title: true, slug: true, cardImage: true, createdAt: true, popular: true, featured: true }
        }),
        // General Articles (Article model where isNews is false)
        prisma.article.findMany({
            where: { published: true, isNews: false },
            orderBy: { createdAt: 'desc' },
            take: 10,
            select: { id: true, title: true, slug: true, image: true, createdAt: true, popular: true, featured: true }
        }),
        // Pages categorized as Article
        prisma.page.findMany({
            where: { category: 'Article', published: true },
            orderBy: { createdAt: 'desc' },
            take: 10,
            select: { id: true, title: true, slug: true, cardImage: true, createdAt: true, popular: true, featured: true }
        })
    ])

    // Helper to map and merge news
    const mapItems = (items: any[], isPage: boolean) => items.map(item => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        image: isPage ? item.cardImage : item.image,
        createdAt: item.createdAt,
        popular: item.popular,
        featured: item.featured,
        isPage: isPage
    }))

    // News Section
    const allCombinedNews = [...mapItems(newsItems, false), ...mapItems(newsPages, true)]
    const allRecentNews = allCombinedNews.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 5)
    const allFeaturedNews = allCombinedNews.filter(i => i.featured).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 5)

    // Articles Section
    const allCombinedArticles = [...mapItems(articleItems, false), ...mapItems(pageArticles, true)]
    const allRecentArticles = [...allCombinedArticles].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 5)
    // For articles, we check both featured and popular flags to be inclusive
    const allPopularArticles = allCombinedArticles.filter(i => i.popular || i.featured).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 5)

    // If no courses or landing page found, 404
    if (courses.length === 0 && !branchPage) {
        notFound()
    }

    const pageTitle = branchPage?.headerTitle || `${capitalizedBranch} Courses: Eligibility, Admission, Syllabus, Placements`
    const pageDesc = branchPage?.sections?.[0]?.content || branchPage?.description || ""

    return (
        <div className="bg-gray-50 min-h-screen pb-12">
            {/* Breadcrumb Section */}
            <div className="bg-white border-b border-gray-200">
                <div className="w-[95%] lg:w-[80%] mx-auto py-4">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/courses">Courses</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage className="capitalize font-medium text-gray-900">{decodedBranch}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </div>

            <main className="w-[95%] lg:w-[80%] mx-auto py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Main Content Area */}
                    <div className="lg:col-span-8">
                        <AdSenseBanner />
                        <CourseBranchHeader
                            title={pageTitle}
                            description={pageDesc}
                        />

                        <CourseListClient
                            branchName={capitalizedBranch}
                            initialCourses={courses}
                        />

                        <AdSenseBanner />
                    </div>

                    {/* Sidebar Area */}
                    <div className="lg:col-span-4">
                        <CourseSidebar
                            branchName={capitalizedBranch}
                            topColleges={topColleges}
                            topExams={topExams}
                            recentNews={allRecentNews}
                            featuredNews={allFeaturedNews}
                            recentArticles={allRecentArticles}
                            popularArticles={allPopularArticles}
                        />
                    </div>
                </div>
            </main>
        </div>
    )
}
