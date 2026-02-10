"use client"

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, LogOut, User } from "lucide-react"

export default function AccountPage() {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login")
        }
    }, [status, router])

    if (status === "loading") {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    if (!session) {
        return null
    }

    return (
        <div className="container mx-auto max-w-4xl py-10 px-4">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">My Account</h1>
                <Button variant="destructive" onClick={() => signOut({ callbackUrl: "/" })}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                </Button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center space-x-4 mb-6">
                    <div className="h-20 w-20 bg-gray-100 rounded-full flex items-center justify-center">
                        <User className="h-10 w-10 text-gray-400" />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold">{session.user?.name}</h2>
                        <p className="text-gray-500">{session.user?.email}</p>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <div className="p-4 bg-gray-50 rounded-md">
                        <h3 className="font-medium text-gray-900 mb-2">Account Details</h3>
                        <dl className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <dt className="text-gray-500">Name</dt>
                                <dd className="font-medium">{session.user?.name}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-gray-500">Email</dt>
                                <dd className="font-medium">{session.user?.email}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-gray-500">Role</dt>
                                <dd className="font-medium uppercase">{session.user?.role}</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    )
}
