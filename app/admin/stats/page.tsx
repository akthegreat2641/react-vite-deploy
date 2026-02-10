"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Plus } from "lucide-react"

interface Category {
  id: string
  name: string
  icon?: string
}

export default function StatsPage() {
  const [stats, setStats] = useState<any[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>("")

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories")
        const data = await res.json()
        if (Array.isArray(data)) {
          setCategories(data)
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
    fetchCategories()
  }, [])

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/stats")
      const data = await res.json()
      setStats(data)
    } catch (error) {
      console.error("Failed to fetch stats:", error)
    }
  }

  const handleSave = async () => {
    if (!selectedCategory) return

    try {
      const res = await fetch("/api/stats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          label: selectedCategory,
          value: "0", // Default value
          featured: true
        })
      })

      if (res.ok) {
        setSelectedCategory("")
        fetchStats()
      }
    } catch (error) {
      console.error("Failed to save stat", error)
    }
  }

  /* State for drag and drop */
  const [draggedItem, setDraggedItem] = useState<{ statId: string, index: number } | null>(null)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  const handleDragStart = (statId: string, index: number) => {
    setDraggedItem({ statId, index })
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (statId: string, targetIndex: number) => {
    if (!draggedItem || draggedItem.statId !== statId || draggedItem.index === targetIndex) {
      return
    }

    const statIndex = stats.findIndex(s => s.id === statId)
    if (statIndex === -1) return

    const newStats = [...stats]
    const stat = newStats[statIndex]
    const items = stat.value ? stat.value.split(", ") : []

    // Reorder items
    const [movedItem] = items.splice(draggedItem.index, 1)
    items.splice(targetIndex, 0, movedItem)

    // Update local state
    const newValue = items.join(", ")
    stat.value = newValue
    setStats(newStats)
    setDraggedItem(null)
    setHasUnsavedChanges(true)
  }

  const handleSaveOrder = async () => {
    try {
      await Promise.all(stats.map(stat =>
        fetch(`/api/stats/${stat.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            label: stat.label,
            value: stat.value,
            featured: stat.featured
          })
        })
      ))
      setHasUnsavedChanges(false)
    } catch (error) {
      console.error("Failed to save order", error)
    }
  }

  return (
    <div className="p-6">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Manage Stats</h1>
            <p className="text-gray-500 mt-2">Manage statistics for your website categories.</p>
          </div>
          {hasUnsavedChanges && (
            <Button onClick={handleSaveOrder} className="bg-green-600 hover:bg-green-700 text-white">
              Save Changes
            </Button>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  {selectedCategory ? `Add Stats: ${selectedCategory}` : "Add Stats"}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem onClick={() => setSelectedCategory("Colleges")}>
                  Colleges
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedCategory("Articles")}>
                  Articles
                </DropdownMenuItem>

                {categories.length > 0 && categories.map((category) => (
                  <DropdownMenuItem key={category.id} onClick={() => setSelectedCategory(category.name)}>
                    {category.name}
                  </DropdownMenuItem>
                ))}

                {categories.length === 0 && !loading && (
                  <div className="p-2 text-sm text-gray-500 text-center">No categories found</div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {selectedCategory && (
            <div className="p-4 border rounded-lg bg-gray-50 flex items-center justify-between">
              <p className="text-sm text-gray-600">Selected Category for new stat: <span className="font-semibold text-gray-900">{selectedCategory}</span></p>
              <Button onClick={handleSave}>Save</Button>
            </div>
          )}
        </div>

        {/* List of existing stats */}
        <div className="mt-8">
          {stats.map((stat) => {
            const items = stat.value ? stat.value.split(", ") : []

            return (
              <div key={stat.id} className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800 capitalize">{stat.label}</h2>
                <div className="flex flex-col gap-3">
                  {items.map((item: string, index: number) => (
                    <div
                      key={index}
                      draggable
                      onDragStart={() => handleDragStart(stat.id, index)}
                      onDragOver={handleDragOver}
                      onDrop={() => handleDrop(stat.id, index)}
                      className={`p-4 border border-gray-300 rounded-md bg-white text-lg font-medium text-gray-800 shadow-sm uppercase w-full md:w-1/3 cursor-grab active:cursor-grabbing transition-colors ${draggedItem?.index === index && draggedItem?.statId === stat.id ? 'bg-gray-100 border-dashed' : ''}`}
                    >
                      {item}
                    </div>
                  ))}
                  {items.length === 0 && (
                    <div className="text-gray-500 italic">No items found for this category.</div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
