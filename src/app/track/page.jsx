"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const Page = () => {
  const [urls, setUrls] = useState([]);

  const [loading, setLoading] = useState(true);

  // Generate random URLs for demo (you'll replace this with actual API call)
  const generateRandomUrls = () => {
    const randomUrls = [
      {
        id: 1,
        urlName: "Product Launch Campaign",
        createdTime: "2025-01-20T10:30:00Z",
        visitors: 145,
        fullUrl: "https://safe-buddy.vercel.app/usr123/product-launch/xyz789",
      },
      {
        id: 2,
        urlName: "Survey Form Link",
        createdTime: "2025-01-19T14:22:00Z",
        visitors: 67,
        fullUrl: "https://safe-buddy.vercel.app/usr456/survey-form/abc123",
      },
      {
        id: 3,
        urlName: "Event Registration",
        createdTime: "2025-01-18T09:15:00Z",
        visitors: 289,
        fullUrl: "https://safe-buddy.vercel.app/usr789/event-reg/def456",
      },
      {
        id: 4,
        urlName: "Newsletter Signup",
        createdTime: "2025-01-17T16:45:00Z",
        visitors: 23,
        fullUrl: "https://safe-buddy.vercel.app/usr101/newsletter/ghi789",
      },
      {
        id: 5,
        urlName: "Beta Testing Access",
        createdTime: "2025-01-16T11:30:00Z",
        visitors: 456,
        fullUrl: "https://safe-buddy.vercel.app/usr202/beta-test/jkl012",
      },
    ];
    return randomUrls;
  };

  const getUrls = async () => {
    try {
      console.log("Fetching URLs...");
      const userId = localStorage.getItem("userId");

      if (!userId) {
        console.log("No userId found in localStorage");
        return;
      }

      const response = await fetch("https://safe-buddy.vercel.app/api/get_urls", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId }),
      });

      console.log("API Response status:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("Received data:", data);

        if (data.success && data.urls) {
          setUrls(data.urls);
          console.log("URLs set successfully:", data.urls.length);
        } else {
          console.log("No URLs found or API error");
          setUrls([]); // Set empty array if no URLs
        }
      } else {
        console.error("API call failed with status:", response.status);
        setUrls([]); // Set empty array on error
      }
    } catch (error) {
      console.error("Error fetching URLs:", error);
      setUrls([]); // Set empty array on error
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // Try to fetch real URLs from API
      await getUrls();

      // Small delay for better UX
      setTimeout(() => {
        setLoading(false);
      }, 500);
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleTrack = (url) => {
    // This will be your track functionality
    Router.push(`/track/${url.id}/${url.urlName}/${url.code}`);
    console.log("Tracking URL:", url);
    // You can navigate to a detailed tracking page or show a modal
    alert(`Tracking details for: ${url.urlName}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-darkmode flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading your URLs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-darkmode ">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 mt-10">
            <h1 className="text-white text-4xl font-bold mb-4">
              Track Your URLs
            </h1>
            <p className="text-gray-300 text-lg">
              Monitor and analyze your created tracking URLs
            </p>
          </div>

          {/* URLs Table */}
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-900">
                  <tr>
                    <th className="text-left py-4 px-6 text-white font-semibold">
                      URL Name
                    </th>
                    <th className="text-left py-4 px-6 text-white font-semibold">
                      Created
                    </th>
                    <th className="text-left py-4 px-6 text-white font-semibold">
                      Visitors
                    </th>
                    <th className="text-center py-4 px-6 text-white font-semibold">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {urls
                    .sort((a, b) => b.visitors - a.visitors)
                    .map((url, index) => (
                      <tr
                        key={url.id}
                        className={`${
                          index % 2 === 0 ? "bg-gray-800" : "bg-gray-750"
                        } hover:bg-gray-700 transition-colors duration-200`}
                      >
                        <td className="py-4 px-6">
                          <div>
                            <p className="text-white font-medium">
                              {url.urlName}
                            </p>
                            <p className="text-gray-400 text-sm mt-1">
                              {url.fullUrl}
                            </p>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-gray-300">
                          {formatDate(url.createdTime)}
                        </td>
                        <td className="py-4 px-6">
                          <span className=" text-white font-bold text-xl px-3 py-1 rounded-full ">
                            {url.visitors > 1 ? url.visitors - 1 : 0}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <Link
                            href={`/track/${url.id}`}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
                          >
                            Track
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <h3 className="text-gray-300 text-sm uppercase tracking-wide mb-2">
                Total URLs
              </h3>
              <p className="text-3xl font-bold text-white">{urls.length}</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <h3 className="text-gray-300 text-sm uppercase tracking-wide mb-2">
                Total Visitors
              </h3>
              <p className="text-3xl font-bold text-primary">
                {urls.reduce(
                  (sum, url) => sum + Math.max(0, url.visitors - 1),
                  0
                )}
              </p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <h3 className="text-gray-300 text-sm uppercase tracking-wide mb-2">
                Avg. Visitors
              </h3>
              <p className="text-3xl font-bold text-green-400">
                {urls.length > 0
                  ? Math.round(
                      urls.reduce(
                        (sum, url) => sum + Math.max(0, url.visitors - 1),
                        0
                      ) / urls.length
                    )
                  : 0}
              </p>
            </div>
          </div>

          {/* Empty State */}
          {urls.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-6xl mb-4">🔗</div>
              <h3 className="text-white text-xl font-semibold mb-2">
                No URLs Created Yet
              </h3>
              <p className="text-gray-400">
                Create your first tracking URL to get started!
              </p>
              <button className="mt-4 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200">
                Create URL
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
