// TermsSEO.tsx
import React from "react"
import { Helmet } from "react-helmet"

const TermsSEO = () => (
  <Helmet>
    <title>Terms and Conditions - NyumbaSmart</title>
    <meta
      name="description"
      content="Read the terms and conditions for using NyumbaSmart's real estate platform."
    />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="https://nyumbasmart.com/terms" />

    {/* Open Graph */}
    <meta property="og:title" content="Terms and Conditions - NyumbaSmart" />
    <meta property="og:description" content="Read the terms and conditions for using NyumbaSmart's real estate platform." />
    <meta property="og:url" content="https://nyumbasmart.com/terms" />
    <meta property="og:type" content="website" />

    {/* Twitter */}
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="Terms and Conditions - NyumbaSmart" />
    <meta name="twitter:description" content="Read the terms and conditions for using NyumbaSmart's real estate platform." />
  </Helmet>
)

export default TermsSEO