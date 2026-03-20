import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req:Request){

const {searchParams}=new URL(req.url);
const phone=searchParams.get("phone");

const appointments=await prisma.appointment.findMany({
where:{phone:phone||""},
orderBy:{createdAt:"desc"}
});

return NextResponse.json(appointments);

}