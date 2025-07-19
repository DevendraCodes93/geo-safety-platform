import Urls from "../../../models/UrlsModel";
import { dbConnect } from "../../../lib/db";

export const POST = async (req, res) => {
  const body = await req.json();
  console.log(body, "body");
  // Await the database connection
  await dbConnect();

  const urlDetails = await Urls.findOne({
    url: body.urlName,
  });
  console.log(urlDetails, "urlDetails");
  if (!urlDetails) {
    return new Response(JSON.stringify({ error: "URL not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Check if URL is expired
  const currentDate = new Date();
  if (urlDetails.expiresAt && urlDetails.expiresAt <= currentDate) {
    return new Response(
      JSON.stringify({ error: "URL has expired and is no longer tracking" }),
      {
        status: 410, // 410 Gone - resource no longer available
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    // Check if this session was already tracked
    const existingEntry = await Urls.findOne({
      creatorId: body.creatorId,
      "visitorDetails.sessionId": body.sessionId,
    });

    if (existingEntry) {
      return new Response(JSON.stringify({ message: "Already tracked" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const visitorData = {
      sessionId: body.sessionId,
      latitude: body.latitude,
      longitude: body.longitude,
      accuracy: body.accuracy,
      timestamp: body.timestamp,
      userAgent: body.userAgent,
      screen: body.screen,
      viewport: body.viewport,
      timezone: body.timezone,
      language: body.language,
      platform: body.platform,
    };

    const savedData = await urlDetails.updateOne({
      $push: {
        visitorDetails: visitorData,
      },
    });

    console.log(savedData, "savedData");
    return new Response(JSON.stringify({ data: savedData }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error saving data:", error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
