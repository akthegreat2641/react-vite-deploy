"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"

export function BoardsSearch() {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams)
        if (term) {
            params.set("query", term)
        } else {
            params.delete("query")
        }
        replace(`${pathname}?${params.toString()}`)
    }, 300)

    return (
        <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
                placeholder="Search National and State Boards in India"
                className="pl-10 h-10 border-gray-200 bg-white"
                defaultValue={searchParams.get("query")?.toString()}
                onChange={(e) => handleSearch(e.target.value)}
            />
        </div>
    )
}
