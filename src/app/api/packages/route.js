import connectToDatabase from "@/utils/db";
import Package from "@/models/Package";
import { NextResponse } from "next/server";

// Handle POST requests
export async function POST(req) {
  try {
    await connectToDatabase();

    const packageData = await req.json(); // Parse JSON from the request body
    const newPackage = await Package.create(packageData);

    return NextResponse.json({ success: true, data: newPackage }, { status: 201 });
  } catch (error) {
    console.error("Error saving package:", error);
    return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
  }
}


// Handle unsupported HTTP methods (optional)
export function OPTIONS() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
