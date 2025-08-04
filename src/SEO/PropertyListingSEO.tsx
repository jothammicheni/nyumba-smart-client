// PropertyListingSEO.tsx
import React from "react"
import { Helmet } from "react-helmet"

const PropertyListingSEO = () => (
  <Helmet>
    <title>Properties for Sale & Rent - TenaHub Nairobi</title>
    <meta
      name="description"
      content="Explore the latest properties for sale and rent in Nairobi with TenaHub. Find your perfect home for rent or investment."
    />
    <meta
      name="keywords"
      content="Nairobi properties, real estate listings, homes for sale, apartments for rent, property investment Kenya"
    />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="https://www.tenaHub.co.ke/properties" />

    {/* Open Graph */}
    <meta property="og:title" content="Properties for Sale & Rent - TenaHub Nairobi" />
    <meta
      property="og:description"
      content="Explore the latest properties for sale and rent in Nairobi with TenaHub. Find your perfect home or investment."
    />
    <meta property="og:url" content="https://www.tenaHub.co.ke/properties" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="https://www.tenaHub.co.ke/og-image.jpg" />

    {/* Twitter */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Properties for Sale & Rent - TenaHub Nairobi" />
    <meta
      name="twitter:description"
      content="Explore the latest properties for sale and rent in Nairobi with TenaHub. Find your perfect home or investment."
    />
    <meta name="twitter:image" content="https://www.tenaHub.co.ke/og-image.jpg" />
  </Helmet>
)

export default PropertyListingSEO
