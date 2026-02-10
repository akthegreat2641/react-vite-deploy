import { Header } from "@/components/header"
import { AuthorBar } from "@/components/author-bar"
import { NavigationTabs } from "@/components/navigation-tabs"
import { LatestUpdates } from "@/components/latest-updates"
import { Description } from "@/components/description"
import { Sidebar } from "@/components/sidebar"
import { Highlights } from "@/components/highlights"
import { Rankings } from "@/components/rankings"
import { CoursesFees } from "@/components/courses-fees"
import { CourseFeeStructure } from "@/components/course-fee-structure"
import { CoursesOffered } from "@/components/courses-offered"
import { JeeCutoff } from "@/components/jee-cutoff"
import { ExamsAccepted } from "@/components/exams-accepted"
import { Infrastructure } from "@/components/infrastructure"
import { FAQs } from "@/components/faqs"
import { Reviews } from "@/components/reviews"
import { Gallery } from "@/components/gallery"
import { ContactDetails } from "@/components/contact-details"
import { SimilarColleges } from "@/components/similar-colleges"
import { ExploreNearby } from "@/components/explore-nearby"
import { RelatedArticles } from "@/components/related-articles"
import { RelatedNews } from "@/components/related-news"
import { BreadcrumbFooter } from "@/components/breadcrumb-footer"

export default function Home() {
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
