import Image from "next/image"

const news = [
  {
    title: "How Many Correct Attempts Are Needed to Score 80 Percentile in CA... 2025?",
    author: "Ami Sinha",
    image: "/student-studying-for-cat-exam-laptop-books.jpg",
  },
  {
    title: "CAT 2025 Last 2 Days Rush: Coaching Experts Reveal Where Toppers Inves... Their Final Hours",
    author: "Sudeshna Chakrabarti",
    image: "/coaching-experts-cat-preparation-classroom.jpg",
  },
  {
    title: "Aiming for 95 Percentile in CAT 2025? Here's the Exact Attempt Target",
    author: "Ami Sinha",
    image: "/cat-2025-95-percentile-target-strategy-student.jpg",
  },
  {
    title: "CAT 2025 Last 3 Days Strategy For Exam Day",
    author: "Mohith Kumar",
    image: "/placeholder.svg?height=140&width=180",
  },
]

export function RelatedNews() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 mt-4 overflow-hidden">
      <div className="bg-red-600 px-4 py-3">
        <h2 className="text-white font-semibold">Related News</h2>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-4 gap-4">
          {news.map((item, index) => (
            <div key={index} className="cursor-pointer group">
              <div className="relative h-[100px] rounded-lg overflow-hidden border border-gray-200">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="mt-2">
                <h3 className="text-sm font-medium text-gray-800 line-clamp-2 group-hover:text-blue-600">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1">{item.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
