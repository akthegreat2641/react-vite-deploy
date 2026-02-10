import { prisma } from "@/lib/prisma"
import { Separator } from "@/components/ui/separator"

export default async function PrivacyPolicyPage() {
    let footer: any = null
    try {
        footer = await prisma.footerConfig.findFirst()
    } catch (error) {
        console.error("Privacy Policy fetch error:", error)
    }

    const content = footer?.privacyPolicy || "<p>Privacy policy content coming soon...</p>"

    return (
        <div className="bg-white min-h-screen">
            <div className="container mx-auto px-4 py-16 max-w-4xl">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
                <Separator className="mb-8" />
                <div
                    className="prose prose-slate max-w-none 
                    prose-headings:text-gray-900 prose-headings:font-bold
                    prose-p:text-gray-600 prose-p:leading-relaxed
                    prose-li:text-gray-600
                    prose-a:text-emerald-600 hover:prose-a:text-emerald-700"
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            </div>
        </div>
    )
}
