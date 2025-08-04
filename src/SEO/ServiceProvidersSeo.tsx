import React from "react";
import { Helmet } from "react-helmet";

const ServiceProvidersSeo: React.FC = () => {
  return (
    <Helmet>
      <title>Real Estate Service Providers Marketplace | TenaHub</title>
      <meta
        name="description"
        content="Find verified service providers in the real estate industry on TenaHub. Browse professionals including plumbers, electricians, cleaners, movers, and more—all trusted and rated."
      />
      <meta
        name="keywords"
        content="real estate service providers, property maintenance, trusted contractors Kenya, plumbers, electricians, cleaners, movers, real estate professionals"
      />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href="https://www.tenahub.co.ke/marketplace" />

      {/* Open Graph */}
      <meta property="og:title" content="Real Estate Service Providers Marketplace | TenaHub" />
      <meta
        property="og:description"
        content="Browse all trusted real estate service providers in Kenya—from maintenance to moving services. Trusted by agents, landlords, and tenants."
      />
      <meta property="og:url" content="https://www.tenahub.co.ke/marketplace" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://www.tenahub.co.ke/images/service-providers-og.jpg" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Real Estate Service Providers Marketplace | TenaHub" />
      <meta
        name="twitter:description"
        content="Explore top-rated real estate service providers in Kenya. Cleaners, electricians, movers, and more—available now."
      />
      <meta name="twitter:image" content="https://www.tenahub.co.ke/images/service-providers-og.jpg" />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Service Providers Marketplace",
          "description":
            "Find verified real estate service providers in Kenya including plumbers, cleaners, movers, electricians, and more.",
          "url": "https://www.tenahub.co.ke/marketplace",
          "publisher": {
            "@type": "Organization",
            "name": "TenaHub",
            "url": "https://www.tenahub.co.ke"
          }
        })}
      </script>
    </Helmet>
  );
};

export default ServiceProvidersSeo;
