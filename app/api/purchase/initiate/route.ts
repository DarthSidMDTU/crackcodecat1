// /app/api/payment/create/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { connect } from "@/lib/db";
import Payment from "@/models/payment";
import Course from "@/models/course"
import User from "@/models/user";
import { getInstamojoAccessToken } from "@/lib/insta_token";

export async function POST(req: NextRequest) {
  await connect();

  // Step 1: Input validation
  let payload;
  try {
    payload = await req.json();
    // console.log("recived payload");
    // console.log(payload);
    
    
    if (!payload?.courseId || !payload?.userId) {
      return NextResponse.json({ success: false, error: "Missing courseId or userId." }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON payload." }, { status: 400 });
  }

  // Step 2: Get course and validate existance
  const course = await Course.findById(payload.courseId);
  if (!course) {
    return NextResponse.json({ success: false, error: "Course not found." }, { status: 404 });
  }

  //console.log("course obj is",course);
  

  // Step 3: Get user and validate existance
  const user = await User.findById(payload.userId);
  if (!user) {
    return NextResponse.json({ success: false, error: "User not found." }, { status: 404 });
  }

  const { name, email, phone = "" } = user;
  const { price } = course;
  console.log("yha tk sb theek hai");
  console.log(name, email,phone,price);
  
  
  // Step 4: Get Instamojo Access Token
  let access_token;
  try {
  access_token = await getInstamojoAccessToken();
  console.log("access token mil gya", access_token);
    
  } catch (err: any) {
    console.error("Error fetching access token:", err.response?.data || err.message);
    return NextResponse.json({ success: false, error: "Failed to fetch Instamojo access token." }, { status: 502 });
  }

  // Step 5: Create Instamojo payment request
  let paymentData;
  try {
    const paymentRes = await axios.post(
      "https://api.instamojo.com/v2/payment_requests/",
      {
        amount: price,
        purpose: "Purchase request for CAT course",
        buyer_name:name,
        email,
        phone,
        redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL}/profile`, // change as needed,
        webhook : `${process.env.NEXT_PUBLIC_BASE_URL}/api/purchase/webhook`,
        allow_repeated_payments : false,
        send_email : true
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }
    );
    paymentData = paymentRes.data;
  } catch (err: any) {
    console.log("yha dikkt aagyi");
    
    console.error("Error creating payment request:", err.response?.data || err.message);
    return NextResponse.json({ success: false, error: "Failed to create Instamojo payment request." }, { status: 502 });
  }

  // Step 6: Save payment details to DB
  try {
    await Payment.create({
      courseId: payload.courseId,
      userId: payload.userId,
      amount:price,
      instamojo_RequestId: paymentData.id,
    });
  } catch (err: any) {
    console.error("Error saving payment:", err.response?.data || err.message);
    return NextResponse.json({ success: false, error: "Failed to save payment record." }, { status: 500 });
  }

  // Step 7: Send response to frontend
  return NextResponse.json({
    success: true,
    paymentUrl: paymentData.longurl,
  });
}
