"use client"

import { useState } from "react"

export default function CreateAdminPage() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  async function createAdmin() {

    const res = await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    })

    const data = await res.json()

    if (res.ok) {
      setMessage("Admin created successfully ✔️")
      setUsername("")
      setPassword("")
    } else {
      setMessage(data.error || "Failed to create admin")
    }
  }

  return (

    <main className="min-h-screen bg-pink-50 px-4 py-12">

      <div className="max-w-md mx-auto bg-white p-6 md:p-8 rounded-2xl shadow">

        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Create New Admin 👤
        </h1>

        <div className="space-y-4">

          <input
            className="border p-3 w-full rounded-lg focus:outline-pink-500"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            className="border p-3 w-full rounded-lg focus:outline-pink-500"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={createAdmin}
            className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition font-medium"
          >
            Create Admin
          </button>

          {message && (
            <p className="text-center text-gray-700 mt-2">
              {message}
            </p>
          )}

        </div>

      </div>

    </main>
  )
}