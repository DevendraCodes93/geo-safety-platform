import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Safe Haven Locator",
  description:
    "Simple terms for using Safe Haven Locator to help find lost people. We protect your privacy and delete data automatically.",
};

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-darkmode pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 px-4">
            <h1 className="text-4xl font-bold text-white mb-4">
              Terms of Service
            </h1>
            <p className="text-gray-300 text-lg">
              Simple terms for helping lost people find their way home safely
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Last updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          {/* Content */}
          <div className=" rounded-xl p-6 sm:p-8 space-y-12">
            {/* Our Purpose */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                🏠 Our Purpose
              </h2>
              <p className="text-gray-300">
                Safe Haven Locator is designed to help lost people find their
                way home and assist families in locating their loved ones
                safely. By using our service, you agree to use it responsibly
                and only for legitimate purposes.
              </p>
            </section>

            {/* How It Works */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                📍 How It Works
              </h2>
              <div className="text-gray-300 space-y-3">
                <p>
                  <strong>1. Create a Help Link:</strong> You create a tracking
                  link for someone who needs help finding their location.
                </p>
                <p>
                  <strong>2. Share Safely:</strong> Share the link with the lost
                  person via WhatsApp, SMS, or other messaging.
                </p>
                <p>
                  <strong>3. Get Location:</strong> When they click the link and
                  give permission, their location is shared with you.
                </p>
                <p>
                  <strong>4. Help Them:</strong> Use the location to assist,
                  meet, or guide them to safety.
                </p>
              </div>
            </section>

            {/* Automatic Data Deletion */}
            <section className="bg-red-900/10 rounded-xl p-6">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                🗑️ Automatic Data Deletion
              </h2>
              <div className="text-gray-300 space-y-3">
                <p className="text-green-400 font-semibold">
                  We automatically delete all location data and history from our
                  database immediately after the time period you selected
                  expires.
                </p>
                <ul className="list-disc list-inside space-y-2">
                 
                  <li>If you set 7 days expiry → Data deleted after 7 days</li>
                  <li>
                    If you set 30 days expiry → Data deleted after 30 days
                  </li>
                  <li>If you set 1 year expiry → Data deleted after 1 year</li>
                </ul>
                <p className="text-yellow-400">
                  <strong>Important:</strong> Once deleted, we cannot recover
                  the data. This protects everyone&apos;s privacy.
                </p>
              </div>
            </section>

            {/* What You Can Do */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                ✅ What You Can Do
              </h2>
              <ul className="text-gray-300 list-disc list-inside space-y-2">
                <li>Help lost children find their parents/guardians</li>
                <li>Assist elderly people with memory issues</li>
                <li>Help people who don&apos;t know their current address</li>
                <li>Emergency location sharing for safety purposes</li>
                <li>Legitimate business tracking (delivery, appointments)</li>
              </ul>
            </section>

            {/* What You Cannot Do */}
            <section className="bg-red-900/10 rounded-xl p-6">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                ❌ What You Cannot Do
              </h2>
              <ul className="text-gray-300 list-disc list-inside space-y-2">
                <li>Track people without their knowledge or consent</li>
                <li>Use for stalking, harassment, or illegal surveillance</li>
                <li>
                  Share tracking links with people who haven&apos;t given permission
                </li>
                <li>Use for any illegal or harmful activities</li>
                <li>Sell or misuse location data</li>
              </ul>
            </section>

            {/* Privacy Protection */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                🔐 Privacy Protection
              </h2>
              <ul className="text-gray-300 list-disc list-inside space-y-2">
                <li>
                  We only collect location data when someone clicks your link
                  and gives permission
                </li>
                <li>We ask for consent before accessing anyone&apos;s location</li>
                <li>All data is encrypted and stored securely</li>
                <li>We never share your data with third parties</li>
                <li>
                  Data is automatically deleted when your chosen time expires
                </li>
              </ul>
            </section>

            {/* Emergency Use */}
            <section className="bg-blue-900/10 rounded-xl p-6">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                🚨 Emergency Situations
              </h2>
              <div className="text-gray-300 space-y-3">
                <p>If you&apos;re using this service in an emergency:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    <strong>Always contact local authorities first</strong>{" "}
                    (Police: 100, Emergency: 112)
                  </li>
                  <li>
                    Use our service as additional help, not a replacement for
                    emergency services
                  </li>
                  <li>
                    Share the tracking link only with trusted people who can
                    help
                  </li>
                  <li>Keep the person safe while waiting for help to arrive</li>
                </ul>
              </div>
            </section>

            {/* Contact & Support */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                📞 Contact & Support
              </h2>
              <ul className="text-gray-300 list-disc list-inside space-y-2">
                <li>
                  Email:{" "}
                  <a
                    href="mailto:devu935352@gmail.com"
                    className="text-primary hover:underline"
                  >
                    devu935352@gmail.com
                  </a>
                </li>
                <li>We respond to all inquiries within 24 hours</li>
                <li>For emergencies, contact local authorities immediately</li>
              </ul>
            </section>

            {/* Agreement */}
            <section className="bg-green-900/10 rounded-xl p-6">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                📝 Agreement
              </h2>
              <ul className="text-gray-300 list-disc list-inside space-y-2">
                <li>Use the service only for legitimate, helpful purposes</li>
                <li>Respect others&apos; privacy and get consent before tracking</li>
                <li>Contact emergency services for serious situations</li>
                <li>Not use the service for illegal activities</li>
                <li>
                  Understand that data is automatically deleted after expiry
                </li>
              </ul>
              <p className="mt-4 text-green-400 font-medium">
                <strong>
                  Thank you for helping make the world a safer place! 🌍
                </strong>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
