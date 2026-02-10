"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface CourseBranchHeaderProps {
    title: string
    description?: string | null
}

export function CourseBranchHeader({ title, description }: CourseBranchHeaderProps) {
    const [expanded, setExpanded] = useState(false)

    if (!description) return null

    return (
        <div className="mb-10">
            <div className="relative">
                <div
                    dangerouslySetInnerHTML={{ __html: description }}
                    className={`prose prose-sm max-w-none text-gray-600 transition-all duration-300 overflow-hidden ${!expanded ? "max-h-[150px]" : "max-h-none"
                        }`}
                />

                {!expanded && description.length > 300 && (
                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-50 to-transparent" />
                )}
            </div>

            {description.length > 300 && (
                <div className="mt-4 text-left">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setExpanded(!expanded)}
                        className="text-[#FF5555] font-bold hover:text-red-600 hover:bg-transparent p-0 h-auto"
                    >
                        {expanded ? "Show Less" : "Show More"}
                    </Button>
                </div>
            )}
        </div>
    )
}
