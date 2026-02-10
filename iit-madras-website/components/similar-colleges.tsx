import { MapPin } from "lucide-react"

const colleges = [
  {
    name: "SRMIST - SRM Institute of Science and Technology, Chennai",
    location: "Chennai, Tamil Nadu",
    image: "/srm-university-chennai-campus-building.jpg",
    logo: "/srm-university-logo-blue.jpg",
    hasLogo: true,
    bgColor: "bg-white",
  },
  {
    name: "Anna University, Chennai",
    location: "Chennai, Tamil Nadu",
    image: "/anna-university-chennai-tower-building.jpg",
    logo: "/anna-university-logo.jpg",
    hasLogo: true,
    bgColor: "bg-white",
  },
  {
    name: "University of Madras, Chennai",
    location: "Chennai, Tamil Nadu",
    image: "/university-of-madras-red-heritage-building.jpg",
    logo: "/university-of-madras-logo.jpg",
    hasLogo: false,
    bgColor: "bg-white",
  },
  {
    name: "IMU Chennai Indian Maritime University (IMUC)",
    location: "Chennai, Tamil Nadu",
    image: null,
    logo: "/indian-maritime-university-logo-emblem.jpg",
    hasLogo: true,
    bgColor: "bg-blue-600",
  },
]

export function SimilarColleges() {
  return (
    <div className="bg-white rounded border border-gray-200 mt-4">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-100 border-b border-gray-200">
        <h2 className="text-base font-semibold text-gray-800">Similar Engineering Colleges</h2>
        <a href="#" className="text-orange-500 text-sm font-medium hover:underline">
          View All
        </a>
      </div>

      {/* College Cards */}
      <div className="p-4">
        <div className="grid grid-cols-4 gap-4">
          {colleges.map((college, index) => (
            <div key={index} className="border border-gray-200 rounded overflow-hidden">
              {/* Image/Background */}
              <div className={`h-[120px] relative ${college.bgColor}`}>
                {college.image ? (
                  <img
                    src={college.image || "/placeholder.svg"}
                    alt={college.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-blue-600 flex items-center justify-center">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full absolute top-3 right-3" />
                  </div>
                )}
                {/* Logo overlay */}
                <div className="absolute bottom-2 left-2">
                  {college.hasLogo && (
                    <div className={`${college.image ? "bg-white" : "bg-transparent"} rounded p-1`}>
                      <img
                        src={college.logo || "/placeholder.svg"}
                        alt={`${college.name} logo`}
                        className="h-8 w-auto object-contain"
                      />
                    </div>
                  )}
                </div>
              </div>
              {/* Info */}
              <div className="p-3">
                <h3 className="text-sm font-medium text-gray-800 leading-tight mb-2 line-clamp-2">{college.name}</h3>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <MapPin className="w-3 h-3 text-orange-500" />
                  <span>{college.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
