import { prisma } from "@/lib/prisma"
import { Separator } from "@/components/ui/separator"

export default async function TermsConditionsPage() {
    let footer: any = null
    try {
        footer = await prisma.footerConfig.findFirst()
    } catch (error) {
        console.error("Terms & Conditions fetch error:", error)
    }

    const content = footer?.termsConditions || "<p>Terms and conditions content coming soon...</p>"

    return (
        <div className="bg-white min-h-screen">
            <div className="container mx-auto px-4 py-16 max-w-4xl">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms & Conditions</h1>
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
