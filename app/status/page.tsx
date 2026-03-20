"use client"

import { useState } from "react"

type Appointment = {
  id: string
  service: string
  appointmentDate: string
  status: string
}

export default function StatusPage() {

  const [phone, setPhone] = useState("")
  const [appointments, setAppointments] = useState<Appointment[]>([])

  async function checkStatus() {

    const res = await fetch(
      `/api/status?phone=${encodeURIComponent(phone)}`
    )

    const data = await res.json()
    setAppointments(data)
  }

  function statusColor(status: string) {

    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-700"
      case "pending":
        return "bg-yellow-100 text-yellow-700"
      case "canceled":
        return "bg-red-100 text-red-700"
      case "completed":
        return "bg-blue-100 text-blue-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (

    <main className="min-h-screen bg-pink-50 px-4 md:px-8 py-12">

      <div className="max-w-xl mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-lg">

        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-gray-800">
          Check Booking Status 🔍
        </h1>

        {/* Search Section */}

        <div className="space-y-4">

          <input
            className="w-full border rounded-lg p-3 focus:outline-pink-500"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button
            onClick={checkStatus}
            className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition font-medium"
          >
            Check Status
          </button>

        </div>

        {/* Results */}

        <div className="mt-8 space-y-4">

          {appointments.length === 0 && phone && (
            <p className="text-center text-gray-500">
              No appointments found
            </p>
          )}

          {appointments.map((a) => (

            <div
              key={a.id}
              className="border rounded-xl p-4 shadow-sm"
            >

              <p>
                <b>Service:</b> {a.service}
              </p>

              <p>
                <b>Date:</b>{" "}
                {new Date(a.appointmentDate).toLocaleDateString()}
              </p>

              <div className="mt-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor(a.status)}`}
                >
                  {a.status}
                </span>
              </div>

            </div>

          ))}

        </div>

      </div>

    </main>
  )
}