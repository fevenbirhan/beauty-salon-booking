import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {

    const body = await req.json();
    const { status } = body;

    const appointment = await prisma.appointment.update({
      where: {
        id: params.id,
      },
      data: {
        status,
      },
    });

    return NextResponse.json(appointment);

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update appointment" },
      { status: 500 }
    );
  }
}


export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {

    await prisma.appointment.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({ message: "Appointment deleted" });

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete appointment" },
      { status: 500 }
    );
  }
}