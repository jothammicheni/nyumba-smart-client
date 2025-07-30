import React from "react";
import { Helmet } from "react-helmet";

const SEO = () => {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>Find Your Dream Home - Best Real Estate Platform</title>
      <meta name="description" content="TenaHub is an all-in-one platform for real estate property management, offering powerful solutions for agents, tenants, landlords, and service providers. Streamline your property management with our easy-to-use tools." />
      <meta name="keywords" content="real estate, apartments, houses for rent, rooms for rent, property listings, buy home, rent home" />
      <meta name="author" content="Your Company Name" />
      <meta name="robots" content="index, follow" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://tenahub.co.ke/" />
      <meta property="og:title" content="Find Your Dream Home - Best Real Estate Management Platform" />
      <meta property="og:description" content="TenaHub is an all-in-one platform for real estate property management, offering powerful solutions for agents, tenants, landlords, and service providers. Streamline your property management with our easy-to-use tools." />
      <meta property="og:image" content="https://tenahub.co.ke/og-image.jpg" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://tenahub.co.ke/" />
      <meta property="twitter:title" content="Find Your Dream Home - Best Real Estate Platform" />
      <meta property="twitter:description" content="TenaHub is an all-in-one platform for real estate property management, offering powerful solutions for agents, tenants, landlords, and service providers. Streamline your property management with our easy-to-use tools." />
      <meta property="twitter:image" content="https://tenahub.co.ke/og-image.jpg" />

      {/* Canonical Link */}
      <link rel="canonical" href="https://tenahub.co.ke/" />
    </Helmet>
  );
};

export default SEO;
