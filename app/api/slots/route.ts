import { NextResponse } from "next/server";
import { timeSlots } from "@/lib/timeSlots";

export async function GET() {

  return NextResponse.json(timeSlots);

}