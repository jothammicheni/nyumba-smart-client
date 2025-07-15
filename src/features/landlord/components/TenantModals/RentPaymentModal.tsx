import React, { useState, useEffect } from "react"

// interface Tenant {
//   _id: string
//   room_id: string
//   property_id: string
//   user: { name: string }
//   lease?: { balance: number } | null
// }
interface Tenant {
  _id: string
  room: {
    _id: string
    room_number: string
    property_id: string
  }
  user: {
    name: string
  }
  lease?: {
    balance: number
  } | null
}


interface Props {
  open: boolean
  tenant: Tenant | null
  onClose(): void
  onSubmit(amount: number, method: string, mpesaCode?: string): void
}

const RentPaymentModal: React.FC<Props> = ({ open, tenant, onClose, onSubmit }) => {
  const [amount, setAmount] = useState("")
  const [method, setMethod] = useState("mpesa")
  const [mpesaCode, setMpesaCode] = useState("")

  useEffect(() => {
    if (open && tenant) {
      setAmount(String(tenant.lease?.balance ?? ""))
      setMethod("mpesa")
      setMpesaCode("")
    }
  }, [open, tenant])

  if (!open || !tenant) return null

  const handleProceed = () => {
    const amt = parseFloat(amount)
    if (isNaN(amt) || amt <= 0) return alert("Enter a valid amount.")
    if ((method === "mpesa" || method === "bank") && !mpesaCode.trim()) {
      return alert("Enter the Mpesa/Bank code.")
    }
    onSubmit(amt, method, mpesaCode.trim())
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          Rent Payment for {tenant.user.name}
        </h2>

        <label className="block mb-2">Payment Method</label>
        <select
          className="w-full mb-4 p-2 border rounded"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        >
          <option value="mpesa">Mpesa</option>
          <option value="bank">Bank</option>
          <option value="cash">Cash</option>
          <option value="other">Other</option>
        </select>

        {(method === "mpesa" || method === "bank") && (
          <>
            <label className="block mb-2">
              {method === "mpesa" ? "Mpesa Code" : "Bank Payment Code"}
            </label>
            <input
              type="text"
              className="w-full mb-4 p-2 border rounded"
              placeholder="Enter code"
              value={mpesaCode}
              onChange={(e) => setMpesaCode(e.target.value)}
            />
          </>
        )}

        <label className="block mb-2">Amount</label>
        <input
          type="number"
          className="w-full mb-6 p-2 border rounded"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <div className="flex justify-end space-x-3">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button
            onClick={handleProceed}
            className="px-4 py-2 bg-primary-600 text-white rounded"
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  )
}

export default RentPaymentModal
