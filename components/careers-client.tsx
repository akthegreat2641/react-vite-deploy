"use client"

import Link from "next/link"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AdSenseBanner } from "@/components/adsense-banner"

interface CareerType {
    id: string
    name: string
    image: string | null
}

interface CareersClientProps {
    initialCareerTypes: CareerType[]
}

export function CareersClient({ initialCareerTypes }: CareersClientProps) {
    const [searchQuery, setSearchQuery] = useState("")

    // Filter career types based on search
    const filteredTypes = initialCareerTypes.filter((type) =>
        type.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="min-h-screen bg-gray-50 py-8 md:py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-12">
                <AdSenseBanner />

                {/* Header Section */}
                <div className="text-center space-y-8">
                    <h1 className="text-2xl md:text-4xl font-bold text-blue-950 font-serif">
                        What career are you looking for ?
                    </h1>

                    <div className="flex max-w-2xl mx-auto shadow-sm">
                        <Input
                            type="text"
                            placeholder=""
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="rounded-r-none border-r-0 h-12 text-lg focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                        <Button className="rounded-l-none h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white font-medium">
                            Search
                        </Button>
                    </div>
                </div>

                {/* Grid Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredTypes.map((type) => (
                        <Link href={`/careers/${encodeURIComponent(type.name)}`} key={type.id} className="group cursor-pointer flex flex-col h-full bg-white rounded-lg overflow-hidden transition-shadow hover:shadow-lg">
                            {/* Image Container */}
                            <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100 relative">
                                {type.image ? (
                                    <img
                                        src={type.image}
                                        alt={type.name}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-200">
                                        No Image
                                    </div>
                                )}
                            </div>

                            {/* Title Container */}
                            <div className="p-4 bg-blue-50/50 flex-grow flex items-center justify-center text-center">
                                <h3 className="font-bold text-blue-950 text-sm md:text-base group-hover:text-blue-700 transition-colors">
                                    {type.name}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>

                {filteredTypes.length === 0 && (
                    <div className="text-center text-gray-500 py-12">
                        No career types found matching "{searchQuery}"
                    </div>
                )}

                <AdSenseBanner />
            </div>
        </div >
    )
}
