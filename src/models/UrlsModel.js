import mongoose from "mongoose";

const urlSchema = mongoose.Schema(
  {
    creatorId: { type: String, required: true },
    visitorDetails: [
      {
        sessionId: { type: String, unique: true },
        latitude: { type: Number },
        longitude: { type: Number },
        accuracy: { type: Number },
        altitude: { type: Number },
        altitudeAccuracy: { type: Number },
        heading: { type: Number },
        speed: { type: Number },
        timestamp: { type: String },
        userAgent: { type: String },
        // Address details from reverse geocoding
        address: {
          formatted_address: { type: String },
          locality: { type: String }, // Avalahalli
          sublocality: { type: String }, // Neighbourhood
          city: { type: String }, // Bangalore
          state: { type: String }, // Karnataka
          country: { type: String }, // India
          postal_code: { type: String },
          coordinates: { type: String },
          full_display: { type: String },
        },
        screen: {
          width: { type: Number },
          height: { type: Number },
        },
        viewport: {
          width: { type: Number },
          height: { type: Number },
        },
        timezone: { type: String },
        language: { type: String },
        platform: { type: String },
      },
    ],
    url: {
      type: String,
      required: true,
    },
    description: { type: String, default: "" },
    expiryDays: { type: Number, default: 0 },
    expiresAt: { type: Date, default: null }, // New field for actual expiry date
  },
  {
    timestamps: true,
  }
);

// Check if the model already exists to prevent overwrite error
const Urls =
  mongoose.models.location_url || mongoose.model("location_url", urlSchema);
export default Urls;
