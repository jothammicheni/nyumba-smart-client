// AboutPageSEO.tsx
import React from "react"
import { Helmet } from "react-helmet"

const AboutPageSEO = () => (
  <Helmet>
    <title>About Us - NyumbaSmart Real Estate Platform</title>
    <meta
      name="description"
      content="Learn more about NyumbaSmart, our mission to transform real estate in Nairobi, and our dedicated team."
    />
    <meta name="keywords" content="About NyumbaSmart, real estate company, Nairobi property experts" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="https://nyumbasmart.com/about" />

    {/* Open Graph */}
    <meta property="og:title" content="About Us - NyumbaSmart Real Estate Platform" />
    <meta
      property="og:description"
      content="Learn more about NyumbaSmart, our mission to transform real estate in Nairobi, and our dedicated team."
    />
    <meta property="og:url" content="https://nyumbasmart.com/about" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="https://nyumbasmart.com/og-image-about.jpg" />

    {/* Twitter */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="About Us - NyumbaSmart Real Estate Platform" />
    <meta
      name="twitter:description"
      content="Learn more about NyumbaSmart, our mission to transform real estate in Nairobi, and our dedicated team."
    />
    <meta name="twitter:image" content="https://nyumbasmart.com/og-image-about.jpg" />
  </Helmet>
)

export default AboutPageSEO
