import React from "react";
import { Helmet } from "react-helmet";

const SEO = () => {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>Find Your Dream Home - Best Real Estate Platform</title>
      <meta name="description" content="Explore the best real estate listings including rooms, apartments, and houses. Find affordable homes with detailed info and images." />
      <meta name="keywords" content="real estate, apartments, houses for rent, rooms for rent, property listings, buy home, rent home" />
      <meta name="author" content="Your Company Name" />
      <meta name="robots" content="index, follow" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://your-realestate-platform.com/" />
      <meta property="og:title" content="Find Your Dream Home - Best Real Estate Platform" />
      <meta property="og:description" content="Explore the best real estate listings including rooms, apartments, and houses. Find affordable homes with detailed info and images." />
      <meta property="og:image" content="https://your-realestate-platform.com/og-image.jpg" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://your-realestate-platform.com/" />
      <meta property="twitter:title" content="Find Your Dream Home - Best Real Estate Platform" />
      <meta property="twitter:description" content="Explore the best real estate listings including rooms, apartments, and houses. Find affordable homes with detailed info and images." />
      <meta property="twitter:image" content="https://your-realestate-platform.com/og-image.jpg" />

      {/* Canonical Link */}
      <link rel="canonical" href="https://your-realestate-platform.com/" />
    </Helmet>
  );
};

export default SEO;