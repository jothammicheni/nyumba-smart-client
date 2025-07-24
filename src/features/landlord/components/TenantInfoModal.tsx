import React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../../components/ui//dialog"
import { Button } from "../../../components/ui/button"




interface TenantInfo {
  roomNumber: string
  name: string
  email: string
  phone?: string
}

interface TenantInfoModalProps {
  open: boolean
  onClose: () => void
  tenantInfo: TenantInfo | null
}

const TenantInfoModal: React.FC<TenantInfoModalProps> = ({ open, onClose, tenantInfo }) => {
  if (!tenantInfo) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Tenant Details</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <div className="flex justify-between">
            <span className="font-medium text-muted-foreground">Room Number:</span>
            <span>{tenantInfo.roomNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-muted-foreground">Name:</span>
            <span>{tenantInfo.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-muted-foreground">Email:</span>
            <span>{tenantInfo.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-muted-foreground">Phone:</span>
            <span>{tenantInfo.phone || "N/A"}</span>
          </div>
        </div>

        <DialogFooter className="flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default TenantInfoModal
