import { prisma } from "@/lib/prisma"
import { Facebook, Twitter, Linkedin, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"

export default async function Footer() {
  let footer: any = null

  try {
    footer = await prisma.footerConfig.findFirst()
  } catch (error) {
    console.error("Footer fetch error:", error)
  }

  // Fallback/Default data if not set or error
  if (!footer) {
    footer = {
      id: "footer",
      logoUrl: null,
      aboutText: "CollegewebCU provides comprehensive information about colleges, exams, and courses across India.",
      phone: "7969542251",
      email: "contact@collegewebcu.com",
      address: "New Delhi, India",
      facebook: "#",
      twitter: "#",
      linkedin: "#",
      instagram: "#",
      youtube: "#",
      section1Title: "Quick Links",
      section1Links: "[]",
      section2Title: "Explore",
      section2Links: "[]",
      section3Title: "Support",
      section3Links: "[]",
      copyrightText: "© 2025 CollegewebCU. All Rights Reserved."
    }
  }

  const s1Links = JSON.parse(footer.section1Links || "[]")
  const s2Links = JSON.parse(footer.section2Links || "[]")
  const s3Links = JSON.parse(footer.section3Links || "[]")

  return (
    <footer className="bg-[#0F172A] text-white pt-10 md:pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* Column 1: About */}
        <div className="space-y-6">
          {footer.logoUrl ? (
            <img src={footer.logoUrl} alt="Logo" className="h-10 object-contain" />
          ) : (
            <h2 className="text-2xl font-bold italic tracking-tight">COLLEGE<span className="text-emerald-500">WEB</span></h2>
          )}
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            {footer.aboutText}
          </p>
          <div className="flex gap-4">
            {footer.facebook && <a href={footer.facebook} target="_blank" className="text-gray-400 hover:text-blue-500 transition-colors"><Facebook size={20} /></a>}
            {footer.twitter && <a href={footer.twitter} target="_blank" className="text-gray-400 hover:text-sky-400 transition-colors"><Twitter size={20} /></a>}
            {footer.linkedin && <a href={footer.linkedin} target="_blank" className="text-gray-400 hover:text-blue-600 transition-colors"><Linkedin size={20} /></a>}
            {footer.instagram && <a href={footer.instagram} target="_blank" className="text-gray-400 hover:text-pink-500 transition-colors"><Instagram size={20} /></a>}
            {footer.youtube && <a href={footer.youtube} target="_blank" className="text-gray-400 hover:text-red-600 transition-colors"><Youtube size={20} /></a>}
          </div>
        </div>

        {/* Column 2: Section 1 */}
        <div>
          <h3 className="text-base font-bold mb-6 uppercase tracking-wider text-emerald-500">{footer.section1Title}</h3>
          <ul className="space-y-4 text-gray-400 text-sm">
            {s1Links.length > 0 ? s1Links.map((link: any, idx: number) => (
              <li key={idx}><a href={link.link} className="hover:text-white transition-colors">{link.label}</a></li>
            )) : (
              <>
                <li><a href="/colleges" className="hover:text-white transition-colors">Colleges</a></li>
                <li><a href="/courses" className="hover:text-white transition-colors">Courses</a></li>
                <li><a href="/exams" className="hover:text-white transition-colors">Exams</a></li>
                <li><a href="/articles" className="hover:text-white transition-colors">Articles</a></li>
              </>
            )}
          </ul>
        </div>

        {/* Column 3: Section 2 */}
        <div>
          <h3 className="text-base font-bold mb-6 uppercase tracking-wider text-emerald-500">{footer.section2Title}</h3>
          <ul className="space-y-4 text-gray-400 text-sm">
            {s2Links.length > 0 ? s2Links.map((link: any, idx: number) => (
              <li key={idx}><a href={link.link} className="hover:text-white transition-colors">{link.label}</a></li>
            )) : (
              <>
                <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="/careers" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="/scholarships" className="hover:text-white transition-colors">Scholarships</a></li>
              </>
            )}
          </ul>
        </div>

        {/* Column 4: Contact */}
        <div className="space-y-6">
          <h3 className="text-base font-bold mb-6 uppercase tracking-wider text-emerald-500">Get in Touch</h3>
          <div className="space-y-4 text-gray-400 text-sm">
            {footer.address && (
              <div className="flex gap-3">
                <MapPin size={18} className="text-emerald-500 shrink-0" />
                <span>{footer.address}</span>
              </div>
            )}
            {footer.phone && (
              <div className="flex gap-3">
                <Phone size={18} className="text-emerald-500 shrink-0" />
                <span>{footer.phone}</span>
              </div>
            )}
            {footer.email && (
              <div className="flex gap-3">
                <Mail size={18} className="text-emerald-500 shrink-0" />
                <span>{footer.email}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-gray-800/50 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <p className="text-gray-500 text-xs">
          {footer.copyrightText}
        </p>
        <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-500">
          <a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="/terms" className="hover:text-white transition-colors">Terms & Conditions</a>
          <a href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</a>
        </div>
      </div>
    </footer>
  )
}
