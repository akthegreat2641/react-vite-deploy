"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Facebook, Download, X, Search, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ArticleDesignPage() {
    return (
        <div className="min-h-screen bg-[#f8f8f8] font-sans">
            {/* Breadcrumb */}
            <div className="w-full bg-[#f8f8f8] py-4">
                <div className="w-[60%] mx-auto text-xs text-gray-500 font-medium">
                    <Link href="#" className="hover:text-black">Home</Link>
                    <span className="mx-1">&gt;</span>
                    <Link href="#" className="hover:text-black">Articles</Link>
                    <span className="mx-1">&gt;</span>
                    <Link href="#" className="hover:text-black">Agriculture</Link>
                    <span className="mx-1">&gt;</span>
                    <span className="text-gray-400">AGRICET 2025 Expected Cut-Off Marks: Category-Wise Analysis</span>
                </div>
            </div>

            <main className="w-[60%] mx-auto pb-12">
                {/* Header Card */}
                <div className="bg-[#fffdf9] rounded-sm p-8 shadow-sm border border-gray-100 mb-8">
                    <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-8">
                        AGRICET 2025 Expected Cut-Off Marks: Category-Wise Analysis
                    </h1>

                    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">

                        <div className="flex flex-wrap items-center gap-6 text-xs text-gray-600">

                            <div className="flex flex-col">
                                <Link href="#" className="text-blue-500 font-medium hover:underline text-sm">Pallavi Pradeep</Link>
                                <Link href="#" className="text-blue-500 font-medium hover:underline text-sm mb-1">Purbey</Link>
                            </div>

                            <div className="h-8 border-l border-gray-300 hidden sm:block"></div>

                            <div className="flex flex-col text-gray-500">
                                <span>Nov 03, 2025 | 02:26 PM</span>
                                <span>IST</span>
                            </div>

                            <div className="h-8 border-l border-gray-300 hidden sm:block"></div>

                            <div className="flex items-center gap-2">
                                <span className="text-gray-500 font-medium">Share it on:</span>
                                <div className="flex gap-2">
                                    <button className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-white hover:bg-gray-500">
                                        <Facebook className="w-3 h-3 fill-current" />
                                    </button>
                                    <button className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-white hover:bg-gray-500">
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center border rounded-full px-3 py-1 bg-white shadow-sm gap-2">
                                <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                <div className="flex flex-col leading-none">
                                    <span className="text-[10px] font-bold text-gray-800">Add as a preferred</span>
                                    <span className="text-[10px] text-gray-500">source on Google</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 mt-4 xl:mt-0">
                            <Button className="bg-[#0056b3] hover:bg-[#004494] text-white rounded font-medium px-6 py-5 h-auto text-sm shadow-sm flex items-center gap-2">
                                Cut Off <Download className="w-4 h-4 ml-1" />
                            </Button>
                            <Button className="bg-[#ff4d4d] hover:bg-[#ff3333] text-white rounded font-medium px-6 py-5 h-auto text-sm shadow-sm">
                                Predict My College
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
                    {/* Main Content Body */}
                    <div className="space-y-8 text-gray-800 leading-relaxed text-[15px]">
                        <div className="bg-white p-6 rounded shadow-sm border border-gray-100">
                            <div className="mb-6 border-l-4 border-red-500 pl-4 py-2 bg-gray-50 text-gray-700 italic">
                                Check AGRICET 2025 expected cut-off marks with detailed category-wise analysis for General, OBC, SC, ST, and EWS candidates. Know previous year trends, factors affecting cut-offs, and target scores for admission to top agricultural universities like ANGRAU and PJTSAU.
                            </div>

                            <div className="prose prose-blue max-w-none">
                                <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">AGRICET 2025 Expected Cut-Off: Category-Wise</h2>
                                <p>
                                    Students can check the category-wise AGRICET 2025 expected cutoff for B.Sc Agriculture in the table below.
                                    <br />
                                    <strong>Tip:</strong> If you are aiming for a top-tier agricultural university, keep your target score at 70% or above of the total marks.
                                </p>

                                <div className="my-6 overflow-x-auto">
                                    <table className="w-full border-collapse border border-gray-200 text-sm">
                                        <thead>
                                            <tr className="bg-gray-50">
                                                <th className="border border-gray-200 p-3 text-left font-semibold">Category</th>
                                                <th className="border border-gray-200 p-3 text-left font-semibold">Expected Cut-off (out of 100)</th>
                                                <th className="border border-gray-200 p-3 text-left font-semibold">Expected Cut-off (out of 120)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="border border-gray-200 p-3">General (OC)</td>
                                                <td className="border border-gray-200 p-3">75 - 85+</td>
                                                <td className="border border-gray-200 p-3">90 - 105+</td>
                                            </tr>
                                            <tr className="bg-gray-50">
                                                <td className="border border-gray-200 p-3">OBC (BC-A/B/C/D/E)</td>
                                                <td className="border border-gray-200 p-3">65 - 75</td>
                                                <td className="border border-gray-200 p-3">78 - 90</td>
                                            </tr>
                                            <tr>
                                                <td className="border border-gray-200 p-3">SC (Scheduled Castes)</td>
                                                <td className="border border-gray-200 p-3">50 - 60</td>
                                                <td className="border border-gray-200 p-3">60 - 72</td>
                                            </tr>
                                            <tr className="bg-gray-50">
                                                <td className="border border-gray-200 p-3">ST (Scheduled Tribes)</td>
                                                <td className="border border-gray-200 p-3">45 - 55</td>
                                                <td className="border border-gray-200 p-3">54 - 66</td>
                                            </tr>
                                            <tr>
                                                <td className="border border-gray-200 p-3">EWS</td>
                                                <td className="border border-gray-200 p-3">70 - 80</td>
                                                <td className="border border-gray-200 p-3">84 - 96</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Factors Affecting AGRICET Cutoff</h2>
                                <p>
                                    AGRICET 2025 is essential for organizing your study and counseling strategy because there are only a few seats available and demand is high. The cut-off is set annually based on a number of factors:
                                </p>
                                <ul className="list-disc pl-5 space-y-2 mt-4">
                                    <li>
                                        <strong>Number of Applicants:</strong> When there are more applicants, there is more competition, which typically results in a higher cutoff.
                                    </li>
                                    <li>
                                        <strong>Exam Difficulty Level:</strong> Easier paper = Higher cut-off. Difficult papers = Lower cut-offs.
                                    </li>
                                    <li>
                                        <strong>Total Marks of the Exam:</strong> AGRICET is administered for either 100 or 120 total marks, depending on the state announcement. Candidates should always check the official exam pattern for their state.
                                    </li>
                                    <li>
                                        <strong>Availability of Seats:</strong> Cut-offs rise because flagship universities like ANGRAU and PJTSAU have a limited number of seats.
                                    </li>
                                    <li>
                                        <strong>Policy for Reservations:</strong> Reservations by category have a big influence on the final cut-off scores. SC/ST cut-offs are comparatively lower than general category cut-offs.
                                    </li>
                                    <li>
                                        <strong>Previous Year Cut-offs:</strong> A trustworthy baseline for projecting future cut-offs is provided by historical data.
                                    </li>
                                </ul>

                                <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">AGRICET 2025 Expected Cut-Offs for Specialized Courses</h2>
                                <p>
                                    In addition to B.Sc. (Hons.) Agriculture, some universities may offer specialized courses such as Agricultural Engineering or Seed Technology. Since the number of seats is fewer, the competition is higher.
                                </p>
                                <div className="mt-4">
                                    <h3 className="font-semibold text-gray-800">Top Colleges (Specialized Courses):</h3>
                                    <ul className="list-disc pl-5 mt-2">
                                        <li>65 – 85 marks (out of 100)</li>
                                        <li>78 – 102 marks (out of 120)</li>
                                    </ul>
                                </div>
                                <div className="mt-4">
                                    <h3 className="font-semibold text-gray-800">Mid-Tier Colleges (Specialized Courses):</h3>
                                    <ul className="list-disc pl-5 mt-2">
                                        <li>45 – 60 marks (out of 100)</li>
                                        <li>54 – 72 marks (out of 120)</li>
                                    </ul>
                                </div>

                                <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Importance of AGRICET Cutoff</h2>
                                <p>
                                    The minimal scores needed to be admitted are known as the cut-off marks. They determine:
                                </p>
                                <ul className="list-disc pl-5 mt-2">
                                    <li>Whether you pass the qualifying exam.</li>
                                    <li>Your prospects of being accepted into a prestigious agricultural university.</li>
                                    <li>Which type of college, private, affiliated, or government, if you can reasonably anticipate.</li>
                                </ul>
                                <p className="mt-4">
                                    Knowing the anticipated cut-offs aids in setting a reasonable goal score because the exam is competitive and there is a limited number of seats available.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-white border rounded shadow-sm sticky top-4">
                            <Tabs defaultValue="recent" className="w-full">
                                <TabsList className="w-full grid grid-cols-2 bg-transparent border-b p-0 h-auto rounded-none">
                                    <TabsTrigger
                                        value="recent"
                                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-red-500 data-[state=active]:text-red-500 py-3 text-gray-600 font-medium bg-transparent shadow-none"
                                    >
                                        Recent Articles
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="popular"
                                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-red-500 data-[state=active]:text-red-500 py-3 text-gray-600 font-medium bg-transparent shadow-none"
                                    >
                                        Popular Articles
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent value="recent" className="p-0">
                                    <div className="divide-y">
                                        {[
                                            { title: "BSc Agriculture Colleges for Women in India in 2025", img: "https://images.unsplash.com/photo-1595276239106-95f2d05776d6?q=80&w=150&auto=format&fit=crop" },
                                            { title: "Colleges Offering Horticulture & Forestry Programs Through AGRICET", img: "https://images.unsplash.com/photo-1591291621164-2c6367723315?q=80&w=150&auto=format&fit=crop" },
                                            { title: "UPCATET Full Form: Dates, Eligibility, Application Form", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=150&auto=format&fit=crop" },
                                            { title: "AP AGRICET Multi-Phase Counselling and Mop-Up Rounds Explained", img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=150&auto=format&fit=crop" },
                                        ].map((article, i) => (
                                            <div key={i} className="flex gap-4 p-4 hover:bg-gray-50 transition-colors cursor-pointer group">
                                                <div className="w-20 h-14 flex-shrink-0 overflow-hidden rounded bg-gray-200">
                                                    <img src={article.img} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                                                </div>
                                                <h3 className="text-xs font-medium text-gray-700 group-hover:text-blue-600 leading-snug line-clamp-2">
                                                    {article.title}
                                                </h3>
                                            </div>
                                        ))}
                                    </div>
                                </TabsContent>
                                <TabsContent value="popular" className="p-4 text-center text-gray-500 text-sm">
                                    No popular articles yet.
                                </TabsContent>
                            </Tabs>
                        </div>

                        {/* More sidebar widgets can go here */}
                        <div className="bg-white border rounded shadow-sm p-4 sticky top-[300px]">
                            <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase border-b pb-2">Trending News</h3>
                            <ul className="space-y-3">
                                {[
                                    "GATE 2026 Schedule Released",
                                    "CAT 2025 Admit Card Out",
                                    "JEE Main 2025 Exam Dates",
                                    "NEET PG 2025 Counseling Schedule"
                                ].map((news, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600 hover:text-blue-600 cursor-pointer">
                                        <ChevronRight className="w-4 h-4 mt-0.5 text-gray-400" />
                                        <span>{news}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
