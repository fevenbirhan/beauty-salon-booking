"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

const services = [
  { name: "Braids", duration: 30 },
  { name: "Facial", duration: 45 },
  { name: "Manicure", duration: 30 },
  { name: "Hair Coloring", duration: 60 }
]

type ScheduleSlot = {
  time: string
  isOpen: boolean
}

export default function BookPage() {

  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    service: "Braids",
    appointmentDate: "",
    appointmentTime: ""
  })

  const [slots, setSlots] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  async function loadSlots(date: string) {

    const slotsRes = await fetch("/api/slots")
    const allSlots = await slotsRes.json()

    const scheduleRes = await fetch(`/api/schedule?date=${date}`)
    const schedule = await scheduleRes.json()

    const blocked = schedule
      .filter((s: ScheduleSlot) => !s.isOpen)
      .map((s: ScheduleSlot) => s.time)

    const available = allSlots.filter(
      (slot: string) => !blocked.includes(slot)
    )

    setSlots(available)
  }

  async function handleSubmit(e: React.FormEvent) {

    e.preventDefault()
    setLoading(true)

    const res = await fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })

    if (res.ok) {

      setSuccess(true)

      setForm({
        customerName: "",
        phone: "",
        service: "Braids",
        appointmentDate: "",
        appointmentTime: ""
      })
    }

    setLoading(false)
  }

  useEffect(() => {
    if (form.appointmentDate) {
      loadSlots(form.appointmentDate)
    }
  }, [form.appointmentDate])

  return (

    <main className="min-h-screen bg-pink-50 px-4 md:px-8 py-12">

      <div className="max-w-xl mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-lg">

        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center text-gray-800">
          Book Appointment 💖
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Choose your service, date, and time
        </p>

        {/* Status Button */}

        <div className="text-center mb-6">
          <Link
            href="/status"
            className="text-pink-600 font-medium hover:underline"
          >
            View Existing Booking Status →
          </Link>
        </div>

        {/* Success Message */}

        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 p-4 rounded-lg text-green-700 text-center">
            Booking request sent ✔️ <br />
            Please wait for salon approval.
          </div>
        )}

        {/* FORM */}

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            placeholder="Full Name"
            className="w-full border rounded-lg p-3 focus:outline-pink-500"
            value={form.customerName}
            onChange={(e) =>
              setForm({ ...form, customerName: e.target.value })
            }
            required
          />

          <input
            placeholder="Phone Number"
            className="w-full border rounded-lg p-3 focus:outline-pink-500"
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
            required
          />

          <select
            className="w-full border rounded-lg p-3 focus:outline-pink-500"
            value={form.service}
            onChange={(e) =>
              setForm({ ...form, service: e.target.value })
            }
          >
            {services.map((s) => (
              <option key={s.name} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            min={new Date().toISOString().split("T")[0]}
            className="w-full border rounded-lg p-3 focus:outline-pink-500"
            value={form.appointmentDate}
            onChange={(e) =>
              setForm({ ...form, appointmentDate: e.target.value })
            }
            required
          />

          <select
            className="w-full border rounded-lg p-3 focus:outline-pink-500"
            value={form.appointmentTime}
            onChange={(e) =>
              setForm({ ...form, appointmentTime: e.target.value })
            }
            required
          >

            <option value="">Select time</option>

            {slots
              .filter((slot) => {

                if (form.appointmentDate !== new Date().toISOString().split("T")[0]) {
                  return true
                }

                const now = new Date()
                const slotTime = new Date(`1970-01-01T${slot}`)

                return slotTime.getHours() > now.getHours() ||
                  (slotTime.getHours() === now.getHours() &&
                    slotTime.getMinutes() > now.getMinutes())
              })
              .map((slot) => (

                <option key={slot} value={slot}>
                  {new Date(`1970-01-01T${slot}`)
                    .toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                </option>

              ))}
          </select>

          <button
            disabled={loading}
            className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition font-medium"
          >
            {loading ? "Booking..." : "Book Appointment"}
          </button>

        </form>

      </div>

    </main>
  )
}