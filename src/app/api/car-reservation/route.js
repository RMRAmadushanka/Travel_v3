import connectToDatabase from "@/utils/db";
import CarReservation from "../../../models/CarReservation";
import { NextResponse } from "next/server";

// Handle POST requests for reservation data (new functionality)
export async function POST(req) {
  try {
    await connectToDatabase();

    // Parse reservation data from request body
    const carReservationData = await req.json();
    
    // Create a new reservation record in the database
    const newCarReservation = await CarReservation.create(carReservationData);

    return NextResponse.json({ success: true, data: newCarReservation }, { status: 201 });
  } catch (error) {
    console.error("Error saving car reservation:", error);
    return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
  }
}

// Handle unsupported HTTP methods (optional)
export function OPTIONS() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
