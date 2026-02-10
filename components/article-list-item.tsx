import Link from "next/link"
import { format } from "date-fns"

interface ArticleListItemProps {
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
        createdAt: Date
        snippet?: string | null
        isPage?: boolean
    }
}

export function ArticleListItem({ article }: ArticleListItemProps) {
    const href = article.isPage ? `/${article.slug || article.id}` : `/article/${article.slug || article.id}`

    return (
        <div className="bg-white rounded-lg border border-gray-100 p-4 hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row gap-6">
                {/* Image Section */}
                <Link href={href} className="w-full md:w-[240px] shrink-0">
                    <div className="aspect-[4/3] relative rounded-lg overflow-hidden bg-gray-100">
                        <img
                            src={article.image || "/placeholder.svg"}
                            alt={article.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                </Link>

                {/* Content Section */}
                <div className="flex-1 flex flex-col">
                    {/* Header (Logo/Source placeholder if needed, mostly used for branding like 'GetMyUni' in the example) */}
                    {/* For now we can use Category as a reliable tag */}
                    <div className="mb-2">
                        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                            {article.category || "Article"}
                        </span>
                    </div>

                    <Link href={href}>
                        <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-700 transition-colors line-clamp-2">
                            {article.title}
                        </h3>
                    </Link>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {article.snippet || "Click to read more about this article..."}
                    </p>

                    <div className="mt-auto flex items-center gap-3">
                        {article.author?.image ? (
                            <img
                                src={article.author.image}
                                alt={article.author.name}
                                className="w-8 h-8 rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                                {article.author?.name?.charAt(0) || "A"}
                            </div>
                        )}

                        <div className="flex flex-col md:flex-row md:items-center text-xs text-gray-500 gap-1 md:gap-2">
                            <span className="font-semibold text-gray-900">{article.author?.name || "Unknown Author"}</span>
                            <span className="hidden md:inline">•</span>
                            <span>{format(new Date(article.createdAt), "MMM d, yyyy")}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
