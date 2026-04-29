import { authOptions } from "@/lib/authOptions";
import { bookingCollection, slotsCollection } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({
        success: false,
        message: "Unauthorized access!",
      });
    }
    const { slotId } = await req.json();

    const slot = await slotsCollection.findOneAndUpdate(
      {
        _id: new ObjectId(slotId),
        status: "available",
      },
      {
        $set: { status: "booked" },
      },
      { returnDocument: "after" },
    );

    if (!slot) {
      return NextResponse.json({
        success: false,
        message: "Slot already booked or not found!",
      });
    }

    await bookingCollection.insertOne({
      slotId: new ObjectId(slotId),
      userId: session.user.id,
      startTime: slot.startTime,
      endTime: slot.endTime,
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      message: "Slot booked successfully",
      data: slot,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      success: false,
      message: "Internal server error!",
    });
  }
};
