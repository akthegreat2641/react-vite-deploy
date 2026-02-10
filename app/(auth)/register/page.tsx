"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { User, Phone, Mail, Book, GraduationCap, Lock, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { STREAMS, COURSE_TYPES } from "@/lib/constants"
import { toast } from "sonner"

export default function RegisterPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        email: "",
        stream: "",
        level: "",
        password: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSelectChange = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.message || "Registration failed")
            }

            toast.success("Registration successful! Please login.")
            router.push("/login")
        } catch (error: any) {
            toast.error(error.message)
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
                {/* Mobile Header (Hidden on Laptop) */}
                <div className="lg:hidden absolute top-8 left-8 flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rotate-45 flex items-center justify-center">
                        <div className="w-5 h-5 bg-white -rotate-45 flex items-center justify-center text-blue-600 font-bold text-xs">C</div>
                    </div>
                    <span className="text-blue-600 font-bold tracking-tight text-xl uppercase font-sans">Collegeweb</span>
                </div>

                <div className="w-full max-w-md space-y-8">
                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold text-gray-900">Register</h1>
                        <p className="text-sm text-gray-500 leading-relaxed">
                            We at Collegeweb aim to bridge the gap between Universities and Students
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name */}
                        <div className="relative group">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                            <Input
                                name="name"
                                placeholder="Enter Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="pl-10 h-12 bg-gray-50/50 border-gray-200 focus:bg-white focus:ring-1 focus:ring-blue-500 rounded-lg"
                            />
                        </div>

                        {/* Mobile */}
                        <div className="flex gap-2">
                            <div className="flex items-center gap-2 px-3 bg-gray-50/50 border border-gray-200 rounded-lg h-12">
                                <img
                                    src="https://flagcdn.com/w20/in.png"
                                    alt="India"
                                    className="w-5 h-3.5 object-cover rounded-sm"
                                />
                                <span className="text-sm text-gray-600 font-medium">+91</span>
                                <div className="w-px h-4 bg-gray-200 ml-1"></div>
                            </div>
                            <div className="relative flex-1 group">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                <Input
                                    name="mobile"
                                    placeholder="Mobile Number"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    required
                                    className="pl-10 h-12 bg-gray-50/50 border-gray-200 focus:bg-white focus:ring-1 focus:ring-blue-500 rounded-lg"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="relative group">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                            <Input
                                name="email"
                                type="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="pl-10 h-12 bg-gray-50/50 border-gray-200 focus:bg-white focus:ring-1 focus:ring-blue-500 rounded-lg"
                            />
                        </div>

                        {/* Password */}
                        <div className="relative group">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                            <Input
                                name="password"
                                type="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                minLength={6}
                                className="pl-10 h-12 bg-gray-50/50 border-gray-200 focus:bg-white focus:ring-1 focus:ring-blue-500 rounded-lg"
                            />
                        </div>

                        {/* Stream Selector */}
                        <div className="relative group">
                            <Book className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors z-10" />
                            <Select onValueChange={(val) => handleSelectChange("stream", val)}>
                                <SelectTrigger className="pl-10 h-12 bg-gray-50/50 border-gray-200 focus:ring-1 focus:ring-blue-500 rounded-lg text-gray-500">
                                    <SelectValue placeholder="Select Stream" />
                                </SelectTrigger>
                                <SelectContent>
                                    {STREAMS.map(stream => (
                                        <SelectItem key={stream} value={stream}>{stream}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Level Selector */}
                        <div className="relative group">
                            <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors z-10" />
                            <Select onValueChange={(val) => handleSelectChange("level", val)}>
                                <SelectTrigger className="pl-10 h-12 bg-gray-50/50 border-gray-200 focus:ring-1 focus:ring-blue-500 rounded-lg text-gray-500">
                                    <SelectValue placeholder="Select Level" />
                                </SelectTrigger>
                                <SelectContent>
                                    {COURSE_TYPES.map(type => (
                                        <SelectItem key={type} value={type}>{type}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="text-[11px] text-gray-400">
                            By clicking submit you agree to the <Link href="/terms" className="text-coral-500 font-medium hover:underline text-rose-400">Terms and Conditions</Link>
                        </div>

                        <Button disabled={loading} className="w-full h-12 bg-[#FFB3B3] hover:bg-[#FFA3A3] text-white text-base font-semibold rounded-lg shadow-sm border-none">
                            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Submit"}
                        </Button>

                        <div className="text-center pt-2">
                            <p className="text-sm text-gray-500">
                                Already have an account?{" "}
                                <Link href="/login" className="text-rose-400 font-bold hover:underline">
                                    Login here!
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
