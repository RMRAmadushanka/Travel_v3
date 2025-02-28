import { NextResponse } from "next/server";
import connectToDatabase from "@/utils/db";
import { CarFeedback } from "@/models/CarFeedback";

export async function PATCH(req: Request) {
  try {
    const { feedbackId, newComment } = await req.json();

    // Ensure DB connection
    await connectToDatabase();

    // Find and update feedback based on feedbackId
    const updatedFeedback = await CarFeedback.findOneAndUpdate(
      { _id: feedbackId },  // Search by feedbackId
      { comment: newComment },
      { new: true }
    );

    if (!updatedFeedback) {
      return NextResponse.json(
        { message: "No feedback found for this ID" },
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
