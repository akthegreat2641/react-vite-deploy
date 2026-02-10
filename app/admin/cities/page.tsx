"use client"

import { useState, useEffect } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import AdminTable from "@/components/admin-table"
import { CityDialog } from "@/components/city-dialog"

interface City {
    id: string
    name: string
    image?: string
    createdAt: string
}

export default function CitiesPage() {
    const [cities, setCities] = useState<City[]>([])
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)

    const fetchCities = async () => {
        try {
            const res = await fetch("/api/cities", { cache: "no-store" })
            if (!res.ok) throw new Error("Failed to fetch cities")
            const data = await res.json()
            setCities(Array.isArray(data) ? data : [])
        } catch (error) {
            console.error("Failed to fetch cities:", error)
            setCities([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCities()
    }, [])

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this city?")) return

        try {
            const res = await fetch(`/api/cities/${id}`, { method: "DELETE" })
            if (res.ok) {
                setCities((prev) => prev.filter((c) => c.id !== id))
            }
        } catch (error) {
            console.error("Failed to delete city:", error)
        }
    }

    if (loading) return <div className="p-8">Loading...</div>

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Cities</h1>
            </div>

            <AdminTable
                data={cities}
                columns={[
                    { key: "name", label: "Name" },
                    {
                        key: "image",
                        label: "Image",
                        render: (item) => item.image ? (
                            <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded" />
                        ) : "No Image"
                    },
                    {
                        key: "createdAt",
                        label: "Date",
                        render: (item) => new Date(item.createdAt).toLocaleDateString(),
                    },
                ]}
                onDelete={handleDelete}
                onAdd={() => setOpen(true)}
                onEdit={(city) => console.log("Edit", city)}
                addLabel="Add City"
                getId={(item) => item.id}
            />

            <CityDialog
                open={open}
                onOpenChange={setOpen}
                onSuccess={fetchCities}
            />
        </div>
    )
}
