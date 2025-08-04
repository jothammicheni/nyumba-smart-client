import React from "react";
import { Helmet } from "react-helmet";

const RelocateSeo: React.FC = () => {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>Relocate & Find Home in Kenya | TenaHub</title>
      <meta
        name="description"
        content="Professional relocation and home search services across Kenya. Find your perfect home with TenaHub’s verified properties, personalized recommendations, and end-to-end moving support."
      />
      <meta
        name="keywords"
        content="relocate Kenya, find home Kenya, relocation services Kenya, verified properties Kenya, moving support Kenya, book home Kenya, property search Kenya"
      />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href="https://www.tenahub.co.ke/relocate-search-home" />

      {/* Open Graph / Facebook */}
      <meta property="og:title" content="Relocate & Find Home in Kenya | TenaHub" />
      <meta
        property="og:description"
        content="Professional relocation and home search services across Kenya. Verified properties and personalized recommendations in all major cities."
      />
      <meta property="og:url" content="https://www.tenahub.co.ke/relocate-search-home" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="TenaHub" />
      <meta
        property="og:image"
        content="https://www.tenahub.co.ke/images/relocate-home-og.jpg"
      />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Relocate & Find Home in Kenya | TenaHub" />
      <meta
        name="twitter:description"
        content="Professional relocation and home search services across Kenya. Verified properties and personalized recommendations in all major cities."
      />
      <meta
        name="twitter:image"
        content="https://www.tenahub.co.ke/images/relocate-home-og.jpg"
      />

      {/* Structured Data JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "Relocation and Home Search Services",
          "provider": {
            "@type": "Organization",
            "name": "TenaHub",
            "url": "https://www.tenahub.co.ke",
            "logo": "https://www.tenahub.co.ke/logo.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+254113730593",
              "contactType": "Customer Service",
              "areaServed": "KE",
              "availableLanguage": "English"
            }
          },
          "description":
            "Professional relocation and home search services across Kenya, offering verified properties, personalized recommendations, and complete moving assistance.",
          "areaServed": "Kenya",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Relocation Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Verified Properties Ready for Move-In"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Personalized Recommendations"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "End-to-End Moving Support"
                }
              }
            ]
          }
        })}
      </script>
    </Helmet>
  );
};

export default RelocateSeo;
