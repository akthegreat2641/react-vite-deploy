import { prisma } from "@/lib/prisma"
import { ArticleBrowser } from "@/components/article-browser"
import { CategoryHeader } from "@/components/category-header"
import { AdSenseBanner } from "@/components/adsense-banner"
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Browse Articles | CollegeWeb",
    description: "Explore our latest articles, news, and updates.",
}

export const dynamic = 'force-dynamic'

export default async function ArticlesPage() {
    // Fetch both articles and pages categorized as "Article"
    const [articles, pages] = await Promise.all([
        prisma.article.findMany({
            where: {
                published: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
            select: {
                id: true,
                title: true,
                category: true,
                image: true,
                author: true,
                slug: true,
                createdAt: true,
                excerpt: true, // Fetch excerpt
                popular: true, // Fetch popular status
                featured: true,
            },
        }),
        prisma.page.findMany({
            where: {
                category: 'Article',
                published: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
            select: {
                id: true,
                title: true,
                category: true,
                cardImage: true,
                author: true,
                slug: true,
                createdAt: true,
                branch: true,
                description: true, // Fetch description
                popular: true, // Fetch popular status
                featured: true,
            },
        })
    ])

    // Map pages to match article structure
    const mappedPages = pages.map(page => ({
        id: page.id,
        title: page.title,
        category: page.category || 'Article',
        image: page.cardImage,
        author: page.author,
        slug: page.slug,
        createdAt: page.createdAt,
        branch: page.branch,
        snippet: page.description, // Map description to snippet
        popular: page.popular,
        featured: page.featured,
        isPage: true
    }))

    // Map articles to match required structure (specifically mapping excerpt to snippet)
    const mappedArticles = articles.map(article => ({
        ...article,
        snippet: article.excerpt
    }))

    // Merge and sort by creation date
    const allArticles = [...mappedArticles, ...mappedPages].sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

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
                                <BreadcrumbPage>Articles</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </div>

            <main className="w-[90%] md:w-[60%] mx-auto py-8 flex-grow w-full">
                <CategoryHeader category="Article" />
                <AdSenseBanner />
                <ArticleBrowser articles={allArticles} />
            </main>
        </div>
    )
}
