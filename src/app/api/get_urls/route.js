import Urls from "../../../models/UrlsModel";
import { dbConnect } from "../../../lib/db";

export const POST = async (request) => {
  try {
    console.log("GET URLs API called");

    // Parse the request body to get userId
    const body = await request.json();
    const { userId } = body;

    console.log("Getting URLs for userId:", userId);

    // Connect to database
    await dbConnect();

    // Find all URLs created by this user that are not expired
    const currentDate = new Date();
    const urls = await Urls.find({
      creatorId: userId,
      $or: [
        { expiresAt: null }, // URLs with no expiry
        { expiresAt: { $gt: currentDate } }, // URLs not yet expired
      ],
    }).sort({ createdAt: -1 });

    console.log("Found active URLs:", urls.length);

    // Transform the data to match your frontend format
    const formattedUrls = urls.map((url, index) => ({
      id: url._id,
      urlName: url.description || `URL ${index + 1}`,
      createdTime: url.createdAt || new Date().toISOString(),
      visitors: url.visitorDetails ? url.visitorDetails.length : 0,
      fullUrl:
        url.url ||
        `http://localhost:3001/${url.creatorId}/tracking/${index + 1}`,
      code: url._id.toString().slice(-6), // Use last 6 chars of ID as code
      expiresAt: url.expiresAt, // Include expiry info
      isExpired: url.expiresAt ? url.expiresAt <= currentDate : false,
    }));

    return new Response(
      JSON.stringify({
        success: true,
        urls: formattedUrls,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching URLs:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Failed to fetch URLs",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
