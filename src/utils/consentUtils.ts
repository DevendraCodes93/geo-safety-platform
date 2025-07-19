// Consent management utilities for GDPR/CCPA compliance

export interface ConsentData {
  hasConsent: boolean;
  consentTimestamp: string;
  consentVersion: string;
  userAgent: string;
  ipAddress?: string;
}

const CONSENT_STORAGE_KEY = "locationTracker_consent";
const CONSENT_VERSION = "1.0";
const CONSENT_EXPIRY_DAYS = 365; // 1 year

/**
 * Check if user has given valid consent for location tracking
 */
export function hasValidConsent(): boolean {
  try {
    const consentData = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!consentData) return false;

    const consent: ConsentData = JSON.parse(consentData);

    // Check if consent exists and is for current version
    if (!consent.hasConsent || consent.consentVersion !== CONSENT_VERSION) {
      return false;
    }

    // Check if consent hasn't expired
    const consentDate = new Date(consent.consentTimestamp);
    const expiryDate = new Date(consentDate);
    expiryDate.setDate(expiryDate.getDate() + CONSENT_EXPIRY_DAYS);

    if (new Date() > expiryDate) {
      // Consent has expired, remove it
      removeConsent();
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error checking consent:", error);
    return false;
  }
}

/**
 * Store user's consent for location tracking
 */
export function grantConsent(): void {
  const consentData: ConsentData = {
    hasConsent: true,
    consentTimestamp: new Date().toISOString(),
    consentVersion: CONSENT_VERSION,
    userAgent: navigator.userAgent,
  };

  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consentData));
    console.log("Location tracking consent granted");

    // Dispatch custom event for other parts of the app
    window.dispatchEvent(
      new CustomEvent("consentGranted", { detail: consentData })
    );
  } catch (error) {
    console.error("Error storing consent:", error);
  }
}

/**
 * Remove user's consent (user declined or withdrew consent)
 */
export function removeConsent(): void {
  try {
    localStorage.removeItem(CONSENT_STORAGE_KEY);
    console.log("Location tracking consent removed");

    // Dispatch custom event for other parts of the app
    window.dispatchEvent(new CustomEvent("consentRevoked"));
  } catch (error) {
    console.error("Error removing consent:", error);
  }
}

/**
 * Get detailed consent information
 */
export function getConsentDetails(): ConsentData | null {
  try {
    const consentData = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!consentData) return null;

    return JSON.parse(consentData);
  } catch (error) {
    console.error("Error getting consent details:", error);
    return null;
  }
}

/**
 * Check if consent modal should be shown
 * Returns true if consent is needed, false if already granted or declined
 */
export function shouldShowConsentModal(): boolean {
  // Check if user has already made a decision (granted or explicitly declined)
  const hasDecision =
    localStorage.getItem(CONSENT_STORAGE_KEY) !== null ||
    sessionStorage.getItem("consent_declined") === "true";

  return !hasDecision;
}

/**
 * Mark that user explicitly declined consent (for this session)
 */
export function declineConsent(): void {
  try {
    // Store decline decision for this session only
    sessionStorage.setItem("consent_declined", "true");
    console.log("Location tracking consent declined");

    // Dispatch custom event for other parts of the app
    window.dispatchEvent(new CustomEvent("consentDeclined"));
  } catch (error) {
    console.error("Error storing consent decline:", error);
  }
}

/**
 * Reset all consent decisions (useful for testing or admin purposes)
 */
export function resetConsent(): void {
  try {
    localStorage.removeItem(CONSENT_STORAGE_KEY);
    sessionStorage.removeItem("consent_declined");
    console.log("All consent decisions reset");
  } catch (error) {
    console.error("Error resetting consent:", error);
  }
}

/**
 * Get consent status for display purposes
 */
export function getConsentStatus(): {
  status: "granted" | "declined" | "unknown";
  timestamp?: string;
  version?: string;
} {
  const consentData = getConsentDetails();
  const isDeclined = sessionStorage.getItem("consent_declined") === "true";

  if (consentData && consentData.hasConsent) {
    return {
      status: "granted",
      timestamp: consentData.consentTimestamp,
      version: consentData.consentVersion,
    };
  } else if (isDeclined) {
    return { status: "declined" };
  } else {
    return { status: "unknown" };
  }
}

/**
 * Validate location tracking permissions before proceeding
 * Returns a promise that resolves to true if tracking is allowed
 */
export async function validateTrackingPermission(): Promise<boolean> {
  // First check if we have stored consent
  if (hasValidConsent()) {
    return true;
  }

  // Check if user explicitly declined
  if (sessionStorage.getItem("consent_declined") === "true") {
    return false;
  }

  // If no decision made, we need to ask for consent
  // This should trigger the consent modal in the UI
  return false;
}

/**
 * Log consent for audit purposes (if audit logging is enabled)
 */
export function logConsentAction(
  action: "granted" | "declined" | "withdrawn",
  metadata?: any
): void {
  const logData = {
    action,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    consentVersion: CONSENT_VERSION,
    url: window.location.href,
    ...metadata,
  };

  // In a real application, you might want to send this to your analytics or audit system
  console.log("Consent action logged:", logData);

  // You could send this to your API for audit trail
  // fetch('/api/consent-log', { method: 'POST', body: JSON.stringify(logData) });
}
