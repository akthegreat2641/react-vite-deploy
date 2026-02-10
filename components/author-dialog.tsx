"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"

const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    image: z.string().optional(),
    description: z.string().optional(),
    designation: z.string().optional(),
    facebook: z.string().optional(),
    twitter: z.string().optional(),
    linkedin: z.string().optional(),
    instagram: z.string().optional(),
})

interface AuthorDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSuccess: () => void
    author?: any // If provided, we are editing
}

export function AuthorDialog({ open, onOpenChange, onSuccess, author }: AuthorDialogProps) {
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            image: "",
            description: "",
            designation: "",
            facebook: "",
            twitter: "",
            linkedin: "",
            instagram: "",
        },
    })

    useEffect(() => {
        if (author) {
            form.reset({
                name: author.name || "",
                image: author.image || "",
                description: author.description || "",
                designation: author.designation || "",
                facebook: author.facebook || "",
                twitter: author.twitter || "",
                linkedin: author.linkedin || "",
                instagram: author.instagram || ""
            })
        } else {
            form.reset({
                name: "",
                image: "",
                description: "",
                designation: "",
                facebook: "",
                twitter: "",
                linkedin: "",
                instagram: "",
            })
        }
    }, [author, form])

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true)
        try {
            const url = author ? `/api/authors/${author.id}` : "/api/authors"
            const method = author ? "PUT" : "POST"

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            })

            if (!res.ok) throw new Error("Failed to save author")

            toast.success(author ? "Author updated" : "Author created")
            form.reset()
            onSuccess()
            onOpenChange(false)
        } catch (error) {
            console.error(error)
            toast.error("Failed to save author")
        } finally {
            setLoading(false)
        }
    }

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setLoading(true)
        const formData = new FormData()
        formData.append("file", file)

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            })

            if (!res.ok) throw new Error("Upload failed")

            const data = await res.json()
            form.setValue("image", data.url)
            toast.success("Image uploaded")
        } catch (error) {
            console.error(error)
            toast.error("Upload failed")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{author ? "Edit Author" : "Add Author"}</DialogTitle>
                    <DialogDescription>
                        {author ? "Update author details." : "Create a new author profile."}
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Author Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="designation"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Designation</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g. Senior Editor" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Profile Image</FormLabel>
                                    <FormControl>
                                        <div className="space-y-2">
                                            <div className="flex gap-2">
                                                <Input placeholder="Enter image URL" {...field} />
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-gray-500">OR Upload:</span>
                                                <Input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleFileUpload}
                                                    className="text-xs file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                                />
                                            </div>
                                            {field.value && (
                                                <div className="mt-2 relative w-20 h-20 rounded-full overflow-hidden border">
                                                    <img src={field.value} alt="Preview" className="w-full h-full object-cover" />
                                                </div>
                                            )}
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description / Bio</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Short bio about the author..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="facebook"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Facebook URL</FormLabel>
                                        <FormControl>
                                            <Input placeholder="https://facebook.com/..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="twitter"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Twitter URL</FormLabel>
                                        <FormControl>
                                            <Input placeholder="https://twitter.com/..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="linkedin"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>LinkedIn URL</FormLabel>
                                        <FormControl>
                                            <Input placeholder="https://linkedin.com/in/..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="instagram"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Instagram URL</FormLabel>
                                        <FormControl>
                                            <Input placeholder="https://instagram.com/..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={loading}>
                                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {author ? "Update Author" : "Create Author"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
