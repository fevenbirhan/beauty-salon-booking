"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

type Appointment = {
  id: string
  customerName: string
  service: string
  phone: string
  appointmentDate: string
  appointmentTime: string
  status: string
}

export default function AdminPage() {

  const [appointments, setAppointments] = useState<Appointment[]>([])

  async function fetchAppointments() {
    const res = await fetch("/api/appointments")
    const data = await res.json()
    setAppointments(data)
  }

  async function updateStatus(id: string, status: string) {
    await fetch(`/api/appointments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    })

    fetchAppointments()
  }

  useEffect(() => {
    fetchAppointments()
  }, [])

  function statusStyle(status: string) {

    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-700"
      case "APPROVED":
        return "bg-green-100 text-green-700"
      case "CANCELED":
        return "bg-red-100 text-red-700"
      case "COMPLETED":
        return "bg-blue-100 text-blue-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (

    <main className="min-h-screen bg-pink-50 px-4 md:px-8 py-10">

      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">

        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Admin Dashboard 💼
        </h1>

        <div className="flex gap-3">

          <Link
            href="/admin/schedule"
            className="bg-pink-600 text-white px-5 py-2 rounded-lg hover:bg-pink-700 transition"
          >
            Manage Schedule
          </Link>

          <Link
            href="/admin/create"
            className="bg-gray-800 text-white px-5 py-2 rounded-lg hover:bg-gray-900 transition"
          >
            Create Admin
          </Link>

        </div>

      </div>

      {/* Table */}

      <div className="overflow-x-auto bg-white rounded-2xl shadow">

        <table className="w-full text-left">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Customer</th>
              <th className="p-4">Service</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Date</th>
              <th className="p-4">Time</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>

            {appointments.map((a) => (

              <tr key={a.id} className="border-t hover:bg-gray-50">

                <td className="p-4">{a.customerName}</td>

                <td className="p-4">{a.service}</td>

                <td className="p-4">{a.phone}</td>

                <td className="p-4">
                  {new Date(a.appointmentDate).toLocaleDateString()}
                </td>

                <td className="p-4">
                  {new Date(`1970-01-01T${a.appointmentTime}`)
                    .toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                </td>

                {/* Status Badge */}

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyle(a.status)}`}
                  >
                    {a.status}
                  </span>
                </td>

                {/* Actions */}

                <td className="p-4 space-x-2">

                  {a.status === "PENDING" && (
                    <>
                      <button
                        onClick={() => updateStatus(a.id, "APPROVED")}
                        className="text-green-600 hover:underline"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => updateStatus(a.id, "CANCELED")}
                        className="text-red-600 hover:underline"
                      >
                        Cancel
                      </button>
                    </>
                  )}

                  {a.status === "APPROVED" && (
                    <button
                      onClick={() => updateStatus(a.id, "COMPLETED")}
                      className="text-blue-600 hover:underline"
                    >
                      Complete
                    </button>
                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </main>
  )
}