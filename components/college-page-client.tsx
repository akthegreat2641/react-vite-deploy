"use client"

import { useState } from "react"
import { CollegeContent } from "@/components/college-content"
import { AdSenseBanner } from "@/components/adsense-banner"
import { NavigationTabs } from "@/iit-madras-website/components/navigation-tabs"
import { Sidebar } from "@/iit-madras-website/components/sidebar"
import { BreadcrumbFooter } from "@/iit-madras-website/components/breadcrumb-footer"

import { ArticleSidebar } from "@/components/article-sidebar"

import { BoardSidebar } from "@/components/board-sidebar"

import { CourseSidebar } from "@/components/course-sidebar"

import { OlympiadSidebar } from "@/components/olympiad-sidebar"

import { CareerSidebar } from "@/components/career-sidebar"

import { CollegeSidebar } from "@/components/college-sidebar"

import { ExamSidebar } from "@/components/exam-sidebar"

import { NewsSidebar } from "@/components/news-sidebar"

import { ScholarshipSidebar } from "@/components/scholarship-sidebar"

interface Section {
    id?: string
    title: string
    content: string
    order: number
    type?: string
}

interface Faq {
    id?: string
    title: string
    question: string
    answer: string
    order: number
}

interface CollegePageClientProps {
    college: {
        name: string
        location: string
    }
    slug: string
    sections: Section[]
    faqs: Faq[]
    category?: string
    featuredArticles?: any[]
    popularArticles?: any[]
    trendingNews?: any[]
    boardPages?: any[]
}

const TAB_TO_TYPE: Record<string, string> = {
    "Info": "INFO",
    "Cut Off": "CUTOFF",
    "Courses & Fees": "COURSES",
    "Admission": "ADMISSION",
    "Reviews": "REVIEWS",
    "Placements": "PLACEMENTS",
    "Result": "RESULT",
    "Infrastructure": "INFRASTRUCTURE",
    "Gallery": "GALLERY",
    "Scholarship": "SCHOLARSHIP",
    "Ranking": "RANKING",
}

export function CollegePageClient({
    college,
    slug,
    sections,
    faqs,
    category,
    featuredArticles = [],
    popularArticles = [],
    trendingNews = [],
    boardPages = [],
}: CollegePageClientProps) {
    const [activeTab, setActiveTab] = useState("Info")

    // Generate unique tabs from sections + "Info"
    const sectionTypes = Array.from(new Set(sections.map(s => s.type || "INFO")))
    // Ensure INFO is always first if it exists or even if not (default tab)
    if (!sectionTypes.includes("INFO")) sectionTypes.unshift("INFO")

    // Helper to format ID to Label (e.g., COURSES -> Courses)
    const getTabLabel = (type: string) => {
        if (type === "INFO") return "Info"
        if (type === "CUTOFF") return "Cutoff"
        return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase().replace(/_/g, " ")
    }

    const tabs = sectionTypes.map(getTabLabel)

    // Reverse map to lookup type from label
    const getTypeFromLabel = (label: string) => {
        if (label === "Info") return "INFO"
        if (label === "Cutoff") return "CUTOFF"
        return label.toUpperCase().replace(/ /g, "_")
    }

    const currentType = getTypeFromLabel(activeTab)
    const displaySections = sections.filter(s => (s.type || "INFO") === currentType)

    return (
        <>
            <NavigationTabs activeTab={activeTab} onTabChange={setActiveTab} tabs={tabs} />

            <div className="max-w-[1200px] mx-auto px-4 py-6">
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-1">
                        <AdSenseBanner />
                        <CollegeContent
                            sections={displaySections}
                            faqs={activeTab === "Info" ? faqs : []}
                            activeTab={activeTab}
                        />

                        <BreadcrumbFooter
                            collegeName={college.name}
                            location={college.location}
                            slug={slug}
                            category={category}
                        />
                        <AdSenseBanner />
                    </div>
                    {category === "Article" ? (
                        <div className="w-full lg:w-[320px] flex-shrink-0">
                            <ArticleSidebar featuredArticles={featuredArticles} popularArticles={popularArticles} trendingNews={trendingNews} />
                        </div>
                    ) : category === "Board" ? (
                        <div className="w-full lg:w-[320px] flex-shrink-0">
                            <BoardSidebar boardPages={boardPages} />
                        </div>
                    ) : category === "Course" || category === "Courses" ? (
                        <div className="w-full lg:w-[320px] flex-shrink-0">
                            <CourseSidebar />
                        </div>
                    ) : category === "Olympiad" || category === "Olympiads" ? (
                        <div className="w-full lg:w-[320px] flex-shrink-0">
                            <OlympiadSidebar />
                        </div>
                    ) : category === "Career" || category === "Careers" ? (
                        <div className="w-full lg:w-[320px] flex-shrink-0">
                            <CareerSidebar />
                        </div>
                    ) : category === "College" || category === "Colleges" ? (
                        <div className="w-full lg:w-[320px] flex-shrink-0">
                            <CollegeSidebar />
                        </div>
                    ) : category === "Exam" || category === "Exams" ? (
                        <div className="w-full lg:w-[320px] flex-shrink-0">
                            <ExamSidebar />
                        </div>
                    ) : category === "News" ? (
                        <div className="w-full lg:w-[320px] flex-shrink-0">
                            <NewsSidebar />
                        </div>
                    ) : category === "Scholarship" || category === "Scholarships" ? (
                        <div className="w-full lg:w-[320px] flex-shrink-0">
                            <ScholarshipSidebar />
                        </div>
                    ) : (
                        <div className="w-full lg:w-[320px] flex-shrink-0">
                            <Sidebar />
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
