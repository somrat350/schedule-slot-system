import { slotsCollection } from "@/lib/mongodb";
import isAuthenticated from "@/utils/isAuthenticated";
import { NextResponse } from "next/server";

// GET ALL SLOTS
export async function GET() {
  try {
    await isAuthenticated();
    const slots = await slotsCollection.find().toArray();
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
