import Link from "next/link"

interface City {
  id: string
  name: string
  image?: string | null
}

export default function DreamSection({ cities }: { cities: City[] }) {
  if (!cities || cities.length === 0) return null

  return (
    <section className="py-10 md:py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 inline-flex items-center gap-2">
            Select Your Dream{" "}
            <span className="bg-emerald-500 text-white px-3 py-1 rounded text-lg font-bold">City</span>
          </h2>
        </div>

        <div className="flex justify-center gap-3 md:gap-4 flex-wrap">
          {cities.map((city) => (
            <Link
              href={`/colleges?state=${encodeURIComponent(city.name)}`}
              key={city.id}
              className="flex flex-col items-center gap-3 cursor-pointer hover:scale-105 transition-transform"
            >
              <div className="w-28 h-28 md:w-36 md:h-32 rounded-lg bg-gray-100 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white border border-gray-200 flex items-center justify-center overflow-hidden">
                  <img
                    src={city.image || "/placeholder.svg"}
                    alt={city.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <span className="text-sm font-medium text-gray-700">{city.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

