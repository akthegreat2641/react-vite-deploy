"use client"

import { useRouter, useSearchParams, usePathname } from "next/navigation"

export function SortOptions() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const currentSort = searchParams.get("sort") || "popularity"

    const handleSortChange = (sortValue: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set("sort", sortValue)
        router.push(`${pathname}?${params.toString()}`, { scroll: false })
    }

    return (
        <div className="flex items-center gap-3">
            <label className="flex items-center gap-1 cursor-pointer">
                <input
                    type="radio"
                    name="sort"
                    checked={currentSort === "popularity"}
                    onChange={() => handleSortChange("popularity")}
                    className="text-orange-500 focus:ring-orange-500"
                />
                <span className={currentSort === "popularity" ? "text-orange-600 font-medium" : ""}>Popularity</span>
            </label>
            <label className="flex items-center gap-1 cursor-pointer">
                <input
                    type="radio"
                    name="sort"
                    checked={currentSort === "ranking"}
                    onChange={() => handleSortChange("ranking")}
                    className="text-orange-500 focus:ring-orange-500"
                />
                <span className={currentSort === "ranking" ? "text-orange-600 font-medium" : ""}>Ranking</span>
            </label>
            <label className="flex items-center gap-1 cursor-pointer">
                <input
                    type="radio"
                    name="sort"
                    checked={currentSort === "fees_high"}
                    onChange={() => handleSortChange("fees_high")}
                    className="text-orange-500 focus:ring-orange-500"
                />
                <span className={currentSort === "fees_high" ? "text-orange-600 font-medium" : ""}>Highest Fees</span>
            </label>
            <label className="flex items-center gap-1 cursor-pointer">
                <input
                    type="radio"
                    name="sort"
                    checked={currentSort === "fees_low"}
                    onChange={() => handleSortChange("fees_low")}
                    className="text-orange-500 focus:ring-orange-500"
                />
                <span className={currentSort === "fees_low" ? "text-orange-600 font-medium" : ""}>Lowest Fees</span>
            </label>
        </div>
    )
}
