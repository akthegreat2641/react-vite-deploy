import { ChevronRight } from "lucide-react"
import { prisma } from "@/lib/prisma"

export async function FAQs() {
  // Load FAQs from CollegePage for IIT Madras, if configured
  const collegePage = await prisma.collegePage.findFirst({
    where: { slug: "iit-madras" },
    include: {
      faqs: {
        orderBy: { order: "asc" },
      },
    },
  })

  const faqs =
    collegePage?.faqs && collegePage.faqs.length > 0
      ? collegePage.faqs
      : null

  const title =
    faqs && faqs.length > 0
      ? faqs[0].title || "FAQs on IIT Madras"
      : "FAQs on IIT Madras"

  return (
    <div className="bg-white border border-gray-200 rounded mt-4">
      {/* Header */}
      <div className="bg-[#f0f0f0] px-4 py-3 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      </div>

      {/* FAQ List */}
      <div className="divide-y divide-gray-200">
        {faqs && faqs.length > 0 ? (
          faqs.map((faq, index) => (
            <div
              key={faq.id ?? index}
              className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer"
            >
              <p className="text-sm text-gray-700">
                <span className="text-[#e65100] font-medium">Q:</span>{" "}
                {faq.question}
              </p>
              <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
            </div>
          ))
        ) : (
          // Fallback to simple static list if no FAQs configured yet
          <>
            {[
              "Why is IIT Madras so famous?",
              "Why is IIT Madras No. 1?",
              "Can I go to IIT Madras without JEE?",
              "Is IIT Madras expensive?",
            ].map((question, index) => (
              <div
                key={index}
                className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer"
              >
                <p className="text-sm text-gray-700">
                  <span className="text-[#e65100] font-medium">Q:</span>{" "}
                  {question}
                </p>
                <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}
