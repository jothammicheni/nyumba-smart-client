"use client"

import React, { useEffect, useState } from "react"
import { listingService } from "../../../services/listingService.js"

type Inquiry = {
  _id: string
  name: string
  email: string
  phone: string
  inquiryMessage: string
  PropertyName: string
  property_id: string
  landlord_id: string
  createdAt: string
  viewed?: boolean
}

type Visit = {
  _id: string
  visitorName: string
  visitDate: string
  contact: string
  propertyName: string
  viewed?: boolean
}

export default function BookingsAndAppointments() {
  const [activeTab, setActiveTab] = useState<"bookings" | "visits">("bookings")
  const [bookings, setBookings] = useState<Inquiry[]>([])
  const [visits, setVisits] = useState<Visit[]>([])
  const [selected, setSelected] = useState<Inquiry | Visit | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [bookingData, visitData] = await Promise.all([
        listingService.getAllBookings(),
        listingService.getAllVisits(),
      ])
      setBookings(bookingData)
      setVisits(visitData)
    } catch (error) {
      console.error("Failed to load data", error)
    }
  }

  const markAsViewed = (id: string) => {
    if (activeTab === "bookings") {
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, viewed: true } : b))
      )
    } else {
      setVisits((prev) =>
        prev.map((v) => (v._id === id ? { ...v, viewed: true } : v))
      )
    }
  }

  const deleteItem = (id: string) => {
    if (activeTab === "bookings") {
      setBookings((prev) => prev.filter((b) => b._id !== id))
      if (selected && selected._id === id) setSelected(null)
    } else {
      setVisits((prev) => prev.filter((v) => v._id !== id))
      if (selected && selected._id === id) setSelected(null)
    }
  }

  const handleSelect = (item: Inquiry | Visit) => {
    setSelected(item)
    markAsViewed(item._id)
  }

  const items = activeTab === "bookings" ? bookings : visits

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar */}
      <div className="md:w-1/3 border-r bg-white dark:bg-gray-900">
        <div className="flex justify-center gap-2 p-4">
          <button
            className={`px-4 py-2 rounded font-medium text-sm ${
              activeTab === "bookings"
                ? "bg-primary-600 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
            }`}
            onClick={() => {
              setSelected(null)
              setActiveTab("bookings")
            }}
          >
            Bookings
          </button>
          <button
            className={`px-4 py-2 rounded font-medium text-sm ${
              activeTab === "visits"
                ? "bg-primary-600 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
            }`}
            onClick={() => {
              setSelected(null)
              setActiveTab("visits")
            }}
          >
            Visits
          </button>
        </div>

        <ul className="overflow-y-auto max-h-[calc(100vh-120px)]">
          {items.map((item) => (
            <li
              key={item._id}
              className={`px-4 py-3 border-b hover:bg-gray-50 dark:hover:bg-gray-800 ${
                selected?._id === item._id ? "bg-gray-100 dark:bg-gray-800" : ""
              }`}
            >
              <div
                className="cursor-pointer"
                onClick={() => handleSelect(item)}
              >
                <p className="font-medium text-gray-900 dark:text-white">
                  {activeTab === "bookings"
                    ? (item as Inquiry).PropertyName
                    : (item as Visit).propertyName}
                </p>
                <p className="text-sm text-gray-500">
                  {activeTab === "bookings"
                    ? (item as Inquiry).phone
                    : (item as Visit).contact}
                </p>
                {item.viewed && (
                  <p className="text-xs text-green-600">Viewed</p>
                )}
              </div>

              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={() => markAsViewed(item._id)}
                  className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300"
                >
                  Mark as Viewed
                </button>
                <button
                  onClick={() => deleteItem(item._id)}
                  className="text-xs px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
          {items.length === 0 && (
            <p className="text-center text-sm text-gray-400 py-6">No {activeTab} found</p>
          )}
        </ul>
      </div>

      {/* Detail View */}
      <div className="flex-1 bg-gray-50 dark:bg-gray-950 p-6 overflow-y-auto">
        {selected ? (
          <div className="max-w-xl mx-auto bg-white dark:bg-gray-900 shadow rounded p-6 space-y-4">
            <h2 className="text-xl font-bold text-primary-600">
              {activeTab === "bookings" ? "Booking Details" : "Visit Details"}
            </h2>

            {activeTab === "bookings" ? (
              <>
                <p>
                  <strong>Name:</strong> {(selected as Inquiry).name}
                </p>
                <p>
                  <strong>Email:</strong> {(selected as Inquiry).email}
                </p>
                <p>
                  <strong>Phone:</strong> {(selected as Inquiry).phone}
                </p>
                <p>
                  <strong>Property:</strong> {(selected as Inquiry).PropertyName}
                </p>
                <p>
                  <strong>Message:</strong>{" "}
                  {(selected as Inquiry).inquiryMessage || "No message"}
                </p>
                <p className="text-xs text-gray-400">
                  Created at: {new Date((selected as Inquiry).createdAt).toLocaleString()}
                </p>
                {selected.viewed && (
                  <p className="text-sm text-green-600 font-medium">Viewed</p>
                )}
              </>
            ) : (
              <>
                <p>
                  <strong>Visitor:</strong> {(selected as Visit).visitorName}
                </p>
                <p>
                  <strong>Property:</strong> {(selected as Visit).propertyName}
                </p>
                <p>
                  <strong>Contact:</strong> {(selected as Visit).contact}
                </p>
                <p>
                  <strong>Visit Date:</strong>{" "}
                  {new Date((selected as Visit).visitDate).toLocaleString()}
                </p>
                {selected.viewed && (
                  <p className="text-sm text-green-600 font-medium">Viewed</p>
                )}
              </>
            )}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            Select a {activeTab === "bookings" ? "booking" : "visit"} to view details.
          </p>
        )}
      </div>
    </div>
  )
}
