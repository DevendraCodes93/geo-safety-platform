// Reverse geocoding utilities for getting detailed address from coordinates

/**
 * Get detailed address from coordinates using multiple geocoding services
 * @param {number} latitude - Latitude coordinate
 * @param {number} longitude - Longitude coordinate
 * @returns {Promise<Object>} - Detailed address information
 */
export async function getDetailedAddress(latitude, longitude) {
  // Try multiple geocoding services for best results
  const geocodingStrategies = [
    () => reverseGeocodeGoogle(latitude, longitude),
    () => reverseGeocodeNominatim(latitude, longitude),
    () => reverseGeocodeMapBox(latitude, longitude),
  ];

  for (const strategy of geocodingStrategies) {
    try {
      const result = await strategy();
      if (result && result.formatted_address) {
        console.log("Geocoding successful:", result);
        return result;
      }
    } catch (error) {
      console.log("Geocoding strategy failed:", error.message);
      continue;
    }
  }

  // If all fail, return basic coordinate info
  return {
    formatted_address: `${latitude}, ${longitude}`,
    locality: "Unknown",
    city: "Unknown",
    state: "Unknown",
    country: "Unknown",
    postal_code: "Unknown",
  };
}

/**
 * Reverse geocode using Google Maps API (requires API key)
 */
async function reverseGeocodeGoogle(latitude, longitude) {
  // Note: This requires a Google Maps API key
  // For now, we'll skip this and use free alternatives
  throw new Error("Google Maps API key required");
}

/**
 * Reverse geocode using Nominatim (OpenStreetMap) - Free service
 */
async function reverseGeocodeNominatim(latitude, longitude) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`;

  const response = await fetch(url, {
    headers: {
      "User-Agent": "LocationTracker/1.0",
    },
  });

  if (!response.ok) {
    throw new Error(`Nominatim API error: ${response.status}`);
  }

  const data = await response.json();

  if (data && data.address) {
    return {
      formatted_address: data.display_name,
      locality:
        data.address.neighbourhood ||
        data.address.suburb ||
        data.address.village ||
        data.address.hamlet,
      city: data.address.city || data.address.town || data.address.municipality,
      state: data.address.state,
      country: data.address.country,
      postal_code: data.address.postcode,
      raw_address: data.address,
    };
  }

  throw new Error("No address data from Nominatim");
}

/**
 * Reverse geocode using MapBox API (requires API key but has free tier)
 */
async function reverseGeocodeMapBox(latitude, longitude) {
  // Note: This requires a MapBox API key
  // const MAPBOX_TOKEN = 'your_mapbox_token_here';
  // const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${MAPBOX_TOKEN}`;

  throw new Error("MapBox API key required");
}

/**
 * Enhanced reverse geocoding specifically for Indian addresses
 * Uses multiple data sources and local knowledge
 */
export async function getIndianAddress(latitude, longitude) {
  try {
    // Use Nominatim with specific focus on Indian administrative levels
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1&accept-language=en`;

    const response = await fetch(url, {
      headers: {
        "User-Agent": "LocationTracker/1.0",
      },
    });

    if (!response.ok) {
      throw new Error(`Geocoding API error: ${response.status}`);
    }

    const data = await response.json();

    if (data && data.address) {
      const addr = data.address;

      // Build detailed Indian address format
      const addressComponents = [];

      // Add specific locality/area
      if (addr.neighbourhood) addressComponents.push(addr.neighbourhood);
      if (addr.suburb) addressComponents.push(addr.suburb);
      if (addr.village) addressComponents.push(addr.village);
      if (addr.hamlet) addressComponents.push(addr.hamlet);

      // Add city/town
      if (addr.city) addressComponents.push(addr.city);
      if (addr.town) addressComponents.push(addr.town);
      if (addr.municipality) addressComponents.push(addr.municipality);

      // Add state
      if (addr.state) addressComponents.push(addr.state);

      // Add postal code if available
      if (addr.postcode) addressComponents.push(addr.postcode);

      const detailedAddress = addressComponents.join(", ");

      return {
        formatted_address: detailedAddress || data.display_name,
        locality:
          addr.neighbourhood ||
          addr.suburb ||
          addr.village ||
          addr.hamlet ||
          "Unknown Area",
        sublocality: addr.neighbourhood || addr.suburb,
        city: addr.city || addr.town || addr.municipality || "Unknown City",
        state: addr.state || "Unknown State",
        country: addr.country || "India",
        postal_code: addr.postcode || "Unknown",
        full_display: data.display_name,
        coordinates: `${latitude}, ${longitude}`,
        raw_address: addr,
      };
    }

    throw new Error("No address data received");
  } catch (error) {
    console.error("Geocoding failed:", error);

    // Return basic info if geocoding fails
    return {
      formatted_address: `${latitude}, ${longitude}`,
      locality: "Location coordinates available",
      city: "Unknown",
      state: "Unknown",
      country: "India",
      postal_code: "Unknown",
      coordinates: `${latitude}, ${longitude}`,
      error: error.message,
    };
  }
}

/**
 * Get multiple address formats for better accuracy
 */
export async function getMultipleAddressFormats(latitude, longitude) {
  const results = [];

  try {
    // Get detailed address
    const detailed = await getIndianAddress(latitude, longitude);
    results.push({
      source: "Nominatim",
      ...detailed,
    });
  } catch (error) {
    console.error("Detailed geocoding failed:", error);
  }

  // If we have results, return them, otherwise return coordinates
  return results.length > 0
    ? results[0]
    : {
        formatted_address: `${latitude}, ${longitude}`,
        locality: "Coordinates only",
        city: "Unknown",
        state: "Unknown",
        country: "Unknown",
        coordinates: `${latitude}, ${longitude}`,
      };
}
