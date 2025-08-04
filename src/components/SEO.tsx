import React from "react";
import { Helmet } from "react-helmet";

const SEO = () => {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>Find Your Dream Home in Kenya | TenaHub Real Estate Platform</title>
      <meta
        name="description"
        content="TenaHub is Kenya's leading platform for real estate property management. Discover apartments, houses, and rooms for rent or sale. Trusted by agents, tenants, landlords, and service providers."
      />
      <meta
        name="keywords"
        content="real estate Kenya, apartments for rent, houses for sale, rooms to rent, property listings Kenya, buy home Kenya, rent home Nairobi"
      />
      <meta name="author" content="TenaHub" />
      <meta name="robots" content="index, follow" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.tenahub.co.ke/" />
      <meta property="og:title" content="Find Your Dream Home in Kenya | TenaHub Real Estate Platform" />
      <meta
        property="og:description"
        content="Explore verified properties across Kenya. TenaHub helps agents, landlords, and tenants find and manage homes easily."
      />
      <meta property="og:image" content="https://www.tenahub.co.ke/og-image.jpg" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content="https://www.tenahub.co.ke/" />
      <meta name="twitter:title" content="Find Your Dream Home in Kenya | TenaHub Real Estate Platform" />
      <meta
        name="twitter:description"
        content="TenaHub offers powerful tools for property management and home search across Kenya. Agents, landlords, tenants — we've got you covered."
      />
      <meta name="twitter:image" content="https://www.tenahub.co.ke/og-image.jpg" />

      {/* Canonical Link */}
      <link rel="canonical" href="https://www.tenahub.co.ke/" />
    </Helmet>
  );
};

export default SEO;
