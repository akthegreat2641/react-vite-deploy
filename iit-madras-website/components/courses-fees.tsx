import { ExternalLink } from "lucide-react"

export function CoursesFees() {
  const courses = [
    { name: "BTech", fees: "₹8,00,000", duration: "4 Years" },
    { name: "MBA", fees: "₹3,20,000", duration: "2 Years" },
    { name: "BA", fees: "--", duration: "3 Years" },
    { name: "MSc", fees: "₹6,000", duration: "2 Years" },
    { name: "MA", fees: "--", duration: "2 Years" },
    { name: "MTech", fees: "₹19,744", duration: "2 Years" },
    { name: "PhD", fees: "₹10,000", duration: "3 Years" },
  ]

  return (
    <div className="bg-white border border-gray-200 rounded-sm mt-6">
      <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">IIT Madras Courses & Fees 2025</h2>
      </div>
      <div className="p-4">
        <table className="w-full">
          <thead>
            <tr className="bg-[#1a2a4a] text-white">
              <th className="py-3 px-4 text-left font-medium text-sm">Course</th>
              <th className="py-3 px-4 text-center font-medium text-sm">Average Fees</th>
              <th className="py-3 px-4 text-center font-medium text-sm">Duration</th>
              <th className="py-3 px-4 text-center font-medium text-sm">Action</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-4 px-4">
                  <a href="#" className="text-blue-600 hover:underline">
                    {course.name}
                  </a>
                </td>
                <td className="py-4 px-4 text-center text-gray-700">{course.fees}</td>
                <td className="py-4 px-4 text-center text-gray-700">{course.duration}</td>
                <td className="py-4 px-4 text-center">
                  <button className="bg-[#ffebee] text-[#f44336] px-6 py-2 rounded text-sm font-medium hover:bg-[#ffcdd2] transition-colors">
                    Apply Now
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-center mt-6">
          <button className="bg-orange-500 text-white px-6 py-2 rounded flex items-center gap-2 mx-auto hover:bg-orange-600 transition-colors">
            More Courses
            <ExternalLink size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}
