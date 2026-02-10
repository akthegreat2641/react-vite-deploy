"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { useEffect, useState } from "react"
import {
  LayoutDashboard,
  GraduationCap,
  BookOpen,
  FileText,
  Award,
  Newspaper,
  ClipboardList,
  MessageSquare,
  BarChart3,
  LogOut,
  Menu,
  X,
  MapPin,
  School,
  Layout,
  Settings,
  Trash2,
  Compass,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner"

const menuItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/pages?category=College", label: "Colleges", icon: GraduationCap },
  { href: "/admin/pages?category=Sub College", label: "Sub College", icon: School },
  { href: "/admin/pages?category=Exams", label: "Exams", icon: Award },
  { href: "/admin/pages?category=Sub Exam", label: "Sub Exam", icon: BookOpen },
  { href: "/admin/pages?category=Article", label: "Articles", icon: FileText },
  { href: "/admin/pages", label: "All Pages", icon: Layout },
  { href: "/admin/cities", label: "Cities", icon: MapPin },
  { href: "/admin/authors", label: "Authors", icon: ClipboardList },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
  { href: "/admin/sitemap", label: "Sitemap", icon: Compass },
  { href: "/admin/stats", label: "Stats", icon: BarChart3 },
  { href: "/admin/footer", label: "Footer", icon: Layout },
  { href: "/admin/ads", label: "Ads Setup", icon: Layout },
  { href: "/admin/users", label: "Users", icon: Users },
]

export default function AdminSidebar() {

  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [categories, setCategories] = useState<any[]>([])
  const [isManageDialogOpen, setIsManageDialogOpen] = useState(false)

  const fetchCategories = () => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCategories(data)
        }
      })
      .catch((err) => console.error(err))
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleDeleteCategory = async (id: string) => {
    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: "DELETE",
      })
      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.details || "Failed to delete")
      }
      toast.success("Category deleted")
      fetchCategories() // Refresh list
    } catch (error: any) {
      console.error(error)
      toast.error(error.message)
    }
  }


  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-screen w-64 bg-white border-r border-gray-200 transition-transform flex flex-col",
          "lg:translate-x-0",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex-1 px-4 py-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-gray-900">Admin Panel</h2>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || (item.href !== "/admin" && pathname?.startsWith(item.href))
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                    isActive
                      ? "bg-gray-900 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}

            {/* Dynamic Categories */}
            {categories.length > 0 && (
              <>
                <div className="mt-4 mb-2 px-4 text-xs font-semibold text-gray-500 uppercase flex items-center justify-between group">
                  <span>Categories</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => setIsManageDialogOpen(true)}
                  >
                    <Settings className="h-3 w-3" />
                  </Button>
                </div>
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/admin/pages?category=${encodeURIComponent(cat.name)}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    {cat.icon ? (
                      <img src={cat.icon} alt={cat.name} className="h-5 w-5 object-contain" />
                    ) : (
                      <div className="h-5 w-5 bg-gray-200 rounded-full" />
                    )}
                    <span className="font-medium">{cat.name}</span>
                  </Link>
                ))}
              </>
            )}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-200 bg-white">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Logout</span>
          </Button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Manage Categories Dialog */}
      <Dialog open={isManageDialogOpen} onOpenChange={setIsManageDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Manage Categories</DialogTitle>
            <DialogDescription>
              Delete categories you no longer need.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            {categories.length === 0 ? (
              <p className="text-center text-gray-500 py-4">No categories found.</p>
            ) : (
              <div className="grid gap-2">
                {categories.map((cat) => (
                  <div key={cat.id} className="flex items-center justify-between p-2 border rounded-md bg-gray-50">
                    <div className="flex items-center gap-3">
                      {cat.icon ? (
                        <img src={cat.icon} alt={cat.name} className="h-8 w-8 object-contain rounded-full bg-white border p-1" />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-gray-200" />
                      )}
                      <span className="font-medium">{cat.name}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete "${cat.name}"?`)) {
                          handleDeleteCategory(cat.id)
                        }
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}





