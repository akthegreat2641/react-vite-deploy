"use client"

import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Check, ChevronDown, Filter } from "lucide-react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import {
    INDIAN_STATES, COLLEGE_TYPES, COURSE_TYPES, INSTITUTE_TYPES,
    COURSE_DURATIONS, GENDER_ACCEPTED, TOTAL_FEES_RANGES, STREAMS, DEGREES
} from "@/lib/constants"
import { cn } from "@/lib/utils"

interface FilterOption {
    label: string
    key: string
    options: string[]
}

const FILTERS: FilterOption[] = [
    { label: "Stream", key: "branch", options: STREAMS },
    { label: "State", key: "state", options: INDIAN_STATES },
    // City not yet implemented
    { label: "Degree", key: "degree", options: DEGREES },
    // Program Type (Using generic Programs for now or simplified)
    { label: "Type Of College", key: "collegeType", options: COLLEGE_TYPES },
    { label: "Institute Type", key: "instituteType", options: INSTITUTE_TYPES },
    { label: "Entrance/Exam Accepted", key: "examAccepted", options: [] }, // Needs dynamic fetch usually
    { label: "Total Fee", key: "totalFees", options: TOTAL_FEES_RANGES },
    { label: "Course Type", key: "courseType", options: COURSE_TYPES },
    { label: "Duration", key: "courseDuration", options: COURSE_DURATIONS },
    { label: "Gender", key: "genderAccepted", options: GENDER_ACCEPTED },
]

interface FilterBarProps {
    initialFilters?: Record<string, string | null>
}

export function FilterBar({ initialFilters }: FilterBarProps) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()

    const handleSelect = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString())

        // Toggle logic (simple selection for now, could be multi)
        // If already selected, remove it. Else set it.
        const current = params.get(key)
        if (current === value) {
            params.delete(key)
        } else {
            params.set(key, value)
        }

        router.push(`${pathname}?${params.toString()}`)
    }

    const clearFilters = () => {
        router.push(pathname)
    }

    return (
        <div className="bg-white border-b sticky top-16 z-10 shadow-sm overflow-x-auto">
            <div className="container mx-auto px-4 py-3 flex items-center gap-3 min-w-max">
                <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 text-gray-700 border-gray-300"
                    onClick={clearFilters}
                >
                    <Filter className="w-4 h-4" /> All Filter
                </Button>

                {FILTERS.map((filter) => {
                    const currentVal = searchParams.get(filter.key) || initialFilters?.[filter.key]
                    return (
                        <Popover key={filter.key}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={currentVal ? "secondary" : "ghost"}
                                    size="sm"
                                    className={cn(
                                        "text-gray-600 hover:bg-gray-50 font-normal border border-transparent hover:border-gray-200",
                                        currentVal && "bg-orange-50 text-orange-700 border-orange-100 font-medium"
                                    )}
                                >
                                    {filter.label}
                                    {currentVal && <span className="ml-1 text-xs">({currentVal})</span>}
                                    <ChevronDown className="w-3 h-3 ml-1 text-gray-400" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-56 p-2" align="start">
                                <div className="max-h-64 overflow-y-auto space-y-1 custom-scrollbar">
                                    {filter.options.map((opt) => (
                                        <div
                                            key={opt}
                                            className={cn(
                                                "flex items-center justify-between px-2 py-1.5 hover:bg-gray-100 rounded cursor-pointer text-sm",
                                                currentVal === opt && "text-orange-600 bg-orange-50 hover:bg-orange-100"
                                            )}
                                            onClick={() => handleSelect(filter.key, opt)}
                                        >
                                            <span>{opt}</span>
                                            {currentVal === opt && <Check className="w-3 h-3" />}
                                        </div>
                                    ))}
                                    {filter.options.length === 0 && (
                                        <div className="text-xs text-gray-400 px-2 py-1">No options available</div>
                                    )}
                                </div>
                            </PopoverContent>
                        </Popover>
                    )
                })}
            </div>
        </div>
    )
}
