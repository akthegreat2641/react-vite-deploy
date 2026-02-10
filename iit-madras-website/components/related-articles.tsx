import Image from "next/image"

const articles = [
  {
    title: "CAT Cutoff for IIM for OBC 2025: Types, Factors, IIM wise Cutoff",
    author: "Paras Attri",
    image: "/cat-cutoff-iim-obc-2025-orange-text-graphic.jpg",
  },
  {
    title: "JEE Advanced 2025 Category-Wise Rank Comparison OBC Vs General",
    author: "Thasleem Mohideen",
    image: "/obc-rank-vs-general-rank-jee-advanced-comparison-c.jpg",
  },
  {
    title: "Is IIT JAM Tougher Than GATE or CSIR NET?",
    author: "Pallavi Pradeep Purbey",
    image: "/iit-jam-vs-gate-comparison-exam-difficulty.jpg",
  },
  {
    title: "IISER Admission Through JEE Advanced 2025",
    author: "Ashna Priyadarshi",
    image: "/iiser-admission-jee-advanced-2025-green-background.jpg",
  },
]

export function RelatedArticles() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 mt-4 overflow-hidden">
      <div className="bg-[#1a237e] px-4 py-3">
        <h2 className="text-white font-semibold">Related Articles</h2>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-4 gap-4">
          {articles.map((article, index) => (
            <div key={index} className="cursor-pointer group">
              <div className="relative h-[100px] rounded-lg overflow-hidden border border-gray-200">
                <Image
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="mt-2">
                <h3 className="text-sm font-medium text-gray-800 line-clamp-2 group-hover:text-blue-600">
                  {article.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1">{article.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
