// CookiesSEO.tsx
import React from "react"
import { Helmet } from "react-helmet"

const CookiesSEO = () => (
  <Helmet>
    <title>Cookies Policy - NyumbaSmart</title>
    <meta
      name="description"
      content="Understand how NyumbaSmart uses cookies to enhance your browsing experience."
    />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="https://nyumbasmart.com/cookies" />

    {/* Open Graph */}
    <meta property="og:title" content="Cookies Policy - NyumbaSmart" />
    <meta property="og:description" content="Understand how NyumbaSmart uses cookies to enhance your browsing experience." />
    <meta property="og:url" content="https://nyumbasmart.com/cookies" />
    <meta property="og:type" content="website" />

    {/* Twitter */}
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="Cookies Policy - NyumbaSmart" />
    <meta name="twitter:description" content="Understand how NyumbaSmart uses cookies to enhance your browsing experience." />
  </Helmet>
)

export default CookiesSEO
