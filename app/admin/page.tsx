import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, BookOpen, FileText, Award, Newspaper, ClipboardList, MessageSquare, BarChart3 } from "lucide-react"
import Link from "next/link"

async function getStats() {
  const [colleges, courses, scholarships, news, exams, testimonials, stats] = await Promise.all([
    prisma.college.count(),
    prisma.course.count(),
    prisma.scholarship.count(),
    prisma.news.count(),
    prisma.exam.count(),
    prisma.testimonial.count(),
    prisma.stat.count(),
  ])

  return {
    colleges,
    courses,
    scholarships,
    news,
    exams,
    testimonials,
    stats,
  }
}

export default async function AdminDashboard() {
  // Temporarily disabled auth check
  // const session = await auth()
  // if (!session) {
  //   redirect("/admin/login")
  // }

  const stats = await getStats()

  const statCards = [
    { label: "Colleges", value: stats.colleges, icon: GraduationCap, href: "/admin/colleges", color: "bg-blue-500" },
    { label: "Courses", value: stats.courses, icon: BookOpen, href: "/admin/courses", color: "bg-green-500" },
    { label: "Scholarships", value: stats.scholarships, icon: Award, href: "/admin/scholarships", color: "bg-yellow-500" },
    { label: "News", value: stats.news, icon: Newspaper, href: "/admin/news", color: "bg-red-500" },
    { label: "Exams", value: stats.exams, icon: ClipboardList, href: "/admin/exams", color: "bg-indigo-500" },
    { label: "Testimonials", value: stats.testimonials, icon: MessageSquare, href: "/admin/testimonials", color: "bg-pink-500" },
    { label: "Stats", value: stats.stats, icon: BarChart3, href: "/admin/stats", color: "bg-orange-500" },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to the admin panel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <Link key={stat.label} href={stat.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {stat.label}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${stat.color} text-white`}>
                    <Icon className="h-4 w-4" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

