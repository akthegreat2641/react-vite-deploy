"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { User, Loader2 } from "lucide-react"

export function UserAuthButton({
    mobile = false,
    className = ""
}: {
    mobile?: boolean
    className?: string
}) {
    const { data: session, status } = useSession()
    const isLoading = status === "loading"

    if (isLoading) {
        if (mobile) {
            return (
                <Button variant="outline" disabled className={`w-full border-[#1e3a5f] text-[#1e3a5f] ${className}`}>
                    <Loader2 className="w-4 h-4 animate-spin" />
                </Button>
            )
        }
        return (
            <Button
                variant="outline"
                size="sm"
                disabled
                className={`border-[#1e3a5f] text-[#1e3a5f] bg-white h-9 px-4 rounded ${className}`}
            >
                <Loader2 className="w-4 h-4 animate-spin" />
            </Button>
        )
    }

    if (session) {
        if (mobile) {
            return (
                <Button asChild variant="outline" className={`w-full border-[#1e3a5f] text-[#1e3a5f] bg-blue-50 ${className}`}>
                    <Link href="/account">
                        My Account ({session.user?.name?.split(" ")[0]})
                    </Link>
                </Button>
            )
        }
        return (
            <Button
                asChild
                variant="ghost"
                size="sm"
                className={`text-[#1e3a5f] hover:bg-gray-100 flex items-center gap-2 font-medium ${className}`}
            >
                <Link href="/account">
                    <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="hidden sm:inline-block">{session.user?.name?.split(" ")[0]}</span>
                </Link>
            </Button>
        )
    }

    if (mobile) {
        return (
            <Button asChild variant="outline" className={`w-full border-[#1e3a5f] text-[#1e3a5f] ${className}`}>
                <Link href="/login">
                    Login / Register
                </Link>
            </Button>
        )
    }

    return (
        <Button
            asChild
            variant="outline"
            size="sm"
            className={`border-[#1e3a5f] text-[#1e3a5f] hover:bg-gray-50 bg-white text-sm h-9 px-4 rounded ${className}`}
        >
            <Link href="/login">
                Login/ Register
            </Link>
        </Button>
    )
}
