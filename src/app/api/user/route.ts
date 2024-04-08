import connectMongo from "@/lib/connectMongo";
import { NextRequest, NextResponse } from "next/server";
import User from "@/Modals/User";

export async function POST(req: NextRequest, res: NextResponse) {
  await connectMongo();
  const body = await req.json();
  const email = body.email;
  const user = await User.findOne({ email });

  if (!user) {
    const newUser = await User.create({ email });
    return NextResponse.json({ success: true, data: newUser }, { status: 201 });
  }

  return NextResponse.json({ success: true, data: user }, { status: 200 });
}
