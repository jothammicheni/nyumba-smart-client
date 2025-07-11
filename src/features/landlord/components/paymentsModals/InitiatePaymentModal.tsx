// components/InitiatePaymentModal.tsx
import { Loader2, Smartphone } from "lucide-react"

interface InitiatePaymentModalProps {
  phoneNumber: string
  onClose: () => void
  onConfirm: () => void
  loading?: boolean
}

const InitiatePaymentModal: React.FC<InitiatePaymentModalProps> = ({
  phoneNumber,
  onClose,
  onConfirm,
  loading = false,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-xl max-w-md w-full">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Confirm Payment
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          An M-Pesa prompt will be sent to:
        </p>
        <div className="flex items-center bg-gray-100 dark:bg-gray-800 p-3 rounded-md mb-6">
          <Smartphone className="text-primary-600 w-5 h-5 mr-2" />
          <span className="text-gray-800 dark:text-white">{phoneNumber}</span>
        </div>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 flex items-center"
          >
            {loading && <Loader2 className="animate-spin w-4 h-4 mr-2" />}
            Confirm & Pay
          </button>
        </div>
      </div>
    </div>
  )
}

export default InitiatePaymentModal