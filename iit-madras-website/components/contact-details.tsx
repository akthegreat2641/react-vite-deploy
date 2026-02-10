import { MapPin, Phone, Globe } from "lucide-react"

export function ContactDetails() {
  return (
    <div className="bg-white rounded border border-gray-200 mt-4">
      {/* Header */}
      <div className="px-4 py-3 bg-gray-100 border-b border-gray-200">
        <h2 className="text-base font-semibold text-orange-500">Contact Details</h2>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex gap-6">
          {/* Map Section */}
          <div className="flex-1">
            <div className="border border-gray-300 rounded overflow-hidden">
              {/* Map Header */}
              <div className="bg-white px-3 py-2 border-b border-gray-200 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-800">12°59'29.3"N 80°14'01.2"E</p>
                  <p className="text-xs text-gray-500">X6RM+HFV Chennai, Tamil Nadu</p>
                  <a href="#" className="text-xs text-blue-600 hover:underline">
                    View larger map
                  </a>
                </div>
                <a href="#" className="flex items-center gap-1 text-blue-600 text-xs font-medium">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9z" />
                  </svg>
                  Directions
                </a>
              </div>
              {/* Map Embed */}
              <div className="h-[250px] bg-gray-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.123456789!2d80.2337!3d12.9911!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526778f82e97e5%3A0x4556befb5d6e6abc!2sIIT%20Madras!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="IIT Madras Location"
                />
              </div>
              {/* Map Footer */}
              <div className="bg-gray-100 px-2 py-1 flex items-center justify-between text-[10px] text-gray-500">
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-gray-300 rounded-sm" />
                </div>
                <div className="flex items-center gap-2">
                  <span>Keyboard shortcuts</span>
                  <span>Map data ©2025 Google</span>
                  <span>Terms</span>
                  <span>Report a map error</span>
                </div>
                <div className="flex items-center gap-1">
                  <button className="w-6 h-6 bg-white rounded border flex items-center justify-center">⤢</button>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info Section */}
          <div className="w-[300px]">
            <h3 className="text-sm font-semibold text-gray-800 mb-4">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-blue-600">IIT Madras - Indian Institute of Technology - IIT Madras Campus</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-green-600 flex-shrink-0" />
                <p className="text-sm text-gray-700">+914422578000</p>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <a href="https://www.iitm.ac.in" className="text-sm text-blue-600 hover:underline">
                  www.iitm.ac.in
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
