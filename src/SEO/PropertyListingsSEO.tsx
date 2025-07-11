// PropertyListingSEO.tsx
import React from "react"
import { Helmet } from "react-helmet"

const PropertyListingSEO = () => (
  <Helmet>
    <title>Properties for Sale & Rent - NyumbaSmart Nairobi</title>
    <meta
      name="description"
      content="Explore the latest properties for sale and rent in Nairobi with NyumbaSmart. Find your perfect home or investment."
    />
    <meta
      name="keywords"
      content="Nairobi properties, real estate listings, homes for sale, apartments for rent, property investment Kenya"
    />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="https://nyumbasmart.com/properties" />

    {/* Open Graph */}
    <meta property="og:title" content="Properties for Sale & Rent - NyumbaSmart Nairobi" />
    <meta
      property="og:description"
      content="Explore the latest properties for sale and rent in Nairobi with NyumbaSmart. Find your perfect home or investment."
    />
    <meta property="og:url" content="https://nyumbasmart.com/properties" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="https://nyumbasmart.com/og-image-properties.jpg" />

    {/* Twitter */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Properties for Sale & Rent - NyumbaSmart Nairobi" />
    <meta
      name="twitter:description"
      content="Explore the latest properties for sale and rent in Nairobi with NyumbaSmart. Find your perfect home or investment."
    />
    <meta name="twitter:image" content="https://nyumbasmart.com/og-image-properties.jpg" />
  </Helmet>
)

export default PropertyListingSEO