import Image from "next/image"

export default function FeaturesSection() {
  const features = [
    {
      icon: "/college-building-icon-yellow-blue-cartoon-style.jpg",
      title: "Discover Your Ideal Career",
      description:
        "Explore top colleges in your city, country, and abroad all in one place to discover your ideal career.",
    },
    {
      icon: "/woman-admission-expert-professional-icon-cartoon-s.jpg",
      title: "Speak with Admission Experts",
      description: "Receive completely free guidance on exams, colleges, and courses from our team of experts.",
    },
    {
      icon: "/application-form-checklist-icon-blue-pink-cartoon-.jpg",
      title: "One Form, Thousands of Colleges",
      description: "Apply to over 2,000 esteemed courses, colleges, and universities with a single application form.",
    },
    {
      icon: "/hand-holding-lightbulb-idea-icon-cartoon-style-yel.jpg",
      title: "Quick and Easy Doubt Resolutions",
      description: "Get your doubts on colleges, courses, studies, or exams resolved in one click.",
    },
    {
      icon: "/open-book-notes-laptop-icon-blue-teal-cartoon-styl.jpg",
      title: "Access all Notes in one Place.",
      description:
        "Find all notes for school, graduation, post-graduation, diploma, and exam preparation in one place.",
    },
    {
      icon: "/application-management-gear-clipboard-icon-blue-ca.jpg",
      title: "Manage Applications Seamlessly",
      description: "Enjoy amazing rewards and cashback opportunities while applying to colleges.",
    },
  ]

  return (
    <section className="py-10 md:py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Because Every Student Deserves the Best Future</h2>
          <p className="text-gray-500 text-base">Explore Colleges, Courses, and Career Paths Effortlessly</p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-100 rounded-lg p-8 text-center">
              <div className="flex justify-center mb-4">
                <Image
                  src={feature.icon || "/placeholder.svg"}
                  alt={feature.title}
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
