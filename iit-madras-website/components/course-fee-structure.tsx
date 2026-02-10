import { Search } from "lucide-react"

export function CourseFeeStructure() {
  const courseTypes = ["BTech", "MBA", "BA", "MSc", "MA", "MTech", "PhD"]

  return (
    <div className="bg-white rounded border border-gray-200 mt-4">
      {/* Header */}
      <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
        <h2 className="font-semibold text-gray-800">IIT Madras Courses and Fee Structure</h2>
      </div>

      <div className="p-4">
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search B.Tech Civil, B.Tech Mechanical"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded text-sm text-gray-500 focus:outline-none focus:border-gray-400"
          />
        </div>

        {/* Filter By */}
        <div className="mb-3">
          <span className="text-sm text-gray-600 mr-3">Filter By:</span>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-4">
          <button className="px-3 py-1 text-sm border-2 border-orange-500 text-orange-500 rounded font-medium">
            Course
          </button>
          <button className="px-3 py-1 text-sm border border-gray-300 text-gray-600 rounded">Stream</button>
          <button className="px-3 py-1 text-sm border border-gray-300 text-gray-600 rounded">Type</button>
          <button className="px-3 py-1 text-sm border border-gray-300 text-gray-600 rounded">Course Level</button>
        </div>

        {/* Course Type Checkboxes */}
        <div className="flex flex-wrap gap-4">
          {courseTypes.map((course) => (
            <label key={course} className="flex items-center gap-1.5 text-sm text-gray-600">
              <input type="checkbox" className="w-4 h-4 border-gray-300 rounded" />
              {course}
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}
