import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="bg-white min-h-[auto] lg:min-h-[500px] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="pt-10 lg:pt-20 pb-8">
            {/* Graduation cap icon - line drawing style */}
            <div className="mb-6">
              <svg width="80" height="50" viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M40 5L5 20L40 35L75 20L40 5Z" stroke="#1e3a5f" strokeWidth="2" fill="none" />
                <path d="M15 25V40L40 50L65 40V25" stroke="#1e3a5f" strokeWidth="2" fill="none" />
                <path d="M70 20V35" stroke="#1e3a5f" strokeWidth="2" />
                <circle cx="70" cy="38" r="3" stroke="#1e3a5f" strokeWidth="2" fill="none" />
              </svg>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1e3a5f] leading-tight mb-6">
              Transforming Dreams
              <br />
              into <span className="text-[#2dd4bf]">Degrees</span>
            </h1>

            <p className="text-gray-600 text-base mb-8 max-w-lg leading-relaxed">
              With personalized advice and insights, we're not just helping students choose a college, we're helping
              them craft their future.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link href="/colleges">
                <Button className="bg-[#1e3a5f] hover:bg-[#152a45] text-white px-8 py-6 h-12 text-base font-medium rounded w-full sm:w-auto">
                  Find Your College
                </Button>
              </Link>
              <Button
                variant="outline"
                className="border-[#2dd4bf] text-[#2dd4bf] hover:bg-[#2dd4bf]/10 bg-white px-8 py-6 h-12 text-base font-medium rounded w-full sm:w-auto"
              >
                Get Job Ready
              </Button>
            </div>
          </div>

          <div className="relative lg:absolute lg:right-0 lg:top-0 lg:w-1/2 lg:h-full">
            <img
              src="/indian-college-students-in-classroom-woman-standin.jpg"
              alt="College students in classroom"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
