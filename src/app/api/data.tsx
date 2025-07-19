import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Safe Haven Locator",
  description:
    "Understand our privacy-focused terms for using Safe Haven Locator. Designed to help find lost individuals with full user consent and strict data protection.",
};

// Perks data for the Perks component
export const perksData: {
  icon: string;
  title: string;
  text: string;
  space: string;
}[] = [
  {
    icon: "/images/perks/icon-community.svg",
    title: "Community-Driven",
    text: "Built with compassion to reunite families and help lost people.",
    space: "mt-7",
  },
  {
    icon: "/images/perks/icon-academy.svg",
    title: "Safe & Secure",
    text: "Child-safe platform with privacy protection and secure location sharing.",
    space: "mt-7",
  },
  {
    icon: "/images/perks/icon-support.svg", // Add a new icon to your images folder
    title: "Made with Heart",
    text: "Created by a student aiming to make location sharing safe and helpful for families.",
    space: "mt-7",
  },
];

// Footer labels data
export const footerlabels = [
  // { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service and Privacy", href: "/terms-of-service" },
  { label: "Contact", href: "#contact" },
];

// Crypto data for buy/sell forms (if needed)
export const CryptoData = [
  { name: "Bitcoin", price: 45000 },
  { name: "Ethereum", price: 3000 },
  { name: "Cardano", price: 0.5 },
];

// Timeline data for the Timeline component
export const timelineData = [
  {
    icon: "/images/timeline/icon-planning.svg",
    title: "Generate Link",
    text: "Create a secure location-sharing link with one click.",
  },
  {
    icon: "/images/timeline/icon-refinement.svg",
    title: "Send Securely",
    text: "Share the link via WhatsApp, SMS, or email with the person you want to help locate.",
  },
  {
    icon: "/images/timeline/icon-prototype.svg",
    title: "Location Shared",
    text: "When they open the link and allow access, their real-time location is securely sent.",
  },
  {
    icon: "/images/timeline/icon-support.svg",
    title: "Stay Connected",
    text: "Use the shared location to assist, meet, or ensure someone's safety — with full support from us.",
  },
];

// Upgrade data for the Upgrade component
export const upgradeData = [
  { title: "High Accuracy GPS" },
  { title: "Real-time Tracking" },
  { title: "Privacy Protection" },
  { title: "Emergency Support" },
  { title: "Auto Data Deletion" },
  { title: "24/7 Assistance" },
];

