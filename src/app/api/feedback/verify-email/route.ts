import { NextResponse } from "next/server";
import connectToDatabase from "@/utils/db";
import { Feedback } from "@/models/Feedback";

export async function POST(req: Request) {
  try {
    const { email, packageId, userId } = await req.json();

    if (!email || !packageId || !userId) {
      return NextResponse.json(
        { valid: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Ensure DB connection
    await connectToDatabase();

    // First, check if feedback exists with the given packageId
    const feedback = await Feedback.findOne({ packageId });

    if (!feedback) {
      return NextResponse.json(
        { valid: false, message: "Package ID not found" },
        { status: 404 }
      );
    }

    // Then, check if the userId and email match for this feedback
    if (feedback.email === email && feedback.userId === userId) {
    
      
      return NextResponse.json(
        { valid: true, message: "User ID and email match for this package" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { valid: false, message: "User verification failed (email or userId mismatch)" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error validating user:", error);
    return NextResponse.json(
      { valid: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
