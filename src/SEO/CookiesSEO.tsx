// CookiesSEO.tsx
import React from "react"
import { Helmet } from "react-helmet"

const CookiesSEO = () => (
  <Helmet>
    <title>Cookies Policy - TenaHub</title>
    <meta
      name="description"
      content="Understand how TenaHub uses cookies to enhance your browsing experience."
    />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="https://TenaHub.com/cookies" />

    {/* Open Graph */}
    <meta property="og:title" content="Cookies Policy - TenaHub" />
    <meta property="og:description" content="Understand how TenaHub uses cookies to enhance your browsing experience." />
    <meta property="og:url" content="https://TenaHub.com/cookies" />
    <meta property="og:type" content="website" />

    {/* Twitter */}
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="Cookies Policy - TenaHub" />
    <meta name="twitter:description" content="Understand how TenaHub uses cookies to enhance your browsing experience." />
  </Helmet>
)

export default CookiesSEO
