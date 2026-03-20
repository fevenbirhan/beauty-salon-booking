import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { customerName, phone, service, appointmentDate, appointmentTime } = body;

    const appointment = await prisma.appointment.create({
      data: {
        customerName,
        phone,
        service,
        appointmentDate: new Date(appointmentDate),
        appointmentTime,
      },
    });

    return NextResponse.json(appointment);

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create appointment" },
      { status: 500 }
    );
  }
}


export async function GET() {
  try {
    const appointments = await prisma.appointment.findMany({
      orderBy: {
        appointmentDate: "desc",
      },
    });

    return NextResponse.json(appointments);

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch appointments" },
      { status: 500 }
    );
  }
}