const institutions = [
  {
    name: "Amrita School of Business",
    logo: "/amrita-university-logo-orange.jpg",
    logoText: "AMRITA",
    program: "MBA",
    fees: null,
  },
  {
    name: "Amrita School of Engineering, Coimba...",
    logo: "/amrita-engineering-college-logo-red.jpg",
    program: "B.Tech | (Total Fees) ₹10",
    fees: "₹10",
  },
  {
    name: "Rajalakshmi Institute of Technology - ...",
    logo: "/rajalakshmi-institute-logo-blue-gold-emblem.jpg",
    program: "B.Tech",
    fees: null,
  },
  {
    name: "Rajalakshmi School of Business",
    logo: "/rsb-business-school-logo-blue-emblem.jpg",
    program: "PGDM | (Total Fees) ₹8.75 LPA",
    fees: "₹8.75 LPA",
  },
]

export function Sidebar() {
  return (
    <div className="w-[320px] flex-shrink-0">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-[#ff5722] text-white px-4 py-3 flex items-center gap-2">
          <div className="w-6 h-6 bg-[#ffb300] rounded flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2H4a1 1 0 110-2V4zm3 1h6v4H7V5zm6 6H7v2h6v-2z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span className="font-semibold">Live Application Form</span>
        </div>

        {/* Institutions list */}
        <div className="divide-y divide-gray-100">
          {institutions.map((inst, index) => (
            <div key={index} className="p-4 flex items-start gap-3">
              <div className="w-[60px] h-[60px] rounded-full overflow-hidden flex-shrink-0 border border-gray-200">
                <img src={inst.logo || "/placeholder.svg"} alt={inst.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-blue-600 truncate">{inst.name}</h3>
                <p className="text-sm text-gray-600">{inst.program}</p>
                <a href="#" className="text-[#ff5722] text-sm font-medium hover:underline">
                  Apply Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
