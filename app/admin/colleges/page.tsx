"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import AdminTable from "@/components/admin-table"
import { CollegeForm } from "@/components/college-form"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface College {
  id: string
  name: string
  location: string
  image?: string | null
  logo?: string | null
  featured: boolean
}

export default function CollegesPage() {
  const [colleges, setColleges] = useState<College[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCollege, setEditingCollege] = useState<College | null>(null)

  const fetchColleges = async () => {
    try {
      const res = await fetch("/api/colleges", { cache: "no-store" })
      const data = await res.json()
      setColleges(data)
    } catch (error) {
      console.error("Failed to fetch colleges:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchColleges()
  }, [])

  const handleAdd = () => {
    window.location.href = "/admin/colleges/new"
  }

  const handleEdit = (college: College) => {
    setEditingCollege(college)
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    try {
      console.log("Deleting college with ID:", id)
      const res = await fetch(`/api/colleges/${id}`, { method: "DELETE" })
      if (res.ok) {
        setColleges((prev) => prev.filter((college) => college.id !== id))
        // Optional: still fetch to ensure sync, but local update gives immediate feedback
        // fetchColleges() 
      } else {
        const errorData = await res.json()
        console.error("Failed to delete college:", errorData)
        throw new Error(errorData.error || "Failed to delete college")
      }
    } catch (error) {
      console.error("Error deleting college:", error)
      throw error // Re-throw so AdminTable knows it failed
    }
  }

  const handleSave = (saved: College) => {
    setIsDialogOpen(false)
    fetchColleges()
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <AdminTable
        data={colleges}
        columns={[
          { key: "name", label: "Name" },
          { key: "location", label: "Location" },
          {
            key: "featured",
            label: "Featured",
            render: (item) => (item.featured ? "Yes" : "No"),
          },
          {
            key: "page",
            label: "College Page",
            render: (item) => (
              <Link href={`/admin/colleges/${item.id}`}>
                <Button variant="outline" size="sm">
                  Edit Page
                </Button>
              </Link>
            ),
          },
        ]}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAdd={handleAdd}
        addLabel="Add College"
        getId={(item) => item.id}
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit College</DialogTitle>
          </DialogHeader>
          <CollegeForm
            college={editingCollege}
            onSave={handleSave}
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

