import React, { useState, useEffect } from "react"
import { Banknote, CreditCard, Smartphone, Wallet, X } from "lucide-react"
import { Button } from "../../../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card"
import { Input } from "../../../../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../components/ui/select"
import { Toaster, toast } from "sonner"

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

  const handleProceed = () => {
    const amt = parseFloat(amount)
    if (isNaN(amt) || amt <= 0) {
      toast.error("Please enter a valid amount")
      return
    }
    if ((method === "mpesa" || method === "bank") && !mpesaCode.trim()) {
      toast.error(`Please enter the ${method === "mpesa" ? "Mpesa" : "Bank"} code`)
      return
    }
    onSubmit(amt, method, mpesaCode.trim())
  }

  if (!open || !tenant) return null

  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <Card className="w-full max-w-md dark:bg-gray-950 shadow-2xl border border-gray-200 dark:border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-xl font-bold">Rent Payment</CardTitle>
              <p className="text-sm text-muted-foreground">
                For {tenant.user.name} (Room {tenant.room.room_number})
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Payment Method Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Payment Method</label>
              <Select value={method} onValueChange={setMethod}>
                <SelectTrigger className="w-full dark:bg-gray-900">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mpesa">
                    <div className="flex items-center gap-2">
                      <Smartphone className="h-4 w-4 text-green-600" />
                      <span>Mpesa</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="bank">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-blue-600" />
                      <span>Bank Transfer</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="cash">
                    <div className="flex items-center gap-2">
                      <Wallet className="h-4 w-4 text-yellow-600" />
                      <span>Cash</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="other">
                    <div className="flex items-center gap-2">
                      <Banknote className="h-4 w-4 text-purple-600" />
                      <span>Other</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Payment Code Input */}
            {(method === "mpesa" || method === "bank") && (
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {method === "mpesa" ? "Mpesa Code" : "Bank Reference"}
                </label>
                <Input
                  placeholder={`Enter ${method === "mpesa" ? "Mpesa" : "Bank"} code`}
                  value={mpesaCode}
                  onChange={(e) => setMpesaCode(e.target.value)}
                  className="dark:bg-gray-900"
                />
              </div>
            )}

            {/* Amount Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Amount (KES)</label>
              <Input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="dark:bg-gray-900"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={onClose} className="hover:bg-red-600">
                Cancel
              </Button>
              <Button onClick={handleProceed} className="hover:bg-primary-600 hover:text-white">
                Process Payment
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default RentPaymentModal