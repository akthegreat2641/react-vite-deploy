import { MetadataRoute } from "next"
import { prisma } from "@/lib/prisma"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

    // 1. Static Routes
    const staticRoutes = [
        "",
        "/about",
        "/contact",
        "/privacy-policy",
        "/terms",
        "/careers",
        "/boards",
        "/courses",
        "/exams",
        "/scholarships",
        "/articles",
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: route === "" ? 1 : 0.8,
    }))

    // 2. Dynamic Pages (Colleges, Courses, etc.)
    const pages = await prisma.page.findMany({
        where: { published: true },
        select: {
            slug: true,
            updatedAt: true,
            category: true,
        },
    })

    const dynamicRoutes = pages.map((page) => {
        let priority = 0.5
        // Adjust priority based on category
        if (page.category === "College") priority = 0.9
        if (page.category === "Course") priority = 0.8

        // Determine URL structure based on existing routing logic
        // Assuming pages are at /page-slug or /category/slug? 
        // Based on article-card, pages seem to be at /[slug] directly for some or /articles/[slug]
        // Let's check article-card logic: href = article.isPage ? `/${article.slug}` : `/articles/${article.slug}`
        // Most main pages seem to be at root /[slug]? Or under (main)/[slug]?
        // Let's assume root /[slug] for standard pages as per your previous edits request.

        // Actually, let's verify routing. 
        // Usually pages are accessed via dynamic route page.tsx at root or (main)/[slug]

        return {
            url: `${baseUrl}/${page.slug}`,
            lastModified: page.updatedAt,
            changeFrequency: "weekly" as const,
            priority,
        }
    })

    // 3. Career Types (Dynamic Landing Pages)
    const careerTypes = await prisma.careerType.findMany()
    const careerRoutes = careerTypes.map((ct) => ({
        url: `${baseUrl}/careers/${encodeURIComponent(ct.name)}`,
        lastModified: ct.updatedAt,
        changeFrequency: "weekly" as const,
        priority: 0.7,
    }))

    // 4. Manual URLs
    const manualUrls = await prisma.sitemapUrl.findMany()
    const manualRoutes = manualUrls.map((entry) => ({
        url: entry.url,
        lastModified: entry.lastModified || new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.5,
    }))

    return [...staticRoutes, ...dynamicRoutes, ...careerRoutes, ...manualRoutes]
}
