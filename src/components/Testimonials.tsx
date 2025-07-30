import { useRef } from "react"
import type React from "react"
import { useInView } from "framer-motion"
import { ImQuotesLeft } from "react-icons/im";

const testimonials = [
  {
    id: 1,
    quote:
      "TenaHub has completely transformed how I manage my rental properties. The M-Pesa integration makes rent collection effortless, and I love being able to see all my properties' financial status at a glance.",
    author: "James Mwangi",
    role: "Property Owner, Nairobi",
  },
  {
    id: 2,
    quote:
      "As a tenant, I appreciate how easy it is to pay my rent and submit maintenance requests. The notifications are helpful reminders, and I never have to worry about keeping paper receipts anymore.",
    author: "Sarah Ochieng",
    role: "Tenant, Mombasa",
  },
  {
    id: 3,
    quote:
      "Relocating to a new city was stressful, but TenaHub made it so much easier to find and secure a home. Everything from booking viewings to making payments was smooth and secure.",
    author: "Kevin Otieno",
    role: "Relocator, Kisumu",
  },
]

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}

const Testimonials: React.FC = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      ref={ref}
      className="py-16 bg-white dark:bg-gray-950"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className={`text-center mb-16 transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
        >
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Customer Reviews
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 dark:text-gray-300 mx-auto">
            Hear from landlords and tenants who are using TenaHub to simplify property management.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`bg-[#FBFBFB] dark:bg-gray-900/50 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-gray-800/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col h-full">
                <div className="flex-grow">
                  <ImQuotesLeft size={30} className="text-primary-600 mb-1"/>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 text-base font-medium">
                    {testimonial.quote}
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-lg mr-4">
                    {getInitials(testimonial.author)}
                  </div>
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
