import { NextResponse } from "next/server";
import connectToDatabase from "@/utils/db";
import { Feedback } from "@/models/Feedback";

// GET request to fetch all feedbacks for a given packageId
export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const { packageId } = req.nextUrl.searchParams; // Get packageId from query parameters

    if (!packageId) {
      return NextResponse.json({ error: "Package ID is required" }, { status: 400 });
    }

    // Fetch all feedbacks for the given packageId
    const feedbacks = await Feedback.find({ packageId });

    return NextResponse.json(feedbacks, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch feedbacks" }, { status: 500 });
  }
}

// POST request to submit a new feedback for a given package
export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { packageId, userName, email, comment, rating } = await req.json();

    if (!packageId || !userName || !email || !comment || !rating) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newFeedback = await Feedback.create({ packageId, userName, email, comment, rating });

    return NextResponse.json(newFeedback, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save feedback" }, { status: 500 });
  }
}
