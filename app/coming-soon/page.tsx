"use client"

import { Rocket } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function ComingSoonPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col items-center justify-center p-4 text-center">
                <div className="max-w-md w-full space-y-8">
                    {/* Icon Animation */}
                    <div className="relative w-24 h-24 mx-auto">
                        <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-75"></div>
                        <div className="relative bg-white p-6 rounded-full shadow-xl border border-blue-50">
                            <Rocket className="w-12 h-12 text-blue-600" />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
                            Coming Soon
                        </h1>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
