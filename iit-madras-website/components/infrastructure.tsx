import { Monitor, Dumbbell, Hospital, Coffee, FlaskConical, BookOpen, Theater, Home, Trophy } from "lucide-react"

export function Infrastructure() {
  const facilities = [
    { icon: Monitor, label: "Computer labs" },
    { icon: Trophy, label: "Sports" },
    { icon: Dumbbell, label: "gym" },
    { icon: Hospital, label: "Medical Hospital" },
    { icon: Coffee, label: "Cafeteria" },
    { icon: FlaskConical, label: "Laboratory" },
    { icon: BookOpen, label: "Library" },
    { icon: Theater, label: "Auditorium" },
    { icon: Home, label: "Hostel" },
  ]

  return (
    <div className="bg-white rounded-lg border border-gray-200 mt-6 overflow-hidden">
      {/* Dark blue header */}
      <div className="bg-[#1a365d] px-4 py-3">
        <h2 className="text-white font-semibold text-lg">IIT Madras Infrastructure</h2>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-4">Facilities</h3>

        {/* Facilities grid */}
        <div className="grid grid-cols-4 gap-4">
          {facilities.map((facility, index) => (
            <div key={index} className="flex items-center gap-2">
              <facility.icon className="w-5 h-5 text-blue-600" />
              <span className="text-gray-700 text-sm">{facility.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
