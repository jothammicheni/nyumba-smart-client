import { useRef } from "react"
import type React from "react"
import { motion, useInView, easeInOut } from "framer-motion"

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
  {
    id: 4,
    quote:
      "I searched for weeks before finding TenaHub. The platform helped me filter homes by location, rent, and amenities — within a few days, I signed a lease!",
    author: "Beatrice Njeri",
    role: "Home Seeker, Nakuru",
  },
  {
    id: 5,
    quote:
      "TenaHub connects you to property owners directly. I was able to skip agents and negotiate better terms. Highly recommended!",
    author: "Peter Kimani",
    role: "Home Seeker, Thika",
  },
  {
    id: 6,
    quote:
      "After moving from Eldoret, I found a furnished apartment within 3 days using TenaHub. It’s now my go-to for housing.",
    author: "Grace Chebet",
    role: "Relocator, Nairobi",
  },
]

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easeInOut,
    },
  },
}

const cardHoverVariants = {
  hover: {
    y: -10,
    transition: {
      duration: 0.3,
      ease: easeInOut,
    },
  },
}

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
      className="py-16 bg-gradient-to-br from-white via-white to-blue-50 dark:from-gray-950/60 dark:via-gray-950/70 dark:to-gray-950/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Customer Reviews
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 dark:text-gray-300 mx-auto">
            Hear from landlords and tenants who are using TenaHub to simplify property management.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-8 md:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              whileHover="hover"
              className="bg-[#FBFBFB] dark:bg-gray-900 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-gray-800"
            >
              <motion.div variants={cardHoverVariants} className="flex flex-col h-full">
                <div className="flex-grow">
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, type: "spring" }}
                  >
                    <svg className="h-8 w-8 text-primary-500 mb-4" fill="currentColor" viewBox="0 0 32 32">
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                  </motion.div>
                  <motion.p
                    className="text-gray-600 dark:text-gray-300 mb-6 italic"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    "{testimonial.quote}"
                  </motion.p>
                </div>
                <motion.div
                  className="flex items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="h-12 w-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg mr-4">
                    {getInitials(testimonial.author)}
                  </div>
                  <div>
                    <p className="text-gray-900 dark:text-white font-semibold">{testimonial.author}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials
