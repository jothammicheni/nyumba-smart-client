// ContactPageSEO.js
import React from "react"
import { Helmet } from "react-helmet"

const ContactPageSEO = () => (
  <Helmet>
    <title>Contact Us - NyumbaSmart Real Estate Platform</title>
    <meta
      name="description"
      content="Get in touch with NyumbaSmart — your trusted real estate platform in Nairobi. Contact us via phone, email or visit our office."
    />
    <meta
      name="keywords"
      content="Contact NyumbaSmart, real estate contact, Nairobi property inquiries, real estate support"
    />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="https://nyumbasmart.com/contact" />

    {/* Open Graph */}
    <meta property="og:title" content="Contact Us - NyumbaSmart Real Estate Platform" />
    <meta
      property="og:description"
      content="Get in touch with NyumbaSmart — your trusted real estate platform in Nairobi. Contact us via phone, email or visit our office."
    />
    <meta property="og:url" content="https://nyumbasmart.com/contact" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="https://nyumbasmart.com/og-image-contact.jpg" />

    {/* Twitter */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Contact Us - NyumbaSmart Real Estate Platform" />
    <meta
      name="twitter:description"
      content="Get in touch with NyumbaSmart — your trusted real estate platform in Nairobi. Contact us via phone, email or visit our office."
    />
    <meta name="twitter:image" content="https://nyumbasmart.com/og-image-contact.jpg" />
  </Helmet>
)

export default ContactPageSEO
