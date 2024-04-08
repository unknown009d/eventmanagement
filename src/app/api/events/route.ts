import { NextRequest, NextResponse } from "next/server";
import Evento from "@/Modals/Evento";
import connectMongo from "@/lib/connectMongo";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const num = searchParams.get("num");
  await connectMongo();
  const events = num
    ? await Evento.find().limit(parseInt(num))
    : await Evento.find();

  return NextResponse.json({ success: true, data: events });
}