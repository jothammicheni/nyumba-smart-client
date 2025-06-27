import type React from "react"
import Hero from "../components/Hero.js"
import CTASection from "../components/CTASection.js"
import LoginProcedureSection from "../components/LoginProcedureSection.js"
import Testimonials from "../components/Testimonials.js"

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <CTASection />
      <LoginProcedureSection />
      <Testimonials />
    </>
  )
}

export default HomePage
