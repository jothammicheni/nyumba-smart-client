import React from "react";
import { Helmet } from "react-helmet";

const BlogSeo: React.FC = () => {
  return (
    <Helmet>
      <title>Real Estate Tips & Property Insights Blog | TenaHub</title>
      <meta
        name="description"
        content="Stay updated with real estate trends, rental tips, buying guides, and industry insights from TenaHub's blog. Ideal for agents, landlords, tenants, and property seekers."
      />
      <meta
        name="keywords"
        content="real estate blog Kenya, property tips, landlord advice, tenant guides, buying property, renting in Kenya, real estate insights"
      />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href="https://www.tenahub.co.ke/blogs" />

      {/* Open Graph */}
      <meta property="og:title" content="Real Estate Tips & Property Insights Blog | TenaHub" />
      <meta
        property="og:description"
        content="Explore the TenaHub Blog for real estate tips, tenant guides, landlord resources, and property news across Kenya."
      />
      <meta property="og:url" content="https://www.tenahub.co.ke/blogs" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://www.tenahub.co.ke/images/blog-og.jpg" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Real Estate Tips & Property Insights Blog | TenaHub" />
      <meta
        name="twitter:description"
        content="Latest blog articles from TenaHub on buying, renting, and managing property in Kenya. Real estate made simple."
      />
      <meta name="twitter:image" content="https://www.tenahub.co.ke/images/blog-og.jpg" />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "TenaHub Blog",
          "url": "https://www.tenahub.co.ke/blogs",
          "description":
            "Explore expert real estate tips, market updates, and helpful property advice from TenaHub's team.",
          "publisher": {
            "@type": "Organization",
            "name": "TenaHub",
            "url": "https://www.tenahub.co.ke",
            "logo": {
              "@type": "ImageObject",
              "url": "https://www.tenahub.co.ke/logo.png"
            }
          }
        })}
      </script>
    </Helmet>
  );
};

export default BlogSeo;
