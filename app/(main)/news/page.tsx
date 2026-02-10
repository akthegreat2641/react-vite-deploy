import { prisma } from "@/lib/prisma"
import { NewsCard } from "@/components/news-card"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Latest Education News & Updates | Collegeweb",
    description: "Stay updated with the latest news in education, exams, and career opportunities.",
}

export default async function NewsPage() {
    const newsItems = await prisma.page.findMany({
        where: {
            category: "News",
            published: true
        },
        select: {
            id: true,
            title: true,
            slug: true,
            cardImage: true,
            headerBgImage: true,
            createdAt: true,
            author: {
                select: {
                    name: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Latest News</h1>
                    <p className="text-gray-500">Updates on Exams, Results, and Education Policies</p>
                </div>

                {newsItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {newsItems.map((item) => (
                            <NewsCard key={item.id} news={item} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-lg border border-gray-200">
                        <p className="text-gray-500">No news articles found.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
