export function JeeCutoff() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 mt-6 overflow-hidden">
      {/* Orange header */}
      <div className="bg-[#ff6b35] px-4 py-3">
        <h2 className="text-white font-semibold text-lg">
          IIT Madras B.Tech + M.Tech JEE Advanced Cutoff 2025 - General
        </h2>
      </div>

      <div className="p-4">
        {/* Description */}
        <p className="text-gray-700 text-sm mb-4">
          IIT Madras B.Tech + M.Tech JEE Advanced cutoff 2025 has been released for Round 6. The overall{" "}
          <span className="font-semibold">IIT Madras B.Tech + M.Tech cutoff 2025 Closing Rank</span> for General
          category is <span className="font-semibold">2808</span>.
        </p>

        {/* Table */}
        <div className="border border-gray-200 rounded overflow-hidden mb-4">
          <table className="w-full">
            <thead>
              <tr className="bg-[#1a365d]">
                <th className="text-white text-left px-4 py-3 font-semibold text-sm">B.Tech + M.Tech</th>
                <th className="text-white text-left px-4 py-3 font-semibold text-sm">Round 6 (Closing Rank)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-200">
                <td className="px-4 py-3 text-gray-700 text-sm">
                  Aerospace Engineering (5 Years, Bachelor and Master of Technology (Dual Degree))
                </td>
                <td className="px-4 py-3 text-gray-700 text-sm">2808</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* View Detailed Cutoff link */}
        <div className="text-center">
          <a href="#" className="text-blue-600 hover:underline text-sm">
            View Detailed Cutoff
          </a>
        </div>
      </div>
    </div>
  )
}
