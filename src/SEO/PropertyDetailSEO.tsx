// PropertyDetailSEO.tsx
import React from "react"
import { Helmet } from "react-helmet"

interface PropertyDetailSEOProps {
  title: string
  description: string
  url: string
  imageUrl: string
}

const PropertyDetailSEO: React.FC<PropertyDetailSEOProps> = ({
  title,
  description,
  url,
  imageUrl,
}) => (
  <Helmet>
    <title>{title} - NyumbaSmart Property Details</title>
    <meta name="description" content={description} />
    <meta name="keywords" content="Nairobi property, real estate details, property for sale, home details" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href={url} />

    {/* Open Graph */}
    <meta property="og:title" content={`${title} - NyumbaSmart Property Details`} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={url} />
    <meta property="og:type" content="article" />
    <meta property="og:image" content={imageUrl} />

    {/* Twitter */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={`${title} - NyumbaSmart Property Details`} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={imageUrl} />
  </Helmet>
)

export default PropertyDetailSEO
