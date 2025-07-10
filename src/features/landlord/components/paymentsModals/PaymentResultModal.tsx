// components/PaymentResultModal.tsx
import { CheckCircle, XCircle } from "lucide-react"

interface PaymentResultModalProps {
  success: boolean
  message: string
  onClose: () => void
}

const PaymentResultModal: React.FC<PaymentResultModalProps> = ({
  success,
  message,
  onClose,
}) => {
  const Icon = success ? CheckCircle : XCircle
  const iconColor = success ? "text-green-600" : "text-red-600"
  const title = success ? "Payment Successful" : "Payment Failed"

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
        <Icon className={`w-10 h-10 mx-auto mb-4 ${iconColor}`} />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">{message}</p>
        <button
          onClick={onClose}
          className="mt-6 px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default PaymentResultModal
