// app/api/your-endpoint/route.ts

import { dbConnect } from "../../../lib/db";
import Urls from "../../../models/UrlsModel";

export async function POST(req) {
  dbConnect();
  try {
    const body = await req.json();

    console.log(body);
    console.log("came");

    if (!body) {
      return new Response(JSON.stringify({ error: "Invalid request" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    console.log(body, "body");

    // Calculate expiry date if expiryDays is provided
    let expiresAt = null;
    const expiryDays = body.userData.expiryDays || 0;
    if (expiryDays > 0) {
      expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + expiryDays);
    }

    const url = {
      creatorId: body.creatorId,
      visitorDetails: body.userData.visitorDetails || {},
      url: body.url,
      description: body.userData.description || "",
      expiryDays: expiryDays,
      expiresAt: expiresAt, // Add calculated expiry date
    };

    const newUrl = new Urls(url);
    const res = await newUrl.save();
    console.log(res, "res");

    // Example processing: double each item
    // const processedData = body.data.map((item) => item * 2);

    return new Response(JSON.stringify({ data: res }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
