import HeroSection from "@/components/hero-section"
import StatsBar from "@/components/stats-bar"
import FeaturesSection from "@/components/features-section"
import DreamSection from "@/components/dream-section"
import FindSection from "@/components/find-section"
import StudyAbroadSection from "@/components/study-abroad-section"
import TrendingExams from "@/components/trending-exams"
import TrendingCourses from "@/components/trending-courses"
import SchoolExams from "@/components/school-exams"
import ArticlesSection from "@/components/articles-section"
import ScholarshipsSection from "@/components/scholarships-section"
import PopularColleges from "@/components/popular-colleges"
import LatestNews from "@/components/latest-news"
import TestimonialsSection from "@/components/testimonials-section"


import { prisma } from "@/lib/prisma"

export default async function Home() {
  const cities = await prisma.city.findMany({
    where: { featured: true },
    orderBy: { createdAt: "asc" }, // Or featured: 'desc' if you add that field later
    take: 6, // Limit to 6 for now to match design, or remove limit
  })

  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <StatsBar />
      <FeaturesSection />
      <DreamSection cities={cities} />
      <FindSection />
      <StudyAbroadSection />
      <TrendingExams />
      <TrendingCourses />
      <SchoolExams />
      <ArticlesSection />
      <ScholarshipsSection />
      <PopularColleges />
      <LatestNews />
      <TestimonialsSection />
    </main>
  )
}
