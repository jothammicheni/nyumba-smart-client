// PrivacySEO.tsx
import React from "react"
import { Helmet } from "react-helmet"

const PrivacySEO = () => (
  <Helmet>
    <title>Privacy Policy - TenaHub</title>
    <meta
      name="description"
      content="Learn how TenaHub protects your privacy and handles your personal data."
    />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="https://tenahub.co.ke/privacy" />

    {/* Open Graph */}
    <meta property="og:title" content="Privacy Policy - TenaHub" />
    <meta property="og:description" content="Learn how TenaHub protects your privacy and handles your personal data." />
    <meta property="og:url" content="https://tenahub.co.ke/privacy" />
    <meta property="og:type" content="website" />

    {/* Twitter */}
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="Privacy Policy - TenaHub" />
    <meta name="twitter:description" content="Learn how TenaHub protects your privacy and handles your personal data." />
  </Helmet>
)

export default PrivacySEO
