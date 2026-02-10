import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { ChevronDown, Menu, Search, User } from "lucide-react"
import Link from "next/link"
import { UserAuthButton } from "@/components/user-auth-button"

export default function Header() {
  const navItems = [
    { label: "Top Colleges", href: "/colleges" },
    { label: "Top Courses", href: "/courses" },
    { label: "Entrance Exams", href: "/exams" },
    { label: "Boards", href: "/boards" },
    { label: "Admission Alerts", href: "#" },
    { label: "News", href: "/news" },
    { label: "More", href: "#" }, // More handles its own state
    { label: "International Courses", href: "/coming-soon" },
  ]

  const categories = ["Engineering", "Management", "Medical", "Science", "Commerce", "Go Abroad", "More"]

  return (
    <header className="sticky top-0 z-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-[#0f172a] h-16 px-4 flex items-center justify-between">
        <Sheet>
          <SheetTrigger asChild>
            <button className="text-white">
              <Menu className="w-6 h-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] bg-white p-0">
            <SheetHeader className="p-4 border-b">
              <SheetTitle>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold italic tracking-tight text-[#1e3a5f]">
                    COLLEGE<span className="text-[#2dd4bf]">WEB</span>
                  </span>
                </div>
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col h-full overflow-y-auto pb-4">
              <nav className="flex-1 p-4 space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block text-sm font-medium text-gray-700 hover:text-[#2dd4bf] transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="border-t pt-4 space-y-3">
                  <Button className="w-full bg-[#1e3a5f] hover:bg-[#152a45]">
                    Write a review
                  </Button>
                  <UserAuthButton mobile />
                </div>
              </nav>
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex items-center gap-4">
          <button className="text-white">
            <Search className="w-6 h-6" />
          </button>
          <button className="text-white">
            <User className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Desktop Header Top Bar */}
      <div className="hidden lg:block bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            {/* Navigation - centered */}
            <nav className="hidden lg:flex items-center gap-6">
              {navItems.map((item) => (
                item.label === "More" ? (
                  <DropdownMenu key={item.label}>
                    <DropdownMenuTrigger className="flex items-center gap-1 text-sm text-gray-700 hover:text-emerald-600 transition-colors font-medium outline-none">
                      {item.label} <ChevronDown className="w-4 h-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white">
                      <DropdownMenuItem>
                        <Link href="/articles" className="w-full">Articles</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href="/scholarships" className="w-full">Scholarships</Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-sm text-gray-700 hover:text-emerald-600 transition-colors font-medium"
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </nav>

            {/* Right side buttons */}
            <div className="flex items-center gap-3">
              <Button size="sm" className="bg-[#1e3a5f] hover:bg-[#152a45] text-white text-sm h-9 px-4 rounded">
                Write a review
              </Button>
              <UserAuthButton />
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:block bg-[#2dd4bf]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-end h-10 gap-8">
            {categories.map((category) => (
              category === "Engineering" ? (
                <DropdownMenu key={category}>
                  <DropdownMenuTrigger className="flex items-center gap-1 text-sm text-white hover:text-white/80 transition-colors font-medium outline-none">
                    {category} <ChevronDown className="w-3 h-3" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[1100px] p-6 bg-white mt-2 shadow-xl rounded-lg border-t-2 border-red-500">
                    <div className="grid grid-cols-5 gap-6">
                      {/* Column 1 */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-bold text-gray-800 mb-3 text-xs uppercase">Colleges By Course</h3>
                          <ul className="space-y-1.5 text-sm text-gray-500">
                            <li><Link href="/colleges?course=B.Tech" className="hover:text-blue-600">B.Tech Colleges</Link></li>
                            <li><Link href="/colleges?course=M.Tech" className="hover:text-blue-600">M.Tech Colleges</Link></li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800 mb-3 text-xs uppercase">Popular Colleges</h3>
                          <ul className="space-y-1.5 text-sm text-gray-500">
                            <li><Link href="/iit-kharagpur" className="hover:text-blue-600">IIT Kharagpur</Link></li>
                            <li><Link href="/bms-college-of-engineering" className="hover:text-blue-600">BMS College of Engineering</Link></li>
                            <li><Link href="/iit-delhi" className="hover:text-blue-600">IIT Delhi</Link></li>
                          </ul>
                        </div>
                      </div>

                      {/* Column 2 */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-bold text-gray-800 mb-3 text-xs uppercase">Colleges By State</h3>
                          <ul className="space-y-1.5 text-sm text-gray-500">
                            <li><Link href="/colleges?state=Maharashtra" className="hover:text-blue-600">Maharashtra</Link></li>
                            <li><Link href="/colleges?state=Delhi" className="hover:text-blue-600">Delhi</Link></li>
                            <li><Link href="/colleges?state=Uttar Pradesh" className="hover:text-blue-600">Uttar Pradesh</Link></li>
                            <li><Link href="/colleges?state=Tamil Nadu" className="hover:text-blue-600">Tamil Nadu</Link></li>
                            <li><Link href="/colleges?state=Rajasthan" className="hover:text-blue-600">Rajasthan</Link></li>
                            <li><Link href="/colleges?state=Andhra Pradesh" className="hover:text-blue-600">Andhra Pradesh</Link></li>
                          </ul>
                        </div>
                      </div>

                      {/* Column 3 */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-bold text-gray-800 mb-3 text-xs uppercase">Colleges By City</h3>
                          <ul className="space-y-1.5 text-sm text-gray-500">
                            <li><Link href="/colleges?city=Noida" className="hover:text-blue-600">Noida</Link></li>
                            <li><Link href="/colleges?city=Mumbai" className="hover:text-blue-600">Mumbai</Link></li>
                            <li><Link href="/colleges?city=Bangalore" className="hover:text-blue-600">Bangalore</Link></li>
                            <li><Link href="/colleges?city=Chennai" className="hover:text-blue-600">Chennai</Link></li>
                            <li><Link href="/colleges?city=Pune" className="hover:text-blue-600">Pune</Link></li>
                            <li><Link href="/colleges?city=Hyderabad" className="hover:text-blue-600">Hyderabad</Link></li>
                          </ul>
                        </div>
                      </div>



                      {/* Column 4: Exams */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-bold text-gray-800 mb-3 text-xs uppercase">Exams</h3>
                          <ul className="space-y-1.5 text-sm text-gray-500">
                            <li><Link href="/exams/jee-main" className="hover:text-blue-600">JEE Main</Link></li>
                            <li><Link href="/exams/jee-advanced" className="hover:text-blue-600">JEE Advanced</Link></li>
                            <li><Link href="/exams/upeseat" className="hover:text-blue-600">UPESEAT</Link></li>
                            <li><Link href="/exams/wbjee" className="hover:text-blue-600">WBJEE</Link></li>
                            <li><Link href="/exams/oucet" className="hover:text-blue-600">OUCET</Link></li>
                            <li><Link href="/exams/ap-eamcet" className="hover:text-blue-600">AP EAMCET</Link></li>
                            <li><Link href="/exams/lpunest" className="hover:text-blue-600">LPUNEST</Link></li>
                            <li><Link href="/exams" className="hover:text-blue-600 font-semibold text-blue-500 mt-2 block">All Engineering Exams &gt;&gt;</Link></li>
                          </ul>
                        </div>
                      </div>

                      {/* Column 5: Courses */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-bold text-gray-800 mb-3 text-xs uppercase">Courses</h3>
                          <ul className="space-y-1.5 text-sm text-gray-500">
                            <li><Link href="/courses/btech" className="hover:text-blue-600">B.Tech</Link></li>
                            <li><Link href="/courses/mtech" className="hover:text-blue-600">M.Tech</Link></li>
                            <li><Link href="/courses/be" className="hover:text-blue-600">B.E</Link></li>
                            <li><Link href="/courses/me" className="hover:text-blue-600">M.E</Link></li>
                          </ul>
                        </div>
                      </div>

                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : category === "Management" ? (
                <DropdownMenu key={category}>
                  <DropdownMenuTrigger className="flex items-center gap-1 text-sm text-white hover:text-white/80 transition-colors font-medium outline-none">
                    {category} <ChevronDown className="w-3 h-3" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[1100px] p-6 bg-white mt-2 shadow-xl rounded-lg border-t-2 border-red-500">
                    <div className="grid grid-cols-5 gap-6">
                      {/* Column 1 */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-bold text-gray-800 mb-3 text-xs uppercase">Colleges By Course</h3>
                          <ul className="space-y-1.5 text-sm text-gray-500">
                            <li><Link href="/colleges?course=MBA" className="hover:text-blue-600">MBA Colleges</Link></li>
                            <li><Link href="/colleges?course=BBA" className="hover:text-blue-600">BBA Colleges</Link></li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800 mb-3 text-xs uppercase">Popular Colleges</h3>
                          <ul className="space-y-1.5 text-sm text-gray-500">
                            <li><Link href="/iim-ahmedabad" className="hover:text-blue-600">IIM Ahmedabad</Link></li>
                            <li><Link href="/iim-bangalore" className="hover:text-blue-600">IIM Bangalore</Link></li>
                            <li><Link href="/iim-calcutta" className="hover:text-blue-600">IIM Calcutta</Link></li>
                          </ul>
                        </div>
                      </div>

                      {/* Column 2 */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-bold text-gray-800 mb-3 text-xs uppercase">Colleges By State</h3>
                          <ul className="space-y-1.5 text-sm text-gray-500">
                            <li><Link href="/colleges?state=Maharashtra" className="hover:text-blue-600">Maharashtra</Link></li>
                            <li><Link href="/colleges?state=Delhi" className="hover:text-blue-600">Delhi</Link></li>
                            <li><Link href="/colleges?state=Uttar Pradesh" className="hover:text-blue-600">Uttar Pradesh</Link></li>
                            <li><Link href="/colleges?state=Tamil Nadu" className="hover:text-blue-600">Tamil Nadu</Link></li>
                            <li><Link href="/colleges?state=Rajasthan" className="hover:text-blue-600">Rajasthan</Link></li>
                            <li><Link href="/colleges?state=Andhra Pradesh" className="hover:text-blue-600">Andhra Pradesh</Link></li>
                          </ul>
                        </div>
                      </div>

                      {/* Column 3 */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-bold text-gray-800 mb-3 text-xs uppercase">Colleges By City</h3>
                          <ul className="space-y-1.5 text-sm text-gray-500">
                            <li><Link href="/colleges?city=Noida" className="hover:text-blue-600">Noida</Link></li>
                            <li><Link href="/colleges?city=Mumbai" className="hover:text-blue-600">Mumbai</Link></li>
                            <li><Link href="/colleges?city=Bangalore" className="hover:text-blue-600">Bangalore</Link></li>
                            <li><Link href="/colleges?city=Chennai" className="hover:text-blue-600">Chennai</Link></li>
                            <li><Link href="/colleges?city=Pune" className="hover:text-blue-600">Pune</Link></li>
                            <li><Link href="/colleges?city=Hyderabad" className="hover:text-blue-600">Hyderabad</Link></li>
                          </ul>
                        </div>
                      </div>

                      {/* Column 4: Exams */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-bold text-gray-800 mb-3 text-xs uppercase">Exams</h3>
                          <ul className="space-y-1.5 text-sm text-gray-500">
                            <li><Link href="/exams/cat" className="hover:text-blue-600">CAT</Link></li>
                            <li><Link href="/exams/mat" className="hover:text-blue-600">MAT</Link></li>
                            <li><Link href="/exams/xat" className="hover:text-blue-600">XAT</Link></li>
                            <li><Link href="/exams/cmat" className="hover:text-blue-600">CMAT</Link></li>
                            <li><Link href="/exams/snap" className="hover:text-blue-600">SNAP</Link></li>
                            <li><Link href="/exams/nmat" className="hover:text-blue-600">NMAT</Link></li>
                            <li><Link href="/exams" className="hover:text-blue-600 font-semibold text-blue-500 mt-2 block">All Management Exams &gt;&gt;</Link></li>
                          </ul>
                        </div>
                      </div>

                      {/* Column 5: Courses */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-bold text-gray-800 mb-3 text-xs uppercase">Courses</h3>
                          <ul className="space-y-1.5 text-sm text-gray-500">
                            <li><Link href="/courses/mba" className="hover:text-blue-600">MBA</Link></li>
                            <li><Link href="/courses/bba" className="hover:text-blue-600">BBA</Link></li>
                            <li><Link href="/courses/pgdm" className="hover:text-blue-600">PGDM</Link></li>
                            <li><Link href="/courses/bms" className="hover:text-blue-600">BMS</Link></li>
                          </ul>
                        </div>
                      </div>

                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : category === "Medical" ? (
                <DropdownMenu key={category}>
                  <DropdownMenuTrigger className="flex items-center gap-1 text-sm text-white hover:text-white/80 transition-colors font-medium outline-none">
                    {category} <ChevronDown className="w-3 h-3" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[1200px] p-6 bg-white mt-2 shadow-xl rounded-lg border-t-2 border-red-500">
                    <div className="grid grid-cols-6 gap-6">
                      {/* Column 1: Colleges By Course */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-bold text-gray-800 mb-3 text-xs uppercase">Colleges By Course</h3>
                          <ul className="space-y-1.5 text-sm text-gray-500">
                            <li><Link href="/colleges?course=MBBS" className="hover:text-blue-600">MBBS Colleges</Link></li>
                            <li><Link href="/colleges?course=MS" className="hover:text-blue-600">MS Colleges</Link></li>
                            <li><Link href="/colleges?course=BAMS" className="hover:text-blue-600">BAMS Colleges</Link></li>
                            <li><Link href="/colleges?course=BPT" className="hover:text-blue-600">BPT Colleges</Link></li>
                            <li><Link href="/colleges?course=MFSc" className="hover:text-blue-600">M.F.Sc Colleges</Link></li>
                          </ul>
                        </div>
                      </div>

                      {/* Column 2: Colleges By State */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-bold text-gray-800 mb-3 text-xs uppercase">Colleges By State</h3>
                          <ul className="space-y-1.5 text-sm text-gray-500">
                            <li><Link href="/colleges?state=Maharashtra" className="hover:text-blue-600">Maharashtra</Link></li>
                            <li><Link href="/colleges?state=Delhi" className="hover:text-blue-600">Delhi</Link></li>
                            <li><Link href="/colleges?state=Uttar Pradesh" className="hover:text-blue-600">Uttar Pradesh</Link></li>
                            <li><Link href="/colleges?state=Tamil Nadu" className="hover:text-blue-600">Tamil Nadu</Link></li>
                            <li><Link href="/colleges?state=Rajasthan" className="hover:text-blue-600">Rajasthan</Link></li>
                            <li><Link href="/colleges?state=Andhra Pradesh" className="hover:text-blue-600">Andhra Pradesh</Link></li>
                          </ul>
                        </div>
                      </div>

                      {/* Column 3: Colleges By City */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-bold text-gray-800 mb-3 text-xs uppercase">Colleges By City</h3>
                          <ul className="space-y-1.5 text-sm text-gray-500">
                            <li><Link href="/colleges?city=Noida" className="hover:text-blue-600">Noida</Link></li>
                            <li><Link href="/colleges?city=Mumbai" className="hover:text-blue-600">Mumbai</Link></li>
                            <li><Link href="/colleges?city=Bangalore" className="hover:text-blue-600">Bangalore</Link></li>
                            <li><Link href="/colleges?city=Chennai" className="hover:text-blue-600">Chennai</Link></li>
                            <li><Link href="/colleges?city=Pune" className="hover:text-blue-600">Pune</Link></li>
                            <li><Link href="/colleges?city=Hyderabad" className="hover:text-blue-600">Hyderabad</Link></li>
                          </ul>
                        </div>
                      </div>

                      {/* Column 4: Exams */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-bold text-gray-800 mb-3 text-xs uppercase">Exams</h3>
                          <ul className="space-y-1.5 text-sm text-gray-500">
                            <li><Link href="/exams/neet" className="hover:text-blue-600">NEET</Link></li>
                            <li><Link href="/exams/neet-pg" className="hover:text-blue-600">NEET PG</Link></li>
                            <li><Link href="/exams/neet-mds" className="hover:text-blue-600">NEET MDS</Link></li>
                            <li><Link href="/exams/aiims-mbbs" className="hover:text-blue-600">AIIMS MBBS</Link></li>
                            <li><Link href="/exams/aiims-pg" className="hover:text-blue-600">AIIMS PG</Link></li>
                            <li><Link href="/exams" className="hover:text-blue-600 font-semibold text-blue-500 mt-2 block">All Medical Exams &gt;&gt;</Link></li>
                          </ul>
                        </div>
                      </div>

                      {/* Column 5: Popular Colleges */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-bold text-gray-800 mb-3 text-xs uppercase">Popular Colleges</h3>
                          <ul className="space-y-1.5 text-sm text-gray-500">
                            <li><Link href="/aiims-delhi" className="hover:text-blue-600">AIIMS, New Delhi</Link></li>
                            <li><Link href="/kasturba-medical-college" className="hover:text-blue-600">Kasturba Medical College, Mangalore</Link></li>
                            <li><Link href="/aligarh-muslim-university" className="hover:text-blue-600">Aligarh Muslim University, UP</Link></li>
                          </ul>
                        </div>
                      </div>

                      {/* Column 6: Courses */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-bold text-gray-800 mb-3 text-xs uppercase">Courses</h3>
                          <ul className="space-y-1.5 text-sm text-gray-500">
                            <li><Link href="/courses/mbbs" className="hover:text-blue-600">MBBS</Link></li>
                            <li><Link href="/courses/ms" className="hover:text-blue-600">MS</Link></li>
                            <li><Link href="/courses/md" className="hover:text-blue-600">MD</Link></li>
                            <li><Link href="/courses/bams" className="hover:text-blue-600">BAMS</Link></li>
                            <li><Link href="/courses/bpt" className="hover:text-blue-600">BPT</Link></li>
                            <li><Link href="/courses/mpt" className="hover:text-blue-600">MPT</Link></li>
                          </ul>
                        </div>
                      </div>

                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : category === "Science" ? (
                <DropdownMenu key={category}>
                  <DropdownMenuTrigger className="flex items-center gap-1 text-sm text-white hover:text-white/80 transition-colors font-medium outline-none">
                    {category} <ChevronDown className="w-3 h-3" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[1200px] p-6 bg-white mt-2 shadow-xl rounded-lg border-t-2 border-red-500">
                    <div className="grid grid-cols-6 gap-6">
                      {/* Column 1: Colleges By Course */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-bold text-gray-800 mb-3 text-xs uppercase">Colleges By Course</h3>
                          <ul className="space-y-1.5 text-sm text-gray-500">
                            <li><Link href="/colleges?course=B.Sc" className="hover:text-blue-600">B.Sc Colleges</Link></li>
                            <li><Link href="/colleges?course=M.Sc" className="hover:text-blue-600">M.Sc Colleges</Link></li>
                            <li><Link href="/colleges?course=B.Sc Hons" className="hover:text-blue-600">B.Sc Hons Colleges</Link></li>
                            <li><Link href="/colleges?course=MPH" className="hover:text-blue-600">MPH Colleges</Link></li>
                            <li><Link href="/colleges?course=B.F.Sc" className="hover:text-blue-600">B.F.Sc Colleges</Link></li>
                            <li><Link href="/colleges?course=M.F.Sc" className="hover:text-blue-600">M.F.Sc Colleges</Link></li>
                          </ul>
                        </div>
                      </div>

                      {/* Column 2: Colleges By State */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-bold text-gray-800 mb-3 text-xs uppercase">Colleges By State</h3>
                          <ul className="space-y-1.5 text-sm text-gray-500">
                            <li><Link href="/colleges?state=Maharashtra" className="hover:text-blue-600">Maharashtra</Link></li>
                            <li><Link href="/colleges?state=Delhi" className="hover:text-blue-600">Delhi</Link></li>
                            <li><Link href="/colleges?state=Uttar Pradesh" className="hover:text-blue-600">Uttar Pradesh</Link></li>
                            <li><Link href="/colleges?state=Tamil Nadu" className="hover:text-blue-600">Tamil Nadu</Link></li>
                            <li><Link href="/colleges?state=Rajasthan" className="hover:text-blue-600">Rajasthan</Link></li>
                            <li><Link href="/colleges?state=Andhra Pradesh" className="hover:text-blue-600">Andhra Pradesh</Link></li>
                          </ul>
                        </div>
                      </div>

                      {/* Column 3: Colleges By City */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-bold text-gray-800 mb-3 text-xs uppercase">Colleges By City</h3>
                          <ul className="space-y-1.5 text-sm text-gray-500">
                            <li><Link href="/colleges?city=Noida" className="hover:text-blue-600">Noida</Link></li>
                            <li><Link href="/colleges?city=Mumbai" className="hover:text-blue-600">Mumbai</Link></li>
                            <li><Link href="/colleges?city=Bangalore" className="hover:text-blue-600">Bangalore</Link></li>
                            <li><Link href="/colleges?city=Chennai" className="hover:text-blue-600">Chennai</Link></li>
                            <li><Link href="/colleges?city=Pune" className="hover:text-blue-600">Pune</Link></li>
                            <li><Link href="/colleges?city=Hyderabad" className="hover:text-blue-600">Hyderabad</Link></li>
                          </ul>
                        </div>
                      </div>

                      {/* Column 4: Exams */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-bold text-gray-800 mb-3 text-xs uppercase">Exams</h3>
                          <ul className="space-y-1.5 text-sm text-gray-500">
                            <li><Link href="/exams/iit-jam" className="hover:text-blue-600">IIT JAM</Link></li>
                            <li><Link href="/exams/ugc-net" className="hover:text-blue-600">UGC NET</Link></li>
                            <li><Link href="/exams/csir-net" className="hover:text-blue-600">CSIR NET</Link></li>
                            <li><Link href="/exams/mahe-oet" className="hover:text-blue-600">MAHE OET</Link></li>
                            <li><Link href="/exams/kcet" className="hover:text-blue-600">KCET</Link></li>
                            <li><Link href="/exams/bitsat" className="hover:text-blue-600">BITSAT</Link></li>
                            <li><Link href="/exams" className="hover:text-blue-600 font-semibold text-blue-500 mt-2 block">All Science Exams &gt;&gt;</Link></li>
                          </ul>
                        </div>
                      </div>

                      {/* Column 5: Popular Colleges */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-bold text-gray-800 mb-3 text-xs uppercase">Popular Colleges</h3>
                          <ul className="space-y-1.5 text-sm text-gray-500">
                            <li><Link href="/mit-manipal" className="hover:text-blue-600">MIT, Manipal</Link></li>
                            <li><Link href="/loyola-college" className="hover:text-blue-600">Loyola College, Chennai</Link></li>
                            <li><Link href="/madras-christian-college" className="hover:text-blue-600">Madras Christian College</Link></li>
                          </ul>
                        </div>
                      </div>

                      {/* Column 6: Courses */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-bold text-gray-800 mb-3 text-xs uppercase">Courses</h3>
                          <ul className="space-y-1.5 text-sm text-gray-500">
                            <li><Link href="/courses/bsc-physics" className="hover:text-blue-600">B.Sc Physics</Link></li>
                            <li><Link href="/courses/bsc-chemistry" className="hover:text-blue-600">B.Sc Chemistry</Link></li>
                            <li><Link href="/courses/bsc-mathematics" className="hover:text-blue-600">B.Sc Mathematics</Link></li>
                            <li><Link href="/courses/msc-physics" className="hover:text-blue-600">M.Sc Physics</Link></li>
                            <li><Link href="/courses/msc-chemistry" className="hover:text-blue-600">M.Sc Chemistry</Link></li>
                            <li><Link href="/courses/msc-mathematics" className="hover:text-blue-600">M.Sc Mathematics</Link></li>
                          </ul>
                        </div>
                      </div>

                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : category === "Commerce" ? (
                <DropdownMenu key={category}>
                  <DropdownMenuTrigger className="flex items-center gap-1 text-sm text-white hover:text-white/80 transition-colors font-medium outline-none">
                    {category} <ChevronDown className="w-3 h-3" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[1200px] p-6 bg-white mt-2 shadow-xl rounded-lg border-t-2 border-red-500">
                    <div className="grid grid-cols-6 gap-6">
                      {/* Column 1: Colleges By Course */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-bold text-gray-800 mb-3 text-xs uppercase">Colleges By Course</h3>
                          <ul className="space-y-1.5 text-sm text-gray-500">
                            <li><Link href="/colleges?course=B.Com" className="hover:text-blue-600">B.Com Colleges</Link></li>
                            <li><Link href="/colleges?course=M.Com" className="hover:text-blue-600">M.Com Colleges</Link></li>
                            <li><Link href="/colleges?course=B.Com Hons" className="hover:text-blue-600">B.Com Hons Colleges</Link></li>
                            <li><Link href="/colleges?course=MFC" className="hover:text-blue-600">MFC Colleges</Link></li>
                          </ul>
                        </div>
                      </div>

                      {/* Column 2: Colleges By State */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-bold text-gray-800 mb-3 text-xs uppercase">Colleges By State</h3>
                          <ul className="space-y-1.5 text-sm text-gray-500">
                            <li><Link href="/colleges?state=Maharashtra" className="hover:text-blue-600">Maharashtra</Link></li>
                            <li><Link href="/colleges?state=Delhi" className="hover:text-blue-600">Delhi</Link></li>
                            <li><Link href="/colleges?state=Uttar Pradesh" className="hover:text-blue-600">Uttar Pradesh</Link></li>
                            <li><Link href="/colleges?state=Tamil Nadu" className="hover:text-blue-600">Tamil Nadu</Link></li>
                            <li><Link href="/colleges?state=Rajasthan" className="hover:text-blue-600">Rajasthan</Link></li>
                            <li><Link href="/colleges?state=Andhra Pradesh" className="hover:text-blue-600">Andhra Pradesh</Link></li>
                          </ul>
                        </div>
                      </div>

                      {/* Column 3: Colleges By City */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-bold text-gray-800 mb-3 text-xs uppercase">Colleges By City</h3>
                          <ul className="space-y-1.5 text-sm text-gray-500">
                            <li><Link href="/colleges?city=Noida" className="hover:text-blue-600">Noida</Link></li>
                            <li><Link href="/colleges?city=Mumbai" className="hover:text-blue-600">Mumbai</Link></li>
                            <li><Link href="/colleges?city=Bangalore" className="hover:text-blue-600">Bangalore</Link></li>
                            <li><Link href="/colleges?city=Chennai" className="hover:text-blue-600">Chennai</Link></li>
                            <li><Link href="/colleges?city=Pune" className="hover:text-blue-600">Pune</Link></li>
                            <li><Link href="/colleges?city=Hyderabad" className="hover:text-blue-600">Hyderabad</Link></li>
                          </ul>
                        </div>
                      </div>

                      {/* Column 4: Exams */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-bold text-gray-800 mb-3 text-xs uppercase">Exams</h3>
                          <ul className="space-y-1.5 text-sm text-gray-500">
                            <li><Link href="/exams/ca-foundation" className="hover:text-blue-600">CA Foundation</Link></li>
                            <li><Link href="/exams/oucet" className="hover:text-blue-600">OUCET</Link></li>
                            <li><Link href="/exams/ipucet" className="hover:text-blue-600">IPUCET</Link></li>
                            <li><Link href="/exams/dsat" className="hover:text-blue-600">DSAT</Link></li>
                            <li><Link href="/exams/muoet" className="hover:text-blue-600">MUOET</Link></li>
                            <li><Link href="/exams/jet" className="hover:text-blue-600">JET</Link></li>
                            <li><Link href="/exams" className="hover:text-blue-600 font-semibold text-blue-500 mt-2 block">All Commerce Exams &gt;&gt;</Link></li>
                          </ul>
                        </div>
                      </div>

                      {/* Column 5: Popular Colleges */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-bold text-gray-800 mb-3 text-xs uppercase">Popular Colleges</h3>
                          <ul className="space-y-1.5 text-sm text-gray-500">
                            <li><Link href="/christ-university" className="hover:text-blue-600">Christ University Bangalore</Link></li>
                            <li><Link href="/jain-university" className="hover:text-blue-600">Jain University, Bangalore</Link></li>
                            <li><Link href="/sri-guru-gobind-singh" className="hover:text-blue-600">Sri Guru Gobind Singh College of Commerce, Delhi</Link></li>
                          </ul>
                        </div>
                      </div>

                      {/* Column 6: Courses */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-bold text-gray-800 mb-3 text-xs uppercase">Courses</h3>
                          <ul className="space-y-1.5 text-sm text-gray-500">
                            <li><Link href="/courses/bcom" className="hover:text-blue-600">B.Com</Link></li>
                            <li><Link href="/courses/mcom" className="hover:text-blue-600">M.Com</Link></li>
                            <li><Link href="/courses/mfc" className="hover:text-blue-600">MFC</Link></li>
                            <li><Link href="/courses/bcom-hons" className="hover:text-blue-600">B.Com Hons</Link></li>
                            <li><Link href="/courses/distance-bcom" className="hover:text-blue-600">Distance B.Com</Link></li>
                          </ul>
                        </div>
                      </div>

                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : category === "Go Abroad" ? (
                <DropdownMenu key={category}>
                  <DropdownMenuTrigger className="flex items-center gap-1 text-sm text-white hover:text-white/80 transition-colors font-medium outline-none">
                    {category} <ChevronDown className="w-3 h-3" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48 p-2 bg-white mt-2 shadow-xl rounded-lg border-t-2 border-red-500">
                    <DropdownMenuItem>
                      <Link href="/coming-soon" className="w-full hover:text-blue-600">Coming Soon</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <button key={category} className="text-sm text-white hover:text-white/80 transition-colors font-medium">
                  {category}
                </button>
              )
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
