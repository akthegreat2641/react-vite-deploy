"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon, X } from "lucide-react"
import {
    INDIAN_STATES, COLLEGE_TYPES, COURSE_TYPES, INSTITUTE_TYPES,
    COURSE_DURATIONS, GENDER_ACCEPTED, TOTAL_FEES_RANGES, STREAMS as BRANCHES_LIST,
    DEGREES
} from "@/lib/constants"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { RichTextEditor } from "@/components/rich-text-editor"
import { Card, CardHeader, CardTitle, CardContent } from "@/iit-madras-website/components/ui/card"
import { Plus, Trash2, ArrowLeft, Save, ChevronRight, Upload } from "lucide-react"
import { toast } from "sonner"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { CityDialog } from "./city-dialog"

import { MultiSelect } from "@/components/ui/multi-select"

interface Section {
    id?: string
    title: string
    content: string
    order: number
    type?: string
}

interface Faq {
    id?: string
    title: string
    question: string
    answer: string
    order: number
}

interface PageData {
    id?: string
    title: string
    slug: string
    headerBgImage?: string | null
    description?: string | null
    published: boolean
    sections: Section[]
    faqs: Faq[]
    createdAt?: string
    updatedAt?: string
    state?: string | null
    degree?: string | null
    programType?: string | null
    collegeType?: string | null
    courseType?: string | null
    instituteType?: string | null
    examAccepted?: string | null
    genderAccepted?: string | null
    totalFees?: string | null
    cdRank?: number | null
    placementAverage?: number | null
    placementHighest?: number | null
    headerTitle?: string | null
    headerLogo?: string | null
    locationLabel?: string | null
    headerBtn1Text?: string | null
    headerBtn1Link?: string | null
    headerBtn2Text?: string | null
    headerBtn2Link?: string | null
    showBtn1?: boolean
    showBtn2?: boolean
    showHeaderLogo?: boolean
    courseDuration?: string | null
    avgFees?: string | null
    category?: string | null
    branch?: string | null
    level?: string | null
    boardType?: string | null
    program?: string | null
    careerType?: string | null
    publishDate?: string | null
    authorId?: string | null
    popular?: boolean
    cardImage?: string | null
    featured?: boolean
}

interface PageEditorProps {
    pageId?: string
}

