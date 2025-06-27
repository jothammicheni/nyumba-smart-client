"use client";

import type React from "react";
import { useTheme } from "../../../components/ThemeProvider";

import WelcomeInfo from "../components/WelcomeInfo";
import RentSummary from "../components/RentSummary";
import PaymentHistory from "../components/PaymentHistory";
import MaintananceRequests from "../components/MaintananceRequests";
import Announcements from "../components/Announcements";

const TenantDashboardPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
     

      {/* Main content */}
      <div className=" flex flex-col flex-1">
        {/* Top navigation */}
 
        {/* Main content area */}
        <main className="flex-1 pb-8">
          {/* tenant info */}
          <WelcomeInfo />
          <div className="mt-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Rent Summary */}
              <RentSummary />
              {/* Payment History and Maintenance Requests */}
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {/* Payment History */}
                <PaymentHistory />
                {/* Maintenance Requests */}
                <MaintananceRequests />
              </div>

              {/* Announcements */}

              <Announcements />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TenantDashboardPage;
