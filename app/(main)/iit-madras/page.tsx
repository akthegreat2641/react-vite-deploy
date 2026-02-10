import { Header } from "@/iit-madras-website/components/header"
import { AuthorBar } from "@/iit-madras-website/components/author-bar"
import { NavigationTabs } from "@/iit-madras-website/components/navigation-tabs"
import { LatestUpdates } from "@/iit-madras-website/components/latest-updates"
import { Description } from "@/iit-madras-website/components/description"
import { Sidebar } from "@/iit-madras-website/components/sidebar"
import { Highlights } from "@/iit-madras-website/components/highlights"
import { Rankings } from "@/iit-madras-website/components/rankings"
import { CoursesFees } from "@/iit-madras-website/components/courses-fees"
import { CourseFeeStructure } from "@/iit-madras-website/components/course-fee-structure"
import { CoursesOffered } from "@/iit-madras-website/components/courses-offered"
import { JeeCutoff } from "@/iit-madras-website/components/jee-cutoff"
import { ExamsAccepted } from "@/iit-madras-website/components/exams-accepted"
import { Infrastructure } from "@/iit-madras-website/components/infrastructure"
import { FAQs } from "@/iit-madras-website/components/faqs"
import { Reviews } from "@/iit-madras-website/components/reviews"
import { Gallery } from "@/iit-madras-website/components/gallery"
import { ContactDetails } from "@/iit-madras-website/components/contact-details"
import { SimilarColleges } from "@/iit-madras-website/components/similar-colleges"
import { ExploreNearby } from "@/iit-madras-website/components/explore-nearby"
import { RelatedArticles } from "@/iit-madras-website/components/related-articles"
import { RelatedNews } from "@/iit-madras-website/components/related-news"
import { BreadcrumbFooter } from "@/iit-madras-website/components/breadcrumb-footer"

export const metadata = {
  title: "IIT Madras - College Referral Website",
  description: "IIT Madras: Admission 2025, Courses, Fees, Cutoff, Placement, Ranking",
}

export default function IitMadrasPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Header />
      <AuthorBar />
      <NavigationTabs />
      <div className="max-w-[1200px] mx-auto px-4 py-6">
        <div className="flex gap-6">
          <div className="flex-1">
            <LatestUpdates />
            <Description />
            <Highlights />
            <Rankings />
            <CoursesFees />
            <CourseFeeStructure />
            <CoursesOffered />
            <JeeCutoff />
            <ExamsAccepted />
            <Infrastructure />
            <FAQs />
            <Reviews />
            <Gallery />
            <ContactDetails />
            <SimilarColleges />
            <ExploreNearby />
            <RelatedArticles />
            <RelatedNews />
            <BreadcrumbFooter />
          </div>
          <Sidebar />
        </div>
      </div>
    </div>
  )
}


