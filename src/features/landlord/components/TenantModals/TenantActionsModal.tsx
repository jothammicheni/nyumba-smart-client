/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { Pencil, Trash, CheckCircle } from "lucide-react"

const TenantActionsModal = ({
  isOpen,
  onClose,
  tenant,
  onEdit,
  onDelete,
  onMarkPaid,
}: {
  isOpen: boolean
  onClose: () => void
  tenant: any
  onEdit: () => void
  onDelete: () => void
  onMarkPaid: () => void
}) => {
  if (!tenant) return null

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-lg bg-white dark:bg-gray-800 shadow-lg p-6 space-y-4">
            <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-white">
              Tenant Actions
            </Dialog.Title>

            <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <p><strong>Name:</strong> {tenant.user.name}</p>
              <p><strong>Email:</strong> {tenant.user.email}</p>
              <p><strong>Phone:</strong> {tenant.user.phone || "N/A"}</p>
              <p><strong>Room:</strong> {tenant.room.room_number}</p>
              <p><strong>Property:</strong> {tenant.property.name}</p>
              <p><strong>Status:</strong> {tenant.lease_status}</p>
            </div>

            <div className="space-y-2">
              <button onClick={onEdit} className="w-full flex items-center gap-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-4 py-2 rounded-md">
                <Pencil className="w-4 h-4" /> Edit Lease
              </button>
              <button onClick={onMarkPaid} className="w-full flex items-center gap-2 bg-green-100 hover:bg-green-200 text-green-800 px-4 py-2 rounded-md">
                <CheckCircle className="w-4 h-4" /> Mark Rent as Paid
              </button>
              <button onClick={onDelete} className="w-full flex items-center gap-2 bg-red-100 hover:bg-red-200 text-red-800 px-4 py-2 rounded-md">
                <Trash className="w-4 h-4" /> Delete Tenant
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  )
}

export default TenantActionsModal
