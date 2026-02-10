"use client"

import { useRouter, useSearchParams } from "next/navigation"

export function SortOptions({ slug }: { slug: string }) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const currentSort = searchParams.get("sort") || "popularity"

    const handleSortChange = (sortValue: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set("sort", sortValue)
        router.push(`/exams/${slug}?${params.toString()}`, { scroll: false })
    }

    return (
        <div className="flex items-center gap-4">
            <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                    type="radio"
                    name="sort"
                    checked={currentSort === "popularity"}
                    onChange={() => handleSortChange("popularity")}
                    className="w-4 h-4 accent-[#FF5555] cursor-pointer"
                />
                <span className={`text-sm ${currentSort === "popularity" ? "text-black font-semibold" : "text-gray-600"}`}>Popularity</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                    type="radio"
                    name="sort"
                    checked={currentSort === "ranking"}
                    onChange={() => handleSortChange("ranking")}
                    className="w-4 h-4 accent-[#FF5555] cursor-pointer"
                />
                <span className={`text-sm ${currentSort === "ranking" ? "text-black font-semibold" : "text-gray-600"}`}>Ranking</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                    type="radio"
                    name="sort"
                    checked={currentSort === "exam_date"}
                    onChange={() => handleSortChange("exam_date")}
                    className="w-4 h-4 accent-[#FF5555] cursor-pointer"
                />
                <span className={`text-sm ${currentSort === "exam_date" ? "text-black font-semibold" : "text-gray-600"}`}>Exam Date</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                    type="radio"
                    name="sort"
                    checked={currentSort === "alpha"}
                    onChange={() => handleSortChange("alpha")}
                    className="w-4 h-4 accent-[#FF5555] cursor-pointer"
                />
                <span className={`text-sm ${currentSort === "alpha" ? "text-black font-semibold" : "text-gray-600"}`}>Alphabetical</span>
            </label>
        </div>
    )
}
