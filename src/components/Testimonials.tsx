import type React from "react"

const testimonials = [
  {
    id: 1,
    quote:
      "NyumbaSmart has completely transformed how I manage my rental properties. The M-Pesa integration makes rent collection effortless, and I love being able to see all my properties' financial status at a glance.",
    author: "James Mwangi",
    role: "Property Owner, Nairobi",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    quote:
      "As a tenant, I appreciate how easy it is to pay my rent and submit maintenance requests. The notifications are helpful reminders, and I never have to worry about keeping paper receipts anymore.",
    author: "Sarah Ochieng",
    role: "Tenant, Mombasa",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
]

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-primary-600/10 via-white to-blue-50 dark:from-gray-950/60 dark:via-gray-950/70 dark:to-gray-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">Customer Reviews</h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 dark:text-gray-300 mx-auto">
            Hear from landlords and tenants who are using NyumbaSmart to simplify property management.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-[#FBFBFB] dark:bg-gray-900 rounded-xl shadow-lg p-8 transform transition duration-500 hover:shadow-xl border border-gray-100 dark:border-gray-800">
              <div className="flex flex-col h-full">
                <div className="flex-grow">
                  <svg className="h-8 w-8 text-primary-500 mb-4" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 italic">"{testimonial.quote}"</p>
                </div>
                <div className="flex items-center">
                  <img
                    className="h-12 w-12 rounded-full mr-4"
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.author}
                  />
                  <div>
                    <p className="text-gray-900 dark:text-white font-semibold">{testimonial.author}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials