"use client"

import { usePathname } from "next/navigation"
import AdminSidebar from "@/components/admin-sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isLoginPage = pathname === "/admin/login"
  
  // Don't show sidebar on login page
  if (isLoginPage) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="lg:pl-64">
        <main className="p-8">{children}</main>
      </div>
    </div>
  )
}

