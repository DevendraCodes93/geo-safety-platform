"use client";
import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import {
  getHighAccuracyLocation,
  formatLocationData,
  validateCoordinates,
} from "../../../../utils/locationUtils";
import { getIndianAddress } from "../../../../utils/geocodingUtils";
import {
  hasValidConsent,
  grantConsent,
  declineConsent,
  shouldShowConsentModal,
  logConsentAction,
} from "../../../../utils/consentUtils";
import ConsentModal from "../../../../components/Common/ConsentModal";

// Global flag to prevent duplicate API calls across component re-renders
let globalTrackingInProgress = false;

export function TrackingPageClient() {
  const params = useParams();
  const [pageReady, setPageReady] = useState(false);
  const [trackingComplete, setTrackingComplete] = useState(false);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [consentDeclined, setConsentDeclined] = useState(false);
  const hasTracked = useRef(false);

  useEffect(() => {
    // Check for existing consent first
    if (hasValidConsent()) {
      // User has valid consent, proceed with tracking
      startLocationTracking();
    } else if (shouldShowConsentModal()) {
      // Show consent modal if no decision has been made
      setShowConsentModal(true);
      setPageReady(true); // Show page but with consent modal
    } else {
      // User has declined consent in this session
      setConsentDeclined(true);
      setTrackingComplete(true);
      setPageReady(true);
    }
  }, [params.id, params.name, params.code]);

  const handleConsentGranted = () => {
    grantConsent();
    logConsentAction("granted", { url: window.location.href });
    setShowConsentModal(false);
    startLocationTracking();
  };

  const handleConsentDeclined = () => {
    declineConsent();
    logConsentAction("declined", { url: window.location.href });
    setShowConsentModal(false);
    setConsentDeclined(true);
    setTrackingComplete(true);
    setPageReady(true);
  };

  const startLocationTracking = () => {
    // Prevent duplicate tracking calls
    if (trackingComplete || hasTracked.current || globalTrackingInProgress)
      return;

    // Prevent multiple calls by checking if we already have a tracking flag in sessionStorage
    const trackingKey = `tracking_${params.id}_${params.name}_${params.code}`;
    if (sessionStorage.getItem(trackingKey)) {
      setTrackingComplete(true);
      setPageReady(true);
      hasTracked.current = true;
      return;
    }

    hasTracked.current = true;
    globalTrackingInProgress = true;

    const trackLocationSilently = async () => {
      console.log("came here");
      try {
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
        console.log("came", position);
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
            // Add detailed address information
            address: addressInfo,
            creatorId: params.id,
            //with domain full url
            urlName: `http://localhost:3001/${params.id}/${params.name}/${params.code}`,
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

          console.log("Sending location data to API:", locationData);

          // Send location data silently to your API
          try {
            const response = await fetch("/api/track", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(locationData),
            });

            console.log("API Response status:", response.status);
            console.log("API Response:", await response.text());

            if (response.ok) {
              console.log("Tracking successful");
            } else {
              console.error("API call failed with status:", response.status);
            }

            // Mark tracking as complete
            setTrackingComplete(true);
            globalTrackingInProgress = false;
          } catch (error) {
            // Silently fail - don't show any errors to user
            console.log("Tracking failed:", error);
            setTrackingComplete(true);
            globalTrackingInProgress = false;
          }
        } else {
          console.log(
            "No position data received - location denied or unavailable"
          );
          // Even if location is denied, mark as complete
          setTrackingComplete(true);
          globalTrackingInProgress = false;
        }
      } catch (error) {
        // Silently fail - don't show any errors to user
        console.log("Location access failed:", error);
        setTrackingComplete(true);
        globalTrackingInProgress = false;
      }
    };

    // Start tracking immediately
    trackLocationSilently();

    // Show the page after a short delay
    setTimeout(() => {
      setPageReady(true);
    }, 1000);
  };

  // Handle loading state

  // Handle loading state
  if (!pageReady && !showConsentModal) {
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
    <>
      {/* Consent Modal */}
      <ConsentModal
        isOpen={showConsentModal}
        onConsent={handleConsentGranted}
        onDecline={handleConsentDeclined}
      />

      {/* Main Content */}
      <div className="min-h-screen bg-darkmode">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center">
            {/* Consent Declined Message */}
            {consentDeclined && (
              <div className="bg-yellow-900/20 border border-yellow-600/20 rounded-lg p-6 mb-8">
                <div className="flex items-center justify-center mb-4">
                  <svg
                    className="h-12 w-12 text-yellow-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-yellow-200 mb-2">
                  Location Tracking Not Enabled
                </h2>
                <p className="text-yellow-200 mb-4">
                  You have chosen not to allow location tracking. The service
                  cannot function without location permissions.
                </p>
                <button
                  onClick={() => setShowConsentModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Change Permissions
                </button>
              </div>
            )}

            {/* Success Content */}
            {!consentDeclined && (
              <>
                <div className="text-center mb-8">
                  <div className="text-blue-500 text-6xl mb-4">🔗</div>
                  <h1 className="text-white text-3xl font-bold mb-2">
                    Link Accessed Successfully
                  </h1>
                  <p className="text-gray-300">
                    The content you're looking for has been processed.
                  </p>
                  {trackingComplete && (
                    <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-900/20 text-green-400 border border-green-600/20">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Location tracking completed
                    </div>
                  )}
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
              </>
            )}

            {/* Footer */}
            <div className="text-center mt-8">
              <p className="text-gray-400 text-sm mb-4">
                This session has been recorded for security purposes. You may
                now close this page.
              </p>
              <div className="flex justify-center space-x-4 text-xs">
                <a
                  href="/privacy-policy"
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  Privacy Policy
                </a>
                <a
                  href="/terms-of-service"
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
