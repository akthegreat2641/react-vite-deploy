import Link from "next/link"
import { Calendar } from "lucide-react"

interface NewsCardProps {
    news: {
        id: string
        title: string
        slug: string
        cardImage?: string | null
        headerBgImage?: string | null
        author?: {
            name: string
        } | null
        createdAt?: Date
    }
}

export function NewsCard({ news }: NewsCardProps) {
    const image = news.cardImage || news.headerBgImage || "/placeholder.svg"

    return (
        <Link href={`/news/${news.slug}`} className="group h-full block">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden h-full flex flex-col hover:border-blue-400 transition-colors">
                {/* Image Container */}
                <div className="aspect-[16/9] relative overflow-hidden bg-gray-100 border-b border-gray-100">
                    <img
                        src={image}
                        alt={news.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-[15px] font-bold text-gray-800 leading-snug mb-3 line-clamp-3 group-hover:text-blue-700 transition-colors">
                        {news.title}
                    </h3>

                    <div className="mt-auto pt-3 flex items-center justify-between border-t border-gray-50">
                        <span className="text-xs text-gray-400 font-medium">
                            {news.author?.name || "Collegeweb"}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    )
}
