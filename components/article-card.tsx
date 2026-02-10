import Link from "next/link"

interface ArticleCardProps {
    article: {
        id: string
        title: string
        category: string
        image?: string | null
        author?: {
            name: string
            image?: string | null
        } | null
        slug?: string | null
        isPage?: boolean
    }
}

export function ArticleCard({ article }: ArticleCardProps) {
    const href = article.isPage ? `/${article.slug || article.id}` : `/article/${article.slug || article.id}`

    return (
        <Link href={href} className="group h-full">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
                <div className="aspect-[16/10] relative overflow-hidden bg-gray-100">
                    <img
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {article.title}
                    </h3>
                    <div className="mt-auto pt-2 flex items-center gap-2">
                        {article.author?.image && (
                            <img src={article.author.image} alt="" className="w-5 h-5 rounded-full object-cover" />
                        )}
                        <span className="text-sm text-gray-500">
                            {article.author?.name || "Unknown Author"}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    )
}
