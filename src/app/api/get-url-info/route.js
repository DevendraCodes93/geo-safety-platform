import Urls from "@/models/UrlsModel";
import { dbConnect } from "../../../lib/db";
export const POST = async (req, res) => {
  const body = await req.json();
  console.log(body, "body");
  // Await the database connection
  await dbConnect();

  const urlDetails = await Urls.findOne({
    _id: body.id,
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
    return new Response(JSON.stringify({ error: "URL has expired" }), {
      status: 410, // 410 Gone - resource no longer available
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    // Transform the data to match your frontend format
    const formattedUrl = {
      id: urlDetails._id,
      urlName: urlDetails.description || "No description",
      createdTime: urlDetails.createdAt || new Date().toISOString(),
      visitors: urlDetails.visitorDetails,
      description: urlDetails.description || "No description",
      fullUrl:
        urlDetails.url ||
        `http://localhost:3001/${urlDetails.creatorId}/tracking/${urlDetails._id}`,
      code: urlDetails._id.toString().slice(-6), // Use last 6 chars of ID as code
    };

    return new Response(JSON.stringify({ success: true, url: formattedUrl }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching URL details:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to fetch URL details" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
  // const urlDetails = await Urls;
};
