// HomePage.tsx
import React, { useEffect } from "react"
import { useSearchParams} from "react-router-dom"
import Hero from "../components/Hero.js"
import CTASection from "../components/CTASection.js"
import LoginProcedureSection from "../components/LoginProcedureSection.js"
import Testimonials from "../components/Testimonials.js"
import { Helmet } from "react-helmet"

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
     <Helmet>
      {/* Primary Meta Tags */}
      <title>Find Your Dream Home - Best Real Estate Platform</title>
      <meta name="description" content="Explore the best real estate listings including rooms, apartments, and houses. Find affordable homes with detailed info and images." />
      <meta name="keywords" content="real estate, apartments, houses for rent, rooms for rent, property listings, buy home, rent home" />
      <meta name="author" content="Your Company Name" />
      <meta name="robots" content="index, follow" />
      </Helmet>
      <Hero />
      <CTASection />
      <LoginProcedureSection />
      <Testimonials />
    </>
  )
}

export default HomePage
