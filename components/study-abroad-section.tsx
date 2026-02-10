"use client"

import { useState } from "react"

export default function StudyAbroadSection() {
  const [activeCountry, setActiveCountry] = useState("CANADA")

  const countries = [
    {
      name: "CANADA",
      image: "/canada-flag-maple-leaf-circular.jpg",
    },
    {
      name: "UK",
      image: "/uk-british-flag-union-jack-circular.jpg",
    },
    {
      name: "USA",
      image: "/usa-american-flag-statue-liberty-circular.jpg",
    },
    {
      name: "AUSTRALIA",
      image: "/australia-flag-sydney-opera-house-circular.jpg",
    },
    {
      name: "GERMANY",
      image: "/germany-flag-brandenburg-gate-circular.jpg",
    },
  ]

  return (
    <section className="py-10 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Study Abroad Options</h2>
          <p className="text-gray-500 text-base max-w-3xl mx-auto">
            Choose from the top study destinations that the world has to offer. Be informed about universities,
            rankings, admission details, and exams.
          </p>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-8 items-end">
          {/* Graduate Image - Left Side */}
          <div className="relative flex justify-center lg:justify-start">
            <img
              src="/female-graduate-student-black-cap-gown-celebrating.jpg"
              alt="Graduate celebrating"
              className="w-full max-w-md h-auto object-contain"
            />
          </div>

          {/* Country Cards - Right Side */}
          <div className="flex flex-col items-center lg:items-start w-full">
            {/* Top Row - 3 cards */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-4 w-full">
              {countries.slice(0, 3).map((country) => (
                <button
                  key={country.name}
                  onClick={() => setActiveCountry(country.name)}
                  className={`flex flex-col items-center p-4 rounded-lg border transition-all min-w-[110px] md:min-w-[120px] flex-1 md:flex-none ${activeCountry === country.name
                    ? "bg-[#1e3a5f] border-[#1e3a5f] text-white"
                    : "bg-white border-gray-200 text-gray-900 hover:border-gray-300"
                    }`}
                >
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden mb-3">
                    <img
                      src={country.image || "/placeholder.svg"}
                      alt={country.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span
                    className={`text-sm font-semibold tracking-wide ${activeCountry === country.name ? "text-white" : "text-gray-900"
                      }`}
                  >
                    {country.name}
                  </span>
                </button>
              ))}
            </div>

            {/* Bottom Row - 2 cards centered */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 md:pl-16 w-full">
              {countries.slice(3).map((country) => (
                <button
                  key={country.name}
                  onClick={() => setActiveCountry(country.name)}
                  className={`flex flex-col items-center p-4 rounded-lg border transition-all min-w-[110px] md:min-w-[120px] flex-1 md:flex-none ${activeCountry === country.name
                    ? "bg-[#1e3a5f] border-[#1e3a5f] text-white"
                    : "bg-white border-gray-200 text-gray-900 hover:border-gray-300"
                    }`}
                >
                  <div className="w-16 h-16 rounded-full overflow-hidden mb-3">
                    <img
                      src={country.image || "/placeholder.svg"}
                      alt={country.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span
                    className={`text-sm font-semibold tracking-wide ${activeCountry === country.name ? "text-white" : "text-gray-900"
                      }`}
                  >
                    {country.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