export function PageEditor({ pageId }: PageEditorProps) {
    const router = useRouter()
    const isEditing = !!pageId

    const [loading, setLoading] = useState(isEditing)
    const [saving, setSaving] = useState(false)

    const searchParams = useSearchParams()
    const initialCategory = searchParams.get("category") || ""

    // Page Data State
    const [title, setTitle] = useState("")
    const [slug, setSlug] = useState("")
    const [headerBgImage, setHeaderBgImage] = useState("")
    const [description, setDescription] = useState("")
    const [seoMetaTitle, setSeoMetaTitle] = useState("")
    const [metaDescription, setMetaDescription] = useState("")
    const [published, setPublished] = useState(true)
    const [featured, setFeatured] = useState(false)
    const [popular, setPopular] = useState(false)
    const [cardImage, setCardImage] = useState("")

    // New Fields
    const [headerTitle, setHeaderTitle] = useState("")
    const [headerLogo, setHeaderLogo] = useState("")
    const [publishDate, setPublishDate] = useState("")
    const [locationLabel, setLocationLabel] = useState("")
    const [headerBtn1Text, setHeaderBtn1Text] = useState("")
    const [headerBtn1Link, setHeaderBtn1Link] = useState("")
    const [headerBtn2Text, setHeaderBtn2Text] = useState("")
    const [headerBtn2Link, setHeaderBtn2Link] = useState("")
    const [showBtn1, setShowBtn1] = useState(true)
    const [showBtn2, setShowBtn2] = useState(true)
    const [showHeaderLogo, setShowHeaderLogo] = useState(true)
    const [courseDuration, setCourseDuration] = useState("")
    const [avgFees, setAvgFees] = useState("")
    const [category, setCategory] = useState(initialCategory)
    const isSubCategory = category === "Sub College" || category === "Sub Exam"
    const [branch, setBranch] = useState("")
    const [level, setLevel] = useState("")
    const [boardType, setBoardType] = useState("")
    const [program, setProgram] = useState("")
    const [careerType, setCareerType] = useState("")
    const [careerTypes, setCareerTypes] = useState<{ id: string; name: string }[]>([])
    const [isCreatingCareerType, setIsCreatingCareerType] = useState(false)
    const [newCareerType, setNewCareerType] = useState("")
    const [newCareerTypeImage, setNewCareerTypeImage] = useState("")
    const [state, setState] = useState("") // New State Field
    const [degree, setDegree] = useState("")
    const [programType, setProgramType] = useState("")
    const [collegeType, setCollegeType] = useState("")
    const [courseType, setCourseType] = useState("")
    const [instituteType, setInstituteType] = useState("")
    const [examAccepted, setExamAccepted] = useState("")
    const [genderAccepted, setGenderAccepted] = useState("")
    const [totalFees, setTotalFees] = useState("")
    const [cdRank, setCdRank] = useState("")
    const [placementAverage, setPlacementAverage] = useState("")
    const [placementHighest, setPlacementHighest] = useState("")
    const [coursesList, setCoursesList] = useState<{ id: string; title: string }[]>([])
    const [examsList, setExamsList] = useState<{ id: string; title: string }[]>([])

    // Exam Date Fields
    const [applicationDate, setApplicationDate] = useState("")
    const [examDate, setExamDate] = useState("")
    const [resultDate, setResultDate] = useState("")
    const [examLevel, setExamLevel] = useState("")
    const [examMode, setExamMode] = useState("")

    useEffect(() => {
        fetch("/api/pages?category=Course").then(res => res.json()).then(data => {
            if (Array.isArray(data)) {
                setCoursesList(data.map((p: any) => ({ id: p.id, title: p.title })))
            }
        }).catch(err => console.error("Failed to fetch courses:", err))

        fetch("/api/pages?category=Exams").then(res => res.json()).then(data => {
            if (Array.isArray(data)) {
                setExamsList(data.map((p: any) => ({ id: p.id, title: p.title })))
            }
        }).catch(err => console.error("Failed to fetch exams:", err))
    }, [])

    const PROGRAM_TYPES = [
        "Full Time", "Part Time", "On Campus", "Online", "Distance", "Off Campus"
    ]



    const NATIONAL_BOARDS = [
        "International General Certificate of Secondary Education (IGCSE)",
        "International Baccalaureate (IB)",
        "National Institute of Open Schooling (NIOS)",
        "Central Board of Secondary Education (CBSE)",
        "Indian Certificate of Secondary Education (ICSE)"
    ]

    const STATE_BOARDS = [
        "Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
        "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand",
        "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
        "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan",
        "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
        "West Bengal"
    ]

    // Category Management
    const [categoriesList, setCategoriesList] = useState<any[]>([])
    const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false)
    const [newCategoryName, setNewCategoryName] = useState("")
    const [newCategoryIcon, setNewCategoryIcon] = useState("")

    // Cities Management
    const [citiesList, setCitiesList] = useState<any[]>([])
    const [isCityDialogOpen, setIsCityDialogOpen] = useState(false)

    // Authors Management
    const [authorsList, setAuthorsList] = useState<any[]>([])
    const [authorId, setAuthorId] = useState("")

    // Header Button Dialog

    const [updatedAt, setUpdatedAt] = useState<string | null>(null)

    const [tabs, setTabs] = useState([
        { id: "INFO", label: "Page Content" },
    ])
    // Tab Creation State
    const [isTabDialogOpen, setIsTabDialogOpen] = useState(false)
    const [newTabName, setNewTabName] = useState("")

    const [currentStep, setCurrentStep] = useState(0)
    const currentTab = tabs[currentStep] || tabs[0]

    // Unified state for all sections, keyed by SectionType (though we mostly use INFO)
    const [sectionsByType, setSectionsByType] = useState<Record<string, Section[]>>({})
    const [faqs, setFaqs] = useState<Faq[]>([])

    useEffect(() => {
        if (!pageId) return

        async function fetchData() {
            try {
                setLoading(true)
                const res = await fetch(`/api/pages/${pageId}`)

                if (res.ok) {
                    const data = await res.json()
                    setTitle(data.title)
                    setSlug(data.slug)
                    setHeaderBgImage(data.headerBgImage || "")
                    setDescription(data.description || "")
                    setSeoMetaTitle(data.seoMetaTitle || "")
                    setMetaDescription(data.metaDescription || "")
                    setPublished(data.published)
                    setFeatured(data.featured || false)
                    setPopular(data.popular || false)
                    setCardImage(data.cardImage || "")
                    setUpdatedAt(data.updatedAt)

                    setHeaderTitle(data.headerTitle || "")
                    setHeaderLogo(data.headerLogo || "")
                    setPublishDate(data.publishDate ? new Date(data.publishDate).toISOString().split('T')[0] : "")
                    setLocationLabel(data.locationLabel || "")
                    setHeaderBtn1Text(data.headerBtn1Text || "")
                    setHeaderBtn1Link(data.headerBtn1Link || "")
                    setHeaderBtn2Text(data.headerBtn2Text || "")
                    setHeaderBtn2Link(data.headerBtn2Link || "")
                    setShowBtn1(data.showBtn1 !== false) // Default to true if undefined
                    setShowBtn2(data.showBtn2 !== false)
                    setShowHeaderLogo(data.showHeaderLogo !== false)
                    setCourseDuration(data.courseDuration || "")
                    setAvgFees(data.avgFees || "")
                    setCategory(data.category || "")
                    setBranch(data.branch || "")
                    setLevel(data.level || "")
                    setLevel(data.level || "")
                    setBoardType(data.boardType || "")
                    setProgram(data.program || "")
                    setCareerType(data.careerType || "")
                    setProgram(data.program || "")
                    setCareerType(data.careerType || "")
                    setState(data.state || "")
                    setDegree(data.degree || "")
                    setProgramType(data.programType || "")
                    setCollegeType(data.collegeType || "")
                    setCourseType(data.courseType || "")
                    setInstituteType(data.instituteType || "")
                    setExamAccepted(data.examAccepted || "")
                    setGenderAccepted(data.genderAccepted || "")
                    setTotalFees(data.totalFees || "")
                    setCdRank(data.cdRank?.toString() || "")
                    setPlacementAverage(data.placementAverage?.toString() || "")
                    setPlacementHighest(data.placementHighest?.toString() || "")
                    setApplicationDate(data.applicationDate || "")
                    setExamDate(data.examDate || "")
                    setResultDate(data.resultDate || "")
                    setExamLevel(data.examLevel || "")
                    setExamMode(data.examMode || "")
                    setAuthorId(data.authorId || "")

                    // Identify all unique IDs from sections to rebuild tabs
                    const existingTabIds = new Set(["INFO"])
                    const dynamicTabs: { id: string, label: string }[] = []

                    if (data.sections) {
                        data.sections.forEach((s: any) => {
                            const type = s.type || "INFO"
                            if (!existingTabIds.has(type)) {
                                existingTabIds.add(type)
                                // Try to make a readable label from ID
                                const label = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase().replace(/_/g, " ")
                                dynamicTabs.push({ id: type, label })
                            }
                        })
                    }

                    setTabs([
                        { id: "INFO", label: "Page Content" },
                        ...dynamicTabs
                    ])

                    // Group sections
                    const grouped: Record<string, Section[]> = {}
                    // Initialize for all known tabs
                    existingTabIds.forEach(id => grouped[id] = [])

                    if (data.sections) {
                        data.sections.forEach((s: any) => {
                            const type = s.type || "INFO"
                            if (!grouped[type]) grouped[type] = []
                            grouped[type].push({
                                id: s.id,
                                title: s.title,
                                content: s.content,
                                order: s.order,
                                type: type
                            })
                        })
                    }
                    setSectionsByType(grouped)

                    setFaqs(
                        (data.faqs || []).map((f: any, index: number) => ({
                            id: f.id,
                            title: f.title,
                            question: f.question,
                            answer: f.answer,
                            order: f.order ?? index,
                        })),
                    )
                } else {
                    toast.error("Failed to load page data")
                }
            } catch (error) {
                console.error("Failed to load page data:", error)
                toast.error("Failed to load page data")
            } finally {
                setLoading(false)
            }
        }

        fetchData()
        fetchData()
    }, [pageId])

    // Fetch Categories
    useEffect(() => {
        fetch("/api/categories")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setCategoriesList(data)
            })
            .catch(err => console.error(err))

        fetch("/api/career-types")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setCareerTypes(data)
            })
            .catch(err => console.error(err))
    }, [])

    // Fetch Cities
    useEffect(() => {
        fetch("/api/cities")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setCitiesList(data)
            })
            .catch(err => console.error(err))
    }, [])

    // Fetch Authors
    useEffect(() => {
        fetch("/api/authors")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setAuthorsList(data)
            })
            .catch(err => console.error(err))
    }, [])

    // Helper to auto-generate slug
    useEffect(() => {
        if (!isEditing && title && !slug) {
            const generatedSlug = title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)+/g, "")
            setSlug(generatedSlug)
        }
    }, [title, isEditing])

    const handleAddSection = (type: string) => {
        setSectionsByType((prev) => ({
            ...prev,
            [type]: [
                ...(prev[type] || []),
                { title: "", content: "", order: (prev[type] || []).length, type },
            ],
        }))
    }

    const handleRemoveSection = (type: string, index: number) => {
        setSectionsByType((prev) => ({
            ...prev,
            [type]: prev[type].filter((_, i) => i !== index),
        }))
    }

    const handleSectionChange = (type: string, index: number, field: keyof Section, value: string) => {
        setSectionsByType((prev) => ({
            ...prev,
            [type]: prev[type].map((section, i) =>
                i === index ? { ...section, [field]: value } : section,
            ),
        }))
    }

    const handleAddFaq = () => {
        setFaqs((prev) => [
            ...prev,
            { title: "", question: "", answer: "", order: prev.length },
        ])
    }

    const handleRemoveFaq = (index: number) => {
        setFaqs((prev) => prev.filter((_, i) => i !== index))
    }

    const handleFaqChange = (index: number, field: keyof Faq, value: string) => {
        setFaqs((prev) =>
            prev.map((faq, i) =>
                i === index ? { ...faq, [field]: value } : faq,
            ),
        )
    }

    const handleSave = async () => {
        if (!title) {
            toast.error("Page Title is required")
            return
        }
        if (!slug) {
            toast.error("Slug is required")
            return
        }

        setSaving(true)
        try {
            // Flatten all sections
            const allSections = Object.values(sectionsByType).flat().map((s, i) => ({
                title: s.title,
                content: s.content,
                order: i,
                type: s.type || "INFO"
            }))

            // Calculate totalFeesVal for sorting
            let totalFeesVal = 0
            if (totalFees === "0-25k") totalFeesVal = 25000
            else if (totalFees === "25-50k") totalFeesVal = 50000
            else if (totalFees === "50-70k") totalFeesVal = 70000
            else if (totalFees === "75-1L") totalFeesVal = 100000
            else if (totalFees === "1-2L") totalFeesVal = 200000
            else if (totalFees === "Above 2L") totalFeesVal = 300000

            const payload = {
                title,
                slug,
                headerBgImage,
                description,
                seoMetaTitle,
                metaDescription,
                published,
                featured,
                popular,
                cardImage,
                headerTitle,
                headerLogo,

                publishDate: new Date().toISOString(), // Auto-update to now


                locationLabel,
                headerBtn1Text,
                headerBtn1Link,
                headerBtn2Text,
                headerBtn2Link,
                showBtn1,
                showBtn2,
                showHeaderLogo,
                courseDuration,
                avgFees,
                category,
                branch,
                level,
                boardType,
                program,
                careerType,
                state,
                degree,
                programType,
                collegeType,
                courseType,
                instituteType,
                examAccepted,
                genderAccepted,
                totalFees,
                cdRank,
                placementAverage,
                placementHighest,
                totalFeesVal,
                applicationDate,
                examDate,
                resultDate,
                examLevel,
                examMode,
                authorId,
                sections: allSections,
                faqs: faqs.map((f, index) => ({
                    title: f.title,
                    question: f.question,
                    answer: f.answer,
                    order: index,
                })),
            }

            const url = isEditing ? `/api/pages/${pageId}` : "/api/pages"
            const method = isEditing ? "PUT" : "POST"

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            })

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}))
                throw new Error(errorData.error || "Failed to save page")
            }

            const savedPage = await res.json()
            toast.success("Page saved successfully")

            if (!isEditing) {
                router.push(`/admin/pages/${savedPage.id}`)
            } else {
                // Update local state if needed
                setUpdatedAt(savedPage.updatedAt)
            }

        } catch (error) {
            console.error(error)
            toast.error(error instanceof Error ? error.message : "Failed to save page")
        } finally {
            setSaving(false)
        }
    }

    const handleCreateCategory = async () => {
        if (!newCategoryName) {
            toast.error("Category name is required")
            return
        }
        try {
            const res = await fetch("/api/categories", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: newCategoryName, icon: newCategoryIcon })
            })
            if (!res.ok) {
                const errorData = await res.json()
                throw new Error(errorData.details || errorData.error || "Failed to create category")
            }
            const newCat = await res.json()
            setCategoriesList(prev => [...prev.sort((a: any, b: any) => a.name.localeCompare(b.name)), newCat])
            setCategory(newCat.name)
            setIsCategoryDialogOpen(false)
            setNewCategoryName("")
            setNewCategoryIcon("")
            toast.success("Category created")
        } catch (error) {
            console.error(error)
            toast.error("Failed to create category")
        }
    }

    const handleCategoryIconUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const formData = new FormData()
        formData.append("file", file)

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            })

            if (!res.ok) throw new Error("Upload failed")

            const data = await res.json()
            if (data.url) {
                setNewCategoryIcon(data.url)
                toast.success("Icon uploaded successfully")
            }
        } catch (error) {
            console.error("Upload error:", error)
            toast.error("Failed to upload icon")
        }
    }

    const handleCitySuccess = () => {
        // Refresh list
        fetch("/api/cities")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    // Sort descending by createdAt to get newest first (approx) or just manual sort
                    // Ideally the API returns them or we sort them here.
                    // Let's rely on name sort but finding the new one is tricky without return value.
                    // For now, just refresh the list.
                    setCitiesList(data)
                    // If we want to auto-select, we'd need to know which one was added.
                    // Since onSuccess doesn't pass data, we might just leave selection empty or
                    // try to find the one that wasn't there before if we track it.
                    // Simplified: just refresh.
                }
            })
            .catch(err => console.error(err))

        toast.success("City created successfully")
        setIsCityDialogOpen(false)
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const formData = new FormData()
        formData.append("file", file)

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            })

            if (!res.ok) throw new Error("Upload failed")

            const data = await res.json()
            if (data.url) {
                setHeaderBgImage(data.url)
                toast.success("Image uploaded successfully")
            }
        } catch (error) {
            console.error("Upload error:", error)
            toast.error("Failed to upload image")
        }
    }

    const handleCardImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const formData = new FormData()
        formData.append("file", file)

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            })

            if (!res.ok) throw new Error("Upload failed")

            const data = await res.json()
            if (data.url) {
                setCardImage(data.url)
                toast.success("Card image uploaded successfully")
            }
        } catch (error) {
            console.error("Upload error:", error)
            toast.error("Failed to upload card image")
        }
    }

    const handleCreateTab = () => {
        if (!newTabName) {
            toast.error("Tab name is required")
            return
        }
        const id = newTabName.trim().toUpperCase().replace(/[^A-Z0-9]+/g, "_")

        if (tabs.find(t => t.id === id)) {
            toast.error("Tab already exists")
            return
        }

        const newTab = { id, label: newTabName }
        setTabs(prev => [...prev, newTab])

        // Initialize sections for new tab
        setSectionsByType(prev => ({
            ...prev,
            [id]: []
        }))

        setIsTabDialogOpen(false)
        setNewTabName("")
        setCurrentStep(tabs.length)
        toast.success("Tab created")
    }



    if (loading) {
        return <div className="p-6">Loading page data...</div>
    }

    const displayUpdated = updatedAt
        ? new Date(updatedAt).toLocaleString()
        : "Not set"

    const isLastStep = currentStep === tabs.length - 1
    const currentSections = sectionsByType[currentTab.id] || []

    const handleCareerTypeImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const formData = new FormData()
        formData.append("file", file)

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            })

            if (!res.ok) throw new Error("Upload failed")

            const data = await res.json()
            if (data.url) {
                setNewCareerTypeImage(data.url)
                toast.success("Icon uploaded successfully")
            }
        } catch (error) {
            console.error("Upload error:", error)
            toast.error("Failed to upload icon")
        }
    }

    const handleCreateCareerType = async () => {
        if (!newCareerType) return

        try {
            const res = await fetch("/api/career-types", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: newCareerType, image: newCareerTypeImage }),
            })

            if (res.ok) {
                const createdType = await res.json()
                setCareerTypes([...careerTypes, createdType])
                setCareerType(createdType.name)
                setIsCreatingCareerType(false)
                setCareerType(createdType.name)
                setIsCreatingCareerType(false)
                setNewCareerType("")
                setNewCareerTypeImage("")
                toast.success("Career Type created successfully")
            }
        } catch (error) {
            toast.error("Failed to create Career Type")
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 space-y-4">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                            router.back()
                        }}
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                    </Button>
                    <div>
                        <h1 className="text-xl font-semibold">
                            {isEditing ? `Edit Page – ${title}` : "Add New Page"}
                        </h1>
                        <p className="text-sm text-gray-500">
                            Last updated: {displayUpdated}
                        </p>
                    </div>
                </div>
                <div className="flex gap-2">
                    {/* Dynamic Header Button 1 Shortcut */}

                    <Button onClick={handleSave} disabled={saving}>
                        <Save className="w-4 h-4 mr-2" />
                        {saving ? "Saving..." : "Save Page"}
                    </Button>
                </div>
            </div>

            {/* Progress Bar & Steps */}
            <div className="flex items-center gap-2 mb-4 overflow-x-auto">
                {tabs.map((tab, index) => (
                    <Button
                        key={tab.id}
                        variant={currentStep === index ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentStep(index)}
                        className="whitespace-nowrap"
                    >
                        {index + 1}. {tab.label}
                    </Button>
                ))}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsTabDialogOpen(true)}
                    className="whitespace-nowrap"
                >
                    <Plus className="w-4 h-4" />
                </Button>
            </div>

            {/* Main Content Area */}
            <div className="space-y-6">
                {/* Metadata & FAQs */}
                {/* Metadata & FAQs - Only visible on INFO tab */}
                {currentTab?.id === "INFO" && (
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Page Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {!isSubCategory && (
                                    <div>
                                        <Label htmlFor="category">Category</Label>
                                        <div className="flex gap-2">
                                            <Select value={category} onValueChange={(val) => {
                                                if (val === "create_new_cat") {
                                                    setIsCategoryDialogOpen(true)
                                                } else {
                                                    setCategory(val)
                                                    if (val === "Article" || val === "Olympiad" || val === "Olympiads" || val === "Scholarship" || val === "Scholarships" || val === "Career" || val === "Careers") {
                                                        setShowBtn1(false)
                                                        setShowBtn2(false)
                                                    } else {
                                                        setShowBtn1(true)
                                                        setShowBtn2(true)
                                                    }

                                                    if (val === "College" || val === "Courses" || val === "Course" || val === "Exam" || val === "Exams") {
                                                        setShowHeaderLogo(true)
                                                    } else {
                                                        setShowHeaderLogo(false)
                                                    }
                                                }
                                            }}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select Category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="create_new_cat" className="font-semibold text-blue-600">
                                                        + Create New Category
                                                    </SelectItem>
                                                    {categoriesList.map((cat) => (
                                                        <SelectItem key={cat.id} value={cat.name}>
                                                            {cat.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                )}

                                {(category === "Board" || category === "Boards") && (
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <Label htmlFor="level">Level</Label>
                                            <Select value={level} onValueChange={setLevel}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select Level" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="National Boards">National Boards</SelectItem>
                                                    <SelectItem value="State Boards">State Boards</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label htmlFor="boardType">Board Type</Label>
                                            <Select value={boardType} onValueChange={setBoardType}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select Board Type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {level === "National Boards" && NATIONAL_BOARDS.map((b) => (
                                                        <SelectItem key={b} value={b}>{b}</SelectItem>
                                                    ))}
                                                    {level === "State Boards" && STATE_BOARDS.map((b) => (
                                                        <SelectItem key={b} value={b}>{b}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                )}

                                {(category === "College" || category === "Colleges") && (<>
                                    <div className="grid grid-cols-3 gap-4 mb-4">
                                        <div>
                                            <Label htmlFor="state">State</Label>
                                            <Select value={state} onValueChange={setState}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select State" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {INDIAN_STATES.map((s) => (
                                                        <SelectItem key={s} value={s}>{s}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label htmlFor="collegeType">Type of College</Label>
                                            <Select value={collegeType} onValueChange={setCollegeType}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select Type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {COLLEGE_TYPES.map((t) => (
                                                        <SelectItem key={t} value={t}>{t}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label htmlFor="instituteType">Institute Type</Label>
                                            <Select value={instituteType} onValueChange={setInstituteType}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select Institute" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {INSTITUTE_TYPES.map((t) => (
                                                        <SelectItem key={t} value={t}>{t}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label htmlFor="courseDuration">Course Duration</Label>
                                            <Select value={courseDuration} onValueChange={setCourseDuration}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select Duration" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {COURSE_DURATIONS.map((d) => (
                                                        <SelectItem key={d} value={d}>{d}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label htmlFor="genderAccepted">Gender Accepted</Label>
                                            <Select value={genderAccepted} onValueChange={setGenderAccepted}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select Gender" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {GENDER_ACCEPTED.map((t) => (
                                                        <SelectItem key={t} value={t}>{t}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <Label htmlFor="degree">Degree (Linked Courses)</Label>
                                        <MultiSelect
                                            options={coursesList.map(c => ({ label: c.title, value: c.title }))}
                                            selected={degree ? degree.split("|").map(d => d.trim()).filter(Boolean) : []}
                                            onChange={(val) => setDegree(val.join("|"))}
                                            placeholder="Select Degrees"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <Label htmlFor="programType">Program Type</Label>
                                        <MultiSelect
                                            options={PROGRAM_TYPES.map(t => ({ label: t, value: t }))}
                                            selected={programType ? programType.split("|").map(t => t.trim()).filter(Boolean) : []}
                                            onChange={(val) => setProgramType(val.join("|"))}
                                            placeholder="Select Program Types"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <Label htmlFor="courseType">Course Type</Label>
                                        <MultiSelect
                                            options={COURSE_TYPES.map(t => ({ label: t, value: t }))}
                                            selected={courseType ? courseType.split("|").map(t => t.trim()).filter(Boolean) : []}
                                            onChange={(val) => setCourseType(val.join("|"))}
                                            placeholder="Select Course Types"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <Label htmlFor="examAccepted">Exam Accepted</Label>
                                        <MultiSelect
                                            options={examsList.map(t => ({ label: t.title, value: t.title }))}
                                            selected={examAccepted ? examAccepted.split("|").map(t => t.trim()).filter(Boolean) : []}
                                            onChange={(val) => setExamAccepted(val.join("|"))}
                                            placeholder="Select Exams"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <Label htmlFor="totalFees">Total Fees</Label>
                                        <MultiSelect
                                            options={TOTAL_FEES_RANGES.map(t => ({ label: t, value: t }))}
                                            selected={totalFees ? totalFees.split("|").map(t => t.trim()).filter(Boolean) : []}
                                            onChange={(val) => setTotalFees(val.join("|"))}
                                            placeholder="Select Fees Range"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <Label htmlFor="cdRank">CD Rank (Number Only)</Label>
                                        <Input
                                            id="cdRank"
                                            type="number"
                                            value={cdRank}
                                            onChange={(e) => {
                                                const val = e.target.value
                                                if (val === "" || /^\d+$/.test(val)) {
                                                    setCdRank(val)
                                                }
                                            }}
                                            placeholder="e.g. 1"
                                            step="1"
                                            min="0"
                                            onKeyDown={(e) => {
                                                if (e.key === '.' || e.key === 'e' || e.key === '-') {
                                                    e.preventDefault()
                                                }
                                            }}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <Label htmlFor="placementAverage">Average Package (Integer)</Label>
                                            <Input
                                                id="placementAverage"
                                                type="number"
                                                value={placementAverage}
                                                onChange={(e) => {
                                                    const val = e.target.value
                                                    if (val === "" || /^\d+$/.test(val)) setPlacementAverage(val)
                                                }}
                                                placeholder="e.g. 500000"
                                                step="1"
                                                min="0"
                                                onKeyDown={(e) => {
                                                    if (e.key === '.' || e.key === 'e' || e.key === '-') e.preventDefault()
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="placementHighest">Highest Package (Integer)</Label>
                                            <Input
                                                id="placementHighest"
                                                type="number"
                                                value={placementHighest}
                                                onChange={(e) => {
                                                    const val = e.target.value
                                                    if (val === "" || /^\d+$/.test(val)) setPlacementHighest(val)
                                                }}
                                                placeholder="e.g. 1200000"
                                                step="1"
                                                min="0"
                                                onKeyDown={(e) => {
                                                    if (e.key === '.' || e.key === 'e' || e.key === '-') e.preventDefault()
                                                }}
                                            />
                                        </div>
                                    </div>
                                </>)}

                                {(category === "Scholarship" || category === "Scholarships") && (
                                    <div className="mb-4">
                                        <Label htmlFor="program">Program</Label>
                                        <Select value={program} onValueChange={setProgram}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select Program" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Undergraduate Scholarships">Undergraduate Scholarships</SelectItem>
                                                <SelectItem value="Postgraduate Scholarships">Postgraduate Scholarships</SelectItem>
                                                <SelectItem value="Ph.D Scholarships">Ph.D Scholarships</SelectItem>
                                                <SelectItem value="High School Scholarships">High School Scholarships</SelectItem>
                                                <SelectItem value="Higher Secondary Scholarships">Higher Secondary Scholarships</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}

                                {(category === "Career" || category === "Careers") && (
                                    <div className="mb-4">
                                        <Label htmlFor="careerType">Career Type</Label>
                                        <div className="flex gap-2">
                                            <Select value={careerType} onValueChange={setCareerType}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select Career Type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {careerTypes.map((type) => (
                                                        <SelectItem key={type.id} value={type.name}>
                                                            {type.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <Button
                                                variant="outline"
                                                onClick={() => setIsCreatingCareerType(true)}
                                            >
                                                +
                                            </Button>
                                        </div>

                                        {isCreatingCareerType && (
                                            <div className="flex flex-col gap-2 mt-2 p-3 border rounded-md bg-white">
                                                <Input
                                                    value={newCareerType}
                                                    onChange={(e) => setNewCareerType(e.target.value)}
                                                    placeholder="New Career Type Name"
                                                />
                                                <div className="flex items-center gap-2">
                                                    {newCareerTypeImage && (
                                                        <img src={newCareerTypeImage} alt="Cover" className="h-8 w-8 object-cover rounded" />
                                                    )}
                                                    <Label htmlFor="ct-upload" className="cursor-pointer text-xs text-blue-600 border px-2 py-1 rounded">
                                                        {newCareerTypeImage ? "Change Cover" : "Upload Cover"}
                                                    </Label>
                                                    <Input
                                                        id="ct-upload"
                                                        type="file"
                                                        className="hidden"
                                                        accept="image/*"
                                                        onChange={handleCareerTypeImageUpload}
                                                    />
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button size="sm" onClick={handleCreateCareerType}>Save</Button>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() => setIsCreatingCareerType(false)}
                                                    >
                                                        Cancel
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {(() => {
                                    return (
                                        <>
                                            {!isSubCategory && (category === "College" || category === "Colleges" || category === "Article" || category === "Exam" || category === "Exams") && (
                                                <div className="mb-4">
                                                    <Label htmlFor="branch">Branch</Label>
                                                    {(category === "College" || category === "Colleges") ? (
                                                        <MultiSelect
                                                            options={BRANCHES_LIST.map(b => ({ label: b, value: b }))}
                                                            selected={branch ? branch.split(",").map(b => b.trim()).filter(Boolean) : []}
                                                            onChange={(val) => setBranch(val.join(","))}
                                                            placeholder="Select Branches"
                                                        />
                                                    ) : (
                                                        <Select value={branch} onValueChange={setBranch}>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Select Branch" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {BRANCHES_LIST.map((b) => (
                                                                    <SelectItem key={b} value={b}>
                                                                        {b}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    )}
                                                </div>
                                            )}

                                            <div>
                                                <Label htmlFor="title">Page Title *</Label>
                                                <Input
                                                    id="title"
                                                    value={title}
                                                    onChange={(e) => setTitle(e.target.value)}
                                                    placeholder="e.g. About Us"
                                                />
                                            </div>

                                            {!isSubCategory && (
                                                <div>
                                                    <Label htmlFor="headerTitle">Header Title (Optional)</Label>
                                                    <Input
                                                        id="headerTitle"
                                                        value={headerTitle}
                                                        onChange={(e) => setHeaderTitle(e.target.value)}
                                                        placeholder="Title shown in the header section"
                                                    />
                                                </div>
                                            )}

                                            {!isSubCategory && (
                                                <div>
                                                    <Label htmlFor="headerLogo">Header Logo URL</Label>
                                                    <div className="flex items-center justify-between mb-2">
                                                        <div className="text-sm text-gray-500">
                                                            {showHeaderLogo ? "Logo Shown" : "Logo Hidden"}
                                                        </div>
                                                        <Switch checked={showHeaderLogo} onCheckedChange={setShowHeaderLogo} />
                                                    </div>
                                                    {showHeaderLogo && (
                                                        <Input
                                                            id="headerLogo"
                                                            value={headerLogo}
                                                            onChange={(e) => setHeaderLogo(e.target.value)}
                                                            placeholder="https://..."
                                                        />
                                                    )}
                                                </div>
                                            )}

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="flex items-center justify-between border p-3 rounded-md">
                                                    <div className="space-y-0.5">
                                                        <Label>Published</Label>
                                                        <div className="text-sm text-gray-500">
                                                            {published ? "Visible to public" : "Draft mode"}
                                                        </div>
                                                    </div>
                                                    <Switch
                                                        checked={published}
                                                        onCheckedChange={setPublished}
                                                    />
                                                </div>

                                                {!isSubCategory && (
                                                    <div className="flex items-center justify-between border p-3 rounded-md">
                                                        <div className="space-y-0.5">
                                                            <Label>{category === "Article" ? "Featured Article" : "Featured"}</Label>
                                                            <div className="text-sm text-gray-500">
                                                                {category === "Article" ? "Show in featured article section" : "Show in home page"}
                                                            </div>
                                                        </div>
                                                        <Switch
                                                            checked={featured}
                                                            onCheckedChange={setFeatured}
                                                        />
                                                    </div>
                                                )}

                                                {!isSubCategory && category === "Article" && (
                                                    <div className="flex items-center justify-between border p-3 rounded-md">
                                                        <div className="space-y-0.5">
                                                            <Label>Popular Article</Label>
                                                            <div className="text-sm text-gray-500">
                                                                Show in popular article section
                                                            </div>
                                                        </div>
                                                        <Switch
                                                            checked={popular}
                                                            onCheckedChange={setPopular}
                                                        />
                                                    </div>
                                                )}
                                            </div>

                                            {!isSubCategory && (
                                                <div>
                                                    <Label htmlFor="headerBgImage">Header Background URL</Label>
                                                    <Input
                                                        id="headerBgImage"
                                                        value={headerBgImage}
                                                        onChange={(e) => setHeaderBgImage(e.target.value)}
                                                        placeholder="https://..."
                                                    />
                                                    <div className="mt-2">
                                                        <Label htmlFor="upload-bg" className="cursor-pointer inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800">
                                                            <Upload className="w-4 h-4" />
                                                            Upload Image
                                                        </Label>
                                                        <Input
                                                            id="upload-bg"
                                                            type="file"
                                                            accept="image/*"
                                                            className="hidden"
                                                            onChange={handleImageUpload}
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            {!isSubCategory && (
                                                <div>
                                                    <Label htmlFor="cardImage">Card Image URL (for Popular Colleges)</Label>
                                                    <Input
                                                        id="cardImage"
                                                        value={cardImage}
                                                        onChange={(e) => setCardImage(e.target.value)}
                                                        placeholder="https://..."
                                                    />
                                                    <div className="mt-2">
                                                        <Label htmlFor="upload-card-bg" className="cursor-pointer inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800">
                                                            <Upload className="w-4 h-4" />
                                                            Upload Card Image
                                                        </Label>
                                                        <Input
                                                            id="upload-card-bg"
                                                            type="file"
                                                            accept="image/*"
                                                            className="hidden"
                                                            onChange={handleCardImageUpload}
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            {!isSubCategory && category !== "Article" && category !== "Board" && category !== "Courses" && category !== "Course" && category !== "Exam" && category !== "Exams" && category !== "Olympiad" && category !== "Olympiads" && category !== "Scholarship" && category !== "Scholarships" && category !== "Career" && category !== "Careers" && (
                                                <div>
                                                    <Label htmlFor="locationLabel">Location Label</Label>
                                                    <Select value={locationLabel} onValueChange={(val) => {
                                                        if (val === "create_new_city") {
                                                            setIsCityDialogOpen(true)
                                                        } else {
                                                            setLocationLabel(val)
                                                        }
                                                    }}>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select City" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="create_new_city" className="font-semibold text-blue-600">
                                                                + Create New City
                                                            </SelectItem>
                                                            {citiesList.map((city) => (
                                                                <SelectItem key={city.id} value={city.name}>
                                                                    {city.name}
                                                                </SelectItem>
                                                            ))}
                                                            {/* Fallback if current value isn't in list (e.g. legacy data) */}
                                                            {locationLabel && !citiesList.some(c => c.name === locationLabel) && (
                                                                <SelectItem value={locationLabel}>{locationLabel}</SelectItem>
                                                            )}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            )}

                                            {!isSubCategory && (category === "Courses" || category === "Course") && (
                                                <div className="space-y-4">
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <Label htmlFor="courseDuration">Duration</Label>
                                                            <Input
                                                                id="courseDuration"
                                                                value={courseDuration}
                                                                onChange={(e) => setCourseDuration(e.target.value)}
                                                                placeholder="e.g. 4 Years"
                                                            />
                                                        </div>
                                                        <div>
                                                            <Label htmlFor="avgFees">Avg Fees</Label>
                                                            <Input
                                                                id="avgFees"
                                                                value={avgFees}
                                                                onChange={(e) => setAvgFees(e.target.value)}
                                                                placeholder="e.g. 2.5 L"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="courseType">Course Type</Label>
                                                        <MultiSelect
                                                            options={COURSE_TYPES.map(t => ({ label: t, value: t }))}
                                                            selected={courseType ? courseType.split("|").map(t => t.trim()).filter(Boolean) : []}
                                                            onChange={(val) => setCourseType(val.join("|"))}
                                                            placeholder="Select Course Types"
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            {!isSubCategory && (category === "Exam" || category === "Exams") && (
                                                <>
                                                    <div className="grid grid-cols-3 gap-4 mb-4">
                                                        {/* Application Date */}
                                                        <div className="flex flex-col gap-2">
                                                            <Label htmlFor="applicationDate">Application Form Date</Label>
                                                            <Popover>
                                                                <PopoverTrigger asChild>
                                                                    <Button
                                                                        variant={"outline"}
                                                                        className={cn(
                                                                            "w-full justify-start text-left font-normal",
                                                                            !applicationDate && "text-muted-foreground"
                                                                        )}
                                                                    >
                                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                                        {applicationDate ? applicationDate : <span>Pick a date</span>}
                                                                    </Button>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-auto p-0" align="start">
                                                                    <Calendar
                                                                        mode="single"
                                                                        selected={applicationDate ? new Date(applicationDate) : undefined}
                                                                        onSelect={(date) => setApplicationDate(date ? format(date, "PPP") : "")}
                                                                        initialFocus
                                                                    />
                                                                </PopoverContent>
                                                            </Popover>
                                                        </div>

                                                        {/* Exam Date */}
                                                        <div className="flex flex-col gap-2">
                                                            <Label htmlFor="examDate">Exam Date</Label>
                                                            <Popover>
                                                                <PopoverTrigger asChild>
                                                                    <Button
                                                                        variant={"outline"}
                                                                        className={cn(
                                                                            "w-full justify-start text-left font-normal",
                                                                            !examDate && "text-muted-foreground"
                                                                        )}
                                                                    >
                                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                                        {examDate ? examDate : <span>Pick a date</span>}
                                                                    </Button>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-auto p-0" align="start">
                                                                    <Calendar
                                                                        mode="single"
                                                                        selected={examDate ? new Date(examDate) : undefined}
                                                                        onSelect={(date) => setExamDate(date ? format(date, "PPP") : "")}
                                                                        initialFocus
                                                                    />
                                                                </PopoverContent>
                                                            </Popover>
                                                        </div>

                                                        {/* Result Date */}
                                                        <div className="flex flex-col gap-2">
                                                            <Label htmlFor="resultDate">Result Date</Label>
                                                            <Popover>
                                                                <PopoverTrigger asChild>
                                                                    <Button
                                                                        variant={"outline"}
                                                                        className={cn(
                                                                            "w-full justify-start text-left font-normal",
                                                                            !resultDate && "text-muted-foreground"
                                                                        )}
                                                                    >
                                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                                        {resultDate ? resultDate : <span>Pick a date</span>}
                                                                    </Button>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-auto p-0" align="start">
                                                                    <Calendar
                                                                        mode="single"
                                                                        selected={resultDate ? new Date(resultDate) : undefined}
                                                                        onSelect={(date) => setResultDate(date ? format(date, "PPP") : "")}
                                                                        initialFocus
                                                                    />
                                                                </PopoverContent>
                                                            </Popover>
                                                        </div>

                                                        {/* Level of Exam */}
                                                        <div>
                                                            <Label htmlFor="examLevel">Level of Exam</Label>
                                                            <Select value={examLevel} onValueChange={setExamLevel}>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select Level of Exam" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="National">National</SelectItem>
                                                                    <SelectItem value="State">State</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>

                                                        {/* Level (UG/PG for Exams) */}
                                                        <div>
                                                            <Label htmlFor="level">Level</Label>
                                                            <Select value={level} onValueChange={setLevel}>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select Level" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="Under Graduate">Under Graduate</SelectItem>
                                                                    <SelectItem value="Post Graduate">Post Graduate</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>

                                                        {/* Mode */}
                                                        <div>
                                                            <Label htmlFor="examMode">Mode</Label>
                                                            <Select value={examMode} onValueChange={setExamMode}>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select Mode" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="Online">Online</SelectItem>
                                                                    <SelectItem value="Offline">Offline</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                    </div>

                                                    {/* Course Type for Exams */}
                                                    <div className="mb-4">
                                                        <Label htmlFor="courseType">Course Type</Label>
                                                        <MultiSelect
                                                            options={COURSE_TYPES.map(t => ({ label: t, value: t }))}
                                                            selected={courseType ? courseType.split("|").map(t => t.trim()).filter(Boolean) : []}
                                                            onChange={(val) => setCourseType(val.join("|"))}
                                                            placeholder="Select Course Types"
                                                        />
                                                    </div>
                                                </>
                                            )}

                                            {!isSubCategory && (
                                                <div>
                                                    <Label htmlFor="authorId">Author Profile (Linked)</Label>
                                                    <Select value={authorId} onValueChange={(val) => setAuthorId(val)}>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select Author profile" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="none">No Profile</SelectItem>
                                                            {authorsList.map((auth) => (
                                                                <SelectItem key={auth.id} value={auth.id}>
                                                                    {auth.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            )}

                                            {!isSubCategory && (
                                                <div>
                                                    <Label htmlFor="publishDate">Publish Date (Auto-updated)</Label>
                                                    <Input
                                                        id="publishDate"
                                                        type="date"
                                                        value={publishDate}
                                                        readOnly
                                                        disabled
                                                        className="bg-gray-100"
                                                    />
                                                </div>
                                            )}

                                            {!isSubCategory && (
                                                <div className="space-y-4 border p-3 rounded-md">
                                                    <Label className="text-xs font-semibold uppercase text-gray-500">Header Buttons</Label>

                                                    {/* Button 1 Configuration */}
                                                    <div className="space-y-2 p-2 border border-gray-100 rounded bg-gray-50/50">
                                                        <div className="flex items-center justify-between">
                                                            <Label className="text-sm font-medium">Button 1</Label>
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-[10px] text-gray-500 uppercase tracking-wider">{showBtn1 ? "Shown" : "Hidden"}</span>
                                                                <Switch checked={showBtn1} onCheckedChange={setShowBtn1} />
                                                            </div>
                                                        </div>
                                                        {showBtn1 && (
                                                            <div className="grid grid-cols-2 gap-2 mt-2">
                                                                <Input
                                                                    placeholder="Button 1 Text"
                                                                    value={headerBtn1Text}
                                                                    onChange={e => setHeaderBtn1Text(e.target.value)}
                                                                />
                                                                <Input
                                                                    placeholder="Button 1 Link"
                                                                    value={headerBtn1Link}
                                                                    onChange={e => setHeaderBtn1Link(e.target.value)}
                                                                />
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Button 2 Configuration */}
                                                    <div className="space-y-2 p-2 border border-gray-100 rounded bg-gray-50/50">
                                                        <div className="flex items-center justify-between">
                                                            <Label className="text-sm font-medium">Button 2</Label>
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-[10px] text-gray-500 uppercase tracking-wider">{showBtn2 ? "Shown" : "Hidden"}</span>
                                                                <Switch checked={showBtn2} onCheckedChange={setShowBtn2} />
                                                            </div>
                                                        </div>
                                                        {showBtn2 && (
                                                            <div className="grid grid-cols-2 gap-2 mt-2">
                                                                <Input
                                                                    placeholder="Button 2 Text"
                                                                    value={headerBtn2Text}
                                                                    onChange={e => setHeaderBtn2Text(e.target.value)}
                                                                />
                                                                <Input
                                                                    placeholder="Button 2 Link"
                                                                    value={headerBtn2Link}
                                                                    onChange={e => setHeaderBtn2Link(e.target.value)}
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            <div className="pt-4 border-t">
                                                <div className="mb-4">
                                                    <Label htmlFor="slug">Slug (URL Path) *</Label>
                                                    <Input
                                                        id="slug"
                                                        value={slug}
                                                        onChange={(e) => setSlug(e.target.value)}
                                                        placeholder="e.g. about-us"
                                                    />
                                                </div>
                                                {!isSubCategory && (
                                                    <div>
                                                        <Label htmlFor="description">Description (SEO)</Label>
                                                        <Textarea
                                                            id="description"
                                                            value={description}
                                                            onChange={(e) => setDescription(e.target.value)}
                                                            placeholder="Short description for SEO"
                                                        />
                                                    </div>
                                                )}

                                                {isSubCategory && (
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 p-4 border rounded-lg bg-gray-50/50">
                                                        <div className="md:col-span-2">
                                                            <h3 className="text-sm font-semibold uppercase text-gray-500 mb-2">Metadata Details</h3>
                                                        </div>

                                                        {/* Stream / Branch */}
                                                        <div>
                                                            <Label>Stream</Label>
                                                            <MultiSelect
                                                                options={BRANCHES_LIST.map(b => ({ label: b, value: b }))}
                                                                selected={branch ? branch.split(",").map(b => b.trim()).filter(Boolean) : []}
                                                                onChange={(val) => setBranch(val.join(","))}
                                                                placeholder="Select Streams"
                                                            />
                                                        </div>

                                                        {/* State */}
                                                        <div>
                                                            <Label htmlFor="state">State</Label>
                                                            <Select value={state} onValueChange={setState}>
                                                                <SelectTrigger className="w-full">
                                                                    <SelectValue placeholder="Select State" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    {INDIAN_STATES.map((s) => (
                                                                        <SelectItem key={s} value={s}>{s}</SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                        </div>

                                                        {/* Degree */}
                                                        <div>
                                                            <Label>Degree</Label>
                                                            <MultiSelect
                                                                options={DEGREES.map(d => ({ label: d, value: d }))}
                                                                selected={degree ? degree.split("|").map(d => d.trim()).filter(Boolean) : []}
                                                                onChange={(val) => setDegree(val.join("|"))}
                                                                placeholder="Select Degrees"
                                                            />
                                                        </div>

                                                        {/* Type Of College */}
                                                        <div>
                                                            <Label htmlFor="collegeType">Type Of College</Label>
                                                            <Select value={collegeType} onValueChange={setCollegeType}>
                                                                <SelectTrigger className="w-full">
                                                                    <SelectValue placeholder="Select College Type" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    {COLLEGE_TYPES.map((t) => (
                                                                        <SelectItem key={t} value={t}>{t}</SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                        </div>

                                                        {/* Institute Type */}
                                                        <div>
                                                            <Label>Institute Type</Label>
                                                            <MultiSelect
                                                                options={INSTITUTE_TYPES.map(t => ({ label: t, value: t }))}
                                                                selected={instituteType ? instituteType.split("|").map(t => t.trim()).filter(Boolean) : []}
                                                                onChange={(val) => setInstituteType(val.join("|"))}
                                                                placeholder="Select Institute Types"
                                                            />
                                                        </div>

                                                        {/* Entrance/Exam Accepted */}
                                                        <div>
                                                            <Label>Entrance/Exam Accepted</Label>
                                                            <MultiSelect
                                                                options={examsList.map(t => ({ label: t.title, value: t.title }))}
                                                                selected={examAccepted ? examAccepted.split("|").map(t => t.trim()).filter(Boolean) : []}
                                                                onChange={(val) => setExamAccepted(val.join("|"))}
                                                                placeholder="Select Exams"
                                                            />
                                                        </div>

                                                        {/* Total Fee */}
                                                        <div>
                                                            <Label>Total Fee</Label>
                                                            <MultiSelect
                                                                options={TOTAL_FEES_RANGES.map(t => ({ label: t, value: t }))}
                                                                selected={totalFees ? totalFees.split("|").map(t => t.trim()).filter(Boolean) : []}
                                                                onChange={(val) => setTotalFees(val.join("|"))}
                                                                placeholder="Select Fees Range"
                                                            />
                                                        </div>

                                                        {/* Course Type */}
                                                        <div>
                                                            <Label>Course Type</Label>
                                                            <MultiSelect
                                                                options={COURSE_TYPES.map(t => ({ label: t, value: t }))}
                                                                selected={courseType ? courseType.split("|").map(t => t.trim()).filter(Boolean) : []}
                                                                onChange={(val) => setCourseType(val.join("|"))}
                                                                placeholder="Select Course Types"
                                                            />
                                                        </div>

                                                        {/* Duration */}
                                                        <div>
                                                            <Label htmlFor="courseDuration">Duration</Label>
                                                            <Select value={courseDuration} onValueChange={setCourseDuration}>
                                                                <SelectTrigger className="w-full">
                                                                    <SelectValue placeholder="Select Duration" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    {COURSE_DURATIONS.map((d) => (
                                                                        <SelectItem key={d} value={d}>{d}</SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                        </div>

                                                        {/* Gender */}
                                                        <div>
                                                            <Label htmlFor="genderAccepted">Gender</Label>
                                                            <Select value={genderAccepted} onValueChange={setGenderAccepted}>
                                                                <SelectTrigger className="w-full">
                                                                    <SelectValue placeholder="Select Gender" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    {GENDER_ACCEPTED.map((g) => (
                                                                        <SelectItem key={g} value={g}>{g}</SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </>
                                    )
                                })()}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>SEO Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="seoMetaTitle">Meta Title</Label>
                                    <Input
                                        id="seoMetaTitle"
                                        value={seoMetaTitle}
                                        onChange={(e) => setSeoMetaTitle(e.target.value)}
                                        placeholder="e.g. Best Engineering Colleges in India"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="metaDescription">Meta Description</Label>
                                    <Textarea
                                        id="metaDescription"
                                        value={metaDescription}
                                        onChange={(e) => setMetaDescription(e.target.value)}
                                        placeholder="Enter a brief description for SEO"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>FAQs</CardTitle>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={handleAddFaq}
                                    className="h-8 w-8 p-0"
                                >
                                    <Plus className="w-4 h-4" />
                                </Button>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {faqs.map((faq, index) => (
                                    <div key={index} className="border rounded p-3 space-y-2 relative bg-white">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="absolute top-1 right-1 h-6 w-6 text-red-500"
                                            onClick={() => handleRemoveFaq(index)}
                                        >
                                            <Trash2 className="w-3 h-3" />
                                        </Button>
                                        <Input
                                            value={faq.title}
                                            onChange={(e) => handleFaqChange(index, "title", e.target.value)}
                                            placeholder="Group (Optional)"
                                            className="h-8 text-sm"
                                        />
                                        <Input
                                            value={faq.question}
                                            onChange={(e) => handleFaqChange(index, "question", e.target.value)}
                                            placeholder="Question"
                                            className="h-8 text-sm font-medium"
                                        />
                                        <Textarea
                                            value={faq.answer}
                                            onChange={(e) => handleFaqChange(index, "answer", e.target.value)}
                                            placeholder="Answer"
                                            className="min-h-[60px] text-sm"
                                        />
                                    </div>
                                ))}
                                {faqs.length === 0 && <p className="text-sm text-gray-500">No FAQs added.</p>}
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Content Sections */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>{currentTab.label} Sections</CardTitle>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => handleAddSection(currentTab.id)}
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Add Section
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-6 p-6">
                            {(sectionsByType[currentTab.id] || []).length === 0 && (
                                <div className="text-center py-10 border-2 border-dashed rounded-lg bg-gray-50">
                                    <p className="text-gray-500">No content sections yet for {currentTab.label}.</p>
                                    <Button variant="link" onClick={() => handleAddSection(currentTab.id)}>Add your first section</Button>
                                </div>
                            )}
                            {(sectionsByType[currentTab.id] || []).map((section, index) => (
                                <div
                                    key={index}
                                    className="border rounded-xl p-4 space-y-4 bg-white shadow-sm"
                                >
                                    <div className="flex items-center justify-between">
                                        <Label className="text-base font-semibold">Section {index + 1}</Label>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleRemoveSection(currentTab.id, index)}
                                        >
                                            <Trash2 className="w-4 h-4 text-red-500" />
                                        </Button>
                                    </div>
                                    <Input
                                        value={section.title}
                                        onChange={(e) =>
                                            handleSectionChange(currentTab.id, index, "title", e.target.value)
                                        }
                                        placeholder="Section Title (e.g. Introduction)"
                                    />
                                    <div>
                                        <Label className="mb-2 block text-sm font-medium text-gray-700">Content</Label>
                                        <RichTextEditor
                                            value={section.content}
                                            onChange={(val) => handleSectionChange(currentTab.id, index, "content", val)}
                                            height={300}
                                            placeholder="Write your content here..."
                                        />
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Create Category Dialog */}
            <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Category</DialogTitle>
                        <DialogDescription>
                            Add a new category for pages. This will appear in the admin sidebar.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="cat-name">Category Name</Label>
                            <Input
                                id="cat-name"
                                value={newCategoryName}
                                onChange={(e) => setNewCategoryName(e.target.value)}
                                placeholder="e.g. Technology"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="cat-icon">Category Icon</Label>
                            <div className="flex items-center gap-4">
                                {newCategoryIcon && (
                                    <img src={newCategoryIcon} alt="Icon" className="h-10 w-10 object-contain border rounded" />
                                )}
                                <div>
                                    <Label htmlFor="upload-icon" className="cursor-pointer inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 border px-3 py-2 rounded-md">
                                        <Upload className="w-4 h-4" />
                                        Upload Icon
                                    </Label>
                                    <Input
                                        id="upload-icon"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleCategoryIconUpload}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsCategoryDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleCreateCategory}>Create Category</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Create City Dialog */}
            <CityDialog
                open={isCityDialogOpen}
                onOpenChange={setIsCityDialogOpen}
                onSuccess={handleCitySuccess}
            />

            {/* Create Tab Dialog */}
            <Dialog open={isTabDialogOpen} onOpenChange={setIsTabDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Tab</DialogTitle>
                        <DialogDescription>
                            Create a new section tab for this page (e.g., "Courses", "Placement").
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="tab-name">Tab Name</Label>
                            <Input
                                id="tab-name"
                                value={newTabName}
                                onChange={(e) => setNewTabName(e.target.value)}
                                placeholder="e.g. Placement"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsTabDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleCreateTab}>Create Tab</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
