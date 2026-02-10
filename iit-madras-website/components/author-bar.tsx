"use client"

import { Download, ListPlus } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter, usePathname } from "next/navigation"

interface AuthorBarProps {
  author?: any | null
  authorName?: string | null
  brochureUrl?: string | null
  date?: Date | string | null
  // New dynamic button props
  btn1Text?: string | null
  btn1Link?: string | null
  btn2Text?: string | null
  btn2Link?: string | null
  showBtn1?: boolean
  showBtn2?: boolean
  isArticle?: boolean
  isBoard?: boolean
}

export function AuthorBar({
  author,
  authorName,
  brochureUrl,
  date,
  btn1Text,
  btn1Link,
  btn2Text,
  btn2Link,
  showBtn1 = true,
  showBtn2 = true,
  isArticle = false,
  isBoard = false
}: AuthorBarProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  const handleAuthAction = (url: string | null) => {
    if (!session) {
      router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`)
      return
    }

    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  const displayDate = date ? new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }) : ""

  const button1Label = btn1Text || "Shortlist"

  const Button1El = (
    <button
      onClick={() => handleAuthAction(btn1Link || null)}
      className="flex items-center gap-2 px-4 py-2 border border-[#ff5722] text-[#ff5722] rounded hover:bg-[#ff5722]/5 transition-colors"
    >
      <span>{button1Label}</span>
      <ListPlus className="w-4 h-4" />
    </button>
  )

  const button2Label = btn2Text || "Brochure"
  const button2Target = btn2Link || brochureUrl

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-[1200px] mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden border border-gray-100">
            {author?.image ? (
              <img src={author.image} alt={author.name} className="w-full h-full object-cover" />
            ) : (
              <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-800">{author?.name || authorName || "Unknown Author"}</span>
            <span className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            {displayDate && (
              <>
                <span className="text-gray-500">|</span>
                <span className="text-gray-600">{displayDate}</span>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 justify-center md:justify-end">
          {showBtn1 && Button1El}

          {showBtn2 && (
            button2Target ? (
              <button
                onClick={() => handleAuthAction(button2Target)}
                className="flex items-center gap-2 px-4 py-2 bg-[#ff5722] text-white rounded hover:bg-[#ff5722]/90 transition-colors"
              >
                <span>{button2Label}</span>
                <Download className="w-4 h-4" />
              </button>
            ) : (
              <button disabled className="flex items-center gap-2 px-4 py-2 bg-gray-300 text-white rounded cursor-not-allowed">
                <span>{button2Label}</span>
                <Download className="w-4 h-4" />
              </button>
            )
          )}
        </div>
      </div>
    </div>
  )
}
