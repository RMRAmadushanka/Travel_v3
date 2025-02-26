import { NextResponse } from "next/server";
import connectToDatabase  from "@/utils/db";
import { Feedback } from "@/models/Feedback";

export async function PATCH(req: Request) {
  try {
    const { email, newComment } = await req.json();

    // Ensure DB connection
    await connectToDatabase();

    // Find and update feedback based on email
    const updatedFeedback = await Feedback.findOneAndUpdate(
      { email },
      { comment: newComment },
      { new: true }
    );

    if (!updatedFeedback) {
      return NextResponse.json(
        { message: "No feedback found for this email" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Comment updated successfully", updatedFeedback },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating comment:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
