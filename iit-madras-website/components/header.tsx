import { MapPin, Star } from "lucide-react"
import { prisma } from "@/lib/prisma"

export async function Header() {
  // Load dynamic data from CollegePage for IIT Madras, if configured
  const collegePage = await prisma.collegePage.findFirst({
    where: { slug: "iit-madras" },
    include: { college: true },
  })

  const collegeName =
    collegePage?.college?.name || "Indian Institute of Technology Madras"
  const headerTitle =
    collegePage?.college?.name
      ? `${collegePage.college.name}: Admission, Courses, Fees, Cutoff, Placement, Ranking`
      : "IIT Madras: Admission 2025, Courses, Fees, Cutoff, Placement, Ranking"

  const location =
    collegePage?.location || collegePage?.college?.location || "Chennai , Tamil Nadu"
  const logo =
    collegePage?.headerLogo || "/iit-madras-official-logo-emblem-blue-gold.jpg"

  return (
    <div className="relative h-[120px] bg-[#1a1a1a] overflow-hidden">
      {/* Background text watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <span className="text-[60px] font-serif text-gray-400 whitespace-nowrap tracking-wide">
          {collegeName}
        </span>
      </div>

      <div className="relative max-w-[1200px] mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* IIT Madras Logo */}
          <div className="w-[70px] h-[70px] rounded-full bg-[#1a3a5c] border-2 border-[#c9a227] flex items-center justify-center overflow-hidden">
            <img src={logo} alt={collegeName + " Logo"} className="w-full h-full object-cover" />
          </div>

          <div>
            <h1 className="text-white text-xl font-semibold">
              {headerTitle}
            </h1>
            <div className="flex items-center gap-4 mt-1">
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
          </div>
        </div>

        {/* Compare button */}
        <button className="flex flex-col items-center gap-1 text-white">
          <div className="w-8 h-8 border-2 border-white rounded flex items-center justify-center">
            <div className="w-4 h-4 border border-white rounded-sm relative">
              <div className="absolute -right-1 -bottom-1 w-4 h-4 border border-white rounded-sm bg-transparent"></div>
            </div>
          </div>
          <span className="text-xs">Compare</span>
        </button>
      </div>
    </div>
  )
}
