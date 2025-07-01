import type React from "react"
import { Link } from "react-router-dom"
import { UserPlus, LogIn, LayoutDashboard, CheckCircle, ArrowBigRight, ArrowRight } from "lucide-react"

const LoginProcedureSection: React.FC = () => {
  return (
    <section className="py-10 py-16 relative overflow-hidden bg-gradient-to-br from-primary-600/10 via-white to-blue-50 dark:from-gray-950/60 dark:via-gray-950/70 dark:to-gray-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6">
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">Get Started with NyumbaSmart</h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 dark:text-gray-300 mx-auto">
            Join NyumbaSmart in just a few simple steps and start managing your properties with ease
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Step 1 */}
          <div className="relative group">
            <div className="group bg-white dark:bg-gray-950 shadow-xl backdrop-blur-sm rounded-2xl p-8 transform transition-all duration-500 hover:scale-105 hover:shadow-xl border border-blue-100/50 dark:border-primary-600/5">
              <div className="absolute -top-6 -left-6 bg-primary-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl shadow-lg transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                1
              </div>
              <div className="flex flex-col items-center pt-6">
                <div className="p-4 bg-primary-300/30 dark:bg-primary-600/30 rounded-2xl mb-6 transform transition-transform duration-300 group-hover:scale-110">
                  <UserPlus className="h-8 w-8 text-primary-500 dark:text-primary-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-3">Register</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center text-sm leading-relaxed">
                  Create your account as a landlord, tenant, agent, or service provider.
                </p>
              </div>
            </div>
            <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
              <ArrowBigRight className="text-primary-500" />
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative group">
            <div className="group bg-white dark:bg-gray-950 shadow-xl backdrop-blur-sm rounded-2xl p-8 transform transition-all duration-500 hover:scale-105 hover:shadow-xl border border-blue-100/50 dark:border-primary-600/5">
              <div className="absolute -top-6 -left-6 bg-primary-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl shadow-lg transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                2
              </div>
              <div className="flex flex-col items-center pt-6">
                <div className="p-4 bg-primary-300/30 dark:bg-primary-600/30 rounded-2xl mb-6 transform transition-transform duration-300 group-hover:scale-110">
                  <LogIn className="h-8 w-8 text-primary-500 dark:text-primary-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-3">Login</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center text-sm leading-relaxed">
                  Access your account using your credentials: email and password securely.
                </p>
              </div>
            </div>
            <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
              <ArrowBigRight className="text-primary-500" />
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative group">
            <div className="group bg-white dark:bg-gray-950 shadow-xl backdrop-blur-sm rounded-2xl p-8 transform transition-all duration-500 hover:scale-105 hover:shadow-xl border border-blue-100/50 dark:border-primary-600/5">
              <div className="absolute -top-6 -left-6 bg-primary-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl shadow-lg transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                3
              </div>
              <div className="flex flex-col items-center pt-6">
                <div className="p-4 bg-primary-300/20 dark:bg-primary-600/30 rounded-2xl mb-6 transform transition-transform duration-300 group-hover:scale-110">
                  <LayoutDashboard className="h-8 w-8 text-primary-500 dark:text-primary-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-3">Access Dashboard</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center text-sm leading-relaxed">
                  Navigate to your personalized dashboard based on your user role.
                </p>
              </div>
            </div>
            <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
              <ArrowBigRight className="text-primary-500" />
            </div>
          </div>

          {/* Step 4 */}
          <div className="relative group">
            <div className="group bg-white dark:bg-gray-950 shadow-xl backdrop-blur-sm rounded-2xl p-8 transform transition-all duration-500 hover:scale-105 hover:shadow-xl border border-blue-100/50 dark:border-primary-600/5">
              <div className="absolute -top-6 -left-6 bg-primary-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl shadow-lg transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                4
              </div>
              <div className="flex flex-col items-center pt-6">
                <div className="p-4 bg-primary-600/30 dark:bg-primary-600/30 rounded-2xl mb-6 transform transition-transform duration-300 group-hover:scale-110">
                  <CheckCircle className="h-8 w-8 text-primary-500 dark:text-primary-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-3">Start Using</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center text-sm leading-relaxed">
                  Begin managing properties, paying rent, or providing services through the platform.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <div className="text-center">
          <div className="inline-flex flex-col items-center space-y-4 p-8 bg-white/60 dark:bg-gray-950 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-primary-600/5 shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Ready to get started?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md">
              Join thousands of users who are already managing their properties efficiently
            </p>
            <Link
              to="/register"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 md:py-4 md:text-lg md:px-10 transition duration-300 pulse-animation"
            >
              <span className="relative z-10">Create Your Account Now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <ArrowRight className="relative ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginProcedureSection