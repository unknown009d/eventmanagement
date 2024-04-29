import Eventt from "@/Modals/Eventt";
import User from "@/Modals/User";
import connectMongo from "@/lib/connectMongo";
import { NextResponse } from "next/server";

export async function GET(request) {
  await connectMongo();

  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");
  const eventId = searchParams.get("eventId");
  // get the username and event ID from the request query

//   console.log(username, eventId)
  try {
    // Find the user by their username
    const user = await User.findOne({ username: username })

    console.log(user)

    // Check if the event ID is in the user's tickets
    // const hasEventId = user.tickets.some((ticket) => ticket.toString() === eventId);

    return NextResponse.json({ success: true, data: hasEventId });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function POST(request) {
  await connectMongo();

  // get the request body as a JSON object
  const { username, eventId } = await request.json();

  try {
    // Find the user by their username
    const user = await User.findOne({ username });

    // Add the event ID to the user's tickets
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { $push: { tickets: eventId } },
      { new: true }
    );

    return NextResponse.json({ success: true, data: updatedUser });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
