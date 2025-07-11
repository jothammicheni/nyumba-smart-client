import React from "react"

interface Tenant { user: { name: string } }

interface Props {
  open: boolean
  confirmData: { tenant: Tenant; amount: number; method: string; mpesaCode?: string } | null
  onClose(): void
  onConfirm(): void
}

const ConfirmPaymentModal: React.FC<Props> = ({
  open,
  confirmData,
  onClose,
  onConfirm,
}) => {
  if (!open || !confirmData) return null

  const { tenant, amount, method } = confirmData

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Confirm Payment</h2>
        <p>
          Confirm payment of <strong>${amount.toFixed(2)}</strong> by{" "}
          <strong>{tenant.user.name}</strong> via <strong>{method}</strong>.
        </p>
        <p className="text-red-600 font-semibold mt-4">
          Note: This action <em>cannot</em> be reversed.
        </p>

        <div className="flex justify-end space-x-3 mt-6">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded">
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmPaymentModal
