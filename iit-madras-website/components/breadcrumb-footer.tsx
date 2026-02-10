import { ChevronRight } from "lucide-react"

interface BreadcrumbFooterProps {
  collegeName?: string
  location?: string
  slug?: string
  category?: string
}

export function BreadcrumbFooter({ collegeName, location, slug, category }: BreadcrumbFooterProps) {
  const isCollege = !category || category === "College"
  // If category is "Article", we probably want to show "Articles"
  const categoryLabel = category === "Article" ? "Articles" : (category ? `${category}s` : "Colleges")
  const categoryLink = category === "Article" ? "/articles" : (category ? `/${category.toLowerCase()}s` : "#")

  return (
    <div className="mt-6 py-4 border-t border-gray-200">
      <div className="flex items-center text-sm">
        <a href="/" className="text-gray-600 hover:text-blue-600">
          Home
        </a>
        <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />

        {isCollege ? (
          <a href="#" className="text-gray-600 hover:text-blue-600">
            {location ? `Colleges in ${location}` : "Colleges"}
          </a>
        ) : (
          <a href={categoryLink} className="text-gray-600 hover:text-blue-600">
            {category === "Article" ? "Article" : categoryLabel}
          </a>
        )}

        <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
        <span className="text-gray-800">{collegeName || "Details"}</span>
      </div>
    </div>
  )
}
