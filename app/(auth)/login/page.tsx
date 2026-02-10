"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Phone, Mail, Lock, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import { toast } from "sonner"

export default function LoginPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await signIn("credentials", {
                email: formData.email,
                password: formData.password,
                redirect: false
            })

            console.log("Sign in result:", res)

            if (res?.error) {
                toast.error("Invalid credentials")
                return
            }

            if (res?.ok) {
                toast.success("Logged in successfully!")
                router.push("/")
                router.refresh()
            }
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex bg-white font-sans">
            {/* Left Sidebar */}
            <div className="hidden lg:flex lg:w-[40%] bg-blue-600 relative overflow-hidden items-center justify-center p-12">
                {/* Background Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-10 left-10 w-32 h-32 rounded-full border-4 border-white"></div>
                    <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full border-8 border-white"></div>
                </div>

                {/* Floating Card */}
                <div className="relative z-10 w-full max-w-sm bg-[#0A192F] rounded-3xl p-8 shadow-2xl text-center border border-white/10">
                    <div className="mb-6 rounded-2xl overflow-hidden aspect-square">
                        <img
                            src="/images/registration-illustration.png"
                            alt="Student Illustration"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Sign in to Collegeweb</h2>
                    <p className="text-gray-400 text-sm">Fastest Growing College Search Portal</p>
                </div>

                {/* Brand Logo at Top Left */}
                <div className="absolute top-8 left-8 flex items-center gap-2">
                    <div className="w-8 h-8 bg-white rotate-45 flex items-center justify-center">
                        <div className="w-5 h-5 bg-blue-600 -rotate-45 flex items-center justify-center text-white font-bold text-xs">C</div>
                    </div>
                    <span className="text-white font-bold tracking-tight text-xl uppercase">Collegeweb</span>
                </div>

                {/* Footer Text */}
                <div className="absolute bottom-8 left-8 text-white/50 text-xs text-center w-full lg:w-auto">
                    © 2026 Collegeweb.com
                </div>
            </div>

            {/* Right Sidebar (Form) */}
            <div className="w-full lg:w-[60%] flex items-center justify-center p-6 sm:p-12 relative">
                {/* Mobile Header */}
                <div className="lg:hidden absolute top-8 left-8 flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rotate-45 flex items-center justify-center">
                        <div className="w-5 h-5 bg-white -rotate-45 flex items-center justify-center text-blue-600 font-bold text-xs">C</div>
                    </div>
                    <span className="text-blue-600 font-bold tracking-tight text-xl uppercase font-sans">Collegeweb</span>
                </div>

                <div className="w-full max-w-md space-y-8">
                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold text-gray-900">Welcome Back!</h1>
                        <p className="text-sm text-gray-500 leading-relaxed">
                            Log in with your data that you entered during your registration
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email/Mobile */}
                        <div className="flex gap-2">
                            <div className="relative flex-1 group">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                <Input
                                    name="email"
                                    placeholder="Email or Mobile Number"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="pl-10 h-12 bg-gray-50/50 border-gray-200 focus:bg-white focus:ring-1 focus:ring-blue-500 rounded-lg"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="flex gap-2">
                            <div className="relative flex-1 group">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                <Input
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="pl-10 h-12 bg-gray-50/50 border-gray-200 focus:bg-white focus:ring-1 focus:ring-blue-500 rounded-lg"
                                />
                            </div>
                        </div>

                        <Button disabled={loading} className="w-full h-12 bg-rose-500 hover:bg-rose-600 text-white text-base font-semibold rounded-lg shadow-md border-none uppercase transition-all active:scale-[0.98]">
                            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Sign In"}
                        </Button>

                        <div className="text-center pt-2">
                            <p className="text-sm text-gray-500 font-medium">
                                Dont have an account yet?{" "}
                                <Link href="/register" className="text-rose-500 font-bold hover:underline ml-1">
                                    Sign Up
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
