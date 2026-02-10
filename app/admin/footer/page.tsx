"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Save, Plus, Trash2, Upload } from "lucide-react"
import { toast } from "sonner"
import { RichTextEditor } from "@/components/rich-text-editor"

interface FooterLink {
    label: string
    link: string
}

export default function FooterEditor() {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    // Footer Data
    const [logoUrl, setLogoUrl] = useState("")
    const [aboutText, setAboutText] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")

    const [facebook, setFacebook] = useState("")
    const [twitter, setTwitter] = useState("")
    const [linkedin, setLinkedin] = useState("")
    const [instagram, setInstagram] = useState("")
    const [youtube, setYoutube] = useState("")

    const [section1Title, setSection1Title] = useState("Quick Links")
    const [section1Links, setSection1Links] = useState<FooterLink[]>([])

    const [section2Title, setSection2Title] = useState("Explore")
    const [section2Links, setSection2Links] = useState<FooterLink[]>([])

    const [section3Title, setSection3Title] = useState("Support")
    const [section3Links, setSection3Links] = useState<FooterLink[]>([])

    const [copyrightText, setCopyrightText] = useState("")
    const [privacyPolicy, setPrivacyPolicy] = useState("")
    const [termsConditions, setTermsConditions] = useState("")

    useEffect(() => {
        fetch("/api/footer")
            .then(res => res.json())
            .then(data => {
                if (data.error) return
                setLogoUrl(data.logoUrl || "")
                setAboutText(data.aboutText || "")
                setPhone(data.phone || "")
                setEmail(data.email || "")
                setAddress(data.address || "")
                setFacebook(data.facebook || "")
                setTwitter(data.twitter || "")
                setLinkedin(data.linkedin || "")
                setInstagram(data.instagram || "")
                setYoutube(data.youtube || "")
                setSection1Title(data.section1Title || "Quick Links")
                setSection1Links(JSON.parse(data.section1Links || "[]"))
                setSection2Title(data.section2Title || "Explore")
                setSection2Links(JSON.parse(data.section2Links || "[]"))
                setSection3Title(data.section3Title || "Support")
                setSection3Links(JSON.parse(data.section3Links || "[]"))
                setCopyrightText(data.copyrightText || "")
                setPrivacyPolicy(data.privacyPolicy || "")
                setTermsConditions(data.termsConditions || "")
            })
            .catch(err => console.error("Failed to load footer:", err))
            .finally(() => setLoading(false))
    }, [])

    const handleSave = async () => {
        setSaving(true)
        try {
            const payload = {
                logoUrl,
                aboutText,
                phone,
                email,
                address,
                facebook,
                twitter,
                linkedin,
                instagram,
                youtube,
                section1Title,
                section1Links: JSON.stringify(section1Links),
                section2Title,
                section2Links: JSON.stringify(section2Links),
                section3Title,
                section3Links: JSON.stringify(section3Links),
                copyrightText,
                privacyPolicy,
                termsConditions
            }

            const res = await fetch("/api/footer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            })

            if (res.ok) {
                toast.success("Footer updated successfully")
            } else {
                toast.error("Failed to update footer")
            }
        } catch (error) {
            toast.error("Error saving footer")
        } finally {
            setSaving(false)
        }
    }

    const addLink = (section: 1 | 2 | 3) => {
        const newLink = { label: "", link: "" }
        if (section === 1) setSection1Links([...section1Links, newLink])
        if (section === 2) setSection2Links([...section2Links, newLink])
        if (section === 3) setSection3Links([...section3Links, newLink])
    }

    const removeLink = (section: 1 | 2 | 3, index: number) => {
        if (section === 1) setSection1Links(section1Links.filter((_, i) => i !== index))
        if (section === 2) setSection2Links(section2Links.filter((_, i) => i !== index))
        if (section === 3) setSection3Links(section3Links.filter((_, i) => i !== index))
    }

    const updateLink = (section: 1 | 2 | 3, index: number, field: "label" | "link", value: string) => {
        const update = (links: FooterLink[]) => links.map((l, i) => i === index ? { ...l, [field]: value } : l)
        if (section === 1) setSection1Links(update(section1Links))
        if (section === 2) setSection2Links(update(section2Links))
        if (section === 3) setSection3Links(update(section3Links))
    }

    const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        const formData = new FormData()
        formData.append("file", file)
        try {
            const res = await fetch("/api/upload", { method: "POST", body: formData })
            const data = await res.json()
            if (data.url) {
                setLogoUrl(data.url)
                toast.success("Logo uploaded")
            }
        } catch (error) {
            toast.error("Upload failed")
        }
    }

    if (loading) return <div className="p-6">Loading footer settings...</div>

    return (
        <div className="p-6 space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Footer Management</h1>
                    <p className="text-sm text-gray-500">Customize the global footer content</p>
                </div>
                <Button onClick={handleSave} disabled={saving} className="bg-emerald-600 hover:bg-emerald-700">
                    <Save className="w-4 h-4 mr-2" />
                    {saving ? "Saving..." : "Save Settings"}
                </Button>
            </div>

            <Card>
                <CardHeader><CardTitle>Legal Pages Content</CardTitle></CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <Label className="mb-2 block">Privacy Policy Content</Label>
                        <RichTextEditor
                            value={privacyPolicy}
                            onChange={setPrivacyPolicy}
                            placeholder="Write your privacy policy here..."
                        />
                    </div>
                    <div>
                        <Label className="mb-2 block">Terms & Conditions Content</Label>
                        <RichTextEditor
                            value={termsConditions}
                            onChange={setTermsConditions}
                            placeholder="Write your terms and conditions here..."
                        />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle>General Information</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Label>Footer Logo</Label>
                        <div className="flex items-center gap-4 mt-2">
                            {logoUrl && <img src={logoUrl} alt="Logo" className="h-12 bg-gray-100 p-2 object-contain border rounded" />}
                            <Label htmlFor="logo-upload" className="cursor-pointer bg-secondary px-4 py-2 rounded-md text-sm font-medium hover:bg-secondary/80 flex items-center gap-2">
                                <Upload className="w-4 h-4" /> Upload Logo
                            </Label>
                            <Input id="logo-upload" type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                        </div>
                    </div>
                    <div>
                        <Label>About Text</Label>
                        <Textarea value={aboutText} onChange={e => setAboutText(e.target.value)} placeholder="Short company description..." className="min-h-[100px]" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>Phone</Label>
                            <Input value={phone} onChange={e => setPhone(e.target.value)} />
                        </div>
                        <div>
                            <Label>Email</Label>
                            <Input value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                    </div>
                    <div>
                        <Label>Address</Label>
                        <Input value={address} onChange={e => setAddress(e.target.value)} />
                    </div>
                    <div>
                        <Label>Copyright Text</Label>
                        <Input value={copyrightText} onChange={e => setCopyrightText(e.target.value)} />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle>Social Links</CardTitle></CardHeader>
                <CardContent className="grid grid-cols-2 gap-4 text-xs">
                    <div><Label>Facebook URL</Label><Input value={facebook} onChange={e => setFacebook(e.target.value)} /></div>
                    <div><Label>Twitter URL</Label><Input value={twitter} onChange={e => setTwitter(e.target.value)} /></div>
                    <div><Label>LinkedIn URL</Label><Input value={linkedin} onChange={e => setLinkedin(e.target.value)} /></div>
                    <div><Label>Instagram URL</Label><Input value={instagram} onChange={e => setInstagram(e.target.value)} /></div>
                    <div><Label>YouTube URL</Label><Input value={youtube} onChange={e => setYoutube(e.target.value)} /></div>
                </CardContent>
            </Card>

            {[1, 2, 3].map((num) => (
                <Card key={num}>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <div className="flex-1 mr-4">
                            <Input
                                value={num === 1 ? section1Title : num === 2 ? section2Title : section3Title}
                                onChange={e => {
                                    if (num === 1) setSection1Title(e.target.value)
                                    if (num === 2) setSection2Title(e.target.value)
                                    if (num === 3) setSection3Title(e.target.value)
                                }}
                                className="font-semibold text-base h-8"
                            />
                        </div>
                        <Button variant="outline" size="sm" onClick={() => addLink(num as 1 | 2 | 3)} className="h-8">
                            <Plus className="w-3 h-3 mr-1" /> Add
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {(num === 1 ? section1Links : num === 2 ? section2Links : section3Links).map((link, idx) => (
                            <div key={idx} className="flex gap-2 items-center">
                                <Input placeholder="Label" value={link.label} onChange={e => updateLink(num as 1 | 2 | 3, idx, "label", e.target.value)} className="flex-[1] h-9" />
                                <Input placeholder="URL" value={link.link} onChange={e => updateLink(num as 1 | 2 | 3, idx, "link", e.target.value)} className="flex-[2] h-9" />
                                <Button variant="ghost" size="icon" onClick={() => removeLink(num as 1 | 2 | 3, idx)} className="text-red-500 hover:text-red-600 h-9 w-9">
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
