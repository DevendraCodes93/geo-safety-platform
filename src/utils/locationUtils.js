// Enhanced location tracking utilities for maximum accuracy

/**
 * Get the most accurate location possible using multiple strategies
 * @param {Object} options - Configuration options
 * @returns {Promise<GeolocationPosition>} - The most accurate position
 */
export async function getHighAccuracyLocation(options = {}) {
  const {
    timeout = 30000,
    maximumAge = 0,
    enableHighAccuracy = true,
    fallbackToLowAccuracy = true,
    multipleAttempts = true,
  } = options;

  // Strategy 1: High accuracy with long timeout
  try {
    const position = await getCurrentPositionPromise({
      enableHighAccuracy: true,
      timeout: timeout,
      maximumAge: maximumAge,
    });

    // If accuracy is good enough (< 50 meters), return immediately
    if (position.coords.accuracy <= 50) {
      console.log(
        `High accuracy location obtained: ${position.coords.accuracy}m`
      );
      return position;
    }

    // If not accurate enough and multiple attempts enabled, try again
    if (multipleAttempts && position.coords.accuracy > 50) {
      console.log(
        `First attempt accuracy: ${position.coords.accuracy}m, trying again...`
      );

      // Strategy 2: Second attempt with watchPosition for continuous updates
      const betterPosition = await getWatchPosition({
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      });

      // Return the more accurate of the two
      if (betterPosition.coords.accuracy < position.coords.accuracy) {
        console.log(`Improved accuracy: ${betterPosition.coords.accuracy}m`);
        return betterPosition;
      }
    }

    return position;
  } catch (error) {
    console.log("High accuracy location failed:", error.message);

    // Strategy 3: Fallback to lower accuracy if enabled
    if (fallbackToLowAccuracy) {
      try {
        const fallbackPosition = await getCurrentPositionPromise({
          enableHighAccuracy: false,
          timeout: 10000,
          maximumAge: 300000, // Allow 5 minute old cached position as fallback
        });

        console.log(
          `Fallback location accuracy: ${fallbackPosition.coords.accuracy}m`
        );
        return fallbackPosition;
      } catch (fallbackError) {
        console.log("Fallback location also failed:", fallbackError.message);
        throw fallbackError;
      }
    }

    throw error;
  }
}

/**
 * Promisified getCurrentPosition
 */
function getCurrentPositionPromise(options) {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported"));
      return;
    }

    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}

/**
 * Use watchPosition to get potentially more accurate location
 */
function getWatchPosition(options) {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported"));
      return;
    }

    let watchId;
    let bestPosition = null;
    let attempts = 0;
    const maxAttempts = 3;

    const timeout = setTimeout(() => {
      navigator.geolocation.clearWatch(watchId);
      if (bestPosition) {
        resolve(bestPosition);
      } else {
        reject(new Error("Watch position timeout"));
      }
    }, options.timeout || 10000);

    watchId = navigator.geolocation.watchPosition(
      (position) => {
        attempts++;

        // Keep the most accurate position
        if (
          !bestPosition ||
          position.coords.accuracy < bestPosition.coords.accuracy
        ) {
          bestPosition = position;
        }

        // If we get very accurate position (< 20m) or max attempts reached, resolve immediately
        if (position.coords.accuracy <= 20 || attempts >= maxAttempts) {
          clearTimeout(timeout);
          navigator.geolocation.clearWatch(watchId);
          resolve(bestPosition);
        }
      },
      (error) => {
        clearTimeout(timeout);
        navigator.geolocation.clearWatch(watchId);
        if (bestPosition) {
          resolve(bestPosition);
        } else {
          reject(error);
        }
      },
      options
    );
  });
}

/**
 * Format location data with additional metadata
 */
export function formatLocationData(position, additionalData = {}) {
  return {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
    accuracy: position.coords.accuracy,
    altitude: position.coords.altitude,
    altitudeAccuracy: position.coords.altitudeAccuracy,
    heading: position.coords.heading,
    speed: position.coords.speed,
    timestamp: new Date(position.timestamp).toISOString(),
    ...additionalData,
  };
}

/**
 * Validate if coordinates are reasonable (not null island, etc.)
 */
export function validateCoordinates(latitude, longitude) {
  // Check for null island (0,0) or other obviously invalid coordinates
  if (latitude === 0 && longitude === 0) {
    return false;
  }

  // Check for valid ranges
  if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
    return false;
  }

  return true;
}

/**
 * Calculate distance between two coordinates (in meters)
 */
export function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
}
