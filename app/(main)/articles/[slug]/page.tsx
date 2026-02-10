import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { ArticleClientPage } from "@/components/article-client-page"
import { ArticleCategoryBrowser } from "@/components/article-category-browser"
import { CollegeHeader } from "@/components/college-header"
import { AuthorBar } from "@/iit-madras-website/components/author-bar"
import { CollegePageClient } from "@/components/college-page-client"
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb"
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

    // 1. Try to find Article Page by Slug
    const articlePage = await prisma.page.findFirst({
        where: {
            slug: decodedSlug,
            category: "Article"
        }
    })

    if (articlePage) {
        return {
            title: articlePage.seoMetaTitle || articlePage.title,
            description: articlePage.metaDescription || articlePage.description || articlePage.title,
        }
    }

    // 2. Try to find Article Model (if used)
    const article = await prisma.article.findFirst({
        where: {
            OR: [
                { slug: decodedSlug },
                { id: decodedSlug }
            ]
        }
    })

    if (article) {
        return {
            title: article.seoMetaTitle || article.title,
            description: article.metaDescription || article.excerpt,
            keywords: article.keywords,
        }
    }

    // 3. Fallback to Category Metadata
    const capitalizedCategory = decodedSlug.charAt(0).toUpperCase() + decodedSlug.slice(1)
    return {
        title: `${capitalizedCategory} Articles`,
        description: `Read the latest ${decodedSlug} articles and updates.`,
    }
}

