import { NextResponse, NextRequest } from "next/server";
import axios from "axios";

let cached = {
  token: "",
  expiresAt: 0,
};

export async function GET(req: NextRequest) {
  const now = Date.now();

  // return cached token if still valid
  if (cached.token && now < cached.expiresAt) {
    return NextResponse.json({ access_token: cached.token });
  }

  try {
    const response = await axios.post(
      "https://api.test.instamojo.com/oauth2/token/",
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.INSTAMOJO_API_KEY!,
        client_secret: process.env.INSTAMOJO_AUTH_TOKEN!,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token, expires_in } = response.data;

    cached.token = access_token;
    cached.expiresAt = now + expires_in * 1000;

    return NextResponse.json({ access_token });
  } catch (error: any) {
    console.error("Token error", error.response?.data || error.message);
    return NextResponse.json(
      { error: "Failed to get access token" },
      { status: 500 }
    );
  }
}
