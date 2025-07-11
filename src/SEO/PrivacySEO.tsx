// PrivacySEO.tsx
import React from "react"
import { Helmet } from "react-helmet"

const PrivacySEO = () => (
  <Helmet>
    <title>Privacy Policy - NyumbaSmart</title>
    <meta
      name="description"
      content="Learn how NyumbaSmart protects your privacy and handles your personal data."
    />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="https://nyumbasmart.com/privacy" />

    {/* Open Graph */}
    <meta property="og:title" content="Privacy Policy - NyumbaSmart" />
    <meta property="og:description" content="Learn how NyumbaSmart protects your privacy and handles your personal data." />
    <meta property="og:url" content="https://nyumbasmart.com/privacy" />
    <meta property="og:type" content="website" />

    {/* Twitter */}
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="Privacy Policy - NyumbaSmart" />
    <meta name="twitter:description" content="Learn how NyumbaSmart protects your privacy and handles your personal data." />
  </Helmet>
)

export default PrivacySEO