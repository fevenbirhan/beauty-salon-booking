export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"

export async function POST(req: Request) {

  try {

    const body = await req.json()
    const { username, password } = body

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password required" },
        { status: 400 }
      )
    }

    const existing = await prisma.admin.findUnique({
      where: { username }
    })

    if (existing) {
      return NextResponse.json(
        { error: "Username already exists" },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.admin.create({
      data: {
        username,
        password: hashedPassword
      }
    })

    return NextResponse.json({ message: "Admin created" })

  } catch (error) {

    return NextResponse.json(
      { error: "Failed to create admin" },
      { status: 500 }
    )

  }

}