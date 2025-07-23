/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { Pencil, Trash, CheckCircle, X, User, Mail, Phone, Home, FileText, ChevronRight } from "lucide-react"

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
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-md rounded-xl bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Header */}
              <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200 dark:border-primary-600/30">
                <div>
                  <Dialog.Title className="text-xl font-bold text-gray-900 dark:text-white">
                    Tenant Management
                  </Dialog.Title>x
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Available actions for this tenant
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              {/* Tenant Info */}
              <div className="p-4 sm:p-6 space-y-4">
                <div className="bg-gray-50 dark:bg-gray-950/40 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                        <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {tenant.user.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Tenant
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <Mail className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <span>{tenant.user.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <Phone className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <span>{tenant.user.phone || "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <Home className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <span>Room {tenant.room.room_number}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <FileText className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <span className="capitalize">{tenant.lease_status}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={onEdit}
                    className="w-full flex items-center justify-between p-3 rounded-lg bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Pencil className="h-5 w-5" />
                      <span className="font-medium">Edit Lease Details</span>
                    </div>
                    <ChevronRight className="h-5 w-5" />
                  </button>

                  <button
                    onClick={onMarkPaid}
                    className="w-full flex items-center justify-between p-3 rounded-lg bg-green-50 hover:bg-green-100 dark:bg-green-900/30 dark:hover:bg-green-900/50 text-green-600 dark:text-green-400 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5" />
                      <span className="font-medium">Mark Rent as Paid</span>
                    </div>
                    <ChevronRight className="h-5 w-5" />
                  </button>

                  <button
                    onClick={onDelete}
                    className="w-full flex items-center justify-between p-3 rounded-lg bg-red-50 hover:bg-red-100 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Trash className="h-5 w-5" />
                      <span className="font-medium">Remove Tenant</span>
                    </div>
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Footer */}
              <div className="p-3 sm:p-4 flex justify-end">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-primary-600 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default TenantActionsModal