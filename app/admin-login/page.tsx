"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function AdminLogin() {

  const router = useRouter()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function login() {

    setLoading(true)
    setError("")

    const res = await signIn("credentials", {
      username,
      password,
      redirect: false
    })

    setLoading(false)

    if (res?.error) {
      setError("Invalid username or password")
    } else {
      router.push("/admin")
    }
  }

  return (

    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-pink-50 px-4">

      <Card className="w-full max-w-md shadow-xl">

        <CardHeader className="text-center space-y-2">

          {/* Branding */}

          <h1 className="text-3xl font-bold text-pink-600">
            Glow Beauty ✨
          </h1>

          <CardTitle className="text-xl">
            Admin Portal
          </CardTitle>

        </CardHeader>

        <CardContent className="space-y-4">

          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <p className="text-red-500 text-sm text-center">
              {error}
            </p>
          )}

          <Button
            onClick={login}
            className="w-full bg-pink-600 hover:bg-pink-700"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

        </CardContent>

      </Card>

    </main>
  )
}