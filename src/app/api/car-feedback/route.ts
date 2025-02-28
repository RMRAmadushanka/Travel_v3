import { NextResponse } from "next/server";
import connectToDatabase from "@/utils/db";
import { CarFeedback } from "@/models/CarFeedback";

// GET request to fetch all feedbacks for a given packageId
export async function GET(req: Request) {
    try {
      await connectToDatabase();
  
      const { carId } = req.nextUrl.searchParams; // Get packageId from query parameters
  
      if (!carId) {
        return NextResponse.json({ error: "car ID is required" }, { status: 400 });
      }
  
      // Fetch all feedbacks for the given packageId
      const feedbacks = await CarFeedback.find({ carId });
  
      return NextResponse.json(feedbacks, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: "Failed to fetch feedbacks" }, { status: 500 });
    }
  }

  
// POST request to submit a new feedback for a given package
export async function POST(req: Request) {
    try {
      await connectToDatabase();
      const { carId, userName, email, comment, rating } = await req.json();
  
      if (!carId || !userName || !email || !comment || !rating) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
      }
  
      // Check if a user already has a feedback entry
      let existingUser = await CarFeedback.findOne({ email });
  
      let userId;
      if (existingUser) {
        // If user already exists, use the same userId
        userId = existingUser.userId;
      } else {
        // Generate a new unique userId if this is their first comment
        userId = crypto.randomUUID(); // Generates a unique ID
      }
  
      // Create new feedback with the userId
      const newFeedback = await CarFeedback.create({ 
        carId, 
        userId, 
        userName, 
        email, 
        comment, 
        rating 
      });
      return NextResponse.json(newFeedback, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error: "Failed to save feedback" }, { status: 500 });
    }
  }