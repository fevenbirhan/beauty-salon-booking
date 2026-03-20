"use client"

import { useState } from "react"
import { timeSlots } from "@/lib/timeSlots"

type ScheduleSlot = {
  time: string
  isOpen: boolean
}

export default function SchedulePage() {

  const [date, setDate] = useState("")
  const [blocked, setBlocked] = useState<string[]>([])

  async function loadSchedule(selectedDate: string) {

    const res = await fetch(`/api/schedule?date=${selectedDate}`)
    const data = await res.json()

    const blockedSlots = data
      .filter((s: ScheduleSlot) => !s.isOpen)
      .map((s: ScheduleSlot) => s.time)

    setBlocked(blockedSlots)
  }

  async function toggleSlot(time: string) {

    const isBlocked = blocked.includes(time)

    await fetch("/api/schedule", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date,
        time,
        isOpen: isBlocked
      })
    })

    loadSchedule(date)
  }

  return (

    <main className="min-h-screen bg-pink-50 px-4 md:px-8 py-10">

      <div className="max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-2xl shadow">

        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Manage Schedule 📅
        </h1>

        {/* Date Picker */}

        <input
          type="date"
          className="border p-3 rounded-lg mb-6"
          value={date}
          onChange={(e) => {
            setDate(e.target.value)
            loadSchedule(e.target.value)
          }}
        />

        {/* Legend */}

        <div className="flex gap-4 mb-6 text-sm">

          <span className="bg-green-500 text-white px-3 py-1 rounded">
            Available
          </span>

          <span className="bg-red-500 text-white px-3 py-1 rounded">
            Blocked
          </span>

        </div>

        {/* Slots */}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">

          {timeSlots.map((slot) => {

            const isBlocked = blocked.includes(slot)

            return (

              <button
                key={slot}
                onClick={() => toggleSlot(slot)}
                className={`p-3 rounded-lg text-white font-medium transition
                ${isBlocked ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}
                `}
              >
                {slot}
              </button>

            )
          })}

        </div>

      </div>

    </main>
  )
}