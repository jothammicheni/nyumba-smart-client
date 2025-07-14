// components/ConfirmPaymentModal.tsx
import { Loader2 } from "lucide-react"

const ConfirmPaymentModal = () => {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
        <Loader2 className="w-8 h-8 text-primary-600 animate-spin mx-auto mb-4" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Waiting for Payment Confirmation
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          Please complete the payment on your phone. This may take a few
          moments...
        </p>
      </div>
    </div>
  )
}

export default ConfirmPaymentModal
