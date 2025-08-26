// /app/api/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import qs from "qs";
import crypto from "crypto";
import { connect } from "@/lib/db";
import Payment from "@/models/payment";
import User from "@/models/user";


export async function POST(req: NextRequest) {
  try {
    await connect();

    // Instamojo sends webhook as application/x-www-form-urlencoded
    const rawBody = await req.text();
    const data = qs.parse(rawBody);

    // Extract relevant fields from Instamojo payload
    const { mac, payment_request_id, payment_id, status } = data;

    // Verify signature (MAC)
    const secret = process.env.INSTAMOJO_WEBHOOK_SECRET!;
    // Get sorted keys except 'mac'
    const sortedKeys = Object.keys(data).filter(k => k !== "mac").sort();
    const values = sortedKeys.map(key => data[key]).join("|");
    const expectedMac = crypto.createHmac("sha1", secret).update(values).digest("hex");
    if (mac !== expectedMac) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // Find payment entry
    const payment = await Payment.findOne({ instamojo_RequestId: payment_request_id });
    if (!payment) {
      return NextResponse.json({ error: "No payment record found" }, { status: 404 });
    }

    // Mark payment as successful/failed
    if (status === "Credit") {
      payment.status = "SUCCESS";
      payment.instamojo_PaymentId = payment_id;
      await payment.save();

      // Add course to user's registered courses
      const user = await User.findById(payment.userId);
      if (user) {
        if (!user.courses.includes(payment.courseId)) {
          user.courses.push(payment.courseId);
          await user.save();
        }
      }
    } else {
      payment.status = "FAILED";
      payment.instamojo_PaymentId = payment_id;
      await payment.save();
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
