"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, ChevronRight, Search, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { SortOptions } from "./exams/sort-options"
import { useRouter, useSearchParams } from "next/navigation"

export interface Exam {
    id: string
    title: string
    slug: string
    image?: string
    applicationDate?: string
    examDate?: string
    resultDate?: string
    description?: string // For the header description if tailored
    applyLink?: string // New field
}

interface ExamListingClientProps {
    slug: string
    title: string
    description: string
    exams: Exam[]
}

export function ExamListingClient({ slug, title, description, exams }: ExamListingClientProps) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [isExpanded, setIsExpanded] = useState(false)

    const handleFilterChange = (category: string, value: string, isChecked: boolean) => {
        const params = new URLSearchParams(searchParams.toString())
        const currentValues = params.get(category)?.split(",").filter(Boolean) || []

        if (isChecked) {
            if (!currentValues.includes(value)) {
                currentValues.push(value)
            }
        } else {
            const index = currentValues.indexOf(value)
            if (index > -1) {
                currentValues.splice(index, 1)
            }
        }

        if (currentValues.length > 0) {
            params.set(category, currentValues.join(","))
        } else {
            params.delete(category)
        }

        router.push(`/exams/${slug}?${params.toString()}`, { scroll: false })
    }

    const isFilterSelected = (category: string, value: string) => {
        const currentValues = searchParams.get(category)?.split(",") || []
        return currentValues.includes(value)
    }

    return (
        <div className="bg-[#f5f5f5] min-h-screen pb-12 font-sans text-gray-800">
            {/* Breadcrumb */}
            <div className="w-full max-w-[1300px] mx-auto px-4 py-4 text-xs text-gray-500">
                <Link href="/" className="hover:underline">Home</Link> &gt; <Link href="/exams" className="hover:underline">Exams</Link> &gt; <span className="text-gray-800 font-medium">{title}</span>
            </div>

            <div className="max-w-[1300px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">

                {/* Left Sidebar - Filters */}
                <div className="hidden lg:block space-y-4">
                    <div className="bg-white rounded border shadow-sm p-4">
                        <Accordion type="multiple" defaultValue={["type", "course", "level", "mode"]} className="w-full">

                            {/* Type Filter */}
                            <AccordionItem value="type" className="border-b-0">
                                <AccordionTrigger className="hover:no-underline py-3 text-sm font-semibold bg-gray-50 px-3 rounded mb-2">Type</AccordionTrigger>
                                <AccordionContent className="px-3 pb-4 space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="type-national"
                                            checked={isFilterSelected("examLevel", "National")}
                                            onCheckedChange={(checked) => handleFilterChange("examLevel", "National", !!checked)}
                                        />
                                        <label htmlFor="type-national" className="text-sm text-gray-600 leading-none cursor-pointer">National</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="type-state"
                                            checked={isFilterSelected("examLevel", "State")}
                                            onCheckedChange={(checked) => handleFilterChange("examLevel", "State", !!checked)}
                                        />
                                        <label htmlFor="type-state" className="text-sm text-gray-600 leading-none cursor-pointer">State</label>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            {/* Course Type Filter */}
                            <AccordionItem value="course" className="border-b-0">
                                <AccordionTrigger className="hover:no-underline py-3 text-sm font-semibold bg-gray-50 px-3 rounded mb-2">Course Type</AccordionTrigger>
                                <AccordionContent className="px-3 pb-4 space-y-3">
                                    {["Degree", "Diploma", "Certificate", "Doctorate"].map((type) => (
                                        <div key={type} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`course-${type.toLowerCase()}`}
                                                checked={isFilterSelected("courseType", type)}
                                                onCheckedChange={(checked) => handleFilterChange("courseType", type, !!checked)}
                                            />
                                            <label htmlFor={`course-${type.toLowerCase()}`} className="text-sm text-gray-600 leading-none cursor-pointer">{type}</label>
                                        </div>
                                    ))}
                                </AccordionContent>
                            </AccordionItem>

                            {/* Level Filter */}
                            <AccordionItem value="level" className="border-b-0">
                                <AccordionTrigger className="hover:no-underline py-3 text-sm font-semibold bg-gray-50 px-3 rounded mb-2">Level</AccordionTrigger>
                                <AccordionContent className="px-3 pb-4 space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="level-ug"
                                            checked={isFilterSelected("level", "Under Graduate")}
                                            onCheckedChange={(checked) => handleFilterChange("level", "Under Graduate", !!checked)}
                                        />
                                        <label htmlFor="level-ug" className="text-sm text-gray-600 leading-none cursor-pointer">Under Graduate</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="level-pg"
                                            checked={isFilterSelected("level", "Post Graduate")}
                                            onCheckedChange={(checked) => handleFilterChange("level", "Post Graduate", !!checked)}
                                        />
                                        <label htmlFor="level-pg" className="text-sm text-gray-600 leading-none cursor-pointer">Post Graduate</label>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            {/* Mode Filter */}
                            <AccordionItem value="mode" className="border-b-0">
                                <AccordionTrigger className="hover:no-underline py-3 text-sm font-semibold bg-gray-50 px-3 rounded mb-2">Mode</AccordionTrigger>
                                <AccordionContent className="px-3 pb-4 space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="mode-online"
                                            checked={isFilterSelected("examMode", "Online")}
                                            onCheckedChange={(checked) => handleFilterChange("examMode", "Online", !!checked)}
                                        />
                                        <label htmlFor="mode-online" className="text-sm text-gray-600 leading-none cursor-pointer">Online</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="mode-offline"
                                            checked={isFilterSelected("examMode", "Offline")}
                                            onCheckedChange={(checked) => handleFilterChange("examMode", "Offline", !!checked)}
                                        />
                                        <label htmlFor="mode-offline" className="text-sm text-gray-600 leading-none cursor-pointer">Offline</label>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                        </Accordion>
                    </div>
                </div>

                {/* Main Content */}
                <div>
                    {/* Header Card */}
                    <div className="bg-white border rounded shadow-sm p-8 mb-6">
                        <h1 className="text-2xl font-normal text-gray-800 mb-4">{title}</h1>
                        <div className={`text-sm text-gray-600 leading-relaxed ${!isExpanded ? 'line-clamp-3' : ''}`}>
                            {description || "Information about exams..."}
                        </div>
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="text-[#FF5555] text-sm font-medium mt-2 hover:underline focus:outline-none"
                        >
                            {isExpanded ? "Show Less" : "Show More"}
                        </button>
                    </div>

                    {/* Toolbar */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="text-sm text-gray-600 font-medium">
                            Showing <span className="text-black font-bold">1-{Math.min(20, exams.length)}</span> of <span className="text-black font-bold">{exams.length}</span> items.
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-gray-600 font-semibold mr-2">Sort By:</span>
                            <SortOptions slug={slug} />
                        </div>
                    </div>

                    {/* Exam Cards List */}
                    <div className="space-y-6">
                        {exams.map((exam, i) => (
                            <div key={i} className="bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
                                <div className="p-6">
                                    <div className="flex flex-col md:flex-row gap-6">
                                        {/* Logo */}
                                        <div className="flex-shrink-0">
                                            <div className="w-16 h-16 rounded-full bg-gray-100 overflow-hidden border">
                                                {exam.image ? (
                                                    <img src={exam.image} alt={exam.title} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center font-bold text-gray-400 text-xs">LOGO</div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-6">
                                                <div>
                                                    <Link href={`/${exam.slug}`} className="text-lg font-bold text-gray-800 hover:text-blue-600 mb-1 block">
                                                        {exam.title}
                                                    </Link>
                                                </div>
                                                <Button asChild className="bg-[#FF5555] hover:bg-[#ff3333] text-white font-medium px-6">
                                                    <a href={exam.applyLink || "#"} target="_blank" rel="noopener noreferrer">Apply Now</a>
                                                </Button>
                                            </div>

                                            {/* Grid Info */}
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-8 text-sm">
                                                <div>
                                                    <div className="text-gray-500 mb-1">Application Form Date</div>
                                                    <div className="font-medium text-gray-700">{exam.applicationDate || "N/A"}</div>
                                                </div>
                                                <div>
                                                    <div className="text-gray-500 mb-1">Exam Date</div>
                                                    <div className="font-medium text-gray-700">{exam.examDate || "N/A"}</div>
                                                </div>
                                                <div>
                                                    <div className="text-gray-500 mb-1">Result Date</div>
                                                    <div className="font-medium text-gray-700">{exam.resultDate || "N/A"}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {exams.length === 0 && (
                            <div className="bg-white border rounded-lg shadow-sm p-12 text-center text-gray-500">
                                No exams found matching your selected filters.
                            </div>
                        )}
                    </div>

                </div>

            </div>
        </div>
    )
}
