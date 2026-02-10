import { MapPin, Star } from "lucide-react"

interface CollegeHeaderProps {
    college: {
        name: string
        location: string
    }
    page: {
        headerLogo?: string | null
        headerBgImage?: string | null
        location?: string | null
    }
    isArticle?: boolean
    isBoard?: boolean
    isExam?: boolean
    isOlympiad?: boolean
    isScholarship?: boolean
    isCareer?: boolean
    isNews?: boolean // Added isNews prop
    showHeaderLogo?: boolean
    courseDuration?: string | null
    avgFees?: string | null
}

export function CollegeHeader({ college, page, isArticle = false, isBoard = false, isExam = false, isOlympiad = false, isScholarship = false, isCareer = false, isNews = false, showHeaderLogo = true, courseDuration, avgFees }: CollegeHeaderProps) {
    const collegeName = college.name
    const headerTitle = collegeName

    const location = page.location || college.location
    const logo = page.headerLogo || "/placeholder-logo.png"

    return (
        <div className="relative min-h-[120px] h-auto bg-[#1a1a1a] overflow-hidden">
            {/* Background text watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <span className="text-[60px] font-serif text-gray-400 whitespace-nowrap tracking-wide">
                    {collegeName}
                </span>
            </div>

            <div className="relative max-w-[1200px] mx-auto px-4 py-4 md:py-0 h-full flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    {/* College Logo */}
                    {showHeaderLogo && (
                        <div className="w-[70px] h-[70px] rounded-full bg-[#1a3a5c] border-2 border-[#c9a227] flex items-center justify-center overflow-hidden">
                            <img src={logo} alt={collegeName + " Logo"} className="w-full h-full object-cover" />
                        </div>
                    )}

                    <div>
                        <h1 className="text-white text-xl font-semibold">
                            {headerTitle}
                        </h1>
                        {/* Course Header Details */}
                        {(courseDuration || avgFees) && (
                            <div className="flex items-center gap-4 mt-1 text-white text-sm">
                                {courseDuration && (
                                    <div className="flex items-center gap-1">
                                        <span className="text-[#ff5722]">Duration:</span>
                                        <span>{courseDuration}</span>
                                    </div>
                                )}
                                {avgFees && (
                                    <div className="flex items-center gap-1">
                                        <span className="text-[#ff5722]">Avg Fees:</span>
                                        <span>{avgFees}</span>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Standard College Details */}
                        {!isArticle && !isBoard && !isExam && !isOlympiad && !isScholarship && !isCareer && !isNews && !courseDuration && !avgFees && (
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-1">
                                <div className="flex items-center gap-1 text-white">
                                    <MapPin className="w-4 h-4 text-[#ff5722]" />
                                    <span className="text-sm text-[#ff5722]">{location}</span>
                                </div>
                                <span className="text-white">•</span>
                                <div className="flex items-center gap-1">
                                    <span className="text-white text-sm">4.3</span>
                                    <div className="flex">
                                        {[1, 2, 3, 4].map((i) => (
                                            <Star key={i} className="w-4 h-4 fill-[#ff9800] text-[#ff9800]" />
                                        ))}
                                        <Star className="w-4 h-4 fill-[#ff9800]/50 text-[#ff9800]" />
                                    </div>
                                    <span className="text-[#ff9800] text-sm">(39 Reviews)</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Compare button - only show for colleges */}
            {!isArticle && !isBoard && !isExam && !isOlympiad && !isScholarship && !isCareer && !isNews && !courseDuration && !avgFees && (
                <button className="flex flex-col items-center gap-1 text-white">
                    <div className="w-8 h-8 border-2 border-white rounded flex items-center justify-center">
                        <div className="w-4 h-4 border border-white rounded-sm relative">
                            <div className="absolute -right-1 -bottom-1 w-4 h-4 border border-white rounded-sm bg-transparent"></div>
                        </div>
                    </div>
                    <span className="text-xs">Compare</span>
                </button>
            )}
        </div>
    )
}
