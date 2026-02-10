import Image from "next/image"
import { MapPin } from "lucide-react"

const colleges = [
  {
    name: "Vel Tech Rangarajan Dr. Sagunthala R and D Institute of Science and...",
    location: "Chennai, Tamil Nadu",
    image: "/vel-tech-university-chennai-campus-building.jpg",
    logo: "/vel-tech-university-logo-blue-circular.jpg",
  },
  {
    name: "VELS University, Chennai",
    location: "Chennai, Tamil Nadu",
    image: "/vels-university-chennai-campus-red-building.jpg",
    logo: "/vels-university-logo-red-shield.jpg",
  },
  {
    name: "Suntone Eduniversity - Thangavelu Engineering College",
    location: "Chennai, Tamil Nadu",
    image: "/thangavelu-engineering-college-chennai-building.jpg",
    logo: "/suntone-education-logo-orange.jpg",
  },
  {
    name: "Avulus Academy of Management, Chennai",
    location: "Chennai, Tamil Nadu",
    image: "/management-academy-chennai-modern-building-blue.jpg",
    logo: "/aaam-academy-logo-green-text.jpg",
  },
]

export function ExploreNearby() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 mt-4 overflow-hidden">
      <div className="bg-purple-600 px-4 py-3 flex items-center justify-between">
        <h2 className="text-white font-semibold">Explore Nearby Colleges</h2>
        <a href="#" className="text-white text-sm hover:underline">
          View All
        </a>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-4 gap-4">
          {colleges.map((college, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="relative h-[100px]">
                <Image src={college.image || "/placeholder.svg"} alt={college.name} fill className="object-cover" />
                <div className="absolute bottom-2 left-2 w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center overflow-hidden">
                  <Image
                    src={college.logo || "/placeholder.svg"}
                    alt={`${college.name} logo`}
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="p-3">
                <h3 className="text-sm font-medium text-gray-800 line-clamp-2 min-h-[40px]">{college.name}</h3>
                <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
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
