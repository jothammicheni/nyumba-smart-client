// HomePage.tsx
import React, { useEffect } from "react"
import { useSearchParams} from "react-router-dom"
import Hero from "../components/Hero.js"
import CTASection from "../components/CTASection.js"
import LoginProcedureSection from "../components/LoginProcedureSection.js"
import Testimonials from "../components/Testimonials.js"

const HomePage: React.FC = () => {
  const [searchParams] = useSearchParams()
  const referralCode = searchParams.get("ref")

  useEffect(() => {
    if (referralCode) {
      localStorage.setItem("referralCode", referralCode)
      console.log(`Referral code set: ${referralCode}`  )
    }
  }, [referralCode])

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
