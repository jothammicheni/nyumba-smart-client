import React from 'react';
import PrivacySEO from '../../SEO/PrivacySEO.js';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6 sm:p-10">
      <PrivacySEO/>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 sm:p-10">
        <h1 className="text-3xl font-bold mb-6 text-primary-600">Privacy Policy</h1>

        <p className="mb-4">
          This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our real estate management platform. We are committed to protecting your personal data and ensuring transparency in our practices.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary-600">1. Information We Collect</h2>
        <p className="mb-4">
          We may collect personal information that you voluntarily provide to us, such as your name, email address, phone number, and property details. We may also collect information automatically, including usage data, cookies, and device information.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary-600">2. How We Use Your Information</h2>
        <p className="mb-4">
          We use your information to provide and improve our services, respond to inquiries, communicate with you, and ensure the security of our platform. We may also use the data for analytics and marketing purposes, in accordance with your preferences.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary-600">3. Sharing Your Information</h2>
        <p className="mb-4">
          We do not sell your personal data. We may share information with trusted third-party service providers who assist us in operating our platform, conducting our business, or serving our users—provided those parties agree to keep this information confidential.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary-600">4. Data Security</h2>
        <p className="mb-4">
          We implement appropriate technical and organizational measures to protect your personal data from unauthorized access, disclosure, alteration, or destruction.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary-600">5. Your Rights</h2>
        <p className="mb-4">
          Depending on your location, you may have rights under applicable data protection laws, including the right to access, correct, or delete your personal information and the right to object to or restrict certain processing activities.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary-600">6. Changes to This Policy</h2>
        <p className="mb-4">
          We may update this Privacy Policy from time to time. Any changes will be posted on this page, and the date of the latest revision will be indicated below.
        </p>

        <p className="mt-8 text-sm text-gray-500">
          Last updated: July 8, 2025
        </p>
      </div>
    </div>
  );
};

export default Privacy;
