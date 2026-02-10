import { ChevronRight } from "lucide-react"
import { FaqAccordion } from "./faq-accordion"

interface Section {
    id?: string
    title: string
    content: string
    order: number
}

interface Faq {
    id?: string
    title: string
    question: string
    answer: string
    order: number
}

interface CollegeContentProps {
    sections: Section[]
    faqs: Faq[]
    activeTab?: string
}

export function CollegeContent({ sections, faqs, activeTab = "Info" }: CollegeContentProps) {
    return (
        <div className="space-y-6">
            {/* Dynamic Sections */}
            {sections.length === 0 && activeTab !== "Info" ? (
                <div className="bg-white border border-gray-200 rounded p-6 text-center text-gray-500">
                    No information available for {activeTab}.
                </div>
            ) : (
                sections.map((section, index) => (
                    <div key={section.id || index} className="bg-white border border-gray-200 rounded">
                        <div className="bg-[#f0f0f0] px-4 py-3 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-800">{section.title}</h2>
                        </div>
                        <div className="p-4 prose max-w-none editor-content" dangerouslySetInnerHTML={{ __html: section.content }} />
                    </div>
                ))
            )}

            {/* FAQs (Only rendered if passed, which is controlled by parent) */}
            {faqs.length > 0 && <FaqAccordion faqs={faqs} />}
        </div>
    )
}
