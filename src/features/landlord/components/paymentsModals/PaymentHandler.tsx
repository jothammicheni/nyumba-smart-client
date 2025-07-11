import { useState } from "react"
import InitiatePaymentModal from "./InitiatePaymentModal.js"
import ConfirmPaymentModal from "./ConfirmPaymentModal.js"
import PaymentResultModal from "./PaymentRequestModal.js"

const PaymentHandler = () => {
  const [showInitiate, setShowInitiate] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [paymentResult, setPaymentResult] = useState<{ success: boolean; message: string } | null>(null)

  const handlePayClick = () => {
    setShowInitiate(true)
  }

  const confirmPayment = async () => {
    setLoading(true)
    try {
      setShowInitiate(false)
      setShowConfirm(true)

      // fake API call or wait
      await new Promise((resolve) => setTimeout(resolve, 4000))

      // fake result (you’d get this from your backend)
      const success = true // or false
      setPaymentResult({
        success,
        message: success ? "Your subscription has been activated." : "Payment failed. Try again later.",
      })
    } catch {
      setPaymentResult({ success: false, message: "Something went wrong." })
    } finally {
      setShowConfirm(false)
      setLoading(false)
    }
  }

  return (
    <div>
      <button onClick={handlePayClick} className="bg-green-600 text-white px-4 py-2 rounded">
        Pay via M-Pesa
      </button>

      {showInitiate && (
        <InitiatePaymentModal
          phoneNumber="+254712345678"
          onClose={() => setShowInitiate(false)}
          onConfirm={confirmPayment}
          loading={loading}
        />
      )}

      {showConfirm && <ConfirmPaymentModal />}

      {paymentResult && (
        <PaymentResultModal
          success={paymentResult.success}
          message={paymentResult.message}
          onClose={() => setPaymentResult(null)}
        />
      )}
    </div>
  )
}

export default PaymentHandler