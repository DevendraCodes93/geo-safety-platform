"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";

const UserTrackingPage = () => {
  const params = useParams();
  const [urlData, setUrlData] = useState(null);
  const [visitorDetails, setVisitorDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUrlDetails();
  }, [params.id]);

  // Reverse geocoding function using OpenStreetMap Nominatim API (free)
  const reverseGeocode = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`,
        {
          headers: {
            "User-Agent": "LocationTracker/1.0",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Geocoding API request failed");
      }

      const data = await response.json();

      let city = "Unknown City";
      let country = "Unknown Country";

      if (data && data.address) {
        // Extract city (try multiple possible fields)
        city =
          data.address.city ||
          data.address.town ||
          data.address.village ||
          data.address.municipality ||
          data.address.county ||
          "Unknown City";

        // Extract country
        country = data.address.country || "Unknown Country";
      }

      return { city, country };
    } catch (error) {
      console.error("Reverse geocoding error:", error);
      return { city: "Unknown City", country: "Unknown Country" };
    }
  };

  const fetchUrlDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://safe-buddy.vercel.app/api/get-url-info`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: params.id }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch URL details");
      }
      console.log("Fetching details for URL ID:", params.id);
      const data = await response.json();
      console.log("API Response:", data);

      if (data.success && data.url) {
        setUrlData({
          id: data.url.id,
          urlName: data.url.urlName,
          description: data.url.description,
          createdAt: data.url.createdTime,
          url: data.url.fullUrl,
          totalVisitors: data.url.visitors.length,
        });

        // Set visitor details from the API response
        const visitors = data.url.visitors;

        // Map the actual visitor data to display format with reverse geocoding
        const formattedVisitors = await Promise.all(
          visitors.map(async (visitor, index) => {
            let city = "Unknown City";
            let country = "Unknown Country";
            let detailedAddress = "Location not available";
            let locality = "Unknown Area";

            // Check if visitor already has address data from database
            if (visitor.address && visitor.address.locality) {
              locality = visitor.address.locality;
              city = visitor.address.city || "Unknown City";
              country = visitor.address.country || "Unknown Country";
              detailedAddress =
                visitor.address.formatted_address ||
                `${visitor.latitude}, ${visitor.longitude}`;
            } else if (visitor.latitude && visitor.longitude) {
              // Fallback to reverse geocoding if address not stored
              try {
                const locationData = await reverseGeocode(
                  visitor.latitude,
                  visitor.longitude
                );
                city = locationData.city;
                country = locationData.country;
                detailedAddress = `${visitor.latitude}, ${visitor.longitude}`;
                locality = "Geocoded Location";
              } catch (error) {
                console.log("Reverse geocoding failed:", error);
                // Keep default values if reverse geocoding fails
                detailedAddress = `${visitor.latitude}, ${visitor.longitude}`;
              }
            }

            // Use actual visitor data if available, otherwise provide defaults
            return {
              sessionId: visitor.sessionId || visitor._id || `visitor_${index}`,
              latitude: visitor.latitude || 0,
              longitude: visitor.longitude || 0,
              accuracy: visitor.accuracy || 0,
              timestamp: visitor.timestamp || new Date().toISOString(),
              userAgent: visitor.userAgent || "Unknown Browser",
              city: city,
              country: country,
              detailedAddress: detailedAddress,
              locality: locality,
              country: country,
              screen: visitor.screen || { width: 0, height: 0 },
              viewport: visitor.viewport || { width: 0, height: 0 },
              timezone: visitor.timezone || "UTC",
              language: visitor.language || "Unknown",
              platform: visitor.platform || "Unknown",
            };
          })
        );

        // Filter out visitors that don't have proper tracking data
        const validVisitors = formattedVisitors.filter((visitor) => {
          // Check if visitor has essential tracking data
          return (
            visitor.sessionId &&
            (visitor.latitude !== 0 ||
              visitor.longitude !== 0 ||
              visitor.userAgent !== "Unknown Browser" ||
              visitor.timestamp !== new Date().toISOString())
          );
        });

        setVisitorDetails(validVisitors);
      } else {
        throw new Error("Invalid API response");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching URL details:", error);
      setError("Failed to load tracking details");
      setLoading(false);
    }
  };

  const openInGoogleMaps = (latitude, longitude, city = "Unknown Location") => {
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(url, "_blank");
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    });
  };

  const getBrowserName = (userAgent) => {
    if (userAgent.includes("Chrome")) return "Chrome";
    if (userAgent.includes("Firefox")) return "Firefox";
    if (userAgent.includes("Safari")) return "Safari";
    if (userAgent.includes("Edge")) return "Edge";
    return "Unknown";
  };

  const getDeviceType = (userAgent) => {
    if (userAgent.includes("Mobile") || userAgent.includes("iPhone"))
      return "Mobile";
    if (userAgent.includes("Tablet") || userAgent.includes("iPad"))
      return "Tablet";
    return "Desktop";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-darkmode flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading tracking details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-darkmode flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-white text-2xl font-bold mb-2">Error</h1>
          <p className="text-gray-300">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-darkmode ">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-7xl mx-auto mt-10">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-white text-3xl font-bold mb-2">
                  Tracking Details
                </h1>
                <p className="text-gray-300">
                  {urlData?.urlName || "URL Tracking"}
                </p>
              </div>
              <button
                onClick={() => window.history.back()}
                className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-200"
              >
                ← Back
              </button>
            </div>
          </div>

          {/* URL Info Card */}
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h2 className="text-white text-xl font-semibold mb-4">
              URL Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-300 text-sm">URL Name</p>
                <p className="text-white font-medium">{urlData?.urlName}</p>
              </div>
              <div>
                <p className="text-gray-300 text-sm">Created</p>
                <p className="text-white font-medium">
                  {formatDate(urlData?.createdAt)}
                </p>
              </div>
              <div className="md:col-span-2">
                <p className="text-gray-300 text-sm">Full URL</p>
                <p className="text-blue-400 font-mono text-sm bg-gray-900 p-2 rounded break-all overflow-hidden">
                  {urlData?.url}
                </p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <h3 className="text-gray-300 text-sm uppercase tracking-wide mb-2">
                Total Visitors
              </h3>
              <p className="text-3xl font-bold text-primary">
                {visitorDetails.length}
              </p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <h3 className="text-gray-300 text-sm uppercase tracking-wide mb-2">
                Countries
              </h3>
              <p className="text-3xl font-bold text-green-400">
                {new Set(visitorDetails.map((v) => v.country)).size}
              </p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <h3 className="text-gray-300 text-sm uppercase tracking-wide mb-2">
                Mobile Users
              </h3>
              <p className="text-3xl font-bold text-purple-400">
                {
                  visitorDetails.filter(
                    (v) => getDeviceType(v.userAgent) === "Mobile"
                  ).length
                }
              </p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <h3 className="text-gray-300 text-sm uppercase tracking-wide mb-2">
                Avg. Accuracy
              </h3>
              <p className="text-3xl font-bold text-yellow-400">
                {visitorDetails.filter((v) => v.accuracy > 0).length > 0
                  ? Math.round(
                      visitorDetails
                        .filter((v) => v.accuracy > 0)
                        .reduce((sum, v) => sum + v.accuracy, 0) /
                        visitorDetails.filter((v) => v.accuracy > 0).length
                    )
                  : 0}
                m
              </p>
            </div>
          </div>

          {/* Visitor Details Table */}
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-700">
              <h2 className="text-white text-xl font-semibold">
                Visitor Details
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-900">
                  <tr>
                    <th className="text-left py-4 px-6 text-white font-semibold">
                      Location
                    </th>
                    <th className="text-left py-4 px-6 text-white font-semibold">
                      Time
                    </th>
                    <th className="text-left py-4 px-6 text-white font-semibold">
                      Device
                    </th>
                    <th className="text-left py-4 px-6 text-white font-semibold">
                      Accuracy
                    </th>
                    <th className="text-center py-4 px-6 text-white font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {visitorDetails.map((visitor, index) => (
                    <tr
                      key={visitor.sessionId}
                      className={`${
                        index % 2 === 0 ? "bg-gray-800" : "bg-gray-750"
                      } hover:bg-gray-700 transition-colors duration-200`}
                    >
                      <td className="py-4 px-6">
                        <div>
                          <p className="text-white font-medium">
                            {visitor.locality &&
                            visitor.locality !== "Unknown Area"
                              ? `${visitor.locality}, ${visitor.city}`
                              : `${visitor.city}, ${visitor.country}`}
                          </p>
                          {visitor.detailedAddress &&
                          visitor.detailedAddress !==
                            "Location not available" ? (
                            <p
                              className="text-gray-300 text-sm mb-1"
                              title={visitor.detailedAddress}
                            >
                              {visitor.detailedAddress.length > 50
                                ? `${visitor.detailedAddress.substring(
                                    0,
                                    50
                                  )}...`
                                : visitor.detailedAddress}
                            </p>
                          ) : null}
                          {visitor.latitude && visitor.longitude ? (
                            <p className="text-gray-400 text-sm">
                              {visitor.latitude.toFixed(4)},{" "}
                              {visitor.longitude.toFixed(4)}
                            </p>
                          ) : (
                            <p className="text-gray-400 text-sm">
                              Location not available
                            </p>
                          )}
                          <p className="text-gray-500 text-xs">
                            {visitor.timezone}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-gray-300 text-sm">
                          {formatDate(visitor.timestamp)}
                        </p>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <p className="text-white text-sm">
                            {getBrowserName(visitor.userAgent)}
                          </p>
                          <p className="text-gray-400 text-xs">
                            {getDeviceType(visitor.userAgent)} •{" "}
                            {visitor.platform}
                          </p>
                          <p className="text-gray-500 text-xs">
                            {visitor.screen.width}×{visitor.screen.height}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        {visitor.accuracy > 0 ? (
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              visitor.accuracy <= 10
                                ? "bg-green-100 text-green-800"
                                : visitor.accuracy <= 20
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {visitor.accuracy}m
                          </span>
                        ) : (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                            N/A
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {visitor.latitude && visitor.longitude ? (
                          <button
                            onClick={() =>
                              openInGoogleMaps(
                                visitor.latitude,
                                visitor.longitude,
                                visitor.locality &&
                                  visitor.locality !== "Unknown Area"
                                  ? `${visitor.locality}, ${visitor.city}, ${visitor.country}`
                                  : `${visitor.city}, ${visitor.country}`
                              )
                            }
                            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 mx-auto"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                            <span>View on Map</span>
                          </button>
                        ) : (
                          <span className="text-gray-500 text-sm">
                            No location data
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Empty State */}
          {visitorDetails.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-6xl mb-4">📍</div>
              <h3 className="text-white text-xl font-semibold mb-2">
                No Visitors Yet
              </h3>
              <p className="text-gray-400">
                Share your tracking URL to start collecting location data.
              </p>
            </div>
          )}

          {/* Show message when visitors exist but no valid tracking data */}
          {visitorDetails.length === 0 && urlData?.totalVisitors > 0 && (
            <div className="bg-gray-800 rounded-lg p-8 text-center">
              <div className="text-gray-500 text-4xl mb-4">⚠️</div>
              <h3 className="text-white text-lg font-semibold mb-2">
                No Valid Tracking Data
              </h3>
              <p className="text-gray-400 text-sm">
                {urlData.totalVisitors} visitor(s) detected, but no complete
                location or device information available.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserTrackingPage;
