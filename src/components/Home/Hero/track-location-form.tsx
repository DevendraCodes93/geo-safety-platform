import { useState } from "react";
import toast from "react-hot-toast";
import Logo from "@/components/Layout/Header/Logo";

const TrackLocationForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<{
    trackingURL: string;
  }>({
    trackingURL: "",
  });
  const [locationData, setLocationData] = useState<{
    latitude: number;
    longitude: number;
    address: string;
    timestamp: string;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const generateMockLocationData = () => {
    // Mock location data for demo purposes
    const mockLocations = [
      { lat: 40.7128, lng: -74.006, address: "New York, NY, USA" },
      { lat: 34.0522, lng: -118.2437, address: "Los Angeles, CA, USA" },
      { lat: 41.8781, lng: -87.6298, address: "Chicago, IL, USA" },
      { lat: 29.7604, lng: -95.3698, address: "Houston, TX, USA" },
      { lat: 39.9526, lng: -75.1652, address: "Philadelphia, PA, USA" },
    ];

    const randomLocation =
      mockLocations[Math.floor(Math.random() * mockLocations.length)];
    return {
      latitude: randomLocation.lat,
      longitude: randomLocation.lng,
      address: randomLocation.address,
      timestamp: new Date().toLocaleString(),
    };
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.trackingURL) {
      toast.error("Please enter a tracking URL");
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const mockLocation = generateMockLocationData();
      setLocationData(mockLocation);
      toast.success("Location retrieved successfully!");
    } catch (error) {
      toast.error("An error occurred while tracking location.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const openInMaps = () => {
    if (locationData) {
      const mapsUrl = `https://maps.google.com/?q=${locationData.latitude},${locationData.longitude}`;
      window.open(mapsUrl, "_blank");
    }
  };

  return (
    <div className="w-full mx-auto p-2 sm:p-4">
      <div className="flex justify-center mb-4 sm:mb-8">
        <Logo />
      </div>
      <h3 className="text-white text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-center">
        Track Location
      </h3>

      {!locationData ? (
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div>
            <input
              id="trackingURL"
              type="url"
              name="trackingURL"
              placeholder="Enter tracking URL (e.g., https://trackr.pro/l/abc123)"
              value={formData.trackingURL}
              onChange={handleChange}
              className="text-white bg-transparent border border-dark_border border-opacity-60 rounded-md px-3 py-2 w-full text-sm sm:text-base focus:border-primary focus-visible:outline-0"
              required
            />
          </div>

          <div className="bg-yellow-900 bg-opacity-30 border border-yellow-600 rounded-md p-2 sm:p-3">
            <p className="text-yellow-200 text-xs sm:text-sm">
              ⚠️ <strong>Privacy Notice:</strong> Only track URLs you have
              permission to monitor. This service respects user privacy and
              complies with applicable laws.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="text-darkmode font-medium text-sm sm:text-18 bg-primary w-full border border-primary rounded-lg py-2 sm:py-3 hover:text-primary hover:bg-transparent disabled:opacity-50 mt-4 sm:mt-6"
          >
            {loading ? "Tracking..." : "Track Location"}
          </button>
        </form>
      ) : (
        <div className="text-center">
          <div className="bg-gray-800 rounded-lg p-3 sm:p-4 mb-4">
            <p className="text-green-400 mb-3 sm:mb-4 text-sm sm:text-base">
              ✓ Location Found!
            </p>

            <div className="space-y-2 sm:space-y-3 text-left">
              <div>
                <p className="text-gray-400 text-xs sm:text-sm">Coordinates:</p>
                <p className="text-white text-sm sm:text-base">
                  {locationData.latitude}, {locationData.longitude}
                </p>
              </div>

              <div>
                <p className="text-gray-400 text-xs sm:text-sm">Address:</p>
                <p className="text-white text-sm sm:text-base">
                  {locationData.address}
                </p>
              </div>

              <div>
                <p className="text-gray-400 text-xs sm:text-sm">Timestamp:</p>
                <p className="text-white text-sm sm:text-base">
                  {locationData.timestamp}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={openInMaps}
              className="flex-1 text-darkmode font-medium text-sm sm:text-16 bg-primary border border-primary rounded-lg py-2 hover:text-primary hover:bg-transparent"
            >
              Open in Maps
            </button>
            <button
              onClick={() => {
                setLocationData(null);
                setFormData({ trackingURL: "" });
              }}
              className="flex-1 text-primary font-medium text-sm sm:text-16 bg-transparent border border-primary rounded-lg py-2 hover:bg-primary hover:text-darkmode"
            >
              Track Another
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackLocationForm;
