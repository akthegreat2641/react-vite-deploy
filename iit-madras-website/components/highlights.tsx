import { Building2, Users, GraduationCap, Award, Menu as Venus, LandPlot, Link } from "lucide-react"

const highlights = [
  {
    icon: Building2,
    label: "Institution Type",
    value: "Public",
  },
  {
    icon: Users,
    label: "Faculty Student Ratio",
    value: "1:14",
  },
  {
    icon: GraduationCap,
    label: "Total Faculty",
    value: "550",
  },
  {
    icon: Award,
    label: "Year of Establishment",
    value: "1959",
  },
  {
    icon: Venus,
    label: "Genders Accepted",
    value: "Co-Ed",
  },
  {
    icon: LandPlot,
    label: "Total Area (In Acre)",
    value: "611.332",
  },
  {
    icon: Building2,
    label: "Construction Area (Sq. M)",
    value: "776034",
  },
  {
    icon: Link,
    label: "Website",
    value: "www.iitm.ac.in",
    isLink: true,
  },
]

export function Highlights() {
  return (
    <div className="bg-white border border-gray-200 rounded-sm mt-6">
      <div className="bg-[#f0f0f0] px-4 py-3 border-b border-gray-200">
        <h2 className="text-base font-bold text-gray-900">IIT Madras Highlights</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {highlights.map((item, index) => (
          <div key={index} className="flex">
            <div className="flex items-center gap-3 px-6 py-4 w-[400px] border-r border-gray-200">
              <item.icon className="w-5 h-5 text-[#1a5276]" />
              <span className="text-[#1a5276] text-sm">{item.label}</span>
            </div>
            <div className="flex items-center px-6 py-4 flex-1">
              {item.isLink ? (
                <a href={`https://${item.value}`} className="text-[#1a5276] text-sm hover:underline">
                  {item.value}
                </a>
              ) : (
                <span className="text-gray-900 text-sm font-medium">{item.value}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
