import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { ArticleClientPage } from "@/components/article-client-page"
import { Metadata } from "next"

// Force dynamic rendering since we're fetching data based on slug
export const dynamic = "force-dynamic"

interface Props {
    params: Promise<{
        slug: string
    }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const decodedSlug = decodeURIComponent(slug)

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

    return {}
}

export default async function ArticlePage({ params }: Props) {
    const { slug } = await params
    const decodedSlug = decodeURIComponent(slug)

    const article = await prisma.article.findFirst({
        where: {
            OR: [
                { slug: decodedSlug },
                { id: decodedSlug }
            ]
        },
        include: {
            sections: true,
            author: true
        }
    })

    if (!article) {
        notFound()
    }

    // Fetch recent articles for sidebar (Article View)
    // Fetch Featured Articles (Article Model)
    const featuredArticles = await prisma.article.findMany({
        where: {
            published: true,
            featured: true,
            id: { not: article.id }
        },
        orderBy: { createdAt: "desc" },
        take: 5,
        select: {
            id: true,
            title: true,
            image: true,
            slug: true,
            createdAt: true
        }
    })

    // Fetch Popular Articles (Article Model)
    const popularArticles = await prisma.article.findMany({
        where: {
            published: true,
            popular: true,
            id: { not: article.id }
        },
        orderBy: { createdAt: "desc" },
        take: 5,
        select: {
            id: true,
            title: true,
            image: true,
            slug: true,
            createdAt: true
        }
    })

    // Fetch Trending News (Page Model where category='News') 
    // Consistent with generic page implementation
    const trendingNews = await prisma.page.findMany({
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

    return <ArticleClientPage article={article} recentArticles={featuredArticles.length > 0 ? featuredArticles : []} popularArticles={popularArticles} trendingNews={trendingNews} />
}
