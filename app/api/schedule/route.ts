import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(req: Request) {

  const { searchParams } = new URL(req.url)
  const date = searchParams.get("date")

  if (!date) return NextResponse.json([])

  const schedule = await prisma.schedule.findMany({
    where: {
      date: new Date(date)
    }
  })

  return NextResponse.json(schedule)

}

export async function POST(req: Request) {

  const body = await req.json()

  const { date, time, isOpen } = body

  const slot = await prisma.schedule.upsert({
    where: {
      date_time: {
        date: new Date(date),
        time
      }
    },
    update: { isOpen },
    create: {
      date: new Date(date),
      time,
      isOpen
    }
  })

  return NextResponse.json(slot)

}