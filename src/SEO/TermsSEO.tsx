// TermsSEO.tsx
import React from "react"
import { Helmet } from "react-helmet"

const TermsSEO = () => (
  <Helmet>
    <title>Terms and Conditions - TenaHub</title>
    <meta
      name="description"
      content="Read the terms and conditions for using TenaHub's real estate platform."
    />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="https://www.tenaHub.co.ke/terms" />

    {/* Open Graph */}
    <meta property="og:title" content="Terms and Conditions - TenaHub" />
    <meta property="og:description" content="Read the terms and conditions for using TenaHub's real estate platform." />
    <meta property="og:url" content="https://www.tenaHub.co.ke/terms" />
    <meta property="og:type" content="website" />

    {/* Twitter */}
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="Terms and Conditions - TenaHub" />
    <meta name="twitter:description" content="Read the terms and conditions for using TenaHub's real estate platform." />
  </Helmet>
)

export default TermsSEO
