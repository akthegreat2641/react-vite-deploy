import { ChevronLeft, ChevronRight } from "lucide-react"

export function ExamsAccepted() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 mt-6 overflow-hidden">
      {/* Gray header */}
      <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
        <h2 className="text-gray-800 font-semibold text-lg">Exams Accepted by IIT Madras</h2>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between">
          {/* Left arrow */}
          <button className="w-8 h-8 rounded-full border border-blue-500 flex items-center justify-center text-blue-500 hover:bg-blue-50">
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Exam cards */}
          <div className="flex gap-12 items-center justify-center flex-1">
            {/* IIT JAM */}
            <div className="flex items-center gap-3">
              <img src="/iit-jam-exam-logo-red-circular.jpg" alt="IIT JAM" className="w-16 h-16 object-contain" />
              <div>
                <h3 className="font-semibold text-gray-800">IIT JAM</h3>
                <p className="text-sm">
                  <span className="text-gray-600">Result Date:</span>{" "}
                  <span className="text-orange-500">Mar 19, 2025</span>
                </p>
              </div>
            </div>

            {/* GATE */}
            <div className="flex items-center gap-3">
              <img src="/gate-exam-logo-blue-circular-iit.jpg" alt="GATE" className="w-16 h-16 object-contain" />
              <div>
                <h3 className="font-semibold text-gray-800">GATE</h3>
                <p className="text-sm">
                  <span className="text-gray-600">Exam Date:</span>{" "}
                  <span className="text-orange-500">Feb 01, 2025</span>
                </p>
                <p className="text-sm">
                  <span className="text-gray-600">Result Date:</span>{" "}
                  <span className="text-orange-500">Mar 19, 2025</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right arrow */}
          <button className="w-8 h-8 rounded-full border border-blue-500 flex items-center justify-center text-blue-500 hover:bg-blue-50">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
