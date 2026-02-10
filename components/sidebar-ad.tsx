"use client"

import { useEffect, useState } from "react"

export function SidebarAd() {
    const [adCode, setAdCode] = useState<string | null>(null)
    const [enabled, setEnabled] = useState(true)

    useEffect(() => {
        fetch("/api/ads")
            .then(res => res.json())
            .then(data => {
                if (data.isEnabled && data.sidebarAd) {
                    setAdCode(data.sidebarAd)
                }
                setEnabled(data.isEnabled)
            })
            .catch(err => console.error("Failed to load ad config", err))
    }, [])

    if (!enabled || !adCode) return null

    return (
        <div className="w-full mb-6 flex flex-col items-center justify-center overflow-hidden">
            <span className="text-[10px] text-gray-400 mb-1 tracking-wider uppercase">------- Advertisement -------</span>
            <div className="w-full flex items-center justify-center" dangerouslySetInnerHTML={{ __html: adCode }} />
        </div>
    )
}
