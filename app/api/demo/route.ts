import { NextRequest, NextResponse } from "next/server";
import {connect} from "@/lib/db" // your DB connection utility
import DemoStudent from "@/models/demostudents"; // Mongoose model

export async function POST(req: NextRequest) {
  try {
    await connect();

    const { name, email, mobile } = await req.json();

    // ✅ Validate inputs
    if (!name || !email || !mobile) {
      return NextResponse.json(
        { message: "All fields (name, email, mobile) are required.", success: false },
        { status: 400 }
      );
    }

    // ✅ Check if student already exists (by email OR mobile)
    const existingStudent = await DemoStudent.findOne({
      $or: [{ email }, { mobile }]
    });

    if (existingStudent) {
      return NextResponse.json(
        { message: "A demo is already booked with this email or mobile number.", success: false },
        { status: 409 } // Conflict
      );
    }

    // ✅ Create student record
    const student = await DemoStudent.create({ name, email, mobile });

    return NextResponse.json(
      { message: "Demo booked successfully!", success: true, student },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: `Internal Server Error: ${error.message}`, success: false },
      { status: 500 }
    );
  }
}
//hello world