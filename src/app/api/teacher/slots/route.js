import { authOptions } from "@/lib/authOptions";
import { slotsCollection } from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// GET ALL SLOTS
export async function GET(req) {
  try {
    const status = req.nextUrl.searchParams.get("status");
    const query = {};
    if (status === "available" || status === "unavailable") {
      query.status = status;
    }
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({
        statusCode: 403,
        success: false,
        message: "Unauthorize access!",
      });
    }
    const slots = await slotsCollection.find(query).toArray();
    return NextResponse.json({
      statusCode: 200,
      success: true,
      message: "Slots fetch successful.",
      data: slots,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      statusCode: 500,
      success: false,
      message: "Internal server error!",
    });
  }
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({
      statusCode: 403,
      success: false,
      message: "Unauthorize access!",
    });
  }
  const body = await req.json();
  const { startTime } = body;

  const start = new Date(startTime);
  const now = new Date();

  // Prevent past slot
  if (start < now) {
    return NextResponse.json({
      success: false,
      message: "Cannot create past slot!",
    });
  }

  // auto 15 min end time
  const end = new Date(start.getTime() + 15 * 60000);

  // OVERLAP CHECK
  const overlap = await slotsCollection.findOne({
    teacherId: session.user.id,
    startTime: { $lt: end },
    endTime: { $gt: start },
  });

  if (overlap) {
    return NextResponse.json({
      success: false,
      message: "Slot overlaps existing slot!",
    });
  }

  const newSlotData = {
    teacherId: session.user.id,
    startTime: start,
    endTime: end,
    status: "available",
    createdAt: new Date(),
  };

  const newSlot = await slotsCollection.insertOne(newSlotData);

  return NextResponse.json({
    success: true,
    message: "Slot created successful.",
    data: newSlot,
  });
}
