import { NextRequest, NextResponse } from "next/server";
import Eventt from "@/Modals/Eventt";
import connectMongo from "@/lib/connectMongo";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const num = searchParams.get("num");
  await connectMongo();
  const events = num
    ? await Eventt.find().limit(parseInt(num))
    : await Eventt.find();

  return NextResponse.json({ success: true, data: events });
}