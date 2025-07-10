import React from 'react';
import CookiesSEO from '../../SEO/CookiesSEO.js';

const Cookies = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6 sm:p-10">
      <CookiesSEO/>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 sm:p-10">
        <h1 className="text-3xl font-bold mb-6 text-primary-700">Cookies Policy</h1>
        
        <p className="mb-4">
          This Cookies Policy explains how our real estate management platform uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary-600">What are cookies?</h2>
        <p className="mb-4">
          Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used to make websites work or to work more efficiently, as well as to provide reporting information.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary-600">Why do we use cookies?</h2>
        <p className="mb-4">
          We use cookies for several reasons. Some cookies are required for technical reasons for our website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies enable us to track and target the interests of our users to enhance the experience on our platform.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary-600">Types of cookies we use:</h2>
        <ul className="list-disc list-inside mb-4">
          <li><strong>Essential Cookies:</strong> Required for accessing secure areas and using site features.</li>
          <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with the platform.</li>
          <li><strong>Functionality Cookies:</strong> Remember your preferences and improve user experience.</li>
          <li><strong>Advertising Cookies:</strong> Used to make advertising messages more relevant to you.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary-600">Managing cookies</h2>
        <p className="mb-4">
          You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by adjusting your browser settings. Please note that disabling cookies may affect the functionality of our platform.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary-600">Updates to this policy</h2>
        <p className="mb-4">
          We may update this Cookies Policy from time to time to reflect changes to the cookies we use or for other operational, legal, or regulatory reasons. Please revisit this page regularly to stay informed about our use of cookies.
        </p>

        <p className="mt-8 text-sm text-gray-500">
          Last updated: July 8, 2025
        </p>
      </div>
    </div>
  );
};

export default Cookies;