export default async function Page({ params }: Props) {
    const { slug } = await params
    const decodedSlug = decodeURIComponent(slug)

    // ---------------------------------------------------------
    // 1. Check for SINGLE ARTICLE PAGE (Page Model)
    // ---------------------------------------------------------
    const articlePage = await prisma.page.findFirst({
        where: {
            slug: decodedSlug,
            AND: {
                OR: [
                    { category: "Article" },
                    { category: "News" } // Also checking News if users consider them articles here
                ]
            }
        },
        include: {
            sections: { orderBy: { order: "asc" } },
            faqs: { orderBy: { order: "asc" } },
            author: true
        }
    })

    if (articlePage) {
        // Prepare Data for View
        const displayData = {
            name: articlePage.headerTitle || articlePage.title,
            location: articlePage.locationLabel || "Online",
            logo: articlePage.headerLogo,
            bgImage: articlePage.headerBgImage,
            author: articlePage.author,
            updatedAt: articlePage.updatedAt,
            sections: articlePage.sections,
            faqs: articlePage.faqs
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

        // Fetch Sidebar Content for Articles
        const featuredArticles = await prisma.page.findMany({
            where: {
                category: "Article",
                featured: true,
                published: true,
            },
            orderBy: { createdAt: "desc" },
            take: 5,
            select: { id: true, title: true, cardImage: true, slug: true, createdAt: true }
        })

        const popularArticles = await prisma.page.findMany({
            where: {
                category: "Article",
                popular: true,
                published: true,
            },
            orderBy: { createdAt: "desc" },
            take: 5,
            select: { id: true, title: true, cardImage: true, slug: true, createdAt: true }
        })

        const trendingNews = await prisma.page.findMany({
            where: { category: "News", published: true },
            orderBy: { createdAt: "desc" },
            take: 5,
            select: { title: true, slug: true }
        })

        // Map images
        const mappedFeatured = featuredArticles.map(a => ({ ...a, image: a.cardImage }))
        const mappedPopular = popularArticles.map(a => ({ ...a, image: a.cardImage }))

        return (
            <div className="min-h-screen bg-[#f5f5f5]">
                <CollegeHeader
                    college={collegeMock}
                    page={pageMock}
                    isArticle={true}
                    showHeaderLogo={articlePage.showHeaderLogo}
                    courseDuration={articlePage.courseDuration}
                    avgFees={articlePage.avgFees}
                />

                <AuthorBar
                    author={displayData.author}
                    date={displayData.updatedAt}
                    btn1Text={articlePage.headerBtn1Text}
                    btn1Link={articlePage.headerBtn1Link}
                    btn2Text={articlePage.headerBtn2Text}
                    btn2Link={articlePage.headerBtn2Link}
                    showBtn1={articlePage.showBtn1}
                    showBtn2={articlePage.showBtn2}
                    isArticle={true}
                />

                <CollegePageClient
                    college={collegeMock}
                    slug={slug}
                    sections={displayData.sections}
                    faqs={displayData.faqs}
                    category={articlePage.category || "Article"}
                    featuredArticles={mappedFeatured}
                    popularArticles={mappedPopular}
                    trendingNews={trendingNews}
                />
            </div>
        )
    }

    // ---------------------------------------------------------
    // 2. Resolve as a CATEGORY (Existing Logic)
    // ---------------------------------------------------------
    // Logic from the original [category]/page.tsx
    const category = decodedSlug
    const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1)

    const [articles, pages, popularArticles, recentArticles, popularPages, recentPages] = await Promise.all([
        // Articles in this category/branch
        // Articles in this category/branch
        prisma.article.findMany({
            where: {
                published: true,
                ...(category.toLowerCase() !== 'general' && {
                    OR: [
                        { category: { contains: category } },
                        { category: { equals: capitalizedCategory } }
                    ]
                })
            },
            orderBy: { createdAt: 'desc' },
            select: {
                id: true, title: true, category: true, image: true,
                author: true, slug: true, createdAt: true, excerpt: true, popular: true, featured: true,
            },
        }),
        // Pages in this category/branch
        // Pages in this category/branch
        prisma.page.findMany({
            where: {
                published: true,
                category: 'Article',
                ...(category.toLowerCase() !== 'general' && {
                    OR: [
                        { branch: { contains: category } },
                        { branch: { equals: capitalizedCategory } }
                    ]
                })
            },
            orderBy: { createdAt: 'desc' },
            select: {
                id: true, title: true, category: true, cardImage: true,
                author: true, slug: true, createdAt: true, branch: true,
                description: true, popular: true, featured: true,
            },
        }),
        // Global Popular Articles
        prisma.article.findMany({
            where: { published: true, popular: true },
            take: 5,
            orderBy: { createdAt: 'desc' },
            select: {
                id: true, title: true, category: true, image: true,
                author: true, slug: true, createdAt: true, popular: true, featured: true
            }
        }),
        // Global Recent Articles
        prisma.article.findMany({
            where: { published: true },
            take: 5,
            orderBy: { createdAt: 'desc' },
            select: {
                id: true, title: true, category: true, image: true,
                author: true, slug: true, createdAt: true
            }
        }),
        // Global Popular Pages (Articles)
        prisma.page.findMany({
            where: { published: true, category: 'Article', popular: true },
            take: 5,
            orderBy: { createdAt: 'desc' },
            select: {
                id: true, title: true, category: true, cardImage: true,
                author: true, slug: true, createdAt: true, popular: true, featured: true
            }
        }),
        // Global Recent Pages (Articles)
        prisma.page.findMany({
            where: { published: true, category: 'Article' },
            take: 5,
            orderBy: { createdAt: 'desc' },
            select: {
                id: true, title: true, category: true, cardImage: true,
                author: true, slug: true, createdAt: true
            }
        }),
    ])

    // If no content found for category, return 404
    if (articles.length === 0 && pages.length === 0) {
        notFound()
    }

    // Map pages to article structure
    const mappedPages = pages.map(page => ({
        id: page.id,
        title: page.title,
        category: page.category || 'Article',
        image: page.cardImage,
        author: page.author,
        slug: page.slug,
        createdAt: page.createdAt,
        branch: page.branch,
        snippet: page.description,
        popular: page.popular,
        isPage: true
    }))

    // Map articles
    const mappedArticles = articles.map(art => ({
        ...art,
        snippet: art.excerpt
    }))

    // Merge
    const categoryArticles = [...mappedArticles, ...mappedPages].sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    // Global Popular items (used in sidebar)
    const combinedPopular = [
        ...popularArticles.map(a => ({ ...a, snippet: null, isPage: false })),
        ...popularPages.map(p => ({
            id: p.id,
            title: p.title,
            category: p.category || 'Article',
            image: p.cardImage,
            author: p.author,
            slug: p.slug,
            createdAt: p.createdAt,
            popular: p.popular,
            featured: p.featured,
            snippet: null,
            isPage: true
        }))
    ].filter(a => a.popular || a.featured)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5)

    // Global Recent items (used in sidebar)
    const combinedRecent = [
        ...recentArticles.map(a => ({ ...a, snippet: null, isPage: false })),
        ...recentPages.map(p => ({
            id: p.id,
            title: p.title,
            category: p.category || 'Article',
            image: p.cardImage,
            author: p.author,
            slug: p.slug,
            createdAt: p.createdAt,
            snippet: null,
            isPage: true
        }))
    ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5)

    const mappedPopular = combinedPopular
    const mappedRecent = combinedRecent

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <div className="bg-white border-b border-gray-200">
                <div className="w-[90%] md:w-[60%] mx-auto py-4">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/articles">Articles</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage className="capitalize">{category}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </div>

            <main className="w-[90%] md:w-[60%] mx-auto py-8 flex-grow w-full">
                <ArticleCategoryBrowser
                    articles={categoryArticles}
                    categoryName={category}
                    recentArticles={mappedRecent}
                    popularArticles={mappedPopular}
                />
            </main>
        </div>
    )
}
