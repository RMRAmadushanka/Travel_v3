import { NextResponse } from "next/server";
import connectToDatabase from "@/utils/db";
import { Feedback } from "@/models/Feedback";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // Ensure DB connection
    await connectToDatabase();

    // Check if feedback exists with the given email
    const feedback = await Feedback.findOne({ email });

    if (feedback) {
      return NextResponse.json(
        { valid: true, message: "Email found" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { valid: false, message: "Email not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error validating email:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
