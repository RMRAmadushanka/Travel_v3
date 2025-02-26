import connectToDatabase from "@/utils/db";
import { NextResponse } from "next/server";
import { Feedback } from "@/models/Feedback";
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    try {
      await connectToDatabase();
      const { comment } = await req.json();
      
      if (!comment) {
        return NextResponse.json({ error: "Comment is required" }, { status: 400 });
      }
  
      const updatedFeedback = await Feedback.findByIdAndUpdate(params.id, { comment }, { new: true });
  
      if (!updatedFeedback) {
        return NextResponse.json({ error: "Feedback not found" }, { status: 404 });
      }
  
      return NextResponse.json(updatedFeedback);
    } catch (error) {
      return NextResponse.json({ error: "Failed to update feedback" }, { status: 500 });
    }
  }


  export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
      await connectToDatabase();
      await Feedback.findByIdAndDelete(params.id);
      return NextResponse.json({ message: "Feedback deleted successfully" });
    } catch (error) {
      return NextResponse.json({ error: "Failed to delete feedback" }, { status: 500 });
    }
  }
  

  export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
      await connectToDatabase();
      const feedbacks = await Feedback.find({ packageId: params.id });
      return NextResponse.json(feedbacks);
    } catch (error) {
      return NextResponse.json({ error: "Failed to fetch feedback" }, { status: 500 });
    }
  }
  
  