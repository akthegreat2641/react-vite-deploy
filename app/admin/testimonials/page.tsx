"use client"

import { useState, useEffect } from "react"
import AdminTable from "@/components/admin-table"
import { TestimonialForm } from "@/components/testimonial-form"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface Testimonial {
  id: string
  name: string
  content: string
  image?: string | null
  rating: number
  featured: boolean
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null)

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("/api/testimonials")
      const data = await res.json()
      setTestimonials(data)
    } catch (error) {
      console.error("Failed to fetch testimonials:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const handleAdd = () => {
    setEditingTestimonial(null)
    setIsDialogOpen(true)
  }

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial)
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    await fetch(`/api/testimonials/${id}`, { method: "DELETE" })
    fetchTestimonials()
  }

  const handleSave = () => {
    setIsDialogOpen(false)
    fetchTestimonials()
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <AdminTable
        data={testimonials}
        columns={[
          { key: "name", label: "Name" },
          {
            key: "content",
            label: "Content",
            render: (item) => (
              <div className="max-w-md truncate">{item.content}</div>
            ),
          },
          { key: "rating", label: "Rating" },
          {
            key: "featured",
            label: "Featured",
            render: (item) => (item.featured ? "Yes" : "No"),
          },
        ]}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAdd={handleAdd}
        addLabel="Add Testimonial"
        getId={(item) => item.id}
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingTestimonial ? "Edit Testimonial" : "Add Testimonial"}
            </DialogTitle>
          </DialogHeader>
          <TestimonialForm
            testimonial={editingTestimonial}
            onSave={handleSave}
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}