// Portfolio data for the Portfolio component
export const portfolioData = [
  {
    icon: "/images/portfolio/icon-wallet.svg",
    title: "Secure Tracking",
    text: "End-to-end encrypted location sharing for maximum privacy and security.",
    image: "/images/portfolio/img-portfolio.png",
  },
  {
    icon: "/images/portfolio/icon-vault.svg",
    title: "Auto Deletion",
    text: "Your data automatically deletes after your chosen time period expires.",
    image: "/images/portfolio/img-portfolio.png",
  },
  {
    icon: "/images/portfolio/icon-mobileapp.svg",
    title: "Easy Sharing",
    text: "Simple link sharing via WhatsApp, SMS, or email - no app installation required.",
    image: "/images/portfolio/img-portfolio.png",
  },
];

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-darkmode pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-6">
              Terms & Privacy Policy
            </h1>
            <p className="text-gray-300 text-xl leading-relaxed">
              Simple terms for our location sharing platform designed to help
              people find their way home safely.
            </p>
            <div className="mt-4 text-gray-400 text-sm">
              Last updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>

          {/* Content - Clean Simple Layout */}
          <div className="space-y-16 text-gray-300 leading-relaxed">
            {/* Mission */}
            <section>
              <h2 className="text-3xl font-semibold text-white mb-6">
                🏠 Our Mission
              </h2>
              <p className="text-lg leading-relaxed">
                Safe Haven Locator helps reunite families and assists people who
                are lost or need location sharing support. We're built with
                privacy, consent, and safety as our core values.
              </p>
            </section>
            {/* How It Works */}
            {/* How It Works */}
            <section>
              <h2 className="text-3xl font-semibold text-white mb-6">
                📍 How It Works
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-medium text-white mb-2">
                      1. Create Link
                    </h3>
                    <p className="text-gray-300">
                      Generate a secure location-sharing link instantly.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-white mb-2">
                      2. Share Safely
                    </h3>
                    <p className="text-gray-300">
                      Send via WhatsApp, SMS, or email to trusted contacts.
                    </p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-medium text-white mb-2">
                      3. User Consent
                    </h3>
                    <p className="text-gray-300">
                      Person must actively allow location access - no secret
                      tracking.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-white mb-2">
                      4. Help Safely
                    </h3>
                    <p className="text-gray-300">
                      Use location info to provide assistance and support.
                    </p>
                  </div>
                </div>
              </div>
            </section>{" "}
            {/* Privacy & Data */}
            <section>
              <h2 className="text-3xl font-semibold text-white mb-6">
                🗑️ Privacy & Data Protection
              </h2>
              <div className="space-y-8">
                <p className="text-xl text-green-400 font-medium">
                  We automatically delete ALL data after your chosen time period
                  expires.
                </p>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-medium text-white mb-4">
                      Auto-Deletion
                    </h3>
                    <div className="space-y-2 text-gray-300">
                      <div>• 1 day → deleted after 1 day</div>
                      <div>• 7 days → deleted after 7 days</div>
                      <div>• 30 days → deleted after 30 days</div>
                      <div>• 1 year → deleted after 1 year</div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-white mb-4">
                      Protection
                    </h3>
                    <div className="space-y-2 text-gray-300">
                      <div>• End-to-end encryption</div>
                      <div>• No data sharing with third parties</div>
                      <div>• Consent required for all tracking</div>
                      <div>• No background surveillance</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* Usage Guidelines */}
            <section>
              <h2 className="text-3xl font-semibold text-white mb-6">
                ✅ Usage Guidelines
              </h2>
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-xl font-medium text-green-400 mb-4">
                    Allowed Uses
                  </h3>
                  <div className="space-y-2 text-gray-300">
                    <div>• Help lost children find parents</div>
                    <div>• Assist elderly with memory issues</div>
                    <div>• Emergency location sharing</div>
                    <div>• Legitimate business tracking</div>
                    <div>• Family safety coordination</div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-red-400 mb-4">
                    Prohibited Uses
                  </h3>
                  <div className="space-y-2 text-gray-300">
                    <div>• Tracking without consent</div>
                    <div>• Stalking or harassment</div>
                    <div>• Deceptive practices</div>
                    <div>• Data reselling</div>
                    <div>• Illegal surveillance</div>
                  </div>
                </div>
              </div>
            </section>
            {/* What You Cannot Do */}
            <section className="border border-red-500/30 rounded-lg p-6 bg-red-900/10">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                ❌ What You Cannot Do
              </h2>
              <ul className="text-gray-300 list-disc list-inside space-y-2">
                <li>Track people without their explicit permission</li>
                <li>
                  Engage in stalking, harassment, or unwanted surveillance
                </li>
                <li>Use this service to impersonate or deceive someone</li>
                <li>Share links without the recipient’s knowledge</li>
                <li>Sell, misuse, or redistribute any location data</li>
              </ul>
            </section>
            {/* Privacy Protection */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                🔐 Privacy Protection
              </h2>
              <ul className="text-gray-300 list-disc list-inside space-y-2">
                <li>
                  We collect location data only when users click and allow
                  access
                </li>
                <li>We never track in the background or without consent</li>
                <li>All data is encrypted during transit and storage</li>
                <li>We never share data with advertisers or third parties</li>
                <li>Data auto-deletes after the selected expiry period</li>
              </ul>
            </section>
            {/* Emergency */}
            <section>
              <h2 className="text-3xl font-semibold text-white mb-6">
                🚨 Emergency Guidelines
              </h2>
              <div className="space-y-4">
                <p className="text-xl text-blue-400 font-medium">
                  Always contact local authorities first for emergencies
                </p>
                <p className="text-gray-400">Police: 100 | Emergency: 112</p>
                <p className="text-gray-300">
                  Use Safe Haven Locator as additional support, not as a
                  replacement for emergency services.
                </p>
              </div>
            </section>
            {/* Contact */}
            <section>
              <h2 className="text-3xl font-semibold text-white mb-6">
                📞 Contact & Support
              </h2>
              <div className="space-y-4">
                <p className="text-lg text-gray-300">
                  Need help or have questions?
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-primary text-xl">✉️</span>
                  <a
                    href="mailto:devu935352@gmail.com"
                    className="text-primary hover:underline text-lg transition-colors"
                  >
                    devu935352@gmail.com
                  </a>
                </div>
                <p className="text-gray-400">
                  We respond to all inquiries within 24 hours. For emergencies,
                  contact local authorities immediately.
                </p>
              </div>
            </section>
            {/* Agreement */}
            <section>
              <h2 className="text-3xl font-semibold text-white mb-6">
                📝 Your Agreement
              </h2>
              <div className="space-y-6">
                <p className="text-lg text-white">
                  By using Safe Haven Locator, you agree to:
                </p>
                <div className="space-y-3 text-gray-300">
                  <div>• Use the service ethically and legally</div>
                  <div>• Always obtain user consent before tracking</div>
                  <div>• Respect privacy and data protection</div>
                  <div>• Accept that deleted data cannot be recovered</div>
                </div>
                <p className="text-xl text-green-400 font-medium text-center pt-8">
                  Thank you for helping make the world a safer place! 🌍
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
