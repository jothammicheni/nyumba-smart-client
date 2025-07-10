import React from 'react';
import TermsSEO from '../../SEO/TermsSEO.js';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6 sm:p-10">
      <TermsSEO/>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 sm:p-10">
        <h1 className="text-3xl font-bold mb-6 text-primary-600">Terms of Service</h1>

        <p className="mb-4">
          Welcome to our real estate management platform. By accessing or using our services, you agree to be bound by the following terms and conditions. Please read them carefully.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary-600">1. Acceptance of Terms</h2>
        <p className="mb-4">
          By using our website or services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary-600">2. User Accounts</h2>
        <p className="mb-4">
          To access certain features, you may be required to create an account. You are responsible for maintaining the confidentiality of your login details and for all activities under your account.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary-600">3. Platform Usage Guidelines</h2>
        <p className="mb-4">
          All payments—rent, services, or subscriptions—must be made through the platform. We are not responsible for any disputes or losses that arise from payments made outside our system.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary-600">4. Tenants</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Tenants are required to pay rent on time through the platform via M-Pesa.</li>
          <li>Late rent payments may lead to lease termination by the landlord.</li>
          <li>Tenants can submit maintenance requests through the platform only.</li>
          <li>If a landlord delays or ignores a maintenance request for over 2 weeks, tenants may request a 20% rent discount.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary-600">5. Landlords</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Landlords must respond to and fulfill maintenance requests submitted by tenants in a timely manner.</li>
          <li>Failure to address requests within 14 days allows tenants to request rent discounts.</li>
          <li>During inactive periods (expired subscription), landlords cannot manage properties, receive payments, or respond to tenant requests.</li>
          <li>45 free days of full platform access are provided after registration. Continued use requires an active subscription.</li>
          <li>Inactive accounts for more than 6 months may be permanently deactivated.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary-600">6. Service Providers</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Service providers (e.g. plumbers) must deliver requested services within 48 hours.</li>
          <li>Orders may be reassigned to another provider if not fulfilled on time.</li>
          <li>All payments must be completed through the platform to build trust, ensure safety, and boost provider ratings.</li>
          <li>A 10% platform fee is deducted from the total payment to support operations and staffing.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary-600">7. Agents</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Agents earn Ksh 500 bonus for each landlord they refer who completes registration and pays for a subscription.</li>
          <li>Referral bonuses are only withdrawable after the landlord activates their account.</li>
          <li>Agents are entitled to a 15–20% recurring monthly commission on every subscription renewal by their referred landlords.</li>
          <li>Minimum withdrawal amount is Ksh 700 and is subject to a 10% tax deduction.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary-600">8. Content & Listings</h2>
        <p className="mb-4">
          All property listings must be truthful and manually created. Use of AI-generated or fake listings may result in immediate account termination.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary-600">9. Intellectual Property</h2>
        <p className="mb-4">
          All content and features of the platform, including branding and software, are the intellectual property of the company. Users may not copy, modify, or distribute any materials without permission.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary-600">10. Limitation of Liability</h2>
        <p className="mb-4">
          We are not liable for any indirect, incidental, or consequential damages. Use of the platform is at your own risk.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary-600">11. Governing Law</h2>
        <p className="mb-4">
          These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which our company is registered.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary-600">12. Changes to Terms</h2>
        <p className="mb-4">
          We may update or revise these Terms at any time. All updates will be posted on this page and take effect immediately upon publication.
        </p>

        <p className="mt-8 text-sm text-gray-500">
          Last updated: July 8, 2025
        </p>
      </div>
    </div>
  );
};

export default Terms;
