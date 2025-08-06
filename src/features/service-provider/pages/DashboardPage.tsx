import React from "react";
import WelcomeInfo from "../components/WelcomeInfo";
import Tasks from "../components/Tasks";
import { Toaster } from "sonner";

export const ProviderDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-100 dark:from-gray-950/60 dark:via-gray-950/70 dark:to-gray-950/60 overflow-hidden">
      <Toaster position="top-right" richColors />
      <main className="flex-1 pb-8">
        {/* Welcome info card */}
        <WelcomeInfo />

        <div className="mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stats cards */}
          <Tasks />
        </div>
      </main>
    </div>
  );
};
