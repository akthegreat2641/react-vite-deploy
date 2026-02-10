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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Trash2, ArrowLeft, Save, ChevronRight } from "lucide-react"
import { toast } from "sonner"

interface ArticleEditorProps {
    articleId?: string
}

interface Section {
    title: string
    content: string
    order: number
}

export function ArticleEditor({ articleId }: ArticleEditorProps) {
    const router = useRouter()
    const isEditing = !!articleId
    const [loading, setLoading] = useState(isEditing)
    const [saving, setSaving] = useState(false)
    const [published, setPublished] = useState(false)

    // Sections
    const [sections, setSections] = useState<Section[]>([])

    // -- Form State --
    // We organize state roughly by our tabs

    // Step 1: General Info
    const [postType, setPostType] = useState("Article")
    const [postCategory, setPostCategory] = useState("")
    const [examCategory, setExamCategory] = useState("")
    const [genericGroup, setGenericGroup] = useState(false)
    const [exam, setExam] = useState("")
    const [secondary, setSecondary] = useState("")
    const [subjects, setSubjects] = useState<string[]>([])
    const [subjectInput, setSubjectInput] = useState("")
    const [postAs, setPostAs] = useState("Me")
    const [userEmail, setUserEmail] = useState("")
    const [location, setLocation] = useState("")
    const [collegesCount, setCollegesCount] = useState(0)
    const [isPopular, setIsPopular] = useState(false)

    // Step 2: Content
    const [title, setTitle] = useState("")
    const [excerpt, setExcerpt] = useState("")
    const [featuredContentType, setFeaturedContentType] = useState<"Image" | "Video">("Image")
    const [featuredImage, setFeaturedImage] = useState("")
    const [featuredVideo, setFeaturedVideo] = useState("")
    const [caption, setCaption] = useState("")
    const [introductoryText, setIntroductoryText] = useState("")
    const [content, setContent] = useState("")
    const [faqTitle, setFaqTitle] = useState("")

    // Header Config (New)
    const [cutOffButtonText, setCutOffButtonText] = useState("Cut Off")
    const [cutOffButtonLink, setCutOffButtonLink] = useState("")
    const [predictButtonText, setPredictButtonText] = useState("Predict My College")
    const [predictButtonLink, setPredictButtonLink] = useState("")

    // Authors Management
    const [authorsList, setAuthorsList] = useState<any[]>([])
    const [authorId, setAuthorId] = useState("")

    // Step 3: SEO & Publishing
    const [specifyPostDate, setSpecifyPostDate] = useState(false)
    const [postDate, setPostDate] = useState("")
    const [noIndex, setNoIndex] = useState(false)
    const [sendToSEO, setSendToSEO] = useState(false)
    const [isNews, setIsNews] = useState(false)
    const [isFeatured, setIsFeatured] = useState(false)
    const [seoMetaTitle, setSeoMetaTitle] = useState("")
    const [slug, setSlug] = useState("")
    const [canonical, setCanonical] = useState("")
    const [redirect, setRedirect] = useState("")
    const [keywords, setKeywords] = useState("")
    const [metaDescription, setMetaDescription] = useState("")
    const [linkReplacement, setLinkReplacement] = useState("")

    // Step 4: Subscription
    const [subscriptionBox, setSubscriptionBox] = useState(false)
    const [subscriptionBoxDetails, setSubscriptionBoxDetails] = useState("")

    const TABS = [
        { id: "CONTENT", label: "Content Details" },
    ]
    const [currentStep, setCurrentStep] = useState(0)
    const currentTab = TABS[currentStep]
    const isLastStep = currentStep === TABS.length - 1

    // Helpers
    const titleWordCount = title.trim().split(/\s+/).filter(Boolean).length
    const titleError = titleWordCount < 3 || titleWordCount > 200

    const handleAddSubject = () => {
        if (subjectInput.trim()) {
            setSubjects([...subjects, subjectInput.trim()])
            setSubjectInput("")
        }
    }
    const handleRemoveSubject = (index: number) => {
        setSubjects(subjects.filter((_, i) => i !== index))
    }

    // Section Helpers
    const handleAddSection = () => {
        setSections([...sections, { title: "", content: "", order: sections.length }])
    }

    const handleRemoveSection = (index: number) => {
        setSections(sections.filter((_, i) => i !== index))
    }

    const handleSectionChange = (index: number, field: keyof Section, value: any) => {
        setSections(sections.map((s, i) => i === index ? { ...s, [field]: value } : s))
    }

    // Fetch Data if Editing
    useEffect(() => {
        if (!articleId) return
        async function fetchData() {
            try {
                setLoading(true)
                const res = await fetch(`/api/articles/${articleId}`)
                if (res.ok) {
                    const data = await res.json()
                    setTitle(data.title || "")
                    setAuthorId(data.authorId || "")
                    setContent(data.content || "")

                    // Sort sections by order before setting
                    const sortedSections = (data.sections || []).sort((a: Section, b: Section) => a.order - b.order)
                    setSections(sortedSections)

                    setIsFeatured(data.featured || false)
                    setIsPopular(data.popular || false)
                    setCollegesCount(data.colleges || 0)

                    setCutOffButtonText(data.cutOffButtonText || "Cut Off")
                    setCutOffButtonLink(data.cutOffButtonLink || "")
                    setPredictButtonText(data.predictButtonText || "Predict My College")
                    setPredictButtonLink(data.predictButtonLink || "")

                    setSlug(data.slug || "")
                    setSeoMetaTitle(data.seoMetaTitle || "")
                    setCanonical(data.canonical || "")
                    setRedirect(data.redirect || "")
                    setFaqTitle(data.faqTitle || "")
                    setKeywords(data.keywords || "")
                    setMetaDescription(data.metaDescription || "")
                    setPublished(data.published)
                }
            } catch (e) {
                console.error("Failed to fetch article data", e)
                toast.error("Failed to load article data")
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [articleId])

    // Fetch Authors
    useEffect(() => {
        fetch("/api/authors")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setAuthorsList(data)
            })
            .catch(err => console.error(err))
    }, [])


    useEffect(() => {
        if (!isEditing && title && !slug) {
            const generatedSlug = title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)+/g, "")
            setSlug(generatedSlug)
        }
    }, [title, isEditing])

    const handleSave = async (published: boolean) => {
        if (published && (titleError || !title)) {
            toast.error("Please fix the title (3-200 words required)")
            return
        }

        setSaving(true)
        try {
            const payload = {
                title: title || "Draft",
                category: postCategory || "General",
                content,
                image: featuredImage,
                featured: isFeatured,
                popular: isPopular,
                published,
                postType,
                examCategory,
                genericGroup,
                exam,
                secondary,
                subjects: JSON.stringify(subjects),
                postAs,
                userEmail,
                location,
                colleges: collegesCount,
                specifyPostDate,
                postDate: postDate ? new Date(postDate).toISOString() : null,
                noIndex,
                sendToSEO,
                isNews,
                excerpt,
                faqTitle,
                metaDescription,
                featuredContentType,
                featuredVideo,
                caption,
                linkReplacement,
                introductoryText,
                seoMetaTitle,
                slug,
                canonical,
                redirect,
                keywords,
                subscriptionBox,
                subscriptionBoxDetails,
                authorId,
                cutOffButtonText,
                cutOffButtonLink,
                predictButtonText,
                predictButtonLink,
                sections,
            }

            const endpoint = isEditing ? `/api/articles/${articleId}` : "/api/articles"
            const method = isEditing ? "PUT" : "POST"

            const res = await fetch(endpoint, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            })

            if (!res.ok) throw new Error("Failed to save article")
            toast.success(published ? "Article published successfully" : "Draft saved successfully")
            router.push("/admin/articles")
            router.refresh()
        } catch (error) {
            toast.error("Failed to save article")
            console.error(error)
        } finally {
            setSaving(false)
        }
    }

    if (loading) return <div className="p-6">Loading editor...</div>

    return (
        <div className="min-h-screen bg-gray-50 p-4 space-y-4">
            {/* Header Area */}
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
                            {isEditing ? `Edit Article` : "Add New Article"}
                        </h1>
                        <p className="text-sm text-gray-500">
                            Step {currentStep + 1} of {TABS.length}: {currentTab.label}
                        </p>
                    </div>
                </div>

                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSave(false)}
                        disabled={saving}
                        className="bg-white text-gray-700 hover:bg-gray-100"
                    >
                        Save Draft
                    </Button>

                    {!isLastStep ? (
                        <Button onClick={() => setCurrentStep(prev => prev + 1)}>
                            Next: {TABS[currentStep + 1].label}
                            <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                    ) : (
                        <Button onClick={() => handleSave(true)} disabled={saving}>
                            <Save className="w-4 h-4 mr-2" />
                            {saving ? "Publishing..." : "Publish Post"}
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

            {/* TABS CONTENT */}

            {/* Step 1: Content (Matches rich text editing areas) */}
            {currentTab.id === "CONTENT" && (
                <>
                    <Card>
                        <CardHeader><CardTitle>Header Configuration</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <Label>Article Title *</Label>
                                    <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter article title" className={titleError && title ? "border-red-500" : ""} />
                                    {titleError && <p className="text-xs text-red-500 mt-1">Title must be between 3 and 200 words.</p>}
                                </div>

                                <div>
                                    <Label>Author Profile (Linked)</Label>
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

                                <div>
                                    <Label>Cut Off Button Text</Label>
                                    <Input value={cutOffButtonText} onChange={(e) => setCutOffButtonText(e.target.value)} />
                                </div>
                                <div>
                                    <Label>Cut Off Button Link</Label>
                                    <Input value={cutOffButtonLink} onChange={(e) => setCutOffButtonLink(e.target.value)} placeholder="/college/..." />
                                </div>

                                <div>
                                    <Label>Predict Button Text</Label>
                                    <Input value={predictButtonText} onChange={(e) => setPredictButtonText(e.target.value)} />
                                </div>
                                <div>
                                    <Label>Predict Button Link</Label>
                                    <Input value={predictButtonLink} onChange={(e) => setPredictButtonLink(e.target.value)} placeholder="https://..." />
                                </div>

                                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="flex items-center justify-between border p-3 rounded-md">
                                        <div className="space-y-0.5">
                                            <Label>Featured Article</Label>
                                            <div className="text-sm text-gray-500">Show in recent section</div>
                                        </div>
                                        <Switch checked={isFeatured} onCheckedChange={setIsFeatured} />
                                    </div>
                                    <div className="flex items-center justify-between border p-3 rounded-md">
                                        <div className="space-y-0.5">
                                            <Label>Popular Article</Label>
                                            <div className="text-sm text-gray-500">Show in popular section</div>
                                        </div>
                                        <Switch checked={isPopular} onCheckedChange={setIsPopular} />
                                    </div>
                                    <div className="flex flex-col gap-1.5 border p-3 rounded-md">
                                        <Label>Linked Colleges Count</Label>
                                        <Input
                                            type="number"
                                            value={collegesCount}
                                            onChange={e => setCollegesCount(parseInt(e.target.value) || 0)}
                                            className="h-8"
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader><CardTitle>Article Content</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label>Main Content</Label>
                                <RichTextEditor
                                    value={content}
                                    onChange={setContent}
                                    height={400}
                                    placeholder="Write your article here..."
                                />
                            </div>
                            <div>
                                <Label>Excerpt / Summary</Label>
                                <Textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={3} placeholder="Short summary for list views..." />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader><CardTitle>SEO Data</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div><Label>Meta Title</Label><Input value={seoMetaTitle} onChange={(e) => setSeoMetaTitle(e.target.value)} /></div>
                                <div><Label>Slug</Label><Input value={slug} onChange={(e) => setSlug(e.target.value)} /></div>
                                <div><Label>Canonical URL</Label><Input value={canonical} onChange={(e) => setCanonical(e.target.value)} /></div>
                                <div><Label>Redirect URL</Label><Input value={redirect} onChange={(e) => setRedirect(e.target.value)} /></div>
                                <div className="md:col-span-2"><Label>FAQ Title</Label><Input value={faqTitle} onChange={(e) => setFaqTitle(e.target.value)} /></div>
                                <div className="md:col-span-2"><Label>Keywords</Label><Textarea value={keywords} onChange={(e) => setKeywords(e.target.value)} rows={3} /></div>
                                <div className="md:col-span-2"><Label>Meta Description</Label><Textarea value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} rows={3} /></div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Dynamic Section Editor */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>General Info Sections</CardTitle>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={handleAddSection}
                                className="flex items-center gap-2"
                            >
                                <Plus className="w-4 h-4" />
                                Add Section
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {sections.length === 0 && (
                                <p className="text-sm text-gray-500">
                                    No sections yet. Click &quot;Add Section&quot; to create content blocks.
                                </p>
                            )}
                            {sections.map((section, index) => (
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
                                            onClick={() => handleRemoveSection(index)}
                                        >
                                            <Trash2 className="w-4 h-4 text-red-500" />
                                        </Button>
                                    </div>
                                    <Input
                                        value={section.title}
                                        onChange={(e) =>
                                            handleSectionChange(index, "title", e.target.value)
                                        }
                                        placeholder="Section title"
                                    />
                                    <div>
                                        <Label>Content</Label>
                                        <RichTextEditor
                                            value={section.content}
                                            onChange={(val) => handleSectionChange(index, "content", val)}
                                            height={350}
                                            placeholder="Enter section content..."
                                        />
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </>
            )}



        </div>
    )
}
