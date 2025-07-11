"use client"

import React, { useState } from "react"
import { X } from "lucide-react"
import type { Property } from "../types/property"
import { listingService } from "../../services/listingService.js"

interface ContactAgentModalProps {
  isOpen: boolean
  onClose: () => void
  property: Property | null
}

const ContactAgentModal: React.FC<ContactAgentModalProps> = ({ isOpen, onClose, property }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState<string | null>(null)

  if (!isOpen || !property) return null

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const validatePhone = (phone: string) => /^\d{7,15}$/.test(phone)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFeedback(null)

    const { name, email, phone, message } = formData
    if (!name || !email || !phone || !message) {
      return setFeedback("All fields are required.")
    }
    if (!validateEmail(email)) {
      return setFeedback("Invalid email format.")
    }
    if (!validatePhone(phone)) {
      return setFeedback("Phone must be between 7–15 digits.")
    }

    setLoading(true)
    try {
      const res = await listingService.sendInquiryMessage({
        name,
        email,
        phone,
        inquiryMessage: message,
        property_id: property.property._id,
        PropertyName: property.property.name,
        landlord_id: property.landlord_id,
      })

      if (res.success) {
        setFeedback("Message sent successfully!")
        setFormData({ name: "", email: "", phone: "", message: "" })

        // Optionally delay to show message before closing
        setTimeout(() => {
          setFeedback(null)
          onClose()
        }, 1000)
      } else {
        throw new Error(res.error || "Failed to send message.")
      }

    } catch (err: any) {
      console.error("Inquiry submission error:", err)
      setFeedback(err.message || "Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

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
          Contact Agent
        </h2>

        <p className="text-gray-600 dark:text-gray-400 mb-4">
          You’re inquiring about: <strong>{property.property?.name}</strong>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-700 rounded px-4 py-2"
          />
          <input
            name="email"
            type="email"
            placeholder="Your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-700 rounded px-4 py-2"
          />
          <input
            name="phone"
            type="tel"
            placeholder="Your phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-700 rounded px-4 py-2"
          />
          <textarea
            name="message"
            placeholder="Your message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-700 rounded px-4 py-2"
          ></textarea>

          {feedback && (
            <p className={`text-sm ${feedback.includes("successfully") ? "text-green-600" : "text-red-500"}`}>
              {feedback}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ContactAgentModal