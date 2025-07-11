"use client"

import React from "react"
import { X } from "lucide-react"
import type { Property } from "../types/property.js"

interface ScheduleVisitModalProps {
  isOpen: boolean
  onClose: () => void
  property: Property | null
}

const ScheduleVisitModal: React.FC<ScheduleVisitModalProps> = ({ isOpen, onClose, property }) => {
  if (!isOpen || !property) return null

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-md p-6">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Schedule a Visit
        </h2>

        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Schedule a visit for: <strong>{property.property?.name}</strong>
        </p>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your name"
            className="w-full border border-gray-300 dark:border-gray-700 rounded px-4 py-2"
          />
          <input
            type="email"
            placeholder="Your email"
            className="w-full border border-gray-300 dark:border-gray-700 rounded px-4 py-2"
          />
          <input
            type="datetime-local"
            className="w-full border border-gray-300 dark:border-gray-700 rounded px-4 py-2"
          />
          <button
            type="submit"
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded"
          >
            Schedule Visit
          </button>
        </form>
      </div>
    </div>
  )
}

export default ScheduleVisitModal