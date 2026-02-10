import { Download } from "lucide-react"

interface Course {
  name: string
  fullName: string
  fee: string
  duration: string
  mode: string
  campus: string
  examsAccepted?: string
  specializations: string[]
  moreCount?: number
}

const courses: Course[] = [
  {
    name: "B.Tech",
    fullName: "Bachelor of Technology",
    fee: "₹ 8,00,000",
    duration: "4 Years",
    mode: "Offline",
    campus: "On Campus",
    examsAccepted: "JEE Advanced",
    specializations: [
      "Computer Science",
      "Biotech Engineering",
      "Civil Engineering",
      "Mechanical Engineering",
      "Electrical Engineering",
    ],
    moreCount: 17,
  },
  {
    name: "M.Tech",
    fullName: "Master of Technology",
    fee: "₹ 19,744",
    duration: "2 Years",
    mode: "Offline",
    campus: "On Campus",
    specializations: [
      "Computer Science Engineering",
      "Biotech",
      "Civil Engineering",
      "Structural Engineering",
      "Environmental Engineering",
    ],
    moreCount: 20,
  },
  {
    name: "M.Sc",
    fullName: "Master of Science",
    fee: "₹ 6,000",
    duration: "2 Years",
    mode: "Offline",
    campus: "On Campus",
    examsAccepted: "IIT JAM",
    specializations: ["Chemistry", "Physics", "Mathematics"],
  },
  {
    name: "PhD",
    fullName: "Doctor of Philosophy",
    fee: "₹ 10,000",
    duration: "3 Years",
    mode: "Offline",
    campus: "On Campus",
    specializations: ["Mathematics", "Chemistry", "Aerospace Engineering", "Biotech", "Civil Engineering"],
    moreCount: 7,
  },
  {
    name: "MBA",
    fullName: "Master of Business Administration",
    fee: "₹ 3,20,000",
    duration: "2 Years",
    mode: "Offline",
    campus: "On Campus",
    specializations: [],
  },
]

export function CoursesOffered() {
  return (
    <div className="bg-white rounded border border-gray-200 mt-4">
      {/* Header */}
      <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
        <h2 className="font-semibold text-gray-800">Courses offered by IIT Madras</h2>
      </div>

      <div className="p-4">
        {courses.map((course, index) => (
          <div key={index} className={`py-4 ${index !== courses.length - 1 ? "border-b border-gray-200" : ""}`}>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                {/* Course Name */}
                <h3 className="text-blue-600 font-medium">
                  {course.name} [{course.fullName}]
                </h3>

                {/* Mode and Campus */}
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-medium">Offline</span>
                  <span className="mx-2">•</span>
                  <span className="text-orange-500">On Campus</span>
                </p>

                {/* Exams Accepted */}
                {course.examsAccepted && (
                  <p className="text-sm mt-1">
                    <span className="text-gray-600">Exams Accepted: </span>
                    <span className="text-blue-600">{course.examsAccepted}</span>
                  </p>
                )}

                {/* Specializations */}
                {course.specializations.length > 0 && (
                  <p className="text-sm mt-1">
                    <span className="font-medium text-gray-700">Specialization: </span>
                    <span className="text-gray-600">
                      {course.specializations.join(" | ")}
                      {course.moreCount && <span className="text-orange-500"> | +{course.moreCount}</span>}
                    </span>
                  </p>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 mt-3">
                  <button className="px-3 py-1.5 bg-orange-500 text-white text-sm rounded font-medium">
                    Admission 2025
                  </button>
                  <button className="px-3 py-1.5 border border-orange-500 text-orange-500 text-sm rounded font-medium flex items-center gap-1">
                    Brochure <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Fee and Duration */}
              <div className="text-right">
                <p className="text-orange-500 font-medium">
                  {course.fee} <span className="text-gray-500 font-normal">({course.duration})</span>
                </p>
                <p className="text-blue-600 text-sm">Get Detailed Fees</p>
              </div>
            </div>
          </div>
        ))}

        {/* Show More */}
        <div className="text-center pt-4">
          <button className="text-orange-500 font-medium hover:underline">Show More</button>
        </div>
      </div>
    </div>
  )
}
