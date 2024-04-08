import Evento from "@/Modals/Evento";
import connectMongo from "@/lib/connectMongo";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  await connectMongo();
  const body = await req.json();
  const event = body;

  // Check if an event with the same name already exists
  const existingEvent = await Evento.findOne({ title: event.title });

  if (existingEvent) {
    return NextResponse.json({
      success: false,
      message: "Event with this name already exist",
    });
  }

  // Create a new event
  const newEvent = new Evento({
    title: event.title,
    date: event.date,
    img: event.img,
    details: event.details,
    location: event.location,
  });

  // Save the new event to the database
  const savedEvent = await newEvent.save();

  return NextResponse.json({ success: true, data: newEvent });
}
