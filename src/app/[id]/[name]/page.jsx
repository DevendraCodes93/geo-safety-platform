import { TrackingPageClient } from "./TrackingPageClient";

// Force dynamic rendering for all routes
export const dynamic = "force-dynamic";

// This function is required for static export
export async function generateStaticParams() {
  // Return empty array to allow all dynamic routes
  // This tells Next.js that these are user-generated URLs
  // and should be handled dynamically
  return [];
}

export default function TrackingPage() {
  return <TrackingPageClient />;
}
