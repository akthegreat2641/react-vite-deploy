import { Calendar } from "lucide-react"

const updates = [
  {
    date: "2025-11-18",
    content:
      "The GATE 2026 branch-wise exam schedule for all 30 papers has been released, with exams set for February 7, 8, 14, and 15, 2026. Computer Science (CS) and Civil Engineering (CE) will be held in two shifts, while all other papers will be conducted in a single shift. The admit cards will be available from January 2, 2026.",
    links: [],
  },
  {
    date: "2025-11-14",
    content:
      "The GATE 2026 mock test has been released for all papers at gate2026.iitg.ac.in. The GATE 2026 will be held on February 7, 8, 14 and 15, with admit cards available from January 2, 2026.",
    links: [{ text: "gate2026.iitg.ac.in", url: "#" }],
  },
  {
    date: "2025-11-12",
    content:
      "The CAT 2025 admit card has been released at imcat.ac.in and can be downloaded until November 30. The CAT 2025 exam is scheduled to be conducted on November 30, 2025.",
    links: [{ text: "imcat.ac.in", url: "#" }],
  },
]

export function LatestUpdates() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
        Latest Update for IIT Madras
      </h2>

      <div className="space-y-4">
        {updates.map((update, index) => (
          <div key={index} className="flex gap-2">
            <Calendar className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
            <div>
              <span className="text-[#ff5722] font-medium">{update.date}</span>
              <span className="text-gray-700 ml-1">
                {update.content
                  .split(/(gate2026\.iitg\.ac\.in|imcat\.ac\.in|Computer Science $$CS$$|Civil Engineering $$CE$$)/)
                  .map((part, i) => {
                    if (part === "gate2026.iitg.ac.in" || part === "imcat.ac.in") {
                      return (
                        <a key={i} href="#" className="text-blue-600 hover:underline">
                          {part}
                        </a>
                      )
                    }
                    if (part === "Computer Science (CS)" || part === "Civil Engineering (CE)") {
                      return (
                        <a key={i} href="#" className="text-blue-600 hover:underline">
                          {part}
                        </a>
                      )
                    }
                    return part
                  })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
