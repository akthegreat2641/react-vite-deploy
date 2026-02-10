"use client"

import { useState } from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface Faq {
    id?: string
    title: string
    question: string
    answer: string
    order: number
}

interface FaqAccordionProps {
    faqs: Faq[]
}

export function FaqAccordion({ faqs }: FaqAccordionProps) {
    const [openId, setOpenId] = useState<string | number | null>(null)

    const toggle = (id: string | number) => {
        setOpenId(openId === id ? null : id)
    }

    if (faqs.length === 0) return null

    return (
        <div className="bg-white border border-gray-200 rounded mt-4">
            <div className="bg-[#f0f0f0] px-4 py-3 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">
                    {faqs[0].title || "Frequently Asked Questions"}
                </h2>
            </div>
            <div className="divide-y divide-gray-200">
                {faqs.map((faq, index) => {
                    const id = faq.id || index
                    const isOpen = openId === id

                    return (
                        <div
                            key={id}
                            className="flex flex-col px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                            onClick={() => toggle(id)}
                        >
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-700 font-medium">
                                    <span className="text-[#e65100] font-bold mr-2">Q:</span>
                                    {faq.question}
                                </p>
                                <ChevronRight
                                    className={cn(
                                        "w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200",
                                        isOpen && "rotate-90"
                                    )}
                                />
                            </div>
                            <div
                                className={cn(
                                    "grid transition-all duration-200 ease-in-out",
                                    isOpen ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0"
                                )}
                            >
                                <div className="overflow-hidden">
                                    <p className="text-sm text-gray-600 ml-6">{faq.answer}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
