import Eventt from "@/Modals/Eventt";
import connectMongo from "@/lib/connectMongo";
import { imagePlaceHolder } from "@/lib/utils";
import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export async function GET(req) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const title = searchParams.get("title");
  const count = searchParams.get("count");
  const sort = searchParams.get("sort") ?? 1;
  const author = searchParams.get("author");
  const filtertoday = searchParams.get("gt") == 1 ? true : false;
  const today = new Date().toISOString().slice(0, 10);

  await connectMongo();

  let items;
  try {
    let query = {};

    if (title) {
      query.title = new RegExp(title, "i"); // 'i' makes it case insensitive
    }

    if (author) {
      query.createdBy = author;
    }

    if (today && filtertoday) query.date = { $gt: today };

    items = await Eventt.find(query)
      .sort({ createdAt: parseInt(sort) })
      .limit(count);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "There was a problem retrieving the items: " + error,
      },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      success: true,
      message: items,
    },
    { status: 200 }
  );
}

async function uploadFile(data, title) {
  const img = data.get("img");
  if (!img) return imagePlaceHolder;
  let imgBuffer;
  let extension = "jpg";
  let imglocation = "";
  const filetitle = title
    .split(" ")
    .map((e) => e.toLowerCase())
    .join("-");
  try {
    if (img) {
      const bytes = await img.arrayBuffer();
      imgBuffer = Buffer.from(bytes);

      const mimeType = img.type;
      extension = mimeType.split("/")[1];
      imglocation = path.join("/EventImages/", `${filetitle}.${extension}`);
      await fs.writeFile("./public/" + imglocation, imgBuffer);
    } else {
      imglocation = imagePlaceHolder;
    }
  } catch (er) {
    throw new Error("There was a problem in setting the image." + er);
  }

  return imglocation;
}

export async function POST(req) {
  const data = await req.formData();
  const { title, details, location, edate, time, creator, cdnt } =
    Object.fromEntries(data.entries());

  // Check if an event with the same name already exists
  const existingEvent = await Eventt.findOne({ title });

  if (existingEvent) {
    return NextResponse.json({
      success: false,
      message: "Event with this name already exist",
    });
  }

  // Uploading image to the public directory. Also if no image is avaialable then default image is set
  let imglocation;
  try {
    imglocation = await uploadFile(data, title);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 400 }
    );
  }

  let savedEvent;
  try {
    await connectMongo();
    // Create a new event
    const eventData = {
      title: title,
      date: edate,
      time: time,
      img: imglocation,
      details: details,
      location: location,
      createdBy: creator,
    };

    if (cdnt) {
      eventData.loc = {
        type: "Point",
        coordinates: [cdnt.split(",")[0], cdnt.split(",")[1]],
      };
    }

    const newEvent = new Eventt(eventData);

    // Save the new event to the database
    savedEvent = await newEvent.save();
    // savedEvent = newEvent;
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "There was a problem in the db: " + error,
      },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { success: true, message: savedEvent },
    { status: 200 }
  );
}

export async function PUT(req) {
  const data = await req.formData();
  const { title, details, location, edate, time, cdnt } = Object.fromEntries(
    data.entries()
  );

  // Upload the image and get the image location
  let imageLocation;
  try {
    imageLocation = await uploadFile(data, title);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 400 }
    );
  }

  let updateData = {
    date: edate,
    time: time,
    details: details,
    location: location,
    img: imageLocation,
  };

  // Parse cdnt as an array of [longitude, latitude]
  if (cdnt) {
    const [longitude, latitude] = cdnt.split(",").map(Number);
    updateData.coordinates = {
      type: "Point",
      coordinates: [longitude, latitude],
    };
  }

  let updatedEvent;
  try {
    await connectMongo();
    // Find the event to update and update it
    updatedEvent = await Eventt.findOneAndUpdate(
      { title }, // find a document with this filter
      updateData, // document to insert when nothing was found
      { new: true, upsert: true } // options
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "There was a problem in the db: " + error,
      },
      { status: 500 }
    );
  }

  if (!updatedEvent) {
    return NextResponse.json({
      success: false,
      message: "Event with this name does not exist",
    });
  }

  return NextResponse.json(
    { success: true, message: updatedEvent },
    { status: 200 }
  );
}
