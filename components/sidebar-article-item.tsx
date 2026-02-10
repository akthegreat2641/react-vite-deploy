import Link from "next/link"

interface SidebarArticleItemProps {
    article: {
        id: string
        title: string
        slug?: string | null
        image?: string | null
        isPage?: boolean
    }
}

export function SidebarArticleItem({ article }: SidebarArticleItemProps) {
    const href = article.isPage ? `/${article.slug || article.id}` : `/article/${article.slug || article.id}`

    return (
        <Link href={href} className="flex gap-3 group">
            <div className="w-20 h-14 shrink-0 rounded bg-gray-100 overflow-hidden relative">
                <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>
            <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {article.title}
                </h4>
            </div>
        </Link>
    )
}
