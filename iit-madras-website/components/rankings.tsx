export function Rankings() {
  const rankings = [
    { publisher: "NIRF", color: "text-blue-800", ranking: "#1 in 2025", criteria: "Overall" },
    { publisher: "NIRF", color: "text-orange-500", ranking: "#1 in 2025", criteria: "Engineering" },
    { publisher: "NIRF", color: "text-blue-900", ranking: "#12 in 2025", criteria: "Management", faded: true },
  ]

  return (
    <div className="bg-white border border-gray-200 rounded-sm mt-6">
      <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">IIT Madras Rankings</h2>
      </div>
      <div className="p-4">
        <table className="w-full">
          <thead>
            <tr className="bg-[#1a2a4a] text-white">
              <th className="py-3 px-4 text-left font-medium text-sm">Publisher</th>
              <th className="py-3 px-4 text-center font-medium text-sm">Ranking & Year</th>
              <th className="py-3 px-4 text-center font-medium text-sm">Criteria</th>
            </tr>
          </thead>
          <tbody>
            {rankings.map((item, index) => (
              <tr key={index} className={`border-b border-gray-200 ${item.faded ? "opacity-50" : ""}`}>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <span className={`font-bold text-lg ${item.color}`} style={{ fontFamily: "serif" }}>
                      n<span className="text-yellow-500">i</span>rf
                    </span>
                    <span className="text-[8px] text-gray-500 leading-tight">
                      NATIONAL
                      <br />
                      INSTITUTIONAL
                      <br />
                      RANKING
                      <br />
                      FRAMEWORK
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4 text-center text-gray-700">{item.ranking}</td>
                <td className="py-4 px-4 text-center text-blue-600">{item.criteria}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-center mt-4">
          <button className="text-orange-500 font-medium hover:underline">Show More</button>
        </div>
      </div>
    </div>
  )
}
