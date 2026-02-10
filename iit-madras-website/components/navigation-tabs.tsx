"use client"

import { ChevronDown } from "lucide-react"

const defaultTabs = [
  { name: "Info", active: true },
]

interface NavigationTabsProps {
  activeTab?: string
  onTabChange?: (tab: string) => void
  tabs?: string[]
}

export function NavigationTabs({
  activeTab = "Info",
  onTabChange = () => { },
  tabs = []
}: NavigationTabsProps) {

  // If dynamic tabs are provided, use them. Otherwise fallback to defaults if needed, 
  // but for dynamic pages we expects tabs to be passed.
  const displayTabs = tabs.length > 0 ? tabs : defaultTabs.map(t => t.name)

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {displayTabs.map((tabName) => (
            <button
              key={tabName}
              onClick={() => onTabChange(tabName)}
              className={`flex items-center gap-1 px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${activeTab === tabName
                ? "text-[#ff5722] border-b-2 border-[#ff5722]"
                : "text-gray-600 hover:text-gray-800"
                }`}
            >
              {tabName}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
