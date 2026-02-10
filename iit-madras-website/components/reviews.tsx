import { ChevronDown, Check } from "lucide-react"

const categoryRatings = [
  { name: "College Infrastructure\n& Hostel Facilities", rating: 4.1 },
  { name: "Academics & Faculty", rating: 4.3 },
  { name: "Placements &\nInternships", rating: 4.2 },
  { name: "Clubs & Associations", rating: 4.7 },
  { name: "Fees & Scholarships", rating: 4.1 },
]

const starDistribution = [
  { stars: 5, label: ">4-5 star", count: 51 },
  { stars: 4, label: ">3-4 star", count: 6 },
  { stars: 3, label: ">2-3 star", count: 0 },
  { stars: 2, label: "1-2 star", count: 0 },
]

const reviews = [
  {
    id: 1,
    name: "Asum M",
    batch: "Batch 2018",
    course: "B.tech [Bachelor of technology]",
    rating: 4.5,
    date: "Reviewed on May 18, 2018",
    categoryRatings: [
      { name: "Placements", rating: 4.4 },
      { name: "Fees", rating: 4.5 },
      { name: "Infrastructure", rating: 4 },
      { name: "Campus", rating: 4 },
    ],
    placementsText:
      "Many companies are coming for placement process like Apple, Microsoft, IBM, Wipro, etc. INR 7 lakh per annum is the average package and 100 % placement is there.",
    entranceText: "You have to score 75% in PLM & above 300 ran",
    hasEntrance: true,
  },
  {
    id: 2,
    name: "Kunal Ahirwar",
    batch: "Batch 2019",
    course: "B.Tech [Bachelor of technology]",
    rating: 4.3,
    date: "Reviewed on Apr 22, 2018",
    categoryRatings: [
      { name: "Placements", rating: 5 },
      { name: "Fees", rating: 4.5 },
      { name: "Academics", rating: 5 },
      { name: "Infrastructure", rating: 5 },
      { name: "Campus", rating: 5 },
    ],
    placementsText:
      "I have gotten multiple internships through the institute and all of them have paid well. All kinds of companies from tech startups to global financial giants come to the institute. The average salary is around INR 10lpa and highest often go",
    hasEntrance: false,
  },
  {
    id: 3,
    name: "Nikhil Palakurthi",
    batch: "Batch 2021",
    course: "Btech Mechanical Engineering",
    rating: 3.3,
    date: "Reviewed on Feb 14, 2019",
    categoryRatings: [{ name: "Placements", rating: 4.5 }],
    placementsText:
      "I am a second-year student and haven't done any internships. This year IIT Madras placements are the no placements in India and their many key companies in IT as well as course-related companies. Some of the key companies in IT are Apple,",
    hasEntrance: false,
  },
  {
    id: 4,
    name: "Moukeeran Selvam",
    batch: "Batch 2019",
    course: "B.Tech [Bachelor of Technology]",
    rating: 4.3,
    date: "Reviewed on Feb 14, 2018",
    categoryRatings: [
      { name: "Placements", rating: 4 },
      { name: "Fees", rating: 4 },
      { name: "Campus", rating: 4.5 },
    ],
    placementsText:
      "I interned at Saint Gobain at their research park. Spend was 15000 per month. For it department, even Facebook and Google hire. For us, average salary is about 9 lakh per annum. The senior I know got 14 lakh at Itoveyo.",
    hasFees: true,
    hasEntrance: false,
  },
  {
    id: 5,
    name: "Arvind Narayanan",
    batch: "Batch 2016",
    course: "Btech Mechanical Engineering",
    rating: 1.9,
    date: "Reviewed on Jan 17, 2018",
    categoryRatings: [
      { name: "Fees", rating: 3.5 },
      { name: "Academics", rating: 4.5 },
      { name: "Infrastructure", rating: 4.5 },
      { name: "Campus", rating: 4.5 },
    ],
    placementsText:
      "I interned with Cadbury India Pvt. Ltd. Companies from FMCG, Finance, Consulting, IT and startups generally hire from IIT Chennai. The average salary would be approx INR 10 lakhs per annum with the highest package going to 63 graduation get",
    hasEntrance: false,
  },
]

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" | "lg" }) {
  const fullStars = Math.floor(rating)
  const hasHalf = rating % 1 >= 0.5
  const sizeClass = size === "lg" ? "text-2xl" : size === "md" ? "text-lg" : "text-xs"

  return (
    <div className={`flex ${sizeClass}`}>
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={
            i < fullStars ? "text-orange-400" : i === fullStars && hasHalf ? "text-orange-400" : "text-gray-300"
          }
        >
          ★
        </span>
      ))}
    </div>
  )
}

