export function Gallery() {
  const images = [
    "/iit-madras-conference-room-with-students.jpg",
    "/iit-madras-students-in-casual-setting.jpg",
    "/iit-madras-lecture-hall-with-professor.jpg",
    "/iit-madras-seminar-with-professor-speaking.jpg",
  ]

  return (
    <div className="bg-white rounded border border-gray-200 mt-4">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-100 border-b border-gray-200">
        <h2 className="text-base font-semibold text-gray-800">Gallery</h2>
        <a href="#" className="text-orange-500 text-sm font-medium hover:underline">
          View All
        </a>
      </div>

      {/* Gallery Images */}
      <div className="p-4">
        <div className="flex gap-3">
          {images.map((img, index) => (
            <div key={index} className="flex-1 aspect-[3/2] rounded overflow-hidden border border-gray-200">
              <img
                src={img || "/placeholder.svg"}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
