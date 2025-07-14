// components/TrialModal.tsx
import React from 'react'
import { X, ArrowRight, Smartphone, Check } from 'lucide-react'

interface Tier {
  name: string
  icon: React.ReactNode
  priceMonthly: number
}

interface TrialModalProps {
  selectedTier: Tier
  showPayment: boolean
  acceptedTerms: boolean
  setAcceptedTerms: (value: boolean) => void
  setSelectedTier: (tier: Tier | null) => void
  startTrial: () => void
  handleMpesaPayment: () => void
}

const TrialModal: React.FC<TrialModalProps> = ({
  selectedTier,
  showPayment,
  acceptedTerms,
  setAcceptedTerms,
  setSelectedTier,
  startTrial,
  handleMpesaPayment
}) => {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 dark:border-gray-800">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-900 p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Start Your <span className="text-primary-600">{selectedTier.name}</span> Trial
          </h2>
          <button
            onClick={() => setSelectedTier(null)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Tier Summary */}
          <div className="bg-blue-50 dark:bg-gray-800/50 rounded-xl p-6 flex items-center">
            <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mr-4">
              <div className="text-white">{selectedTier.icon}</div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {selectedTier.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {selectedTier.priceMonthly === 0
                  ? "Free"
                  : `Ksh ${selectedTier.priceMonthly.toLocaleString()}/month`}
              </p>
            </div>
          </div>

          {/* Trial Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <ArrowRight className="w-5 h-5 mr-2 text-primary-600" />
              How Your Trial Works
            </h3>
            <div className="space-y-6">
              {[
                {
                  title: "Instant Access",
                  desc: `Get full access to all ${selectedTier.name} tier features immediately`
                },
                {
                  title: "45-Day Trial Period",
                  desc: "Explore all features for 45 days with no payment required"
                },
                {
                  title: "Seamless M-Pesa Payment",
                  desc: "After 45 days, we'll send an M-Pesa prompt to continue your subscription",
                  phone: "+254 XXX XXX XXX"
                }
              ].map((item, idx) => (
                <div className="flex" key={idx}>
                  <div className="flex flex-col items-center mr-4">
                    <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary-600 dark:bg-primary-400" />
                    </div>
                    {idx < 2 && <div className="w-0.5 h-full bg-gray-200 dark:bg-gray-700 mt-1" />}
                  </div>
                  <div className="pb-6">
                    <h4 className="font-medium text-gray-900 dark:text-white">{item.title}</h4>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">{item.desc}</p>
                    {item.phone && (
                      <div className="flex items-center mt-3 bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                        <Smartphone className="w-5 h-5 text-primary-600 dark:text-primary-400 mr-2" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">{item.phone}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Terms Agreement */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <div
              className="flex items-start cursor-pointer"
              onClick={() => setAcceptedTerms(!acceptedTerms)}
            >
              <div
                className={`flex items-center justify-center w-6 h-6 rounded border mr-3 mt-0.5 transition-colors
                ${acceptedTerms
                    ? "bg-primary-600 border-primary-600"
                    : "border-gray-300 dark:border-gray-600 hover:border-primary-600"
                  }`}
              >
                {acceptedTerms && <Check className="w-4 h-4 text-white" />}
              </div>
              <div>
                <p className="text-gray-900 dark:text-white">
                  I agree to the NyumbaSmart{" "}
                  <span className="text-primary-600">Terms of Service</span> and{" "}
                  <span className="text-primary-600">Privacy Policy</span>
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Your subscription will automatically renew after the trial period unless canceled
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white dark:bg-gray-900 p-6 border-t border-gray-200 dark:border-gray-800">
          {showPayment ? (
            <button
              onClick={handleMpesaPayment}
              className="w-full py-3 mt-2 rounded-md text-white font-bold bg-green-600 hover:bg-green-700"
            >
              Pay via M-Pesa
            </button>
          ) : (
            <button
              disabled={!acceptedTerms}
              onClick={startTrial}
              className={`w-full py-3 mt-2 rounded-md text-white font-bold ${acceptedTerms
                  ? "bg-primary-600 hover:bg-primary-700"
                  : "bg-gray-400 cursor-not-allowed"
                }`}
            >
              Start Free Trial
            </button>
          )}
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
            No payment required • Cancel anytime
          </p>
        </div>
      </div>
    </div>
  )
}

export default TrialModal