function RatingBar({ count, maxCount }: { count: number; maxCount: number }) {
  const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0
  return (
    <div className="flex items-center gap-2">
      <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-orange-400 rounded-full" style={{ width: `${percentage}%` }} />
      </div>
      <span className="text-xs text-gray-600 w-6">{count}</span>
    </div>
  )
}

export function Reviews() {
  const maxCount = Math.max(...starDistribution.map((s) => s.count))

  return (
    <div className="bg-white rounded border border-gray-200 mt-4">
      {/* Header */}
      <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
        <h2 className="font-semibold text-gray-800">IIT Madras Reviews</h2>
      </div>

      {/* Rating Summary */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex gap-6">
          {/* Overall Rating */}
          <div className="flex flex-col items-center pr-6 border-r border-gray-200">
            <span className="text-xs text-gray-600 mb-1">Overall Rating</span>
            <span className="text-4xl font-bold text-gray-800">4.3</span>
            <StarRating rating={4.3} size="md" />
            <div className="flex items-center gap-1 mt-1">
              <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                <Check className="w-2.5 h-2.5 text-white" />
              </div>
              <span className="text-xs text-green-600">Verified</span>
            </div>
          </div>

          {/* Distribution */}
          <div className="pr-6 border-r border-gray-200">
            <span className="text-xs font-semibold text-gray-800 mb-2 block">Distribution of Rating</span>
            <div className="space-y-1">
              {starDistribution.map((item) => (
                <div key={item.stars} className="flex items-center gap-2">
                  <span className="text-xs text-gray-600 w-16">{item.label}</span>
                  <RatingBar count={item.count} maxCount={maxCount} />
                </div>
              ))}
            </div>
          </div>

          {/* Category Ratings */}
          <div className="flex-1">
            <div className="space-y-1">
              {categoryRatings.map((cat) => (
                <div key={cat.name} className="flex items-center justify-between">
                  <span className="text-xs text-gray-600 whitespace-pre-line leading-tight">{cat.name}</span>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-gray-800">{cat.rating}</span>
                    <StarRating rating={cat.rating} size="sm" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="divide-y divide-gray-200">
        {reviews.map((review) => (
          <div key={review.id} className="p-4">
            <div className="flex gap-3">
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold flex-shrink-0">
                {review.name.charAt(0)}
              </div>

              {/* Content */}
              <div className="flex-1">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-sm text-gray-800">{review.name}</span>
                      <span className="text-xs text-orange-500">• {review.batch}</span>
                      <span className="text-xs text-gray-600">• {review.course}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-800">{review.rating}</span>
                      <StarRating rating={review.rating} size="sm" />
                      <span className="text-xs text-gray-500">| {review.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 text-white" />
                    </div>
                    <span className="text-xs text-green-600">Verified</span>
                  </div>
                </div>

                {/* Category Ratings */}
                <div className="flex flex-wrap gap-3 mt-2">
                  {review.categoryRatings.map((cat) => (
                    <div key={cat.name} className="flex items-center gap-1">
                      <span className="text-xs text-orange-500">★</span>
                      <span className="text-xs text-gray-600">{cat.name}</span>
                      <span className="text-xs text-gray-600">•</span>
                      <span className="text-xs text-gray-800">{cat.rating}</span>
                    </div>
                  ))}
                </div>

                {/* Review Text */}
                <div className="mt-3">
                  <p className="text-xs text-gray-700">
                    <span className="font-semibold text-gray-800">Placements & Internships : </span>
                    {review.placementsText}
                  </p>
                  {review.hasEntrance && review.entranceText && (
                    <p className="text-xs text-gray-700 mt-2">
                      <span className="font-semibold text-gray-800">Entrance Exams & Admissions : </span>
                      {review.entranceText}
                    </p>
                  )}
                  {review.hasFees && (
                    <p className="text-xs text-gray-700 mt-2">
                      <span className="font-semibold text-gray-800">Fees & Scholarships : </span>
                    </p>
                  )}
                </div>

                {/* Read More */}
                <button className="text-orange-500 text-xs mt-2 flex items-center gap-1 hover:text-orange-600">
                  Read More <ChevronDown className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Reviews Button */}
      <div className="p-4 flex justify-center">
        <button className="bg-blue-600 text-white px-6 py-2 rounded text-sm hover:bg-blue-700 transition-colors">
          View All Reviews
        </button>
      </div>
    </div>
  )
}
