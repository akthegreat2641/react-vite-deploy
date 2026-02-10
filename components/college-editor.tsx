"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { RichTextEditor } from "@/components/rich-text-editor"
import { Card, CardHeader, CardTitle, CardContent } from "@/iit-madras-website/components/ui/card"
import { Plus, Trash2, ArrowLeft, Save, ChevronRight } from "lucide-react"
import { toast } from "sonner"

interface College {
  id?: string
  name: string
  location: string
  image?: string | null
  logo?: string | null
  featured: boolean
}

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

interface CollegePageData {
  id?: string
  collegeId: string
  slug: string
  headerLogo?: string | null
  headerBgImage?: string | null
  authorName?: string | null
  brochureUrl?: string | null
  location?: string | null
  publishedAt?: string | null
  updatedAt?: string | null
  sections: Section[]
  faqs: Faq[]
}

interface CollegeEditorProps {
  collegeId?: string
}

export function CollegeEditor({ collegeId }: CollegeEditorProps) {
  const router = useRouter()
  const isEditing = !!collegeId

  const [loading, setLoading] = useState(isEditing)
  const [saving, setSaving] = useState(false)

  // Basic Info State
  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const [image, setImage] = useState("")
  const [logo, setLogo] = useState("")
  const [featured, setFeatured] = useState(false)

  // Page Data State
  const [page, setPage] = useState<CollegePageData | null>(null)
  const [slug, setSlug] = useState("")
  const [headerLogo, setHeaderLogo] = useState("")
  const [headerBgImage, setHeaderBgImage] = useState("")
  const [authorName, setAuthorName] = useState("")
  const [brochureUrl, setBrochureUrl] = useState("")
  const [headerLocation, setHeaderLocation] = useState("")
  const [publishedAt, setPublishedAt] = useState<string | null>(null)
  const [updatedAt, setUpdatedAt] = useState<string | null>(null)

  const TABS = [
    { id: "INFO", label: "General Info" },
    { id: "CUTOFF", label: "Cutoff" },
    { id: "COURSES", label: "Courses & Fees" },
    { id: "ADMISSION", label: "Admission" },
    { id: "REVIEWS", label: "Reviews" },
    { id: "PLACEMENTS", label: "Placements" },
    { id: "RESULT", label: "Result" },
    { id: "INFRASTRUCTURE", label: "Infrastructure" },
    { id: "GALLERY", label: "Gallery" },
    { id: "SCHOLARSHIP", label: "Scholarship" },
    { id: "RANKING", label: "Ranking" },
  ]

  const [currentStep, setCurrentStep] = useState(0)
  const currentTab = TABS[currentStep]

  // Unified state for all sections, keyed by SectionType
  const [sectionsByType, setSectionsByType] = useState<Record<string, Section[]>>({})
  const [faqs, setFaqs] = useState<Faq[]>([])

  useEffect(() => {
    if (!collegeId) return

    async function fetchData() {
      try {
        setLoading(true)

        const [collegeRes, pageRes] = await Promise.all([
          fetch(`/api/colleges/${collegeId}`),
          fetch(`/api/college-pages?collegeId=${collegeId}`),
        ])

        if (collegeRes.ok) {
          const collegeData = await collegeRes.json()
          setName(collegeData.name)
          setLocation(collegeData.location)
          setImage(collegeData.image || "")
          setLogo(collegeData.logo || "")
          setFeatured(collegeData.featured)

          const defaultSlug = collegeData.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "")
          setSlug((prev) => prev || defaultSlug)
          setHeaderLocation((prev) => prev || collegeData.location || "")
        }

        if (pageRes.ok) {
          let pageData = await pageRes.json()
          if (Array.isArray(pageData)) {
            pageData = pageData[0] || null
          }

          if (pageData) {
            setPage(pageData)
            setSlug(pageData.slug || "")
            setHeaderLogo(pageData.headerLogo || "")
            setHeaderBgImage(pageData.headerBgImage || "")
            setAuthorName(pageData.authorName || "")
            setBrochureUrl(pageData.brochureUrl || "")
            setHeaderLocation(pageData.location || "")
            setPublishedAt(pageData.publishedAt || null)
            setUpdatedAt(pageData.updatedAt || null)

            // Group sections by type
            const grouped: Record<string, Section[]> = {}
            TABS.forEach(t => grouped[t.id] = [])

            if (pageData.sections) {
              pageData.sections.forEach((s: any) => {
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
              (pageData.faqs || []).map((f: any, index: number) => ({
                id: f.id,
                title: f.title,
                question: f.question,
                answer: f.answer,
                order: f.order ?? index,
              })),
            )
          }
        }
      } catch (error) {
        console.error("Failed to load college data:", error)
        toast.error("Failed to load college data")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [collegeId])

  // Helper to auto-generate slug
  useEffect(() => {
    if (!isEditing && name && !slug) {
      const generatedSlug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "")
      setSlug(generatedSlug)
    }
  }, [name, isEditing])

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
    if (!name) {
      toast.error("College Name is required")
      return
    }
    if (!slug) {
      toast.error("Slug is required")
      return
    }

    setSaving(true)
    try {
      // 1. Save College Basic Info
      const collegePayload = { name, location, image, logo, featured }
      let savedCollegeId = collegeId

      if (isEditing) {
        const res = await fetch(`/api/colleges/${collegeId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(collegePayload),
        })
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}))
          throw new Error(errorData.details || errorData.error || "Failed to update college info")
        }
      } else {
        const res = await fetch("/api/colleges", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(collegePayload),
        })
        if (!res.ok) throw new Error("Failed to create college")
        const newCollege = await res.json()
        savedCollegeId = newCollege.id
      }

      if (!savedCollegeId) throw new Error("No college ID found")

      // Flatten all sections
      const allSections = Object.values(sectionsByType).flat().map((s, i) => ({
        title: s.title,
        content: s.content,
        order: i, // Global order or per-type order? Let's keep it simple for now
        type: s.type || "INFO"
      }))

      // 2. Save College Page Data
      const pagePayload: any = {
        collegeId: savedCollegeId,
        slug,
        headerLogo,
        headerBgImage,
        authorName,
        brochureUrl,
        location: headerLocation,
        sections: allSections,
        faqs: faqs.map((f, index) => ({
          title: f.title,
          question: f.question,
          answer: f.answer,
          order: index,
        })),
      }

      let pageRes
      if (page?.id) {
        pageRes = await fetch(`/api/college-pages/${page.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pagePayload),
        })
      } else {
        pageRes = await fetch("/api/college-pages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pagePayload),
        })
      }

      if (!pageRes.ok) {
        const errorData = await pageRes.json().catch(() => ({}))
        throw new Error(errorData.details || errorData.error || "Failed to save college page details")
      }

      const savedPage = await pageRes.json()
      setPage(savedPage)
      setPublishedAt(savedPage.publishedAt || savedPage.updatedAt || null)
      setUpdatedAt(savedPage.updatedAt || null)

      toast.success("College saved successfully")

      if (!isEditing) {
        router.push(`/admin/colleges/${savedCollegeId}`)
      }

    } catch (error) {
      console.error(error)
      toast.error(error instanceof Error ? error.message : "Failed to save college")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="p-6">Loading college data...</div>
  }

  const displayPublished =
    publishedAt || updatedAt
      ? new Date(publishedAt || updatedAt as string).toLocaleString()
      : "Not set"

  const isLastStep = currentStep === TABS.length - 1
  const currentSections = sectionsByType[currentTab.id] || []

  return (
    <div className="min-h-screen bg-gray-50 p-4 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              if (currentStep > 0) {
                setCurrentStep(prev => prev - 1)
              } else {
                router.back()
              }
            }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {currentStep > 0 ? "Back" : "Exit"}
          </Button>
          <div>
            <h1 className="text-xl font-semibold">
              {isEditing ? `Edit College – ${name}` : "Add New College"}
            </h1>
            <p className="text-sm text-gray-500">
              Step {currentStep + 1} of {TABS.length}: {currentTab.label}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          {!isLastStep ? (
            <Button onClick={() => setCurrentStep(prev => prev + 1)}>
              Next: {TABS[currentStep + 1].label}
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleSave} disabled={saving}>
              <Save className="w-4 h-4 mr-2" />
              {saving ? "Saving..." : "Save College"}
            </Button>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
        <div
          className="bg-blue-600 h-full transition-all duration-300"
          style={{ width: `${((currentStep + 1) / TABS.length) * 100}%` }}
        />
      </div>

      {/* Step 1: General Info (Special Case) */}
      {currentTab.id === "INFO" && (
        <>
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">College Name *</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. IIT Madras"
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Chennai, India"
                  />
                </div>
                <div>
                  <Label htmlFor="image">Card Image URL</Label>
                  <Input
                    id="image"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <Label htmlFor="logo">Logo URL</Label>
                  <Input
                    id="logo"
                    value={logo}
                    onChange={(e) => setLogo(e.target.value)}
                    placeholder="https://..."
                  />
                </div>
                <div className="flex items-center gap-2 md:col-span-2">
                  <Switch
                    id="featured"
                    checked={featured}
                    onCheckedChange={setFeatured}
                  />
                  <Label htmlFor="featured">Featured College</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Header configuration */}
          <Card>
            <CardHeader>
              <CardTitle>Page Header & Meta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Slug (URL Path) *</Label>
                  <Input
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="e.g. iit-madras"
                  />
                </div>
                <div>
                  <Label>Header Logo (URL)</Label>
                  <Input
                    value={headerLogo}
                    onChange={(e) => setHeaderLogo(e.target.value)}
                    placeholder="https://example.com/logo.png"
                  />
                </div>
                <div>
                  <Label>Header Background Image (URL)</Label>
                  <Input
                    value={headerBgImage}
                    onChange={(e) => setHeaderBgImage(e.target.value)}
                    placeholder="https://example.com/header-bg.jpg"
                  />
                </div>
                <div>
                  <Label>Page Location Label</Label>
                  <Input
                    value={headerLocation}
                    onChange={(e) => setHeaderLocation(e.target.value)}
                    placeholder={location || "Same as basic info"}
                  />
                </div>
                <div>
                  <Label>Author Name</Label>
                  <Input
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="Author name"
                  />
                </div>
                <div>
                  <Label>Brochure Link (URL)</Label>
                  <Input
                    value={brochureUrl}
                    onChange={(e) => setBrochureUrl(e.target.value)}
                    placeholder="https://example.com/brochure.pdf"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Publish Date</Label>
                  <Input
                    value={displayPublished}
                    readOnly
                    className="bg-gray-100"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQs (Only on Info tab) */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>FAQs</CardTitle>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddFaq}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add FAQ
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {faqs.length === 0 && (
                <p className="text-sm text-gray-500">
                  No FAQs yet. Click &quot;Add FAQ&quot; to create the first FAQ.
                </p>
              )}
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border rounded-md p-4 space-y-3 bg-white"
                >
                  <div className="flex items-center justify-between">
                    <Label>FAQ {index + 1} Title</Label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveFaq(index)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                  <Input
                    value={faq.title}
                    onChange={(e) => handleFaqChange(index, "title", e.target.value)}
                    placeholder="FAQ title"
                  />
                  <div>
                    <Label>Question</Label>
                    <Input
                      value={faq.question}
                      onChange={(e) =>
                        handleFaqChange(index, "question", e.target.value)
                      }
                      placeholder="FAQ question"
                    />
                  </div>
                  <div>
                    <Label>Answer</Label>
                    <Textarea
                      value={faq.answer}
                      onChange={(e) =>
                        handleFaqChange(index, "answer", e.target.value)
                      }
                      rows={4}
                      placeholder="FAQ answer"
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </>
      )}

      {/* Dynamic Section Editor (For all tabs) */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{currentTab.label} Sections</CardTitle>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleAddSection(currentTab.id)}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Section
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {currentSections.length === 0 && (
            <p className="text-sm text-gray-500">
              No sections for {currentTab.label} yet. Click &quot;Add Section&quot; to create content.
            </p>
          )}
          {currentSections.map((section, index) => (
            <div
              key={index}
              className="border rounded-md p-4 space-y-3 bg-white"
            >
              <div className="flex items-center justify-between">
                <Label>Section {index + 1} Title</Label>
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
                placeholder="Section title"
              />
              <div>
                <Label>Content</Label>
                <RichTextEditor
                  value={section.content}
                  onChange={(val) => handleSectionChange(currentTab.id, index, "content", val)}
                  height={350}
                  placeholder={`Enter ${currentTab.label} content...`}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
